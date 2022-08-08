import { Content, Title } from "../styled/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import NoData from "../common/NoData";
import { createNotifications } from "../common/Notification";
import Pagination from "../common/Pagination";
import { getDataApi } from "../services";
import { convertDataToHex, convertHexToData } from "../utils/common";
import { ERROR_MESSAGE, LIST_CAMPAIGN, NOTI_TYPE } from "../utils/contants";
import { MetadataType } from "../utils/interface";
import ItemCampaign from "./ItemCampaign";

const ListCampaign = () => {
    const metadata: MetadataType = useSelector((state: any) => state.auth.metadata)
    const listStatus = useSelector((state: any) => state.campaign.listStatus)
    const [items, setItems] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
                type: listStatus
            }
            const newMetadata = {
                ...metadata,
                timestamp: Date.now()
            }
            const payloadHex = convertDataToHex(data, newMetadata)
            const res: any = await getDataApi(payloadHex)
            const obj = convertHexToData(res.reports[0].payload)
            console.log('obj', obj)
            if (!obj.error) {
                setItems(obj.data)
                setPaging({
                    currentPage: obj.page,
                    pageSize: obj.limit,
                    totalPage: obj.total
                })
            } else {
                createNotifications(NOTI_TYPE.DANGER, obj.error)
            }
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            throw error
        } finally {
            setTimeout(() => setIsLoading(false), 2000)
        }
    }

    useEffect(() => {
        getData()
    }, [paging.currentPage, listStatus])

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Content>
                    <Title>
                        List campaign
                    </Title>
                    {items?.length > 0 ? items?.map((item: any) => (
                        <div key={item.id}>
                            <ItemCampaign data={item} />
                        </div>
                    )) : (
                        <NoData />
                    )}

                    <Pagination
                        currentPage={paging.currentPage}
                        totalCount={paging.totalPage}
                        pageSize={paging.pageSize}
                        onPageChange={(page: number) => {
                            setPaging({ ...paging, currentPage: page })
                        }}
                    />
                </Content>
            )}
        </>
    )
}

export default ListCampaign