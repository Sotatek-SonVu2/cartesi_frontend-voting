import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { handleInspectApi } from "../helper/handleInspectApi";
import BellIcon from "../images/bell.png";
import NotificationIcon from "../images/notification.svg";
import { ROUTER_PATH } from "../routes/contants";
import { RootState } from "../store";
import { colorTheme, PrimaryButton } from "../styled/common";
import { Badge, NotifyContent, NotifyHeader, NotifyIcon, NotifyItem, NotifyList, NotifySection } from "../styled/header";
import { Loader, LoadingText } from "../styled/loading";
import { ERROR_MESSAGE, NOTIFICATION, NOTI_TYPE, REMOVE_NOTIFICATION } from "../utils/contants";
import { MetadataType } from "../utils/interface";
import Loading from "./Loading";
import NoData from "./NoData";
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

const getMessage = (item: any) => {
    const { action, payload } = item
    const parse = JSON.parse(payload)
    const { campaign, type, error, candidate, amount, reason } = parse
    const balance = parseInt(BigInt(amount).toString()) / Math.pow(10, 18)

    const successMessage: any = {
        CREATE_CAMPAIGN: <span>You created campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> successfully</span>,
        VOTE: (
            <span>
                You voted for candidate
                <Link to={`${ROUTER_PATH.RESULT}/${campaign?.id}`}> {candidate?.name} </Link>
                in campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> successfully
            </span>
        ),
        DEPOSIT: <span>You deposited to the DApp {balance} tokens successfully.</span>,
        EDIT_CAMPAIGN: <span>You edited info of campaign <Link to={`${ROUTER_PATH.VOTING}/${campaign?.id}`}>{campaign?.name} </Link> successfully</span>,
        DECREASE_TOKEN: <span>You had been charged {balance} tokens because {reason}</span>,
        DELETE_CAMPAIGN: <span>You deleted campaing {campaign?.name} successfully</span>,
        WITHDRAW: <Link to={ROUTER_PATH.WITHDRAW}>You requested to withdraw {balance} tokens successfully.</Link>,
    }

    const errorMessage: any = {
        CREATE_CAMPAIGN: <span>Create campaign {campaign?.name} failed because {error}</span>,
        VOTE: <span>Vote for candidate {candidate?.name} in campaign {campaign?.name} failed because {error}</span>,
        DEPOSIT: <span>Deposit {amount} token to DApp failed because {error}</span>,
        EDIT_CAMPAIGN: <span>Edit campaign {candidate?.name} failed because {error}</span>,
        DELETE_CAMPAIGN: <span>Delete campaign {candidate?.name} failed because {error}</span>,
        WITHDRAW: <span>Withdraw {amount} token failed because {error}</span>,
        SYSTEM: <span>System error: {error}</span>
    }
    return type === 'error' ? errorMessage[action] : successMessage[action]
}

const NotificationList = () => {
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const [items, setItems] = useState([])
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
            console.log('result', result)
            // console.log('result', result)
            // if (result && !result.error) {
            //     const list = items.concat(result.data)
            //     setItems(list)
            //     setPaging({
            //         currentPage: result.page,
            //         pageSize: result.limit,
            //         total: result.total
            //     })
            // } else {
            //     createNotifications(NOTI_TYPE.DANGER, result?.error || ERROR_MESSAGE)
            // }
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <NotifySection>
            <NotifyIcon>
                <Badge>5</Badge>
                <img src={NotificationIcon} alt="logo" width={20} height={20} className="Icon" />
            </NotifyIcon>
            <NotifyList>
                <NotifyHeader>
                    <span className="title">Notification</span>
                    <span className="readAll" onClick={handleReadAll}>Read all</span>
                </NotifyHeader>
                <InfiniteScroll
                    dataLength={items.length}
                    next={getData}
                    hasMore={items.length === total ? false : true}
                    loader={<LoadingText />}
                >
                    {items.length > 0 ? items.map((item: any) => {
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
                <ReloadButton onClick={getData} disabled={isLoading}>
                    {isLoading && (<Loader />)}
                    Reload
                </ReloadButton>
                {/* {isLoading && (
                <Loading />
            )} */}
            </NotifyList>
        </NotifySection>

    )
}

export default NotificationList