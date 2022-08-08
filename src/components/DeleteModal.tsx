import styled from "styled-components"
import ModalComponent from "../common/Modal"
import { DangerButton, ModalTitle } from "../styled/common"
import confirmIcon from '../images/exclamation_icon.svg'

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: any
}

const DeleteButton = styled(DangerButton)`
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    margin-top: 30px;
`

const DeleteModal = ({ isVisible, toggleModal, onClick }: Props) => {
    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal}>
            <div>
                <ModalTitle>
                    <img src={confirmIcon} alt="confirm Icon" width={30} />
                    <p>Are you sure to delete this campaign?</p>
                </ModalTitle>
                <DeleteButton onClick={onClick}>Delete</DeleteButton>
            </div>
        </ModalComponent>
    )
}

export default DeleteModal