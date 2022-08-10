import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Loading from "../common/Loading"
import NoData from "../common/NoData"
import { createNotifications } from "../common/Notification"
import { sendInput } from "../helper/sendInput"
import { getDepositInfo } from "../reducers/authSlice"
import { onVisibleActionButton } from "../reducers/campaignSlice"
import { ROUTER_PATH } from "../routes/contants"
import { getDataApi } from "../services"
import { AppDispatch } from "../store"
import { Content, DefaultButton, FlexLayoutBtn, PrimaryButton, SuccessButton, Title } from "../styled/common"
import { LoadingAbsolute } from "../styled/loading"
import { convertDataToHex, convertHexToData, handleNotices } from "../utils/common"
import { CAMPAIGN_DETAIL, ERROR_MESSAGE, NOTI_TYPE, VOTING } from "../utils/contants"
import { CampaignVotingType, CandidatesVotingType, MetadataType } from "../utils/interface"
import ItemVoting from "./Item/ItemVoting"
import VotingModal from "./Modal/VotingModal"


interface DataType {
    campaign: CampaignVotingType
    candidates: CandidatesVotingType[]
    voted: any
}

const SubTitle = styled.div`
    text-align: center;

    & span {
        color: red;
    }
`



const Voting = () => {
    const [candidateId, setCandidateId] = useState<number>(0)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
        },
        candidates: [],
        voted: {}
    })
    const dispatch = useDispatch<AppDispatch>()
    const metadata: MetadataType = useSelector((state: any) => state.auth.metadata)
    const { campaignId }: any = useParams();
    const navigate = useNavigate();

    const onChooseAnswer = (id: number) => {
        if (data.voted?.candidate_id) return
        setCandidateId(id)
    }

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }


    const handleVoting = async () => {
        toggleModal()
        if (!candidateId) return createNotifications(NOTI_TYPE.DANGER, 'Please choose a candidate!')
        try {
            setIsLoadVoting(true)
            const data = {
                action: VOTING,
                candidate_id: candidateId,
                campaign_id: parseInt(campaignId)
            }
            const noticeKeys = await sendInput(data);
            handleNotices(noticeKeys?.epoch_index, noticeKeys?.input_index, ((payload: any) => {
                if (payload && !payload.error) {
                    dispatch(getDepositInfo())
                    createNotifications(NOTI_TYPE.SUCCESS, 'Vote successfully!')
                    navigate(`${ROUTER_PATH.RESULT}/${campaignId}`, { replace: true });
                } else {
                    createNotifications(NOTI_TYPE.DANGER, payload.error || ERROR_MESSAGE)
                    setCandidateId(0)
                    setIsLoadVoting(false)
                }
            }))
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error.messgae || ERROR_MESSAGE)
            setCandidateId(0)
            setIsLoadVoting(false)
            throw error
        }
    }


    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const data = {
                    action: CAMPAIGN_DETAIL,
                    campaign_id: campaignId && parseInt(campaignId)
                }
                const newMetadata = {
                    ...metadata,
                    timestamp: Date.now()
                }
                const payloadHex = convertDataToHex(data, newMetadata)
                const res: any = await getDataApi(payloadHex)
                const obj = convertHexToData(res.reports[0].payload)
                if (obj?.campaign?.length > 0 && !obj.error) {
                    const isStartTime = new Date(obj.campaign[0].start_time) < new Date()
                    const isEndTime = new Date(obj.campaign[0].end_time) < new Date()
                    const isVisibleActionButton = {
                        creator: obj.campaign[0].creator,
                        isOpenVoting: !isStartTime
                    }
                    setIsCloseVoting(isEndTime)
                    setData({
                        campaign: obj.campaign[0],
                        candidates: obj.candidates,
                        voted: obj.voted
                    })
                    setCandidateId(obj.voted?.candidate_id)
                    dispatch(onVisibleActionButton(isVisibleActionButton))
                } else {
                    createNotifications(NOTI_TYPE.DANGER, obj.error || ERROR_MESSAGE)
                }
            } catch (error: any) {
                createNotifications(NOTI_TYPE.DANGER, error.message || ERROR_MESSAGE)
                throw error
            } finally {
                setTimeout(() => setIsLoading(false), 1500)
            }
        }

        getData()
    }, [])

    console.log('isCloseVoting', isCloseVoting, data.voted?.candidate_id)

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Title>
                        {data.campaign.name}
                    </Title>
                    <SubTitle>
                        <p>{data.campaign.start_time} - {data.campaign.end_time}</p>
                        {isCloseVoting && (
                            <span>This campaign is closed for voting!</span>
                        )}
                    </SubTitle>

                    {data.voted?.name && (
                        <p>Your voted is: {data.voted?.name}.</p>
                    )}
                    {data?.candidates.length > 0 ? data.candidates.map(item => (
                        <div key={item.id}>
                            <ItemVoting active={candidateId} data={item} handleClick={(id: number) => onChooseAnswer(id)} />
                        </div>
                    )) : (
                        <NoData />
                    )}
                    <FlexLayoutBtn>
                        <DefaultButton type="button" onClick={() => navigate(ROUTER_PATH.HOMEPAGE)}>Back</DefaultButton>
                        <SuccessButton type="button" onClick={toggleModal} disabled={isCloseVoting || data.voted?.candidate_id}>Vote</SuccessButton>
                        <PrimaryButton type="button" onClick={() => navigate(`${ROUTER_PATH.RESULT}/${campaignId}`)}>Result</PrimaryButton>
                    </FlexLayoutBtn>
                    {isVisible && (
                        <VotingModal
                            isVisible={isVisible}
                            toggleModal={toggleModal}
                            onClick={handleVoting}
                        />
                    )}
                    {isLoadVoting && (
                        <LoadingAbsolute>
                            <Loading />
                        </LoadingAbsolute>
                    )}
                </Content >
            )}
        </>
    )
}

export default Voting