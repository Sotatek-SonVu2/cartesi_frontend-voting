import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../common/Loading"
import NoData from "../common/NoData"
import { createNotifications } from "../common/Notification"
import { handleInspectApi } from "../helper/handleInspectApi"
import { ROUTER_PATH } from "../routes/contants"
import { Content, DefaultButton, FlexLayoutBtn, Title } from "../styled/common"
import { ERROR_MESSAGE, NOTI_TYPE, RESULT } from "../utils/contants"
import { CampaignType, MetadataType, VotedType } from "../utils/interface"
import ItemResult from "./Item/ItemResult"


interface DataType {
    campaign: CampaignType[]
    voted_candidate: VotedType | null
}

const Result = () => {
    const navigate = useNavigate();
    const { campaignId }: any = useParams();
    const metadata: MetadataType = useSelector((state: any) => state.auth.metadata)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<DataType>({
        campaign: [],
        voted_candidate: {
            campaign_id: 0,
            candidate_id: 0,
            id: 0,
            user: '',
            voting_time: '',
            name: ''
        }
    })

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const data = {
                    action: RESULT,
                    campaign_id: parseInt(campaignId)
                }
                const result = await handleInspectApi(data, metadata)
                console.log('result', result)
                if (!result.error) {
                    const campaign = result.campaign.map((item: any) => {
                        return {
                            ...item,
                            total_vote: result.total_vote,
                        }
                    }).sort((a: any, b: any) => b.votes - a.votes)
                    setData({
                        campaign,
                        voted_candidate: result.voted_candidate
                    })
                } else {
                    createNotifications(NOTI_TYPE.DANGER, result.error)
                }
            } catch (error) {
                createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
                throw error
            } finally {
                setTimeout(() => setIsLoading(false), 1500)
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
                        Who is the UI designer for DApp Voting?
                    </Title>
                    <p>Here is the reason, here is what you voted. The results by {data.campaign[0]?.total} votes:</p>
                    {data.voted_candidate?.name && (
                        <span>Your voted is: {data.voted_candidate?.name}.</span>
                    )}
                    {data?.campaign.length > 0 ? data.campaign.map((item) => (
                        <div key={item.id}>
                            <ItemResult data={item} voted_candidate={data.voted_candidate} />
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