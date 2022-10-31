import ModalComponent from "common/Modal"
import TokensList from "common/TokensList"
import confirmIcon from 'images/exclamation_icon.svg'
import { useState } from "react"
import { ButtonModal, ModalContent, ModalTitle } from "styled/common"
import { CARTESI_TOKEN } from "utils/contants"

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: (tokenType: string) => void
}

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
                <ButtonModal onClick={() => onClick(tokenType)} success>Create</ButtonModal>
            </div>
        </ModalComponent>
    )
}

export default AddCampaignModal