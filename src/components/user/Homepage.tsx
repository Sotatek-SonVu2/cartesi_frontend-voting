import { Container, ContentWrapper } from 'styled/main'
import CampaignsList from './CampaignsList'
import Profile from './Profile'
import { TabContent, TabUserLabel, TabPane } from 'styled/tabs'
import { useLocation, useNavigate } from 'react-router-dom'
import YourFollowing from './YourFollowing'

const items: any = {
	explore: {
		key: 'explore',
		label: 'Explore',
		content: <CampaignsList />,
	},
	'your-following': {
		key: 'your-following',
		label: 'Follow',
		content: <YourFollowing />,
	},
	profile: {
		key: 'profile',
		label: 'Profiles',
		content: <Profile />,
	},
}

const Homepage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const pathname: any = location.pathname.split('/')[1] || 'explore'

	const getLabel = () => {
		let arr = []
		for (const property in items) {
			const label = (
				<TabUserLabel
					key={items[property].key}
					onClick={() => navigate(`/${items[property].key}`)}
					active={pathname === items[property].key}>
					{items[property].label}
				</TabUserLabel>
			)
			arr.push(label)
		}
		return arr.map((item: any) => item)
	}

	return (
		<Container>
			<ContentWrapper>
				<TabPane>{getLabel()}</TabPane>
				<TabContent>{pathname === items[pathname]?.key && items[pathname]?.content}</TabContent>
			</ContentWrapper>
		</Container>
	)
}

export default Homepage
