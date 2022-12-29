import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTokens } from 'reducers/tokenSlice'
import { AppDispatch, RootState } from 'store'
import styled from 'styled-components'
import { TokenItem } from 'styled/common'
import { DepositInfoBox } from 'styled/list'
import { Loader } from 'styled/loading'
import { FlexLayout } from 'styled/main'
import { TOKEN_STATUS } from 'utils/contants'
import { DepositInfoType, tokenType } from 'utils/interface'

const FlexWrapper = styled(FlexLayout)`
	flex-wrap: wrap;
	justify-content: center;
`

const DepositInfo = () => {
	const deposit_info = useSelector((state: RootState) => state.auth.deposit_info)
	const dispatch = useDispatch<AppDispatch>()
	const { tokenListing, isLoading } = useSelector((state: RootState) => state.token)

	useEffect(() => {
		dispatch(getTokens())
	}, [])

	const render = () => {
		let data: tokenType[] = []
		if (deposit_info?.length > 0) {
			tokenListing?.forEach((token: tokenType) => {
				let obj
				deposit_info.forEach((deposit: DepositInfoType) => {
					const amount = deposit.amount - deposit.used_amount - deposit.withdrawn_amount
					if (deposit.contract_address === token.address && amount > 0) {
						obj = {
							...deposit,
							...token,
						}
						data.push(obj)
					}
				})
			})
		}

		return (
			<FlexWrapper className='deposit-info-step'>
				{!isLoading ? (
					<>
						{data?.length > 0 ? (
							data.map((item: any) => (
								<DepositInfoBox
									key={item.id}
									is_disabled={item.status === TOKEN_STATUS.DISABLED}
									is_locked={item.status === TOKEN_STATUS.LOCKED}>
									<TokenItem>
										<img src={item.icon} alt='token_icon' width={20} />
										<span>
											{item.name}: {item.amount - item.used_amount - item.withdrawn_amount || 0}
										</span>
									</TokenItem>
									<div className='tooltip-box'>
										<p>
											Deposits: {item.amount || 0} {item.name}
										</p>
										<p>
											Used: {item.used_amount || 0} {item.name}
										</p>
										<p>
											Withdraw: {item.withdrawn_amount || 0} {item.name}
										</p>
										<p>
											Fee: {item.fee || 0} {item.name}
										</p>
										<small>
											{item.status === TOKEN_STATUS.DISABLED
												? '(Inactive Token)'
												: item.status === TOKEN_STATUS.LOCKED
												? '(Locked Token)'
												: '(Active Token)'}
										</small>
									</div>
								</DepositInfoBox>
							))
						) : (
							<DepositInfoBox style={{ width: 'unset' }}>
								Oops! You don't have any tokens in the DApp yet. <br /> Let's deposit tokens now!
							</DepositInfoBox>
						)}
					</>
				) : (
					<>
						<DepositInfoBox style={{ display: 'flex', justifyContent: 'center' }}>
							<Loader />
						</DepositInfoBox>
					</>
				)}
			</FlexWrapper>
		)
	}

	return <div style={{ marginBottom: '2rem' }}>{render()}</div>
}

export default DepositInfo
