import Header from 'common/Header'
import { tabItemType } from 'utils/interface'
import Tabs from '../common/Tabs'
import System from '../components/admin/System'
import Tokens from '../components/admin/Tokens'
import Users from '../components/admin/Users'
import { Content } from '../styled/common'
import { Container, ContentWrapper, SubTitle, Title } from '../styled/main'

const items: tabItemType[] = [
    {
        key: 1,
        label: 'Users',
        content: <Users />
    },
    {
        key: 2,
        label: 'Tokens',
        content: <Tokens />
    },
    {
        key: 3,
        label: 'System',
        content: <System />
    },

]

const Admin = () => {
    return (
        <>
            <Header />
            <Container>
                <Title>Welcome to Admin page!</Title>
                <SubTitle>Where your opinion matters!</SubTitle>
                <ContentWrapper>
                    <Content>
                        <Tabs items={items} />
                    </Content>
                </ContentWrapper>
            </Container>
        </>
    )
}
export default Admin