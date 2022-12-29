import ConfimModal from 'common/ConfimModal'
import Loading from 'common/Loading'
import Markdown from 'common/Markdown'
import ProfileHandle from 'handles/profile.handle'
import { disconnect } from 'process'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTER_PATH } from 'routes/contants'
import { RootState } from 'store'
import { Content } from 'styled/common'
import { HeaderList } from 'styled/list'
import { ContentWrapper } from 'styled/main'
import {
	DeleteButton,
	EditButton,
	JoinButton,
	ProfileDesc,
	ProfileInfo,
	ProfileName,
} from 'styled/profile'
import { formatAddress } from 'utils/common'
import { ProfileCampaignDataType, ProfileHandleRes } from 'utils/interface'
import ProfileDetailItem from './Item/ProfileDetail'

const ProfileDetail = () => {
	const navigate = useNavigate()
	const { profileId } = useParams()
	const addressWallet = useSelector((state: RootState) => state.auth.address).toLowerCase()
	const {
		data,
		campaigns,
		isLoading,
		getProfileDetail,
		callMessage,
		onDeleteProfile,
		isOpen,
		toggleModal,
		getCampaignByProfileId,
	}: ProfileHandleRes = ProfileHandle()

	useEffect(() => {
		getProfileDetail()
		getCampaignByProfileId()
	}, [])

	return (
		<ContentWrapper>
			{isLoading ? (
				<Loading />
			) : (
				<Content>
					<HeaderList>
						<ProfileInfo>
							<img src={data?.thumbnail} alt='thumbnail' width={75} height={75} />
							<div>
								<ProfileName>{data?.name}</ProfileName>
								<p>Creator: {data?.creator && formatAddress(data?.creator)}</p>
							</div>
						</ProfileInfo>
						{data.managers?.indexOf(addressWallet) !== -1 ? (
							<div>
								<EditButton onClick={() => navigate(`${ROUTER_PATH.EDIT_PROFILE}/${profileId}`)}>
									Edit
								</EditButton>
								<DeleteButton onClick={toggleModal}>Delete</DeleteButton>
							</div>
						) : (
							<JoinButton>Join</JoinButton>
						)}
					</HeaderList>
					<ProfileDesc>
						<Markdown text={data?.description || ''} />
					</ProfileDesc>
					{campaigns?.length > 0 &&
						campaigns.map((item: ProfileCampaignDataType) => (
							<div key={item.id}>
								<ProfileDetailItem data={item} />
							</div>
						))}
				</Content>
			)}
			{isOpen && (
				<ConfimModal
					isVisible={isOpen}
					toggleModal={toggleModal}
					onClick={onDeleteProfile}
					isLoading={isLoading}
					callMessage={callMessage}
					buttonText='Delete'
					title='Are you sure to delete this profile?'
				/>
			)}
		</ContentWrapper>
	)
}

export default ProfileDetail
