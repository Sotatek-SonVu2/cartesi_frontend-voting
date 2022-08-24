import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../common/Loading"
import NoData from "../common/NoData"
import { createNotifications } from "../common/Notification"
import { handleInspectApi } from "../helper/handleInspectApi"
import { ROUTER_PATH } from "../routes/contants"
import { RootState } from "../store"
import { Content, DefaultButton, FlexLayoutBtn, Title } from "../styled/common"
import { CAMPAIGN_DETAIL, ERROR_MESSAGE, NOTI_TYPE, RESULT } from "../utils/contants"
import { CampaignType, MetadataType, VotedType } from "../utils/interface"
import ItemResult from "./Item/ItemResult"


interface DataType {
    campaign: CampaignType[]
    title: string
    voted_candidate: VotedType | null
}

const Result = () => {
    const navigate = useNavigate();
    const { campaignId } = useParams();
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<DataType>({
        campaign: [],
        title: '',
        voted_candidate: {
            campaign_id: 0,
            candidate_id: 0,
            id: 0,
            user: '',
            voting_time: '',
            name: ''
        }
    })
    const { campaign, title, voted_candidate } = data

    useEffect(() => {
        const getData = async () => {
            if (campaignId) {
                try {
                    setIsLoading(true)
                    const resultPayload = {
                        action: RESULT,
                        campaign_id: parseInt(campaignId)
                    }
                    const detailPayload = {
                        action: CAMPAIGN_DETAIL,
                        campaign_id: parseInt(campaignId)
                    }
                    const result = await handleInspectApi(resultPayload, metadata)  // Get result data
                    const detail = await handleInspectApi(detailPayload, metadata) // Get detail data
                    if (!result.error && !detail.error) {
                        const campaign = result.campaign.map((item: CampaignType) => {
                            return {
                                ...item,
                                total_vote: result.total_vote,
                            }
                        }).sort((a: CampaignType, b: CampaignType) => b.votes - a.votes)
                        setData({
                            campaign,
                            title: detail?.campaign[0].name,
                            voted_candidate: result.voted_candidate
                        })
                    } else {
                        createNotifications(NOTI_TYPE.DANGER, result.error)
                    }
                } catch (error) {
                    createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
                    throw error
                } finally {
                    setIsLoading(false)
                }
            }
        }

        getData()
    }, [])

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Title>
                        {title || '(NO DATA)'}
                    </Title>
                    <p>Here is the reason, here is what you voted. The results by {campaign?.length > 0 ? campaign[0].total : 0} votes:</p>
                    {voted_candidate?.name && (
                        <span>Your voted is: {voted_candidate?.name}.</span>
                    )}
                    {campaign?.length > 0 ? campaign.map((item) => (
                        <div key={item.id}>
                            <ItemResult data={item} voted_candidate={voted_candidate} />
                        </div>
                    )) : (
                        <NoData />
                    )}
                    <FlexLayoutBtn>
                        <DefaultButton type="button" onClick={() => navigate(`${ROUTER_PATH.VOTING}/${campaignId}`)}>Back</DefaultButton>
                    </FlexLayoutBtn>
                </Content>
            )}
        </>

    )
}

export default Result