import { ethers } from 'ethers'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createNotifications } from '../common/Notification'
import { ROUTER_PATH } from '../routes/contants'
import { RootState } from '../store'
import { ADDRESS_WALLET, CONNECT_METAMASK_ERROR_MESSAGE, NOTI_TYPE } from '../utils/contants'

const useAuth = () => {
	const addressWallet = useSelector((state: RootState) => state.auth.address)
	const navigate = useNavigate()
	const auth = async () => {
		try {
			const { ethereum } = window
			const provider = new ethers.providers.Web3Provider(ethereum)
			const accounts = await provider.listAccounts()
			if (accounts.length > 0 && addressWallet) {
				return true
			} else {
				localStorage.setItem(ADDRESS_WALLET, '')
				navigate(ROUTER_PATH.LOGIN, { replace: true })
				createNotifications(NOTI_TYPE.DANGER, CONNECT_METAMASK_ERROR_MESSAGE)
				return false
			}
		} catch (error: any) {
			throw error
		}
	}

	useEffect(() => {
		auth()
	}, [])
}

export default useAuth
