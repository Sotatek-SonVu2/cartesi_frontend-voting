import { useState } from "react"
import ModalComponent from "common/Modal"
import { CARTESI_TOKEN } from "utils/contants"
import confirmIcon from 'images/exclamation_icon.svg'
import TokensList from "common/TokensList"
import { colorTheme, ModalContent, ModalTitle, SuccessButton } from "styled/common"
import styled from "styled-components"

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: (tokenType: string) => void
}

const SubmitButton = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
`

const AddCampaignModal = ({ isVisible, toggleModal, onClick }: Props) => {
    const [tokenType, setTokenType] = useState<string>(CARTESI_TOKEN)

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal}>
            <div>
                <ModalTitle>
                    <img src={confirmIcon} className="title-icon" alt="confirm-Icon" width={30} />
                    <p>Are you sure to create this candidate?</p>
                </ModalTitle>
                <ModalContent>
                    <p className="modal-text-sm">The DApp will take 10 tokens from your wallet to perform this operation!</p>
                    <TokensList onChooseCoin={(token: string) => setTokenType(token)} tokenType={tokenType} />
                </ModalContent>
                <SubmitButton onClick={() => onClick(tokenType)}>Create</SubmitButton>
            </div>
        </ModalComponent>
    )
}

export default AddCampaignModal