import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import ActionButton from "../components/ActionButton";
import { Container, ContentWrapper, SubTitle, Title } from "../styled/main";

const Main = () => {
    return (
        <>
            <Header />
            <Container>
                <Title>DApp Voting</Title>
                <SubTitle>Here you will find a list of campaign vote types</SubTitle>
                <ActionButton />
                <ContentWrapper>
                    <Outlet />
                </ContentWrapper>
            </Container>
        </>
    );
}

export default Main