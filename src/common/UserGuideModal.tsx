import { useTour } from "@reactour/tour"
import styled from "styled-components"
import { colorTheme, ModalTitle, SuccessButton } from "../styled/common"
import { FormItem } from "../styled/form"
import { USER_GUIDE } from "../utils/contants"
import ModalComponent from "./Modal"

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
}

const UserGuideModal = ({ isVisible, toggleModal }: Props) => {
    const { setIsOpen } = useTour()

    const startTour = () => {
        setIsOpen(true)
        toggleModal()
        localStorage.setItem(USER_GUIDE, 'false')
    }

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title='User guide'>
            <>
                <ModalTitle>
                    <FormItem>
                        Welcome! Are you beginer? Take a walk around the system to better understand it before using it!
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