import { ModalTitle } from "styled/common"
import confirmIcon from 'images/exclamation_icon.svg'
import { NO_TOKEN, NO_SUPPORT_YET } from "utils/contants"

interface PropsType {
    type: 'NO_TOKEN' | 'NO_SUPPORT_YET'
}

const NoToken = ({ type }: PropsType) => {

    const content = () => {
        switch (type) {
            case NO_TOKEN:
                return <p>Please deposit tokens into the DApp to perform this operation!</p>
            case NO_SUPPORT_YET:
                return <p>The DApp does not support any tokens yet!</p>
        }
    }

    return (
        <ModalTitle>
            <img src={confirmIcon} className="title-icon" alt="confirm-Icon" width={30} />
            {content()}
        </ModalTitle>
    )
}

export default NoToken