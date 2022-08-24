import { useNavigate } from "react-router-dom";
import { BoxContent } from "../../styled/common"
import { Avatar, AvatarText, ItemIcon, VotingName, Wrapper } from "../../styled/list"
import { getAvatar } from "../../utils/common"
import DescriptionIcon from '../../images/desc-icon.svg'
import { ROUTER_PATH } from "../../routes/contants";
import styled from "styled-components";
import { FlexLayout } from "../../styled/main";
import DescriptionModal from "../Modal/DescriptionModal";
import { useState } from "react";

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
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const { id, name, campaign_id, avatar } = data

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

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
                    <ItemIcon onClick={toggleModal}>
                        <img src={DescriptionIcon} alt="description icon" width={18} />
                    </ItemIcon>
                </FlexLayoutBetween>
            </BoxContent>
            {isVisible && (
                <DescriptionModal
                    isVisible={isVisible}
                    toggleModal={toggleModal}
                    campaignId={campaign_id}
                    candidateId={id}
                />
            )}
        </Wrapper>
    )
}

export default ItemVoting