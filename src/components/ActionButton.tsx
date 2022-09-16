import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createNotifications } from "../common/Notification";
import ReactSelect from "../common/ReactSelect";
import { handleResponse } from "../helper/handleResponse";
import { sendInput } from "../helper/sendInput";
import { onChangeStatus } from "../reducers/campaignSlice";
import { ROUTER_PATH } from "../routes/contants";
import { AppDispatch, RootState } from "../store";
import { DangerButton, PrimaryButton, SuccessButton } from "../styled/common";
import { FlexLayout } from "../styled/main";
import { cadidateOptions, DELETE_CAMPAIGN, ERROR_MESSAGE, NOTI_TYPE, NO_RESPONSE_ERROR, NO_RESPONSE_FROM_SERVER_ERROR_MESSAGE, WAITING_FOR_CONFIRMATION } from "../utils/contants";
import { resInput } from "../utils/interface";
import DeleteModal from "./Modal/DeleteModal";

const EditButton = styled(PrimaryButton)`
    margin-right: 10px;
`

const CreateButton = styled(SuccessButton)`
    float: right;
`

const FlexLayoutBetween = styled(FlexLayout)`
    justify-content: space-between;
    margin-bottom: 20px;
`

const FlexLayoutRight = styled(FlexLayout)`
    justify-content: right;
    margin-bottom: 20px;
`

const ActionButton = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [callMessage, setCallMessage] = useState<string>('')
    const { creator, isOpenVoting } = useSelector((state: RootState) => state.campaign.isVisibleActionButton)
    const addressWallet = useSelector((state: RootState) => state.auth.address).toLowerCase()
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()
    const pathname = `/${location.pathname.split("/")[1]}`
    const paramId = location.pathname.split("/")[2]

    const onChangeSelect = (opt: any) => {
        dispatch(onChangeStatus(opt.value))
    }

    useEffect(() => {
        return (() => {
            dispatch(onChangeStatus(cadidateOptions[0].value))
        })
    })

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            const data = {
                action: DELETE_CAMPAIGN,
                id: paramId && parseInt(paramId)
            }
            setCallMessage(WAITING_FOR_CONFIRMATION)
            const { epoch_index, input_index }: resInput = await sendInput(data);
            handleResponse(epoch_index, input_index, ((payload: any) => {
                if (payload && payload.message !== NO_RESPONSE_ERROR && !payload.error) {
                    createNotifications(NOTI_TYPE.SUCCESS, payload.message)
                    navigate(ROUTER_PATH.HOMEPAGE, { replace: true });
                    setIsLoading(false)
                    toggleModal()
                } else if (payload.message === NO_RESPONSE_ERROR) {
                    setCallMessage(`Waiting: ${payload.times}s.`)
                } else {
                    const notifyType = !payload ? NOTI_TYPE.SUCCESS : NOTI_TYPE.DANGER
                    createNotifications(notifyType, payload?.error || NO_RESPONSE_FROM_SERVER_ERROR_MESSAGE)
                    setIsLoading(false)
                    toggleModal()
                }
            }))
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            setIsLoading(false)
            toggleModal()
            throw error
        }
    }

    const render = () => {
        if (pathname === ROUTER_PATH.HOMEPAGE) {
            return (
                <FlexLayoutBetween>
                    <ReactSelect
                        options={cadidateOptions}
                        onChange={onChangeSelect}
                    />
                    <CreateButton onClick={() => navigate(ROUTER_PATH.ADD_CAMPAIGN)}>Create new campaign</CreateButton>
                </FlexLayoutBetween>
            )
        } else if (pathname === ROUTER_PATH.VOTING && creator === addressWallet && isOpenVoting) {
            return (
                <>
                    <FlexLayoutRight>
                        <EditButton onClick={() => navigate(`${ROUTER_PATH.EDIT_CAMPAIGN}/${paramId}`)}>Edit</EditButton>
                        <DangerButton onClick={toggleModal}>Delete</DangerButton>
                    </FlexLayoutRight>
                    {isVisible && (
                        <DeleteModal
                            isVisible={isVisible}
                            toggleModal={toggleModal}
                            onClick={onDelete}
                            isLoading={isLoading}
                            callMessage={callMessage}
                        />
                    )}
                </>
            )
        }
        return <></>
    }

    return (
        render()
    )
}

export default ActionButton