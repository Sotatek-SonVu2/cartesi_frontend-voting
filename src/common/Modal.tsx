import Modal from "react-modal"
import CloseIcon from '../images/close-icon.svg'
import { ModalBody, ModalContainer, ModalHeader } from "../styled/common"

Modal.setAppElement("#root");

type Props = {
    isVisible: boolean
    toggleModal: () => {}
    title?: string
    children: JSX.Element
}

const ModalComponent = ({ isVisible, toggleModal, children, title }: Props) => {
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
            <ModalContainer>
                {title ? (
                    <ModalHeader>
                        <span>{title}</span>
                        <img src={CloseIcon} alt="close icon" width={15} onClick={toggleModal} />
                    </ModalHeader>
                ) : (
                    <img className="closeIcon" src={CloseIcon} alt="close icon" width={15} onClick={toggleModal} />
                )}
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContainer>

        </Modal>
    )
}

export default ModalComponent