import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import NoData from "../common/NoData";
import { createNotifications } from "../common/Notification";
import { handleInspectApi } from "../helper/handleInspectApi";
import { RootState } from "../store";
import { Content, Title } from "../styled/common";
import { TimeLine } from "../styled/list";
import { ACTION_HISTORY, ERROR_MESSAGE, NOTI_TYPE } from "../utils/contants";
import { MetadataType } from "../utils/interface";
import HistoryItem from "./Item/History";

const History = () => {
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [items, setItems] = useState([])
    const [paging, setPaging] = useState({
        currentPage: 0,
        pageSize: 10,
        total: 1
    });

    const { currentPage, pageSize, total } = paging

    const getData = async () => {
        try {
            setIsLoading(true)
            const page = currentPage + 1
            const data = {
                action: ACTION_HISTORY,
                page,
                limit: pageSize,
                type: 'all'
            }
            const result = await handleInspectApi(data, metadata)
            console.log('result', result)
            if (result && !result.error) {
                const list = items.concat(result.data)
                setItems(list)
                setPaging({
                    currentPage: result.page,
                    pageSize: result.limit,
                    total: result.total
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
    };

    useEffect(() => {
        getData()
    }, [])



    return (
        <>

            <Content>
                <Title>
                    History
                </Title>
                <InfiniteScroll
                    dataLength={items.length}
                    next={getData}
                    hasMore={items.length === total ? false : true}
                    loader={<></>}
                >
                    <TimeLine>
                        <ul>
                            {!isLoading && items.length < 0 ? (
                                <NoData />
                            ) : (
                                items.map((item, index) => (
                                    <div key={index}>
                                        <HistoryItem data={item} index={index} />
                                    </div>
                                ))
                            )}
                        </ul>
                    </TimeLine>

                </InfiniteScroll>
                {isLoading && (
                    <Loading />
                )}
            </Content>
        </>
    )
}

export default History