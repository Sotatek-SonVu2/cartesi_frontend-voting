import moment from "moment"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DescriptionIcon from '../../images/script.png'
import StarIcon from '../../images/favourites.png'
import BadgeIcon from '../../images/badge.png'
import { ROUTER_PATH } from "../../routes/contants"
import { BoxContent, DateTimeBox } from "../../styled/common"
import { Wrapper } from "../../styled/form"
import { ActionItem, ActionList, CampaignName, WinnerCandidate, WinnerName } from "../../styled/list"
import { convertUtcToLocal } from "../../utils/common"
import { FORMAT_DATETIME } from "../../utils/contants"
import DescriptionModal from "../Modal/DescriptionModal"

interface PropsType {
    data: {
        name: string
        id: number
        total_vote: number
        winning_candidate_name: string | null
        start_time: string
        end_time: string
    },
}

const CampaignItem = ({ data }: PropsType) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const { id, name, total_vote, winning_candidate_name, end_time, start_time } = data

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    const localStartTime = moment(convertUtcToLocal(new Date(start_time))).format(FORMAT_DATETIME)
    const localEndTime = moment(convertUtcToLocal(new Date(end_time))).format(FORMAT_DATETIME)
    const now = moment(new Date()).format(FORMAT_DATETIME)
    const isStartTime = moment(localStartTime).isBefore(now) // Compare start time with current datetime
    const isEndTime = moment(localEndTime).isBefore(now) // Compare end time with current datetime

    return (
        <Wrapper key={id} className="campaign-item-step">
            <DateTimeBox isStartTime={isStartTime} isEndTime={isEndTime} className="datetime-step">
                {isStartTime && !isEndTime ? 'Starting ' : isEndTime ? 'Finished ' : 'Not start yet '}
                ({localStartTime} - {localEndTime})
            </DateTimeBox>
            <BoxContent>
                <CampaignName onClick={() => navigate(`${ROUTER_PATH.VOTING}/${id}`)}>
                    {name}
                </CampaignName>
                <ActionList>
                    <ActionItem className="highest-vote-step">
                        <WinnerCandidate>
                            <img src={StarIcon} alt="star icon" width={17} />
                            <WinnerName>{winning_candidate_name || '(No data)'}</WinnerName>
                        </WinnerCandidate>
                    </ActionItem>
                    <ActionItem className="vote-number-step">
                        <img src={BadgeIcon} alt="badge icon" width={17} />
                        {total_vote || 0} vote
                    </ActionItem>
                    <ActionItem onClick={toggleModal} className="description-step">
                        <img src={DescriptionIcon} alt="description icon" width={17} />
                        <span>Description</span>
                    </ActionItem>
                </ActionList>
            </BoxContent>
            {isVisible && (
                <DescriptionModal
                    isVisible={isVisible}
                    toggleModal={toggleModal}
                    data={data}
                />
            )}

        </Wrapper>
    )
}

export default CampaignItem