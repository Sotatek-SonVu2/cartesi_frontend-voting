import ConfimModal from "common/ConfimModal";
import { createNotifications } from "common/Notification";
import ReactSelect, { OptionsType } from "common/ReactSelect";
import { handleResponse } from "helper/handleResponse";
import { sendInput } from "helper/sendInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "routes/contants";
import { RootState } from "store";
import styled from "styled-components";
import { DangerButton, PrimaryButton, SuccessButton } from "styled/common";
import { FlexLayout } from "styled/main";
import { cadidateOptions, DELETE_CAMPAIGN, ERROR_MESSAGE, NOTI_TYPE, NO_RESPONSE_ERROR, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE } from "utils/contants";
import { resInput } from "utils/interface";

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

interface PropsType {
    onChangeType: (value: string) => void
    isActionButton: {
        creator: string
        isVisible: boolean
    }
}

const ActionButton = ({ onChangeType, isActionButton }: PropsType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [callMessage, setCallMessage] = useState<string>('')
    const { creator, isVisible } = isActionButton
    const addressWallet = useSelector((state: RootState) => state.auth.address).toLowerCase()
    const navigate = useNavigate();
    const location = useLocation()
    const pathname = `/${location.pathname.split("/")[1]}`
    const paramId = location.pathname.split("/")[2]

    const onChangeSelect = (opt: OptionsType) => {
        onChangeType(opt.value)
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
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
                if (!payload || payload.message !== NO_RESPONSE_ERROR && !payload.error) {
                    const message = payload ? payload.message : WAITING_RESPONSE_FROM_SERVER_MESSAGE
                    createNotifications(NOTI_TYPE.SUCCESS, message)
                    navigate(ROUTER_PATH.HOMEPAGE, { replace: true });
                    setIsLoading(false)
                    toggleModal()
                } else if (payload.message === NO_RESPONSE_ERROR) {
                    setCallMessage(`Waiting: ${payload.times}s.`)
                } else {
                    createNotifications(NOTI_TYPE.DANGER, payload?.error || ERROR_MESSAGE)
                    setIsLoading(false)
                    toggleModal()
                }
            }))
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            setIsLoading(false)
            setCallMessage('')
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
                    <CreateButton onClick={() => navigate(ROUTER_PATH.CREATE_CAMPAIGN)}>Create new campaign</CreateButton>
                </FlexLayoutBetween>
            )
        } else if (pathname === ROUTER_PATH.VOTING && creator === addressWallet && isVisible) {
            return (
                <>
                    <FlexLayoutRight>
                        <EditButton onClick={() => navigate(`${ROUTER_PATH.EDIT_CAMPAIGN}/${paramId}`)}>Edit</EditButton>
                        <DangerButton onClick={toggleModal}>Delete</DangerButton>
                    </FlexLayoutRight>
                    {isOpen && (
                        <ConfimModal
                            isVisible={isOpen}
                            toggleModal={toggleModal}
                            onClick={onDelete}
                            isLoading={isLoading}
                            callMessage={callMessage}
                            buttonText='Delete'
                            title='Are you sure to delete this campaign?'
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