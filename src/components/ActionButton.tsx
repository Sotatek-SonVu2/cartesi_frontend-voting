import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import styled from "styled-components";
import { createNotifications } from "../common/Notification";
import { onChangeStatus } from "../reducers/campaignSlice";
import { ROUTER_PATH } from "../routes/contants";
import { getDataApi } from "../services";
import { AppDispatch } from "../store";
import { DangerButton, PrimaryButton, SuccessButton } from "../styled/common";
import { FlexLayout } from "../styled/main";
import { convertDataToHex, convertHexToData } from "../utils/common";
import { cadidateOptions, DELETE_CAMPAIGN, ERROR_MESSAGE, NOTI_TYPE } from "../utils/contants";
import { MetadataType } from "../utils/interface";
import DeleteModal from "./DeleteModal";

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

const colourStyles = {
    control: (styles: any) => ({ ...styles, width: '200px', }),
};

const ActionButton = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    let navigate = useNavigate();
    const metadata: MetadataType = useSelector((state: any) => state.auth.metadata)
    const isVisibleActionButton = useSelector((state: any) => state.campaign.isVisibleActionButton)
    const addressWallet = useSelector((state: any) => state.auth.address)
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()
    const pathname = `/${location.pathname.split("/")[1]}`
    const paramId = location.pathname.split("/")[2]
    console.log('isVisibleActionButton', isVisibleActionButton)
    console.log('pathname', pathname === ROUTER_PATH.VOTING)
    console.log('isVisibleActionButton.creator', isVisibleActionButton.creator, addressWallet)
    console.log('isVisibleActionButton.creator === addressWallet', isVisibleActionButton.creator === addressWallet)
    console.log('isVisibleActionButton.isOpenVoting', isVisibleActionButton.isOpenVoting)
    const onChangeSelect = (opt: any) => {
        dispatch(onChangeStatus(opt.value))
    }

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    const onDelete = async () => {
        try {
            const data = {
                action: DELETE_CAMPAIGN,
                id: parseInt(paramId)
            }
            const newMetadata = {
                ...metadata,
                timestamp: Date.now()
            }

            const payloadHex = convertDataToHex(data, newMetadata)
            const res: any = await getDataApi(payloadHex)
            const obj = convertHexToData(res.reports[0].payload)
            if (!obj.error) {
                createNotifications(NOTI_TYPE.SUCCESS, obj.message)
                navigate(ROUTER_PATH.HOMEPAGE, { replace: true });
            } else {
                createNotifications(NOTI_TYPE.DANGER, obj.error)
            }
        } catch (error) {
            createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
            throw error
        }
        toggleModal()
    }

    const render = () => {
        if (pathname === ROUTER_PATH.HOMEPAGE) {
            return (
                <FlexLayoutBetween>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="color"
                        styles={colourStyles}
                        defaultValue={cadidateOptions[0]}
                        options={cadidateOptions}
                        onChange={onChangeSelect}
                    />
                    <CreateButton onClick={() => navigate(ROUTER_PATH.ADD_CAMPAIGN)}>Create new campaign</CreateButton>
                </FlexLayoutBetween>
            )
        } else if (pathname === ROUTER_PATH.VOTING && isVisibleActionButton.creator === addressWallet && isVisibleActionButton.isOpenVoting) {
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