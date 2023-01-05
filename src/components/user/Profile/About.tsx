import Markdown from 'common/Markdown'
import { ProfileDesc } from 'styled/profile'
import { ProfileCampaignDataType } from 'utils/interface'

interface PropsType {
	data: ProfileCampaignDataType
}

const ProfileAbout = ({ data }: PropsType) => {
	return (
		<>
			<h2>About</h2>
			<ProfileDesc>
				<Markdown text={data?.description || ''} />
			</ProfileDesc>
		</>
	)
}

export default ProfileAbout
