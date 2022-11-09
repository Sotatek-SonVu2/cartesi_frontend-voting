import ModalComponent from "common/Modal"
import TokensList from "common/TokensList"
import confirmIcon from 'images/exclamation_icon.svg'
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "store"
import { ButtonModal, ModalContent, ModalTitle } from "styled/common"
import { CARTESI_TOKEN } from "utils/contants"

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: (tokenType: string) => void
}

const VotingModal = ({ isVisible, toggleModal, onClick }: Props) => {
    const { tokenListing, isLoading } = useSelector((state: RootState) => state.token)
    const [token, setToken] = useState<string>(tokenListing[0]?.name)

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal}>
            <div>
                <ModalTitle>
                    <img src={confirmIcon} className="title-icon" alt="confirm-Icon" width={30} />
                    <p>Are you sure to choose this candidate?</p>
                </ModalTitle>
                <ModalContent>
                    <p className="modal-text-sm">The DApp will take 10 tokens from your wallet to perform this operation!</p>
                    <TokensList
                        tokenListing={tokenListing}
                        isLoading={isLoading}
                        onChooseCoin={(value: string) => setToken(value)}
                        tokenType={token}
                    />
                </ModalContent>
                <ButtonModal onClick={() => onClick(token)} disabled={isLoading} success>Vote</ButtonModal>
            </div>
        </ModalComponent>
    )
}

export default VotingModal