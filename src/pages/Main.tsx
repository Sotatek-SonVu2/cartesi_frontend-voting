import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import UserGuideModal from "../common/UserGuideModal";
import ActionButton from "../components/ActionButton";
import DepositInfo from "../components/DepositInfo";
import { Container, ContentWrapper, SubTitle, Title } from "../styled/main";
import { USER_GUIDE } from "../utils/contants";

const Main = () => {
    const user_guide = localStorage.getItem(USER_GUIDE) === 'false' ? false : true
    const [isVisible, setIsVisible] = useState<boolean>(user_guide)

    return (
        <>
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
                    toggleModal={() => setIsVisible(!isVisible)}
                    isVisible={isVisible}
                />
            )}
        </>
    );
}

export default Main