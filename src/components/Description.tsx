import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../common/Loading";
import NoData from "../common/NoData";
import { createNotifications } from "../common/Notification";
import { handleInspectApi } from "../helper/handleInspectApi";
import { AppDispatch, RootState } from "../store";
import { Content, DefaultButton, FlexLayoutBtn, Title } from "../styled/common";
import { CAMPAIGN_DETAIL, CANDIDATE_DETAIL, ERROR_MESSAGE, NOTI_TYPE } from "../utils/contants";
import { DescriptionType, MetadataType } from "../utils/interface";

const Description = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<DescriptionType>({
        name: '',
        description: ''
    })
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const params = useParams();
    const { campaignId, candidateId } = params

    useEffect(() => {
        const getData = async () => {
            if (campaignId || campaignId && candidateId) {
                try {
                    setIsLoading(true)
                    const data = {
                        action: campaignId && candidateId ? CANDIDATE_DETAIL : CAMPAIGN_DETAIL,
                        campaign_id: parseInt(campaignId),
                        candidate_id: candidateId ? parseInt(candidateId) : ''
                    }
                    const result = await handleInspectApi(data, metadata)
                    if (!result.error) {
                        const name = campaignId && candidateId ? result.candidate.name : result.campaign[0].name
                        const description = campaignId && candidateId ? result.candidate.brief_introduction : result.campaign[0].description
                        setData({
                            name,
                            description
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
                        {data.name}
                    </Title>
                    <h3>Description: </h3>
                    {data?.description ? (
                        <p>{data.description}</p>
                    ) : (
                        <NoData />
                    )}
                    <FlexLayoutBtn>
                        <DefaultButton type="button" onClick={() => navigate(-1)}>Back</DefaultButton>
                    </FlexLayoutBtn>
                </Content>
            )}
        </>
    )
}

export default Description