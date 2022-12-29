import Tooltip from 'common/Tooltip'
import BadgeIcon from 'images/badge.png'
import StarIcon from 'images/favourites.png'
import DescriptionIcon from 'images/script.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTER_PATH } from 'routes/contants'
import { BoxContent, DateTimeBox } from 'styled/common'
import { Wrapper } from 'styled/form'
import { ActionItem, ActionList, CampaignName, WinnerCandidate, WinnerName } from 'styled/list'
import { onConvertDatetime } from 'utils/common'
import DescriptionModal from '../Modal/DescriptionModal'

interface PropsType {
	data: {
		name: string
		id: number
		total_vote: number
		winning_candidate_name: string | null
		start_time: string
		end_time: string
	}
}

const CampaignItem = ({ data }: PropsType) => {
	const navigate = useNavigate()
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const { id, name, total_vote, winning_candidate_name, end_time, start_time } = data
	const { localStartTime, localEndTime, isStartTime, isEndTime } = onConvertDatetime(
		start_time,
		end_time
	)

	const toggleModal = () => {
		setIsVisible(!isVisible)
	}

	return (
		<Wrapper key={id} className='campaign-item-step'>
			<DateTimeBox isStartTime={isStartTime} isEndTime={isEndTime} className='datetime-step'>
				{isStartTime && !isEndTime ? 'Starting ' : isEndTime ? 'Finished ' : 'Not start yet '}(
				{localStartTime} - {localEndTime})
			</DateTimeBox>
			<BoxContent>
				<CampaignName onClick={() => navigate(`${ROUTER_PATH.VOTING}/${id}`)}>{name}</CampaignName>
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
					<ActionItem onClick={toggleModal} className='description-step'>
						<Tooltip text='Description of the campaign.' id='description' className='tooltip-sz-sm'>
							<>
								<img src={DescriptionIcon} alt='description icon' width={17} />
								<span>Description</span>
							</>
						</Tooltip>
					</ActionItem>
				</ActionList>
			</BoxContent>
			{isVisible && (
				<DescriptionModal isVisible={isVisible} toggleModal={toggleModal} data={data} />
			)}
		</Wrapper>
	)
}

export default CampaignItem
