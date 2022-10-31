import ModalComponent from "common/Modal"
import { ButtonModal, ModalTitle } from "styled/common"
import { FormItem } from "styled/form"

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
                <ButtonModal onClick={startTour} success>
                    Start tour
                </ButtonModal>
            </>
        </ModalComponent>
    )
}

export default UserGuideModal