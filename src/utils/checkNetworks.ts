import { createNotifications } from "../common/Notification";
import { CHAIN_ID_ERROR_MESSAGE, NOTI_TYPE } from "./contants";

const CHAIN_ID = process.env.REACT_APP_LOCAL_CHAIN_ID || ""

export const checkNetworks = () => {
    const networkVersion = window.ethereum.networkVersion;
    if (networkVersion !== CHAIN_ID) {
        createNotifications(NOTI_TYPE.DANGER, `${CHAIN_ID_ERROR_MESSAGE} ${CHAIN_ID}`)
        return false
    }
    return true
}