import styled from "styled-components"
import ModalComponent from "../../common/Modal"
import { DangerButton, ModalTitle } from "../../styled/common"
import { Loader } from "../../styled/loading"
import confirmIcon from '../../images/exclamation_icon.svg'


type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: () => {}
    isLoading: boolean
}

const DeleteButton = styled(DangerButton)`
    display: block;
    margin: 0 auto;
    margin-top: 30px;
`

const DeleteModal = ({ isVisible, toggleModal, onClick, isLoading }: Props) => {
    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} isLoading={isLoading}>
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