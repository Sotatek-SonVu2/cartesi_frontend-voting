import ConfimModal from 'common/ConfimModal'
import Loading from 'common/Loading'
import Markdown from 'common/Markdown'
import NoData from 'common/NoData'
import Pagination from 'common/Pagination'
import ProfileHandle from 'handles/profile.handle'
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
	LeaveButton,
	ProfileDesc,
	ProfileInfo,
	ProfileName,
} from 'styled/profile'
import { formatAddress } from 'utils/common'
import { ProfileCampaignDataType, ProfileHandleRes } from 'utils/interface'
import CampaignItem from './Item/Campaign'

const ProfileDetail = () => {
	const navigate = useNavigate()
	const { profileId } = useParams()
	const addressWallet = useSelector((state: RootState) => state.auth.address).toLowerCase()
	const {
		data,
		campaigns,
		isLoading,
		isRequestLoading,
		getProfileDetail,
		callMessage,
		onDeleteProfile,
		isOpen,
		toggleModal,
		getCampaignByProfileId,
		handleJoinProfile,
		handleLeaveProfile,
		paging,
		setPaging,
	}: ProfileHandleRes = ProfileHandle()

	const handleDelete = () => {
		onDeleteProfile()
		toggleModal()
	}

	const ButtonAction = () => {
		if (data.managers?.indexOf(addressWallet) !== -1) {
			return (
				<div>
					<EditButton onClick={() => navigate(`${ROUTER_PATH.EDIT_PROFILE}/${profileId}`)}>
						Edit
					</EditButton>
					<DeleteButton onClick={toggleModal}>Delete</DeleteButton>
				</div>
			)
		} else if (data?.has_joined) {
			return <LeaveButton onClick={() => handleLeaveProfile(data?.id)}>Leave</LeaveButton>
		} else {
			return <JoinButton onClick={() => handleJoinProfile(data?.id)}>Join</JoinButton>
		}
	}

	useEffect(() => {
		getProfileDetail()
		getCampaignByProfileId()
	}, [paging.currentPage])

	return (
		<ContentWrapper>
			{isLoading ? (
				<Loading />
			) : (
				<Content>
					{isRequestLoading && (
						<Loading isScreenLoading={isRequestLoading} messages={callMessage} />
					)}
					<HeaderList>
						<ProfileInfo>
							<img src={data?.thumbnail} alt='thumbnail' width={75} height={75} />
							<div>
								<ProfileName>{data?.name}</ProfileName>
								<p>Creator: {data?.creator && formatAddress(data?.creator)}</p>
							</div>
						</ProfileInfo>
						{ButtonAction()}
					</HeaderList>
					<ProfileDesc>
						<Markdown text={data?.description || ''} />
					</ProfileDesc>
					{campaigns?.length > 0 ? (
						campaigns.map((item: ProfileCampaignDataType) => (
							<div key={item.id}>
								<CampaignItem data={item} />
							</div>
						))
					) : (
						<NoData />
					)}
					<Pagination
						currentPage={paging.currentPage}
						totalCount={paging.totalPage}
						pageSize={paging.pageSize}
						onPageChange={(page: number) => {
							setPaging({ ...paging, currentPage: page })
						}}
					/>
				</Content>
			)}
			{isOpen && (
				<ConfimModal
					isVisible={isOpen}
					toggleModal={toggleModal}
					onClick={handleDelete}
					isLoading={isRequestLoading}
					callMessage={callMessage}
					buttonText='Delete'
					title='Are you sure to delete this profile?'
				/>
			)}
		</ContentWrapper>
	)
}

export default ProfileDetail
