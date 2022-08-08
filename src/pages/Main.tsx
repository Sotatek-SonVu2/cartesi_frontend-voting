import { Outlet } from "react-router-dom";
import Background from "../common/Background";
import Header from "../common/Header";
import ActionButton from "../components/ActionButton";
import { Container, ContentWrapper, MainWrapper, SubTitle, Title } from "../styled/main";

const Main = () => {
    return (
        <MainWrapper>
            <Background>
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
            </Background>
        </MainWrapper>
    );
}

export default Main