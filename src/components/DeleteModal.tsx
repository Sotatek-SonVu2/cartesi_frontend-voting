import styled from "styled-components"
import ModalComponent from "../common/Modal"
import { DangerButton, ModalTitle } from "../styled/common"
import confirmIcon from '../images/exclamation_icon.svg'
import { Loader } from "../styled/loading"

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: any
    isLoading: boolean
}

const DeleteButton = styled(DangerButton)`
    display: flex;
    margin: 0 auto;
    padding: 10px 20px;
    margin-top: 30px;
`

const DeleteModal = ({ isVisible, toggleModal, onClick, isLoading }: Props) => {
    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal}>
            <div>
                <ModalTitle>
                    <img src={confirmIcon} alt="confirm Icon" width={30} />
                    <p>Are you sure to delete this campaign?</p>
                </ModalTitle>
                <DeleteButton onClick={onClick} disabled={isLoading}>
                    {isLoading && (<Loader />)}
                    Delete
                </DeleteButton>
            </div>
        </ModalComponent>
    )
}

export default DeleteModal