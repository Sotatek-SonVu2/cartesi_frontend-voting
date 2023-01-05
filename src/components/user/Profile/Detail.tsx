import ConfimModal from 'common/ConfimModal'
import Loading from 'common/Loading'
import ProfileHandle from 'handles/profile.handle'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ProfileContainer, ProfileDetailContent, ProfileDetailWrapper } from 'styled/profile'
import { ProfileHandleRes } from 'utils/interface'
import ProfileAbout from './About'
import ProfileInfor from './Infor'
import ProfilePrososal from './Prososal'

const ProfileDetail = () => {
	const location = useLocation()
	const pathname: any = location.pathname.split('/')[3]

	const {
		data,
		campaigns,
		isLoading,
		getProfileDetail,
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

	useEffect(() => {
		getProfileDetail()
		getCampaignByProfileId()
	}, [paging.currentPage])

	const items: any = {
		prososal: {
			key: 'prososal',
			content: <ProfilePrososal campaigns={campaigns} paging={paging} setPaging={setPaging} />,
		},
		about: {
			key: 'about',
			content: <ProfileAbout data={data} />,
		},
	}

	return (
		<ProfileContainer>
			<ProfileInfor
				data={data}
				pathname={pathname}
				isLoading={isLoading}
				toggleModal={toggleModal}
				handleJoinProfile={(id: number) => handleJoinProfile(id)}
				handleLeaveProfile={(id: number) => handleLeaveProfile(id)}
			/>
			<ProfileDetailWrapper>
				{isLoading ? (
					<Loading />
				) : (
					<ProfileDetailContent>{items[pathname]?.content}</ProfileDetailContent>
				)}
				{isOpen && (
					<ConfimModal
						isVisible={isOpen}
						toggleModal={toggleModal}
						onClick={handleDelete}
						buttonText='Delete'
						title='Are you sure to delete this profile?'
					/>
				)}
			</ProfileDetailWrapper>
		</ProfileContainer>
	)
}

export default ProfileDetail
