import { Navigate, Route, Routes } from 'react-router-dom'
import Background from './common/Background'
import CampaignsList from './components/user/CampaignsList'
import History from './components//user/History'
import Result from './components//user/Result'
import Voting from './components/user/Voting'
import Withdraw from './components/user/Withdraw'
import useAuth from './hook/useAuth'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Main from './pages/Main'
import { ABOUT, PROSOSAL, ROUTER_PATH } from './routes/contants'
import { MainWrapper } from './styled/main'
import Tokens from 'components/user/Tokens'
import CampaignForm from 'components/user/Form/CampaignForm'
import ProfileForm from 'components/user/Form/ProfileForm'
import Profile from 'components/user/Profile'
import ProfileDetail from 'components/user/Profile/Detail'
import Homepage from 'components/user/Homepage'

function App() {
	useAuth() //check connected with metamask
	return (
		<MainWrapper>
			<Background>
				<Routes>
					<Route element={<Login />} path={ROUTER_PATH.LOGIN} />
					<Route element={<Admin />} path={ROUTER_PATH.ADMIN} />
					<Route element={<Main />} path={ROUTER_PATH.HOMEPAGE}>
						<Route element={<Homepage />} index={true} />
						<Route element={<Homepage />} path={ROUTER_PATH.LIST_CAMPAIGN} />
						<Route element={<Homepage />} path={ROUTER_PATH.PROFILE} />
						<Route element={<Homepage />} path={ROUTER_PATH.FOLLOWING} />
						<Route element={<CampaignForm />} path={ROUTER_PATH.CREATE_CAMPAIGN} />
						<Route element={<CampaignForm />} path={ROUTER_PATH.EDIT_CAMPAIGN + '/:campaignId'} />
						<Route element={<CampaignForm />} path={ROUTER_PATH.CREATE_CAMPAIGN + '/:profileId'} />
						<Route
							element={<CampaignForm />}
							path={ROUTER_PATH.EDIT_CAMPAIGN + '/:campaignId' + '/profile' + '/:profileId'}
						/>
						<Route element={<Voting />} path={ROUTER_PATH.VOTING + '/:campaignId'} />
						<Route
							element={<Voting />}
							path={ROUTER_PATH.VOTING + '/:campaignId' + '/profile' + '/:profileId'}
						/>
						<Route element={<Result />} path={ROUTER_PATH.RESULT + '/:campaignId'} />
						<Route element={<Withdraw />} path={ROUTER_PATH.WITHDRAW} />
						<Route element={<History />} path={ROUTER_PATH.HISTORY} />
						<Route element={<Tokens />} path={ROUTER_PATH.TOKENS} />
						<Route
							element={<ProfileDetail />}
							path={ROUTER_PATH.PROFILE + '/:profileId' + PROSOSAL}
						/>
						<Route element={<ProfileDetail />} path={ROUTER_PATH.PROFILE + '/:profileId' + ABOUT} />
						<Route element={<ProfileForm />} path={ROUTER_PATH.CREATE_PROFILE} />
						<Route element={<ProfileForm />} path={ROUTER_PATH.EDIT_PROFILE + '/:profileId'} />
					</Route>
					<Route path='*' element={<Navigate to={ROUTER_PATH.HOMEPAGE} replace />} />
				</Routes>
			</Background>
		</MainWrapper>
	)
}

export default App
