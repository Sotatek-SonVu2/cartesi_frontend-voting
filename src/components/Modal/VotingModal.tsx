import styled from "styled-components"
import ModalComponent from "../../common/Modal"
import { ModalContent, ModalTitle, SuccessButton } from "../../styled/common"
import confirmIcon from '../../images/exclamation_icon.svg'

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: any
}

const VotingButton = styled(SuccessButton)`
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    margin-top: 30px;
`

const VotingModal = ({ isVisible, toggleModal, onClick }: Props) => {
    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal}>
            <div>
                <ModalTitle>
                    <img src={confirmIcon} alt="confirm Icon" width={30} />
                    <p>Are you sure to choose this candidate?</p>
                </ModalTitle>
                <ModalContent>
                    <span>Remember, you are only vote for one candidate!</span>
                </ModalContent>
                <VotingButton onClick={onClick}>Vote</VotingButton>
            </div>
        </ModalComponent>
    )
}

export default VotingModal