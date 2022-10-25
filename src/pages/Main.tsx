import { TourProvider } from "@reactour/tour";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../common/Header";
import UserGuideModal from "../common/UserGuideModal";
import ActionButton from "../components/ActionButton";
import DepositInfo from "../components/DepositInfo";
import { ROUTER_PATH } from "../routes/contants";
import { Container, ContentWrapper, SubTitle, Title } from "../styled/main";
import { USER_GUIDE } from "../utils/contants";
import { tourSteps } from "../utils/tourSteps";

const Main = () => {
    const location = useLocation()
    const pathname = `/${location.pathname.split("/")[1]}`
    const user_guide = localStorage.getItem(USER_GUIDE) === 'false' || pathname !== ROUTER_PATH.HOMEPAGE ? false : true
    const [isVisible, setIsVisible] = useState<boolean>(user_guide)

    const onToggle = () => {
        setIsVisible(!isVisible)
        localStorage.setItem(USER_GUIDE, 'false')
    }

    return (
        <TourProvider steps={tourSteps} scrollSmooth>
            <Header />
            <Container>
                <Title>DApp Voting</Title>
                <SubTitle>Where your opinion matters!</SubTitle>
                <DepositInfo />
                <ActionButton />
                <ContentWrapper>
                    <Outlet />
                </ContentWrapper>
            </Container>
            {isVisible && (
                <UserGuideModal
                    toggleModal={onToggle}
                    isVisible={isVisible}
                />
            )}
        </TourProvider>
    );
}

export default Main