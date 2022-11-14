import { CARTESI_TOKEN, NETWORK_ERROR_MESSAGE, NOTI_TYPE } from "../utils/contants"
import { networks } from "./networks"
import { createNotifications } from "../common/Notification"

const CHAIN_ID: any = process.env.REACT_APP_CHAIN_ID || 0

export const abiConfig = (AbiFile: string) => {
    try {
        const chainId = window.ethereum.networkVersion;
        console.log(`connected to chain ${chainId}`);
        const network = networks[chainId];
        if (!network) {
            createNotifications(
                NOTI_TYPE.DANGER,
                `Your app network (${networks[CHAIN_ID]?.name.toUpperCase()}) does not match the ${networks[chainId]?.name.toUpperCase()} network on Metamask. ${NETWORK_ERROR_MESSAGE}`
            )
            return; // undefined
        }

        let abi
        if (network.name === "localhost") {
            abi = require(`../contracts/localhost/${AbiFile}.json`).abi
        } else if (network.name) {
            abi = require(`@cartesi/rollups/deployments/${network.name}/${AbiFile}.json`).abi
        }

        return abi
    } catch (error) {
        return; // undefined
    }
};

export const tokenConfig = (token: string) => {
    try {
        const chainId = window.ethereum.networkVersion;
        console.log(`connected to chain ${chainId}`);
        const network = networks[chainId];
        if (!network) {
            createNotifications(
                NOTI_TYPE.DANGER,
                `Your app network (${networks[CHAIN_ID]?.name.toUpperCase()}) does not match the ${networks[chainId]?.name.toUpperCase()} network on Metamask. ${NETWORK_ERROR_MESSAGE}`
            )
            return; // undefined
        }

        let tokenContract
        if (network.name === "localhost") {
            tokenContract = token === CARTESI_TOKEN ? require(`../contracts/localhost/CartesiToken.json`) : require(`../contracts/localhost/OtherTokens.json`)
        } else {
            tokenContract = token === CARTESI_TOKEN
                ? require(`@cartesi/token/deployments/${network.name}/CartesiToken.json`)
                : require(`../contracts/deployments/OtherTokens.json`)
        }
        return tokenContract.abi
    } catch (error) {
        return; // undefined
    }
};
