import Loading from "common/Loading"
import NoData from "common/NoData"
import { createNotifications } from "common/Notification"
import Title from "common/Title"
import { handleInspectApi } from "helper/handleInspectApi"
import { handleResponse } from "helper/handleResponse"
import { sendInput } from "helper/sendInput"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { getDepositInfo } from "reducers/authSlice"
import { ROUTER_PATH } from "routes/contants"
import { AppDispatch, RootState } from "store"
import styled from "styled-components"
import { Content, DefaultButton, FlexLayoutBtn, PrimaryButton, SuccessButton } from "styled/common"
import { convertUtcToLocal } from "utils/common"
import {
    CAMPAIGN_DETAIL,
    ERROR_MESSAGE,
    FORMAT_DATETIME, NOTI_TYPE,
    NO_RESPONSE_ERROR, VOTE,
    WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE
} from "utils/contants"
import { CampaignVotingType, CandidatesVotingType, DepositInfoType, MetadataType, resInput, tokenType } from "utils/interface"
import VotingItem from "./Item/Voting"

interface DataType {
    campaign: CampaignVotingType
    candidates: CandidatesVotingType[]
    voted: any
}

const SubTitle = styled.div`
    text-align: center;

    & span {
        color: #FF4B3A;
    }
`

const Voting = () => {
    const [candidateId, setCandidateId] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [callMessage, setCallMessage] = useState<string>('')
    const [isLoadVoting, setIsLoadVoting] = useState<boolean>(false)
    const [isCloseVoting, setIsCloseVoting] = useState<boolean>(false)
    const [data, setData] = useState<DataType>({
        campaign: {
            creator: '',
            description: '',
            end_time: '',
            id: 0,
            name: '',
            start_time: '',
            fee: 0,
            accept_token: ''
        },
        candidates: [],
        voted: {}
    })
    const [campaignType, setCampaignType, isActionButton, setIsActionButton] = useOutletContext<any>();
    const dispatch = useDispatch<AppDispatch>()
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const deposit_info = useSelector((state: RootState) => state.auth.deposit_info)
    const { tokenListing } = useSelector((state: RootState) => state.token)
    const { campaignId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            if (campaignId) {
                try {
                    setIsLoading(true)
                    const data = {
                        action: CAMPAIGN_DETAIL,
                        campaign_id: parseInt(campaignId)
                    }
                    const result = await handleInspectApi(data, metadata)
                    if (result?.campaign?.length > 0 && !result.error) {
                        // Convert UTC+0 datetime to local datetime and format
                        const start_time = moment(convertUtcToLocal(new Date(result.campaign[0].start_time))).format(FORMAT_DATETIME)
                        const end_time = moment(convertUtcToLocal(new Date(result.campaign[0].end_time))).format(FORMAT_DATETIME)
                        const now = moment(new Date()).format(FORMAT_DATETIME)
                        const isStartTime = moment(start_time).isBefore(now) // Compare start time with current datetime
                        const isEndTime = moment(end_time).isBefore(now) // Compare end time with current datetime
                        setIsCloseVoting(!isStartTime || isEndTime)
                        setData({
                            campaign: {
                                ...result.campaign[0],
                                start_time,
                                end_time
                            },
                            candidates: result.candidates,
                            voted: result.voted
                        })
                        setCandidateId(result.voted?.candidate_id)
                        setIsActionButton({
                            creator: result.campaign[0].creator,
                            isVisible: !isStartTime
                        })
                    } else {
                        createNotifications(NOTI_TYPE.DANGER, result?.error || ERROR_MESSAGE)
                    }
                } catch (error: any) {
                    createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
                    throw error
                } finally {
                    setIsLoading(false)
                }
            }
        }

        getData()
    }, [campaignId])

    const onChooseAnswer = (id: number) => {
        if (data.voted?.candidate_id || isCloseVoting || isLoadVoting) return
        setCandidateId(id)
    }

    const handleVoting = async () => {
        const token: any = deposit_info.find((deposit: DepositInfoType) => deposit.contract_address === data.campaign?.accept_token)
        const amount = token?.amount - token?.used_amount - token?.withdrawn_amount
        if (amount && amount > data.campaign?.fee) {
            try {
                setIsLoadVoting(true)
                const data = {
                    action: VOTE,
                    candidate_id: candidateId,
                    campaign_id: campaignId && parseInt(campaignId),
                }
                setCallMessage(WAITING_FOR_CONFIRMATION)
                const { epoch_index, input_index }: resInput = await sendInput(data);
                handleResponse(epoch_index, input_index, ((payload: any) => {
                    if (!payload || payload.message !== NO_RESPONSE_ERROR && !payload.error) {
                        const message = payload ? 'Vote successfully!' : WAITING_RESPONSE_FROM_SERVER_MESSAGE
                        createNotifications(NOTI_TYPE.SUCCESS, message)
                        dispatch(getDepositInfo())
                        navigate(`${ROUTER_PATH.RESULT}/${campaignId}`, { replace: true });
                    } else if (payload.message === NO_RESPONSE_ERROR) {
                        setCallMessage(`Waiting: ${payload.times}s.`)
                    } else {
                        createNotifications(NOTI_TYPE.DANGER, payload?.error || ERROR_MESSAGE)
                        setCandidateId(0)
                        setIsLoadVoting(false)
                    }
                }))
            } catch (error: any) {
                createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
                setCandidateId(0)
                setIsLoadVoting(false)
                setCallMessage('')
                throw error
            }
        } else {
            createNotifications(NOTI_TYPE.DANGER, "Oops! You don't have enough tokens in the DApp!")
        }
    }

    const getInfo = () => {
        const { campaign } = data
        const token = tokenListing.find((token: tokenType) => token.address === campaign?.accept_token)?.name
        return (
            <p>To vote for this campaign, you need {campaign?.fee} {token}</p>
        )
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Title text={data.campaign.name || '(NO DATA)'} userGuideType='vote' />
                    <SubTitle>
                        <p>{data.campaign.start_time} - {data.campaign.end_time}</p>
                        {getInfo()}
                        {isCloseVoting && (
                            <span>This campaign is closed for voting!</span>
                        )}
                    </SubTitle>

                    {data.voted?.name && (
                        <p>Your voted is: {data.voted?.name}.</p>
                    )}
                    {data?.candidates.length > 0 ? data.candidates.map(item => (
                        <div key={item.id}>
                            <VotingItem active={candidateId} data={item} handleClick={(id: number) => onChooseAnswer(id)} />
                        </div>
                    )) : (
                        <NoData />
                    )}
                    {data?.candidates.length > 0 && (
                        <FlexLayoutBtn>
                            <DefaultButton type="button" onClick={() => navigate(ROUTER_PATH.HOMEPAGE)}>Back</DefaultButton>
                            <SuccessButton
                                type="button"
                                onClick={handleVoting}
                                disabled={isCloseVoting || data.voted?.candidate_id || !candidateId || isLoadVoting}
                            >
                                Vote
                            </SuccessButton>
                            <PrimaryButton type="button" onClick={() => navigate(`${ROUTER_PATH.RESULT}/${campaignId}`)}>Result</PrimaryButton>
                        </FlexLayoutBtn>
                    )}
                    {isLoadVoting && (
                        <Loading isScreenLoading={isLoadVoting} messages={callMessage} />
                    )}
                </Content >
            )}
        </>
    )
}

export default Voting