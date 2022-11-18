import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "common/Loading";
import NoData from "common/NoData";
import { createNotifications } from "common/Notification";
import Pagination from "common/Pagination";
import Title from "common/Title";
import { handleInspectApi } from "helper/handleInspectApi";
import { RootState } from "store";
import { Content } from "styled/common";
import { HeaderList } from "styled/list";
import { FlexLayout } from "styled/main";
import { ERROR_MESSAGE, LIST_CAMPAIGN, NOTI_TYPE } from "utils/contants";
import { CampaignDataType, MetadataType } from "utils/interface";
import CampaignItem from "./Item/Campaign";
import { useOutletContext } from "react-router-dom";
import { convertUtcTimestamp } from "utils/common";

const CampaignsList = () => {
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [campaignType] = useOutletContext<any>();
    const [items, setItems] = useState<CampaignDataType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isMyCampaign, setIsMyCampaign] = useState<boolean>(false)
    const [paging, setPaging] = useState({
        currentPage: 1,
        pageSize: 10,
        totalPage: 1
    });

    const getData = async () => {
        try {
            setIsLoading(true)
            const data = {
                action: LIST_CAMPAIGN,
                page: paging.currentPage,
                limit: paging.pageSize,
                type: campaignType,
                my_campaign: isMyCampaign
            }
            const result = await handleInspectApi(data, metadata)
            if (result && !result.error) {
                setItems(result.data)
                setPaging({
                    currentPage: result.page,
                    pageSize: result.limit,
                    totalPage: result.total
                })
            } else {
                createNotifications(NOTI_TYPE.DANGER, result?.error || ERROR_MESSAGE)
            }
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const onChangeCheckbox = () => {
        setIsMyCampaign(!isMyCampaign)
    }

    useEffect(() => {
        getData()
    }, [paging.currentPage, campaignType, isMyCampaign])

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <HeaderList>
                        <Title text='List campaigns' />
                        <FlexLayout>
                            <input type="checkbox" id='mycampaign' name='mycampaign' checked={isMyCampaign} onChange={onChangeCheckbox} style={{ margin: '3px 3px 0px' }} />
                            <small>My campaign</small>
                        </FlexLayout>
                    </HeaderList>

                    {items?.length > 0 ? items?.map((item: CampaignDataType) => (
                        <div key={item.id}>
                            <CampaignItem data={item} />
                        </div>
                    )) : (
                        <NoData />
                    )}
                    {items?.length > 0 && (
                        <Pagination
                            currentPage={paging.currentPage}
                            totalCount={paging.totalPage}
                            pageSize={paging.pageSize}
                            onPageChange={(page: number) => {
                                setPaging({ ...paging, currentPage: page })
                            }}
                        />
                    )}
                </Content>
            )}
        </>
    )
}

export default CampaignsList