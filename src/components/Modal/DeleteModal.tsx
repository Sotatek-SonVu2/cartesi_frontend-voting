import styled from "styled-components"
import ModalComponent from "../../common/Modal"
import { colorTheme, DangerButton, ModalTitle } from "../../styled/common"
import { Loader } from "../../styled/loading"
import confirmIcon from '../../images/exclamation_icon.svg'

type Props = {
    isVisible: boolean
    toggleModal: any
    onClick: () => {}
    callMessage: string
    isLoading: boolean
}

const DeleteButton = styled(DangerButton)`
    background-color: ${colorTheme.danger};
    color: #ffffff;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 30px;
`

const ErrorMessage = styled.span`
    display: block;
    text-align: center;
    font-size: 13px;
    font-style: italic;
    color: red;
`

const DeleteModal = ({ isVisible, toggleModal, onClick, isLoading, callMessage }: Props) => {
    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} isLoading={isLoading}>
            <div>
                <ModalTitle>
                    <img src={confirmIcon} className="title-icon" alt="confirm Icon" width={30} />
                    <p>Are you sure to delete this campaign?</p>
                </ModalTitle>
                <ErrorMessage>{callMessage}</ErrorMessage>
                <DeleteButton onClick={onClick} disabled={isLoading}>
                    {isLoading && (<Loader />)}
                    Delete
                </DeleteButton>
            </div>
        </ModalComponent>
    )
}

export default DeleteModal