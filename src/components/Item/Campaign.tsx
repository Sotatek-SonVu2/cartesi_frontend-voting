import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DescriptionIcon from '../../images/desc-icon.svg'
import StarIcon from '../../images/star.svg'
import { ROUTER_PATH } from "../../routes/contants"
import { BoxContent } from "../../styled/common"
import { ActionItem, ActionList, CampaignName, WinnerCandidate, WinnerName, Wrapper } from "../../styled/list"
import DescriptionModal from "../Modal/DescriptionModal"

interface PropsType {
    data: {
        name: string
        id: number
        total_vote: number
        winning_candidate_name: string | null
    },
}

const CampaignItem = ({ data }: PropsType) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const { id, name, total_vote, winning_candidate_name } = data

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    return (
        <Wrapper key={id}>
            <BoxContent>
                <CampaignName onClick={() => navigate(`${ROUTER_PATH.VOTING}/${id}`)}>
                    {name}
                </CampaignName>
                <ActionList>
                    <ActionItem>
                        <WinnerCandidate>
                            <img src={StarIcon} alt="star icon" width={17} />
                            <WinnerName>{winning_candidate_name || '(No data)'}</WinnerName>
                        </WinnerCandidate>
                    </ActionItem>
                    <ActionItem>
                        {total_vote || 0} vote
                    </ActionItem>
                    <ActionItem onClick={toggleModal}>
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