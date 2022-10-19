import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { handleInspectApi } from "../helper/handleInspectApi";
import EmptyIcon from "../images/empty_notifications.svg";
import NotificationIcon from "../images/notification.svg";
import BellError from "../images/notify_error.svg";
import BellSuccess from "../images/notify_success.svg";
import reloadIcon from "../images/reload.png";
import { ROUTER_PATH } from "../routes/contants";
import { RootState } from "../store";
import { NoDataWrapper, ReloadImage } from "../styled/common";
import { Badge, NotifyBottom, NotifyContent, NotifyHeader, NotifyIcon, NotifyItem, NotifyList, NotifySection } from "../styled/header";
import { FlexLayout } from "../styled/main";
import { coinList } from "../utils/coinList";
import { ERROR_MESSAGE, NOTIFICATION, NOTI_TYPE } from "../utils/contants";
import { MetadataType } from "../utils/interface";
import { createNotifications } from "./Notification";

const EmptyNotification = styled(NoDataWrapper)`
    min-height: 200px;
    
    & p {
        color: #000;
    }
`

const CHAIN_ID: any = process.env.REACT_APP_CHAIN_ID || 0

const getMessage = (item: any) => {
    const { action, payload } = item
    const parse = JSON.parse(payload)
    const { campaign, type, error, candidate, amount, reason, token } = parse
    const dataToken = coinList[CHAIN_ID].find((item: any) => item.address.toLowerCase() === token)
    const tokenIcon = dataToken?.token_icon || ''
    const tokenSymbol = dataToken?.symbol || ''
    const successMessage: any = {
        CREATE_CAMPAIGN: <span>You created campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> successfully</span>,
        VOTE: (
            <span>
                You voted for candidate
                <Link to={`${ROUTER_PATH.RESULT}/${campaign?.id}`}> {candidate?.name} </Link>
                in campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> successfully
            </span>
        ),
        DEPOSIT: <span>You deposited to the DApp {amount} <img src={tokenIcon} alt='token_icon' width={10} /> {tokenSymbol} tokens successfully.</span>,
        EDIT_CAMPAIGN: <span>You edited info of campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> successfully</span>,
        DECREASE_TOKEN: <span>You had been charged {amount} <img src={tokenIcon} alt='token_icon' width={10} /> {tokenSymbol} tokens because {reason}</span>,
        DELETE_CAMPAIGN: <span>You deleted campaing {campaign?.name} successfully</span>,
        WITHDRAW: <Link to={ROUTER_PATH.WITHDRAW}>
            You requested to withdraw {amount} <img src={tokenIcon} alt='token_icon' width={10} /> {tokenSymbol} tokens successfully.
        </Link>,
    }

    const errorMessage: any = {
        CREATE_CAMPAIGN: <span>Create campaign {campaign?.name} failed because {error}</span>,
        VOTE: <span>
            Vote for candidate <Link to={`${ROUTER_PATH.RESULT}/${campaign?.id}`}> {candidate?.name} </Link>
            in campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> failed because {error}
        </span>,
        DEPOSIT: <span>Deposit {amount} <img src={tokenIcon} alt='token_icon' width={10} /> {tokenSymbol} token to DApp failed because {error}</span>,
        EDIT_CAMPAIGN: <span>Edit campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> failed because {error}</span>,
        DELETE_CAMPAIGN: <span>Delete campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> failed because {error}</span>,
        WITHDRAW: <span>Withdraw {amount} <img src={tokenIcon} alt='token_icon' width={10} /> {tokenSymbol} token failed because {error}</span>,
        SYSTEM: <span>System error: {error}</span>
    }
    return {
        icon: type === 'error' ? BellError : BellSuccess,
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
        getData()
        // reload notification 
        const myInterval = setInterval(() => {
            setPaging(PAGE_DEFAULTS)
            getData(PAGE_DEFAULTS.currentPage, true)
        }, 60000)

        return (() => {
            clearInterval(myInterval);
        })
    }, [])

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
                    </FlexLayout>
                </NotifyHeader>
                <div
                    id="scrollableDiv"
                    style={{
                        height: 300,
                        overflow: 'auto',
                    }}
                >
                    {items.length > 0 ? items.map((item: any, index: number) => {
                        const { icon, message } = getMessage(item)
                        return (
                            <NotifyItem key={index}>
                                <NotifyContent>
                                    <img src={icon} alt="bellIcon" width={20} height={20} className="bellIcon" />
                                    {message}
                                </NotifyContent>
                                <span>{item.time}</span>
                            </NotifyItem>
                        )
                    }) : (
                        <EmptyNotification>
                            <img src={EmptyIcon} alt="emptyIcon" width={70} height={70} />
                            <p>No Data</p>
                        </EmptyNotification>
                    )}
                </div>
                {items.length !== total && (
                    <NotifyBottom>
                        {!isLoading ? <span onClick={() => getData(currentPage + 1)}>Load more</span> : <span>Loading</span>}
                    </NotifyBottom>
                )}
            </NotifyList>
        </NotifySection>
    )
}

export default NotificationList