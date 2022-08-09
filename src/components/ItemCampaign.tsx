import { useNavigate } from "react-router-dom"
import DescriptionIcon from '../images/desc-icon.svg'
import StarIcon from '../images/star.svg'
import { ROUTER_PATH } from "../routes/contants"
import { BoxContent } from "../styled/common"
import { ActionItem, ActionList, FlexList, Wrapper } from "../styled/list"

interface PropsType {
    data: {
        name: string
        id: number
        total_vote: number
        winning_candidate_name: string | null
    },
}

const ItemCampaign = ({ data }: PropsType) => {
    const navigate = useNavigate();
    const { id, name, total_vote, winning_candidate_name } = data

    return (
        <Wrapper key={id}>
            <BoxContent>
                <FlexList onClick={() => navigate(`${ROUTER_PATH.VOTING}/${id}`)}>
                    {name}
                </FlexList>
                <ActionList>
                    {winning_candidate_name && (
                        <ActionItem>
                            <img src={StarIcon} alt="star icon" width={20} />
                            {winning_candidate_name}
                        </ActionItem>
                    )}
                    <ActionItem>
                        {total_vote || 0} vote
                    </ActionItem>
                    <ActionItem onClick={() => navigate(`${ROUTER_PATH.DESCRIPTION}/${id}`)}>
                        <img src={DescriptionIcon} alt="description icon" width={20} />
                        <span>Detail</span>
                    </ActionItem>
                </ActionList>

            </BoxContent>
        </Wrapper>
    )
}

export default ItemCampaign