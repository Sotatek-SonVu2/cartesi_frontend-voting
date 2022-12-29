import { ContentBox } from 'styled/list'
import { ProfileType } from 'utils/interface'
import ProfileIcon from 'images/profile.png'
import { ItemContent, ProfileButton } from 'styled/profile'

interface PropsType {
	data: ProfileType
	onClick?: any
}

const ProfileItem = ({ data, onClick }: PropsType) => {
	return (
		<ItemContent>
			<img
				src={data?.thumbnail || ProfileIcon}
				className='image'
				alt='logo'
				width={75}
				height={75}
			/>
			<div></div>
			<h5>{data?.name || '(No data)'}</h5>
			{/* <ProfileButton onClick={() => onClick()}>Join</ProfileButton> */}
		</ItemContent>
	)
}

export default ProfileItem
