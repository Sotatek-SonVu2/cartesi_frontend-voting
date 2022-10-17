import { ethers } from "ethers"
import ERC20Portal from '../contracts/ERC20PortalFacet.json'
import InputFacet from '../contracts/InputFacet.json'
import OutputFacet from '../contracts/OutputFacet.json'
import { createNotifications } from "../common/Notification"
import { CARTESI_TOKEN, NETWORK_ERROR_MESSAGE, NOTI_TYPE } from "../utils/contants"
import { networks } from "./networks"
import { getToken } from "../utils/getToken"

const SPENDER_ADDRESS = process.env.REACT_APP_SPENDER_ADDRESS || ''
const CHAIN_ID: any = process.env.REACT_APP_CHAIN_ID || 0

export const configToken = (tokenType: string) => {
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

    const { tokenContract, tokenAddress }: any = getToken(tokenType)
    return {
        tokenContract,
        tokenAddress
    };
};


export const contractWithSigner = (address: string, abi: any) => {
    const signer = window.ethereum && new ethers.providers.Web3Provider(window.ethereum).getSigner()
    return new ethers.Contract(address, abi, signer)
}

export const erc20Contract = () => {
    try {
        return contractWithSigner(SPENDER_ADDRESS, ERC20Portal.abi)
    } catch (error: any) {
        throw error
    }
}

export const inputContract = () => {
    try {
        return contractWithSigner(SPENDER_ADDRESS, InputFacet.abi)
    } catch (error: any) {
        throw error
    }
}

export const outputContract = () => {
    try {
        return contractWithSigner(SPENDER_ADDRESS, OutputFacet.abi)
    } catch (error: any) {
        throw error
    }
}

export const tokenContract = (tokenType: string) => {
    try {
        const { tokenAddress, tokenContract }: any = configToken(tokenType)
        return contractWithSigner(tokenAddress, tokenContract.abi)
    } catch (error: any) {
        throw error
    }
}
