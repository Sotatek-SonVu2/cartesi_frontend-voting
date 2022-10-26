import { useState } from "react"
import styled from "styled-components"
import CoinsList from "../../common/CoinsList"
import ModalComponent from "../../common/Modal"
import confirmIcon from '../../images/exclamation_icon.svg'
import { colorTheme, ModalContent, ModalTitle, SuccessButton } from "../../styled/common"
import { CARTESI_TOKEN } from "../../utils/contants"

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: (tokenType: string) => void
}

const VotingButton = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
`

const VotingModal = ({ isVisible, toggleModal, onClick }: Props) => {
    const [tokenType, setTokenType] = useState<string>(CARTESI_TOKEN)

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal}>
            <div>
                <ModalTitle>
                    <img src={confirmIcon} className="title-icon" alt="confirm-Icon" width={30} />
                    <p>Are you sure to choose this candidate?</p>
                </ModalTitle>
                <ModalContent>
                    <p className="modal-text-sm">The system will take 10 tokens from your wallet to perform this operation!</p>
                    <CoinsList onChooseCoin={(token: string) => setTokenType(token)} tokenType={tokenType} />
                </ModalContent>
                <VotingButton onClick={() => onClick(tokenType)}>Vote</VotingButton>
            </div>
        </ModalComponent>
    )
}

export default VotingModal