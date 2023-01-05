import ModalComponent from 'common/Modal'
import confirmIcon from 'images/exclamation_icon.svg'
import { ButtonModal, ModalTitle } from 'styled/common'
import { WaitingMessage } from 'styled/form'
import { Loader } from 'styled/loading'

type Props = {
	isVisible: boolean
	title: string
	buttonText: string
	toggleModal: any
	onClick: () => void
	callMessage?: string
	isLoading?: boolean
}

const ConfimModal = ({
	isVisible,
	toggleModal,
	onClick,
	isLoading,
	callMessage,
	buttonText,
	title,
}: Props) => {
	return (
		<ModalComponent isVisible={isVisible} toggleModal={toggleModal} isLoading={isLoading}>
			<div>
				<ModalTitle>
					<img src={confirmIcon} className='title-icon' alt='confirm Icon' width={30} />
					<p>{title}</p>
				</ModalTitle>
				<WaitingMessage>{callMessage}</WaitingMessage>
				<ButtonModal onClick={onClick} disabled={isLoading} danger>
					{isLoading && <Loader />}
					{buttonText}
				</ButtonModal>
			</div>
		</ModalComponent>
	)
}

export default ConfimModal
