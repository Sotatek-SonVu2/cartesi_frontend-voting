import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Tour from 'reactour';
import styled from "styled-components";
import Header from "../common/Header";
import UserGuideModal from "../components/user/Modal/UserGuideModal";
import ActionButton from "../components/user/ActionButton";
import DepositInfo from "../components/user/DepositInfo";
import { ROUTER_PATH } from "../routes/contants";
import { colorTheme, SuccessButton } from "../styled/common";
import { Container, ContentWrapper, Setting, SubTitle, Title } from "../styled/main";
import { USER_GUIDE } from "../utils/contants";
import { tourConfig } from "../utils/tourConfig";
import SettingIcon from '../images/gear.png'


const IS_USER_GUIDE_OPEN = 'false'

const Button = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    padding: 4px 10px;
    color: #ffffff;
`

const Main = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const pathname = `/${location.pathname.split("/")[1]}`
    const user_guide = localStorage.getItem(USER_GUIDE) === IS_USER_GUIDE_OPEN || pathname !== ROUTER_PATH.HOMEPAGE ? false : true
    const [isVisible, setIsVisible] = useState<boolean>(user_guide)
    const [isTourOpen, setIsTourOpen] = useState<boolean>(false)

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
                <ActionButton />
                <ContentWrapper>
                    <Outlet />
                </ContentWrapper>
                <Setting
                    src={SettingIcon}
                    alt="settingIcon"
                    width={40}
                    onClick={() => navigate(ROUTER_PATH.ADMIN, { replace: true })}
                />
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