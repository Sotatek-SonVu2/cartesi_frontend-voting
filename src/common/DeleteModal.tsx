import ModalComponent from "common/Modal"
import confirmIcon from 'images/exclamation_icon.svg'
import { ButtonModal, ModalTitle } from "styled/common"
import { WaitingMessage } from "styled/form"
import { Loader } from "styled/loading"

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: () => void
    callMessage?: string
    isLoading: boolean
}

const DeleteModal = ({ isVisible, toggleModal, onClick, isLoading, callMessage }: Props) => {
    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} isLoading={isLoading}>
            <div>
                <ModalTitle>
                    <img src={confirmIcon} className="title-icon" alt="confirm Icon" width={30} />
                    <p>Are you sure to delete?</p>
                </ModalTitle>
                <WaitingMessage>{callMessage}</WaitingMessage>
                <ButtonModal onClick={onClick} disabled={isLoading} danger>
                    {isLoading && (<Loader />)}
                    Delete
                </ButtonModal>
            </div>
        </ModalComponent>
    )
}

export default DeleteModal