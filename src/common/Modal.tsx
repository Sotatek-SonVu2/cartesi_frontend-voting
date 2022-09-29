import Modal from "react-modal"
import CloseIcon from '../images/close-icon.svg'
import { ModalBody, ModalContainer, ModalHeader } from "../styled/common"

Modal.setAppElement("#root");

type Props = {
    isVisible: boolean
    isLoading?: boolean
    toggleModal: () => {}
    title?: string
    children: JSX.Element
    width?: string
}

const ModalComponent = ({ isVisible, toggleModal, children, title, isLoading, width = '450px' }: Props) => {
    const onToggleModal = () => {
        if (isLoading) return
        toggleModal()
    }

    return (
        <Modal
            isOpen={isVisible}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
            shouldCloseOnOverlayClick={false}
        >
            <ModalContainer width={width}>
                {title ? (
                    <ModalHeader>
                        <span>{title}</span>
                        <img src={CloseIcon} alt="close icon" width={13} onClick={() => onToggleModal()} />
                    </ModalHeader>
                ) : (
                    <img className="closeIcon" src={CloseIcon} alt="close icon" width={13} onClick={toggleModal} />
                )}
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContainer>

        </Modal>
    )
}

export default ModalComponent