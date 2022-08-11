import { createNotifications } from "../common/Notification"
import { NOTI_TYPE } from "./contants"

export const checkConnectToMetamask = async () => {
    try {
        const { ethereum } = window
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        console.log('accounts', accounts)
        if (accounts.length === 0) {
            createNotifications(NOTI_TYPE.DANGER, 'Please connect to MetaMask.')
            return false
        }
        return true
    } catch (error: any) {
        if (error.code === 4001) {
            createNotifications(NOTI_TYPE.DANGER, 'Please connect to MetaMask.')
        } else {
            throw error
        }
    }
}