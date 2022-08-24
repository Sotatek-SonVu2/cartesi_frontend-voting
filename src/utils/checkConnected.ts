import { createNotifications } from "../common/Notification"
import { ADDRESS_WALLET, CONNECT_METAMASK_ERROR_CODE, CONNECT_METAMASK_ERROR_MESSAGE, NOTI_TYPE } from "./contants"

export const checkConnected = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log('accounts', accounts)
        if (accounts.length > 0) {
            return true
        } else {
            createNotifications(NOTI_TYPE.DANGER, CONNECT_METAMASK_ERROR_MESSAGE)
            localStorage.setItem(ADDRESS_WALLET, '');
            return false
        }

    } catch (error: any) {
        if (error.code === CONNECT_METAMASK_ERROR_CODE) {
            createNotifications(NOTI_TYPE.DANGER, CONNECT_METAMASK_ERROR_MESSAGE)
        } else {
            throw error
        }
    }
}