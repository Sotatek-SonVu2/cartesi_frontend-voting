import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Loading from "../../common/Loading"
import ModalComponent from "../../common/Modal"
import NoData from "../../common/NoData"
import { createNotifications } from "../../common/Notification"
import { handleInspectApi } from "../../helper/handleInspectApi"
import { RootState } from "../../store"
import { ModalTitle } from "../../styled/common"
import { FormItem } from "../../styled/form"
import { CAMPAIGN_DETAIL, CANDIDATE_DETAIL, ERROR_MESSAGE, NOTI_TYPE } from "../../utils/contants"
import { DescriptionType, MetadataType } from "../../utils/interface"

const Content = styled.span`
    font-weight: 400;
    line-height: 1.5;
    font-size: 16px;
`

type Props = {
    isVisible: boolean
    toggleModal: any
    campaignId: number
    candidateId?: number
}

const DescriptionModal = ({ isVisible, toggleModal, campaignId, candidateId }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<DescriptionType>({
        name: '',
        description: ''
    })
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)


    useEffect(() => {
        const getData = async () => {
            if (campaignId || campaignId && candidateId) {
                try {
                    setIsLoading(true)
                    const data = {
                        action: campaignId && candidateId ? CANDIDATE_DETAIL : CAMPAIGN_DETAIL,
                        campaign_id: campaignId,
                        candidate_id: candidateId ? candidateId : 0
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
                    setIsLoading(false)
                }
            }
        }

        getData()
    }, [])

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title={data.name || '(NO DATA)'} isLoading={isLoading}>
            {isLoading ? (
                <Loading />
            ) : (
                <ModalTitle>
                    <FormItem>
                        <b>Description: </b>
                        {data?.description ? (
                            <Content>{data.description}</Content>
                        ) : (
                            <NoData />
                        )}
                    </FormItem>
                </ModalTitle>
            )}
        </ModalComponent>
    )
}

export default DescriptionModal