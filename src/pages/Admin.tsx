import Header from 'common/Header'
import Loading from 'common/Loading'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import styled from 'styled-components'
import { tabItemType } from 'utils/interface'
import Tabs from '../common/Tabs'
import System from '../components/admin/System'
import Tokens from '../components/admin/Tokens'
import Users from '../components/admin/Users'
import { Content } from '../styled/common'
import { Container, ContentWrapper, SubTitle, Title } from '../styled/main'

const AdminContent = styled(Content)`
	padding: 1.5rem 1rem;
`

const items: tabItemType[] = [
	{
		key: 1,
		label: 'Users',
		content: <Users />,
	},
	{
		key: 2,
		label: 'Tokens',
		content: <Tokens />,
	},
	// {
	//     key: 3,
	//     label: 'System',
	//     content: <System />
	// },
]

const Admin = () => {
	const { isLoading, callMessage } = useSelector((state: RootState) => state.loading)
	return (
		<>
			{isLoading && <Loading isScreenLoading={isLoading} messages={callMessage} />}
			<Header />
			<Container>
				<Title>Welcome to Admin page!</Title>
				<SubTitle>Where your opinion matters!</SubTitle>
				<ContentWrapper>
					<AdminContent>
						<Tabs items={items} />
					</AdminContent>
				</ContentWrapper>
			</Container>
		</>
	)
}
export default Admin
