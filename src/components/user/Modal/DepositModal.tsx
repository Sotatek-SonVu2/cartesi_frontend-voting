import { IInput } from '@cartesi/rollups'
import { yupResolver } from '@hookform/resolvers/yup'
import Label from 'common/Label'
import ModalComponent from 'common/Modal'
import { createNotifications } from 'common/Notification'
import NoToken from 'common/NoToken'
import TokensList from 'common/TokensList'
import { ContractReceipt, ethers } from 'ethers'
import { erc20Contract, inputContract, tokenContract } from 'helper/contractWithSigner'
import useTokensList from 'hook/useTokensList'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getDepositInfo } from 'reducers/authSlice'
import { AppDispatch, RootState } from 'store'
import styled from 'styled-components'
import { ButtonModal, ModalContent, ModalTitle } from 'styled/common'
import { ErrorText, Input } from 'styled/form'
import { Loader } from 'styled/loading'
import {
	ERROR_MESSAGE,
	GET_ALL_ACTIVE,
	NETWORK_ERROR_MESSAGE,
	NOTI_TYPE,
	NO_SUPPORT_YET,
	WAITING_FOR_CONFIRMATION,
	WAITING_RESPONSE_FROM_SERVER_MESSAGE,
} from 'utils/contants'
import getTokenAddress from 'utils/getTokenAddress'
import { InputKeys } from 'utils/types'
import * as yup from 'yup'

type Props = {
	isVisible: boolean
	toggleModal: any
}

const ErrorMessage = styled(ErrorText)`
	text-align: center;
	word-wrap: break-word;
`

const FormItem = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	& label {
		margin-right: 20px;
		font-size: 15px;
		font-weight: 400;
	}
`

const SPENDER_ADDRESS = process.env.REACT_APP_SPENDER_ADDRESS || ''

export const findInputAddedInfo = (
	receipt: ContractReceipt,
	inputContract: IInput | any
): InputKeys => {
	if (receipt.events) {
		for (const event of receipt.events) {
			try {
				const parsedLog = inputContract.interface.parseLog(event)
				if (parsedLog.name === 'InputAdded') {
					return {
						epoch_index: parsedLog.args.epochNumber.toNumber(),
						input_index: parsedLog.args.inputIndex.toNumber(),
					}
				}
			} catch (e) {
				// do nothing, just skip to try parsing the next event
			}
		}
	}
	throw new Error(`InputAdded event not found in receipt of transaction ${receipt.transactionHash}`)
}

const schema = yup
	.object({
		amount: yup
			.number()
			.typeError('Amount must be a number!')
			.positive('Amount must be a positive number!')
			.required('Amount is a required field!'),
	})
	.required()

const DepositModal = ({ isVisible, toggleModal }: Props) => {
	const dispatch = useDispatch<AppDispatch>()
	const addressWallet = useSelector((state: RootState) => state.auth.address)
	const { tokenList, isLoading } = useTokensList(GET_ALL_ACTIVE)
	const [token, setToken] = useState<string>(tokenList[0]?.name)
	const [depositLoading, setDepositLoading] = useState<boolean>(false)
	const [callMessage, setCallMessage] = useState<string>('')
	const {
		register,
		handleSubmit,
		formState: { errors },
	}: any = useForm<{ amount: number }>({
		resolver: yupResolver(schema),
		defaultValues: {
			amount: 0,
		},
	})

	const onSubmit = async (dataForm: { amount: number }) => {
		try {
			setDepositLoading(true)
			// Check CTSI tokens in your account
			const tokenAddress = getTokenAddress(tokenList, token)
			if (!tokenAddress) {
				return createNotifications(NOTI_TYPE.DANGER, NETWORK_ERROR_MESSAGE)
			}
			const amount = dataForm.amount.toString()
			const getBalanceOf = await tokenContract(tokenAddress, token).balanceOf(addressWallet)
			const balanceOf = parseInt(ethers.utils.formatEther(getBalanceOf))
			if (balanceOf > 0 && balanceOf > parseInt(amount)) {
				setCallMessage('Waiting for transaction...')
				const allowance: any = await tokenContract(tokenAddress, token).functions.allowance(
					addressWallet,
					SPENDER_ADDRESS
				)
				// increase erc20 allowance first if necessary
				const erc20Amount = ethers.utils.parseEther(`${amount}`)
				if (allowance[0].lt(erc20Amount)) {
					const allowanceApproveAmount = ethers.BigNumber.from(erc20Amount).sub(allowance[0])
					const tx = await tokenContract(tokenAddress, token).approve(
						SPENDER_ADDRESS,
						allowanceApproveAmount
					)
					await tx.wait()
					if (tx.hash) {
						setCallMessage('Token approval successful!')
					}
				}

				// send deposit transaction
				const tx = await erc20Contract().erc20Deposit(tokenAddress, erc20Amount, '0x')
				console.log(`Transaction: ${tx.hash}.`)
				setCallMessage(WAITING_FOR_CONFIRMATION)
				const receipt = await tx.wait()

				// find added input information from transaction receipt
				const inputAddedInfo = findInputAddedInfo(receipt, inputContract())
				console.log(
					`deposit successfully executed as input ${inputAddedInfo.input_index} of epoch ${inputAddedInfo.epoch_index}`
				)
				dispatch(getDepositInfo())
				createNotifications(NOTI_TYPE.SUCCESS, WAITING_RESPONSE_FROM_SERVER_MESSAGE)
				toggleModal()
			} else {
				createNotifications(
					NOTI_TYPE.DANGER,
					"Oops! You don't have enough tokens in your Metamask wallet."
				)
			}
		} catch (error: any) {
			createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
			throw error
		} finally {
			setCallMessage('')
			setDepositLoading(false)
		}
	}

	const onChooseToken = (token: string) => {
		if (isLoading || depositLoading) return
		setToken(token)
	}

	return (
		<ModalComponent
			isVisible={isVisible}
			toggleModal={toggleModal}
			title='Deposit Token'
			isLoading={depositLoading}
			width='500px'
			userGuideType='depositModal'>
			{tokenList?.length > 0 ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalTitle>
						<TokensList
							tokenList={tokenList}
							isLoading={isLoading}
							onChooseCoin={onChooseToken}
							tokenType={token}
						/>
					</ModalTitle>
					<ModalContent>
						<FormItem>
							<Label required>Amount:</Label>
							<Input type='string' {...register('amount')} placeholder='Enter amount..' />
						</FormItem>
					</ModalContent>
					<ErrorMessage>{errors?.amount?.message || callMessage}</ErrorMessage>
					<ButtonModal type='submit' disabled={isLoading || depositLoading} success>
						{isLoading || (depositLoading && <Loader />)}
						Deposit
					</ButtonModal>
				</form>
			) : (
				<NoToken type={NO_SUPPORT_YET} />
			)}
		</ModalComponent>
	)
}

export default DepositModal
