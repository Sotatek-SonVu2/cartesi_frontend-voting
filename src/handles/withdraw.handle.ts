import useRequest from 'hook/useRequest'
import useStore from 'hook/useStore'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getDepositInfo } from 'reducers/authSlice'
import { RootState } from 'store'
import {
	ERROR_MESSAGE,
	LIST_EXECUTED_VOUCHER,
	NOTI_TYPE,
	SAVE_EXECUTED_VOUCHER,
	WAITING_FOR_CONFIRMATION,
	WITHDRAW,
	WITHDRAW_RADIO_FILTER_STATUS,
} from 'utils/contants'
import getTokenAddress from 'utils/getTokenAddress'
import { WithdrawHandleRes, WithDrawType } from 'utils/interface'
import { getVoucher as getVoucherList } from 'helper/voucher'
import { getVoucher as getVoucherExcute } from 'graphql/vouchers'
import { getLastEpoch } from 'graphql/getLastEpoch'
import { ethers } from 'ethers'
import { sendInput } from 'helper/sendInput'
import { createNotifications } from 'common/Notification'
import { outputContract } from 'helper/contractWithSigner'
import { OutputValidityProofStruct } from '@cartesi/rollups/dist/src/types/contracts/interfaces/IOutput'

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || ''

export default function WithdrawHandle(): WithdrawHandleRes {
	const { dispatch } = useStore()
	const userAddress = useSelector((state: RootState) => state.auth.address)
	const { tokenListing } = useSelector((state: RootState) => state.token)
	const [vouchers, setVouchers] = useState<WithDrawType[]>([])
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [isChecked, setIsChecked] = useState<string>(WITHDRAW_RADIO_FILTER_STATUS.ALL)
	const [callMessage, setCallMessage] = useState<string>('')
	const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false)
	const { isLoading, fetchApi, fetchNotices } = useRequest()

	const toggleModal = () => {
		setIsVisible(!isVisible)
	}

	const onChangeRadio = (e: any) => {
		setIsChecked(e.target.value)
	}

	const getFilterList = (vouchersList: WithDrawType[], executedId: string[]) => {
		let list
		switch (isChecked) {
			case WITHDRAW_RADIO_FILTER_STATUS.CLAIMED:
				list = vouchersList.filter((val) => executedId.includes(val.id))
				break
			case WITHDRAW_RADIO_FILTER_STATUS.NOT_CLAIM:
				list = vouchersList.filter((val) => !executedId.includes(val.id))
				break
			default:
				list = vouchersList
		}
		return list
	}

	const getData = async () => {
		const params = {
			action: LIST_EXECUTED_VOUCHER,
		}
		const { ids } = await fetchApi(params) //get list executed voucher
		const res = await getVoucherList({}) //get list voucher
		const lastEpoch = await getLastEpoch()
		const arr = JSON.parse(res)
		let result: any[] = []
		arr.forEach((item: WithDrawType) => {
			let obj
			const decode = new ethers.utils.AbiCoder().decode(
				['address', 'uint256', 'address'],
				`0x${item.payload.slice(10)}`
			)
			const amount = parseFloat(ethers.utils.formatEther(decode[1]))
			const isAllowExecute =
				item.epoch < lastEpoch.nodes[0].index || lastEpoch.nodes[0].vouchers.nodes[0].proof
					? true
					: false
			if (decode[0] === userAddress) {
				if (ids.length > 0) {
					ids.every((id: string) => {
						obj = {
							...item,
							amount,
							isAllowExecute, // The voucher is allowed to be executed
							isExecuted: item.id === id, // The voucher has been executed
							token: decode[2],
						}
						return item.id !== id
					})
				} else {
					obj = {
						...item,
						amount,
						isAllowExecute, // The voucher is allowed to be executed
						isExecuted: false, // The voucher has been executed
						token: decode[2],
					}
				}
				result.unshift(obj)
			}
		})
		const filterList = getFilterList(result, ids)
		setVouchers(filterList)
	}

	const handleAddSuccess = async () => {
		getData()
		dispatch(getDepositInfo())
	}

	const onAddVoucher = async (amount: string, token: string) => {
		const decimal = parseFloat(amount) * Math.pow(10, 18)
		const data = {
			action: WITHDRAW,
			amount: BigInt(decimal).toString(),
			token_address: getTokenAddress(tokenListing, token),
		}
		fetchNotices(data, handleAddSuccess)
	}

	const onWithdraw = async (id: string, amount: number, token: string) => {
		// wait for vouchers to appear in reader
		setIsRequestLoading(true)
		setCallMessage(WAITING_FOR_CONFIRMATION)
		console.log(`retrieving voucher "${id}" along with proof`)
		const voucher = await getVoucherExcute(GRAPHQL_URL, id)
		if (!voucher.proof) {
			createNotifications(NOTI_TYPE.DANGER, `Voucher "${id}" has no associated proof yet`)
			return
		}
		// send transaction to execute voucher
		const proof: OutputValidityProofStruct = {
			...voucher.proof,
			epochIndex: voucher.input.epoch.index,
			inputIndex: voucher.input.index,
			outputIndex: voucher.index,
		}
		try {
			const tx = await outputContract().executeVoucher(voucher.destination, voucher.payload, proof)
			const receipt = await tx.wait()
			if (receipt.events) {
				const data = {
					id,
					amount,
					action: SAVE_EXECUTED_VOUCHER,
					token_address: token || '',
				}
				await sendInput(data)
				dispatch(getDepositInfo())
				getData()
				createNotifications(NOTI_TYPE.SUCCESS, 'Withdraw token successfully!')
			}
		} catch (error: any) {
			createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
		} finally {
			setIsRequestLoading(false)
			setCallMessage('')
		}
	}

	return {
		getData,
		onAddVoucher,
		onChangeRadio,
		toggleModal,
		onWithdraw,
		vouchers,
		isLoading,
		callMessage,
		isVisible,
		isRequestLoading,
		isChecked,
	}
}
