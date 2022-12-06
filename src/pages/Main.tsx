import Tooltip from "common/Tooltip";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Tour from 'reactour';
import { RootState } from "store";
import styled from "styled-components";
import Header from "../common/Header";
import ActionButton from "../components/user/ActionButton";
import DepositInfo from "../components/user/DepositInfo";
import UserGuideModal from "../components/user/Modal/UserGuideModal";
import SettingIcon from '../images/gear.png';
import { ROUTER_PATH } from "../routes/contants";
import { colorTheme, SuccessButton } from "../styled/common";
import { Container, Setting, SubTitle, Title } from "../styled/main";
import { LIST_STATUS, USER_GUIDE } from "../utils/contants";
import { tourConfig } from "../utils/tourConfig";

const IS_USER_GUIDE_OPEN = 'false'

const Button = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    padding: 4px 10px;
    color: #ffffff;
`

const Main = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const is_admin = useSelector((state: RootState) => state.auth.is_admin)
    const pathname = `/${location.pathname.split("/")[1]}`
    const user_guide = localStorage.getItem(USER_GUIDE) === IS_USER_GUIDE_OPEN || pathname !== ROUTER_PATH.HOMEPAGE ? false : true
    const [isVisible, setIsVisible] = useState<boolean>(user_guide)
    const [isTourOpen, setIsTourOpen] = useState<boolean>(false)
    const [campaignType, setCampaignType] = useState<string>(LIST_STATUS.ALL);
    const [isActionButton, setIsActionButton] = useState({
        creator: '',
        isVisible: false
    });

    const onToggle = () => {
        setIsVisible(!isVisible)
        localStorage.setItem(USER_GUIDE, IS_USER_GUIDE_OPEN)
    }

    const closeTour = () => {
        setIsTourOpen(false)
        localStorage.setItem(USER_GUIDE, IS_USER_GUIDE_OPEN)
    }

    const startTour = () => {
        setIsTourOpen(true)
        onToggle()
    }

    return (
        <>
            <Header startTour={() => setIsTourOpen(true)} />
            <Container>
                <Title>DApp Voting</Title>
                <SubTitle>Where your opinion matters!</SubTitle>
                <DepositInfo />
                <ActionButton
                    isActionButton={isActionButton}
                    onChangeType={(value: string) => setCampaignType(value)}
                />
                <Outlet context={
                    [campaignType, setCampaignType, isActionButton, setIsActionButton]}
                />
                {is_admin && (
                    <Tooltip
                        text='Go to Admin page'
                        id='admin'
                        className="tooltip-sz-sm tooltip-admin-icon"
                        placement="right"
                    >
                        <Setting
                            src={SettingIcon}
                            alt="settingIcon"
                            width={40}
                            onClick={() => navigate(ROUTER_PATH.ADMIN, { replace: true })}
                        />
                    </Tooltip>
                )}
            </Container>
            {isVisible && (
                <UserGuideModal
                    toggleModal={onToggle}
                    isVisible={isVisible}
                    startTour={startTour}
                />
            )}
            <Tour
                onRequestClose={closeTour}
                steps={tourConfig()}
                isOpen={isTourOpen}
                disableInteraction
                lastStepNextButton={<Button>Done!</Button>}
            />
        </>
    );
}

export default Main