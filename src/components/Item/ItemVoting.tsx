import { useNavigate } from "react-router-dom";
import { BoxContent } from "../../styled/common"
import { Avatar, AvatarText, ItemIcon, VotingName, Wrapper } from "../../styled/list"
import { getAvatar } from "../../utils/common"
import DescriptionIcon from '../../images/desc-icon.svg'
import { ROUTER_PATH } from "../../routes/contants";
import styled from "styled-components";
import { FlexLayout } from "../../styled/main";

interface PropsType {
    data: {
        id: number
        name: string
        campaign_id: number
        avatar: string
    },
    handleClick: Function,
    active: number
}

const FlexLayoutBetween = styled(FlexLayout)`
    justify-content: space-between;
`

const ItemVoting = ({ data, handleClick, active }: PropsType) => {
    const navigate = useNavigate();
    const { id, name, campaign_id, avatar } = data

    const onClick = () => {
        handleClick(id)
    }

    return (
        <Wrapper key={id}>
            <BoxContent onClick={onClick} active={active === id}>
                <FlexLayoutBetween>
                    <VotingName>
                        <Avatar bgColor={avatar}>
                            <AvatarText>{getAvatar(name)}</AvatarText>
                        </Avatar>
                        {name}
                    </VotingName>
                    <ItemIcon>
                        <img src={DescriptionIcon} alt="description icon" width={20} onClick={() => navigate(`${ROUTER_PATH.DESCRIPTION}/${campaign_id}/${id}`)} />
                    </ItemIcon>
                </FlexLayoutBetween>
            </BoxContent>
        </Wrapper>
    )
}

export default ItemVoting