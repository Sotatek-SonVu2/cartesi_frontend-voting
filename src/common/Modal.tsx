import Modal from 'react-modal'
import CloseIcon from 'images/close-icon.svg'
import { ModalBody, ModalContainer, ModalHeader } from 'styled/common'
import Title from './Title'

Modal.setAppElement('#root')

type Props = {
	isVisible: boolean
	isLoading?: boolean
	toggleModal: () => void
	title?: string
	children: JSX.Element
	width?: string
	userGuideType?: string
}

const ModalComponent = ({
	isVisible,
	toggleModal,
	children,
	title,
	isLoading,
	width = '450px',
	userGuideType,
}: Props) => {
	const onToggleModal = () => {
		if (isLoading) return
		toggleModal()
	}

	return (
		<Modal
			isOpen={isVisible}
			onRequestClose={toggleModal}
			contentLabel='My dialog'
			className='mymodal'
			overlayClassName='myoverlay'
			closeTimeoutMS={500}
			shouldCloseOnOverlayClick={false}>
			<ModalContainer width={width}>
				{title ? (
					<ModalHeader>
						{/* title with tooltip */}
						<Title
							text={title}
							userGuideType={userGuideType}
							placement='bottom'
							type='dark'
							titleStyle={{
								color: '#000',
								fontSize: '17px',
							}}
							className='tooltip-modal'
						/>
						<img src={CloseIcon} alt='close icon' width={13} onClick={onToggleModal} />
					</ModalHeader>
				) : (
					<img
						className='closeIcon'
						src={CloseIcon}
						alt='close icon'
						width={13}
						onClick={onToggleModal}
					/>
				)}
				<ModalBody>{children}</ModalBody>
			</ModalContainer>
		</Modal>
	)
}

export default ModalComponent
