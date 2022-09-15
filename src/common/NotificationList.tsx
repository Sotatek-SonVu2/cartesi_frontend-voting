import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleInspectApi } from "../helper/handleInspectApi";
import BellIcon from "../images/bell.png";
import { ROUTER_PATH } from "../routes/contants";
import { RootState } from "../store";
import { NotifyContent, NotifyHeader, NotifyItem, NotifyList } from "../styled/header";
import { NOTIFICATION } from "../utils/contants";
import { MetadataType } from "../utils/interface";
import Loading from "./Loading";
import NoData from "./NoData";

const getMessage = (item: any) => {
    const { action, payload } = item
    const { campaign, type, error, candidate, amount, voucher_id, reason } = payload

    const successMessage: any = {
        CREATE_CAMPAIGN: <span>You created campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign.id}`}>{campaign.name} </Link> successfully</span>,
        VOTE: (
            <span>
                You voted for candidate
                <Link to={`${ROUTER_PATH.RESULT}/${campaign.id}`}> {candidate.name} </Link>
                in campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign.id}`}>{campaign.name} </Link> successfully
            </span>
        ),
        DEPOSIT: <span>You deposited to the DApp {amount} tokens successfully.</span>,
        EDIT_CAMPAIGN: <span>You edited info of campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign.id}`}>{campaign.name} </Link> successfully</span>,
        DECREASE_TOKEN: <span>You had been charged {amount} tokens because {reason}</span>,
        DELETE_CAMPAIGN: <span>You deleted campaing {campaign.name} successfully</span>,
        WITHDRAW: <Link to={ROUTER_PATH.WITHDRAW}>You requested to withdraw {amount} tokens successfully.</Link>,
    }

    const errorMessage: any = {
        CREATE_CAMPAIGN: <span>Create campaign {campaign.name} failed because {error}</span>,
        VOTE: <span>Vote for candidate {candidate.name} in campaign {campaign.name} failed because {error}</span>,
        DEPOSIT: <span>Deposit {amount} token to DApp failed because {error}</span>,
        EDIT_CAMPAIGN: <span>Edit campaign {candidate.name} failed because {error}</span>,
        DELETE_CAMPAIGN: <span>Delete campaign {candidate.name} failed because {error}</span>,
        WITHDRAW: <span>Withdraw {amount} token failed because {error}</span>,
        SYSTEM: <span>System error: {error}</span>
    }
    return type === 'error' ? errorMessage[action] : successMessage[action]
}

const NotificationList = () => {
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [paging, setPaging] = useState({
        currentPage: 0,
        pageSize: 10,
        total: 0
    });
    const { currentPage, pageSize, total } = paging
    const getData = async () => {
        try {
            setIsLoading(true)
            const page = currentPage + 1
            const data = {
                action: NOTIFICATION,
                page,
                limit: pageSize
            }
            const result = await handleInspectApi(data, metadata)
            console.log('result', result)
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const ReadAll = () => {
        console.log('ReadAll')
    }

    return (
        <NotifyList>
            <NotifyHeader>
                <span className="title">Notification</span>
                <span className="readAll" onClick={ReadAll}>Read all</span>
            </NotifyHeader>
            <InfiniteScroll
                dataLength={data.length}
                next={getData}
                hasMore={data.length === total ? false : true}
                loader={<></>}
            >
                {data.length > 0 ? data.map((item: any) => {
                    const message = getMessage(item)
                    return (
                        <NotifyItem>
                            <NotifyContent>
                                <img src={BellIcon} alt="bellIcon" width={20} height={20} />
                                {message}
                            </NotifyContent>
                            <span>{item.payload.time}</span>
                        </NotifyItem>
                    )
                }) : (
                    <NoData />
                )}
            </InfiniteScroll>

            {isLoading && (
                <Loading />
            )}
        </NotifyList>
    )
}

export default NotificationList