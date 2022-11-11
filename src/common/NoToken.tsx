import { ModalTitle } from "styled/common"
import confirmIcon from 'images/exclamation_icon.svg'

const NoToken = () => {
    return (
        <ModalTitle>
            <img src={confirmIcon} className="title-icon" alt="confirm-Icon" width={30} />
            <p>The DApp does not support any tokens yet!</p>
        </ModalTitle>
    )
}

export default NoToken