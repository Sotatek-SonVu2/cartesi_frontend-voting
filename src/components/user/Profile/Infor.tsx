import Loading from 'common/Loading'
import FacebookIcon from 'images/facebook.png'
import TwitterIcon from 'images/twitter.png'
import WorldwideIcon from 'images/worldwide.png'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTER_PATH } from 'routes/contants'
import { RootState } from 'store'
import { Line } from 'styled/common'
import {
	CreateButton,
	DeleteButton,
	EditButton,
	JoinButton,
	LeaveButton,
	Links,
	ProfileInforBottom,
	ProfileInforContent,
	ProfileInforWrapper,
	ProfileName,
	Tabs,
} from 'styled/profile'
import { formatAddress } from 'utils/common'
import { ProfileType } from 'utils/interface'

interface PropsType {
	data: ProfileType
	isLoading?: boolean
	pathname?: string
	toggleModal?: () => void
	handleJoinProfile?: (profile_id: number) => void
	handleLeaveProfile?: (profile_id: number) => void
}

const ProfileInfor = ({
	data,
	isLoading,
	pathname,
	toggleModal,
	handleJoinProfile,
	handleLeaveProfile,
}: PropsType) => {
	const navigate = useNavigate()
	const { profileId } = useParams()
	const addressWallet = useSelector((state: RootState) => state.auth.address).toLowerCase()
	const { id, has_joined, thumbnail, name, creator, members, website, social_media } = data

	const ButtonAction = () => {
		if (data.managers?.indexOf(addressWallet) !== -1) {
			return (
				<div>
					<Line />
					<CreateButton onClick={() => navigate(`${ROUTER_PATH.CREATE_CAMPAIGN}/${profileId}`)}>
						Create
					</CreateButton>
					<EditButton onClick={() => navigate(`${ROUTER_PATH.EDIT_PROFILE}/${profileId}`)}>
						Edit
					</EditButton>
					<DeleteButton onClick={toggleModal}>Delete</DeleteButton>
				</div>
			)
		} else if (has_joined && id && typeof handleLeaveProfile === 'function') {
			return (
				<div>
					<Line />
					<CreateButton onClick={() => navigate(`${ROUTER_PATH.CREATE_CAMPAIGN}/${profileId}`)}>
						Create
					</CreateButton>
					<LeaveButton onClick={() => handleLeaveProfile(id)}>Leave</LeaveButton>
				</div>
			)
		} else if (id && typeof handleJoinProfile === 'function') {
			return (
				<div>
					<Line />
					<JoinButton onClick={() => handleJoinProfile(id)}>Join</JoinButton>
				</div>
			)
		}
	}

	return (
		<ProfileInforWrapper>
			<ProfileInforContent>
				{isLoading ? (
					<Loading />
				) : (
					<>
						<img
							src={thumbnail || ''}
							alt='thumbnail'
							className='thumbnail'
							width={75}
							height={75}
						/>
						<ProfileName>{name}</ProfileName>
						<p>Creator: {creator && formatAddress(creator)}</p>
						<p>{members} member(s)</p>
						<Line />
						<Tabs
							isActive={pathname === 'prososal'}
							onClick={() => navigate(`${ROUTER_PATH.PROFILE}/${profileId}/prososal`)}>
							Prososal
						</Tabs>
						<Tabs
							isActive={pathname === 'about'}
							onClick={() => navigate(`${ROUTER_PATH.PROFILE}/${profileId}/about`)}>
							About
						</Tabs>
						{ButtonAction()}
						<ProfileInforBottom>
							<Line />
							<Links>
								<a href={website || ''} target='_blank'>
									<img src={WorldwideIcon} alt='' width={25} height={25} />
								</a>
								{social_media?.facebook && (
									<a href={social_media.facebook} target='_blank'>
										{' '}
										<img src={FacebookIcon} alt='' width={25} height={25} />
									</a>
								)}
								{social_media?.twitter && (
									<a href={social_media.twitter} target='_blank'>
										{' '}
										<img src={TwitterIcon} alt='' width={25} height={25} />
									</a>
								)}
							</Links>
						</ProfileInforBottom>
					</>
				)}
			</ProfileInforContent>
		</ProfileInforWrapper>
	)
}

export default ProfileInfor
