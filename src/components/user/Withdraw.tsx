import Loading from 'common/Loading'
import Title from 'common/Title'
import WithdrawHandle from 'handles/withdraw.handle'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Content } from 'styled/common'
import { BoxItem, ContentBox, HeaderList, Radio, RadioGroup } from 'styled/list'
import { Container, ContentWrapper, FlexLayoutSwap } from 'styled/main'
import { WITHDRAW_RADIO_FILTER } from 'utils/contants'
import { WithdrawHandleRes, WithDrawType } from 'utils/interface'
import WithdrawItem from './Item/Withdraw'
import WithdrawModal from './Modal/WithdrawModal'

const BoxItemCustom = styled(BoxItem)`
	position: relative;
`

const AddWithdraw = styled(ContentBox)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
`

const Withdraw = () => {
	const {
		getData,
		onAddVoucher,
		onChangeRadio,
		toggleModal,
		onWithdraw,
		vouchers,
		isLoading,
		isVisible,
		isChecked,
	}: WithdrawHandleRes = WithdrawHandle()

	useEffect(() => {
		getData()
	}, [isChecked])

	return (
		<Container>
			<ContentWrapper>
				{isLoading ? (
					<Loading />
				) : (
					<Content>
						<HeaderList>
							<Title text='Withdraw' userGuideType='withdraw' />
							<RadioGroup>
								{WITHDRAW_RADIO_FILTER.map(({ value, label }, index: number) => (
									<Radio key={index}>
										<input
											type='radio'
											id={`radio_${index}`}
											checked={isChecked === value}
											name={label}
											value={value}
											onChange={onChangeRadio}
										/>
										{label}
									</Radio>
								))}
							</RadioGroup>
						</HeaderList>

						<FlexLayoutSwap>
							<BoxItemCustom onClick={toggleModal}>
								<AddWithdraw>
									<h1 style={{ marginTop: '0px' }}>+</h1>
									<h5>Withdraw token</h5>
								</AddWithdraw>
							</BoxItemCustom>
							{vouchers.map((item: WithDrawType, index: number) => (
								<BoxItem key={index}>
									<WithdrawItem data={item} onClick={onWithdraw} />
								</BoxItem>
							))}
						</FlexLayoutSwap>
						{isVisible && (
							<WithdrawModal
								isVisible={isVisible}
								toggleModal={toggleModal}
								onAddVoucher={onAddVoucher}
							/>
						)}
					</Content>
				)}
			</ContentWrapper>
		</Container>
	)
}

export default Withdraw
