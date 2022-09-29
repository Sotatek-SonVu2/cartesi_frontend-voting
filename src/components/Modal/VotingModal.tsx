import styled from "styled-components"
import ModalComponent from "../../common/Modal"
import { colorTheme, ModalContent, ModalTitle, SuccessButton } from "../../styled/common"
import confirmIcon from '../../images/exclamation_icon.svg'

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: () => {}
}

const VotingButton = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
`

const VotingModal = ({ isVisible, toggleModal, onClick }: Props) => {
    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal}>
            <div>
                <ModalTitle>
                    <img src={confirmIcon} className="title-icon" alt="confirm-Icon" width={30} />
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