import { BoxContent } from "styled/common"
import { Avatar, AvatarText, ItemIcon, VotingName, Wrapper } from "styled/list"
import { getAvatar } from "utils/common"
import DescriptionIcon from 'images/script.png'
import styled from "styled-components";
import { FlexLayout } from "styled/main";
import DescriptionModal from "../Modal/DescriptionModal";
import { useState } from "react";
import { CandidatesVotingType } from "utils/interface";

interface PropsType {
    data: CandidatesVotingType,
    handleClick: Function,
    active: number
}

const FlexLayoutBetween = styled(FlexLayout)`
    justify-content: space-between;
`

const VotingItem = ({ data, handleClick, active }: PropsType) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const { id, name, avatar } = data

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
                    data={data}
                />
            )}
        </Wrapper>
    )
}

export default VotingItem