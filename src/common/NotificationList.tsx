import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { handleInspectApi } from "../helper/handleInspectApi";
import BellIcon from "../images/bell.png";
import EmptyIcon from "../images/empty_notifications.png";
import NotificationIcon from "../images/notification.svg";
import reloadIcon from "../images/reload.png";
import { ROUTER_PATH } from "../routes/contants";
import { RootState } from "../store";
import { colorTheme, NoDataWrapper, ReloadImage } from "../styled/common";
import { Badge, NotifyContent, NotifyHeader, NotifyIcon, NotifyItem, NotifyList, NotifySection } from "../styled/header";
import { LoadingText } from "../styled/loading";
import { FlexLayout } from "../styled/main";
import { ERROR_MESSAGE, NOTIFICATION, NOTI_TYPE, REMOVE_NOTIFICATION } from "../utils/contants";
import { MetadataType } from "../utils/interface";
import { createNotifications } from "./Notification";

const ReloadButton = styled.button`
    background-color: ${colorTheme.primary};
    color: #ffffff;
    display: flex;
    margin: 0 auto;
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 1px;
    border: 0px;
    margin-bottom: 10px;
    margin-top: 10px;
    cursor: pointer;
`

const EmptyNotification = styled(NoDataWrapper)`
    min-height: 200px;
    
    & p {
        color: #000;
    }
`

const getMessage = (item: any) => {
    const { action, payload } = item
    const parse = JSON.parse(payload)
    const { campaign, type, error, candidate, amount, reason } = parse

    const successMessage: any = {
        CREATE_CAMPAIGN: <span>You created campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> successfully</span>,
        VOTE: (
            <span>
                You voted for candidate
                <Link to={`${ROUTER_PATH.RESULT}/${campaign?.id}`}> {candidate?.name} </Link>
                in campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> successfully
            </span>
        ),
        DEPOSIT: <span>You deposited to the DApp {amount} tokens successfully.</span>,
        EDIT_CAMPAIGN: <span>You edited info of campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> successfully</span>,
        DECREASE_TOKEN: <span>You had been charged {amount} tokens because {reason}</span>,
        DELETE_CAMPAIGN: <span>You deleted campaing {campaign?.name} successfully</span>,
        WITHDRAW: <Link to={ROUTER_PATH.WITHDRAW}>You requested to withdraw {amount} tokens successfully.</Link>,
    }

    const errorMessage: any = {
        CREATE_CAMPAIGN: <span>Create campaign {campaign?.name} failed because {error}</span>,
        VOTE: <span>
            Vote for candidate <Link to={`${ROUTER_PATH.RESULT}/${campaign?.id}`}> {candidate?.name} </Link>
            in campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> failed because {error}
        </span>,
        DEPOSIT: <span>Deposit {amount} token to DApp failed because {error}</span>,
        EDIT_CAMPAIGN: <span>Edit campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> failed because {error}</span>,
        DELETE_CAMPAIGN: <span>Delete campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> failed because {error}</span>,
        WITHDRAW: <span>Withdraw {amount} token failed because {error}</span>,
        SYSTEM: <span>System error: {error}</span>
    }
    return {
        icon: type === 'error' ? BellIcon : BellIcon,
        message: type === 'error' ? errorMessage[action] : successMessage[action]
    }
}

const PAGE_DEFAULTS = {
    currentPage: 1,
    pageSize: 10,
    total: 0
}

const NotificationList = () => {
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [paging, setPaging] = useState(PAGE_DEFAULTS);
    const { currentPage, pageSize, total } = paging

    const getData = async (page?: number, isReload?: boolean) => {
        try {
            setIsLoading(true)
            const data = {
                action: NOTIFICATION,
                page: page || currentPage,
                limit: pageSize
            }
            const result = await handleInspectApi(data, metadata)
            if (result && !result.error) {
                const list = isReload ? result.data : items.concat(result.data)
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
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getData()
        }, 1000)
        const myInterval = setInterval(() => {
            setItems([])
            setPaging(PAGE_DEFAULTS)
            getData()
        }, 60000)

        return (() => {
            clearInterval(myInterval);
        })
    }, [])

    const handleReadAll = async () => {
        try {
            setIsLoading(true)
            const data = {
                action: REMOVE_NOTIFICATION,
            }
            const result = await handleInspectApi(data, metadata)
            if (result && !result.error) {
                setItems([])
                setPaging(PAGE_DEFAULTS)
            } else {
                createNotifications(NOTI_TYPE.DANGER, result?.error || ERROR_MESSAGE)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const reloadData = (isReload: boolean) => {
        setPaging(PAGE_DEFAULTS)
        getData(PAGE_DEFAULTS.currentPage, isReload)
    }

    return (
        <NotifySection>
            <NotifyIcon>
                {items.length > 0 && <Badge>{items.length}</Badge>}
                <img src={NotificationIcon} alt="logo" width={20} height={20} className="Icon" />
            </NotifyIcon>
            <NotifyList>
                <NotifyHeader>
                    <span className="title">Notification</span>
                    <FlexLayout>
                        <ReloadImage src={reloadIcon} alt="reloadIcon" width={12} onClick={() => reloadData(true)} isLoading={isLoading} />
                        <div className="line"></div>
                        <span className="readAll" onClick={handleReadAll}>Read all</span>
                    </FlexLayout>
                </NotifyHeader>
                <InfiniteScroll
                    dataLength={items.length}
                    next={() => getData(currentPage + 1)}
                    hasMore={items.length === total ? false : true}
                    loader={<LoadingText />}
                >
                    {items.length > 0 ? items.map((item: any) => {
                        const { icon, message } = getMessage(item)
                        return (
                            <NotifyItem key={item.id}>
                                <NotifyContent>
                                    <img src={icon} alt="bellIcon" width={20} height={20} />
                                    {message}
                                </NotifyContent>
                                <span>{item.payload.time}</span>
                            </NotifyItem>
                        )
                    }) : (
                        <EmptyNotification>
                            <img src={EmptyIcon} alt="emptyIcon" width={70} height={70} />
                            <p>No Data</p>
                        </EmptyNotification>
                    )}
                </InfiniteScroll>
            </NotifyList>
        </NotifySection>
    )
}

export default NotificationList