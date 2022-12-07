import Loading from "common/Loading";
import NoData from "common/NoData";
import { createNotifications } from "common/Notification";
import Pagination from "common/Pagination";
import Tooltip from "common/Tooltip";
import { handleInspectApi } from "helper/handleInspectApi";
import CommentIcon from 'images/comment.svg';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store";
import styled from "styled-components";
import { TitleText } from "styled/common";
import { VotesItem } from "styled/list";
import { ContentWrapper } from "styled/main";
import { formatAddress } from "utils/common";
import { ERROR_MESSAGE, LIST_VOTER, NOTI_TYPE } from "utils/contants";
import { MetadataType, VoterType } from "utils/interface";

const Wrapper = styled(ContentWrapper)`
    border-radius: 4px;
    margin-top: 2rem;
    color: #fff;
`

const Title = styled(TitleText)`
    border-bottom: 1px solid #5b5b5b;
    padding: 7px 1.5rem;
    font-size: 20px;
    margin-right: 0px;
`

const VotersList = () => {
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const { campaignId } = useParams();
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [paging, setPaging] = useState({
        currentPage: 1,
        pageSize: 10,
        totalPage: 1
    });

    const getData = async () => {
        if (campaignId) {
            try {
                setIsLoading(true)
                const data = {
                    id: parseInt(campaignId),
                    action: LIST_VOTER,
                    page: paging.currentPage,
                    limit: paging.pageSize,
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

    }

    useEffect(() => {
        getData()
    }, [paging.currentPage])

    return (
        <Wrapper>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Title>Votes ({items.length})</Title>
                    {items.length > 0 ? items.map((item: VoterType) => (
                        <VotesItem key={item.user}>
                            <div>{formatAddress(item.user)}</div>
                            <div>{item.name}</div>
                            <Tooltip text={item.comment} id={item.user} placement='top'>
                                <img src={CommentIcon} alt='comment' width={20} />
                            </Tooltip>
                        </VotesItem>
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
                </>
            )}
        </Wrapper>
    )
}

export default VotersList