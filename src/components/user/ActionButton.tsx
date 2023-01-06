import ConfimModal from 'common/ConfimModal'
import ReactSelect from 'common/ReactSelect'
import ActionButtonHandle from 'handles/actionButton.handle'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTER_PATH } from 'routes/contants'
import { RootState } from 'store'
import styled from 'styled-components'
import { DangerButton, PrimaryButton, SuccessButton } from 'styled/common'
import { Container, FlexLayout } from 'styled/main'
import { cadidateOptions } from 'utils/contants'
import { ActionButtonHandleRes } from 'utils/interface'

const EditButton = styled(PrimaryButton)`
	margin-right: 10px;
`

const CreateButton = styled(SuccessButton)`
	float: right;
`

const FlexLayoutBetween = styled(FlexLayout)`
	justify-content: space-between;
	margin-bottom: 20px;
`

const FlexLayoutRight = styled(FlexLayout)`
	justify-content: right;
	margin-bottom: 20px;
`

interface PropsType {
	onChangeType: (value: string) => void
	isActionButton: {
		creator: string
		isVisible: boolean
	}
}

const ActionButton = ({ onChangeType, isActionButton }: PropsType) => {
	const { creator, isVisible } = isActionButton
	const addressWallet = useSelector((state: RootState) => state.auth.address).toLowerCase()
	const navigate = useNavigate()

	const {
		onDelete,
		toggleModal,
		onChangeSelect,
		pathname,
		campaignId,
		profileId,
		isOpen,
		type,
	}: ActionButtonHandleRes = ActionButtonHandle(onChangeType)

	const onRedirect = () => {
		navigate(`${ROUTER_PATH.EDIT_CAMPAIGN}/${campaignId}/profile/${profileId}/${type}`)
	}

	const render = () => {
		if (pathname === ROUTER_PATH.HOMEPAGE || pathname === ROUTER_PATH.LIST_CAMPAIGN) {
			return (
				<FlexLayoutBetween>
					<ReactSelect
						options={cadidateOptions}
						defaultValue={cadidateOptions[0]}
						onChange={onChangeSelect}
					/>
					<CreateButton onClick={() => navigate(ROUTER_PATH.CREATE_CAMPAIGN)}>
						Create new campaign
					</CreateButton>
				</FlexLayoutBetween>
			)
		} else if (pathname === ROUTER_PATH.VOTING && creator === addressWallet && isVisible) {
			return (
				<>
					<FlexLayoutRight>
						<EditButton onClick={onRedirect}>Edit</EditButton>
						<DangerButton onClick={toggleModal}>Delete</DangerButton>
					</FlexLayoutRight>
					{isOpen && (
						<ConfimModal
							isVisible={isOpen}
							toggleModal={toggleModal}
							onClick={onDelete}
							buttonText='Delete'
							title='Are you sure to delete this campaign?'
						/>
					)}
				</>
			)
		}
		return <></>
	}

	return <Container isFullWrapper={type === 'org'}>{render()}</Container>
}

export default ActionButton
