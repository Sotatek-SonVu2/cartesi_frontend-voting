import Markdown from 'common/Markdown'
import Tooltip from 'common/Tooltip'
import { useNavigate } from 'react-router-dom'
import { ROUTER_PATH } from 'routes/contants'
import {
	UserInfo,
	DateTime,
	Wrapper,
	Header,
	Status,
	ActionItem,
	ActionList,
	WinnerCandidate,
	WinnerName,
	Content,
} from 'styled/campaigns'
import { formatAddress, onConvertDatetime } from 'utils/common'
import { ProfileCampaignDataType } from 'utils/interface'
import BadgeIcon from 'images/badge.png'
import StarIcon from 'images/favourites.png'

interface PropsType {
	data: ProfileCampaignDataType
}

const CampaignItem = ({ data }: PropsType) => {
	const navigate = useNavigate()
	const {
		start_time,
		end_time,
		id,
		creator,
		description,
		name,
		winning_candidate_name,
		total_vote,
		profile_id,
		profile_type,
	} = data
	const { isStartTime, isEndTime } = onConvertDatetime(start_time, end_time)

	const onRedirect = () => {
		navigate(`${ROUTER_PATH.VOTING}/${id}/profile/${profile_id}/${profile_type}`)
	}

	return (
		<Wrapper key={id} onClick={onRedirect}>
			<Content>
				<Header>
					<UserInfo>
						<img
							src='https://cdn.stamp.fyi/avatar/eth:0xBB7B59Afa3A0E5Be143b8fE9C641F00c1ecB9d69?s=36'
							alt=''
						/>
						<span>{formatAddress(creator)}</span>
					</UserInfo>
					<Status isStartTime={isStartTime} isEndTime={isEndTime}>
						{isStartTime && !isEndTime ? 'Starting ' : isEndTime ? 'Finished ' : 'Not start yet '}
					</Status>
				</Header>
				<h3>{name}</h3>
				<Markdown text={description || ''} isBreakWords={true} />
				<DateTime>
					{start_time} - {end_time}
				</DateTime>
			</Content>

			<ActionList>
				<ActionItem className='highest-vote-step'>
					<Tooltip
						text='The candidate with the highest number of votes.'
						id='highest-vote'
						className='tooltip-sz-sm'>
						<WinnerCandidate>
							<img src={StarIcon} alt='star icon' width={17} />
							<WinnerName>{winning_candidate_name || '(No data)'}</WinnerName>
						</WinnerCandidate>
					</Tooltip>
				</ActionItem>

				<ActionItem className='vote-number-step'>
					<Tooltip text='Total votes of the campaign.' id='vote-number' className='tooltip-sz-sm'>
						<>
							<img src={BadgeIcon} alt='badge icon' width={17} />
							{total_vote || 0} vote
						</>
					</Tooltip>
				</ActionItem>
			</ActionList>
		</Wrapper>
	)
}

export default CampaignItem
