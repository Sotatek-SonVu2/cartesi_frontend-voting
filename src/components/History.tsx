import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../common/Loading";
import NoData from "../common/NoData";
import { createNotifications } from "../common/Notification";
import ReactSelect from "../common/ReactSelect";
import { handleInspectApi } from "../helper/handleInspectApi";
import { RootState } from "../store";
import { Content, Title } from "../styled/common";
import { TimeLine } from "../styled/list";
import { FlexLayout } from "../styled/main";
import { ACTION_HISTORY, ERROR_MESSAGE, historyOptions, NOTI_TYPE } from "../utils/contants";
import { MetadataType } from "../utils/interface";
import HistoryItem from "./Item/History";

const FlexLayoutBetween = styled(FlexLayout)`
    justify-content: space-between;
    margin-bottom: 20px;
    color: #000;
`

const History = () => {
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [items, setItems] = useState([])
    const [paging, setPaging] = useState({
        currentPage: 0,
        pageSize: 10,
        total: 0
    });
    const [type, setType] = useState(historyOptions[0].value)

    const { currentPage, pageSize, total } = paging

    const getData = async () => {
        try {
            setIsLoading(true)
            const page = currentPage + 1
            const data = {
                action: ACTION_HISTORY,
                page,
                limit: pageSize,
                type
            }
            const result = await handleInspectApi(data, metadata)
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
    }, [type])

    const onChangeSelect = (opt: any) => {
        setType(opt.value)
        setItems([])
        setPaging({
            ...paging,
            currentPage: 0
        })
    }

    return (
        <>
            <Content>
                <FlexLayoutBetween>
                    <Title>
                        History
                    </Title>
                    <ReactSelect
                        options={historyOptions}
                        onChange={onChangeSelect}
                    />
                </FlexLayoutBetween>
                <InfiniteScroll
                    dataLength={items.length}
                    next={getData}
                    hasMore={items.length === total ? false : true}
                    loader={<></>}
                >
                    <TimeLine>
                        <ul>
                            {!isLoading && items.length === 0 ? (
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