import styled from "styled-components"
import { colorTheme, ModalTitle, SuccessButton } from "styled/common"
import { FormItem } from "styled/form"
import ModalComponent from "common/Modal"

const Button = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    display: flex;
    margin: 0 auto;
    margin-top: 30px;
`

type Props = {
    isVisible: boolean
    toggleModal: any
    startTour: () => void
}

const UserGuideModal = ({ isVisible, toggleModal, startTour }: Props) => {
    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title='User guide'>
            <>
                <ModalTitle>
                    <FormItem>
                        Welcome! Are you beginer? Take a walk around the DApp to better understand it before using it!
                    </FormItem>
                </ModalTitle>
                <Button onClick={startTour}>
                    Start tour
                </Button>
            </>
        </ModalComponent>
    )
}

export default UserGuideModal