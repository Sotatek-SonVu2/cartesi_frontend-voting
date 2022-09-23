import { ethers } from "ethers"
import ERC20Portal from '../contracts/ERC20PortalFacet.json'
import InputFacet from '../contracts/InputFacet.json'
import OutputFacet from '../contracts/OutputFacet.json'
import { createNotifications } from "../common/Notification"
import { NETWORK_ERROR_MESSAGE, NOTI_TYPE } from "../utils/contants"
import { networks } from "./networks"

const SPENDER_ADDRESS = process.env.REACT_APP_SPENDER_ADDRESS || ''
const CHAIN_ID: any = process.env.REACT_APP_CHAIN_ID || 0

export const cartesiToken = () => {
    const chainId = window.ethereum.networkVersion;
    console.log(`connected to chain ${chainId}`);
    const network = networks[chainId];
    if (!network || CHAIN_ID !== chainId) {
        createNotifications(
            NOTI_TYPE.DANGER,
            `Your app network (${networks[CHAIN_ID]?.name.toUpperCase()}) does not match the ${networks[chainId]?.name.toUpperCase()} network on Metamask. ${NETWORK_ERROR_MESSAGE}`
        )
        return; // undefined
    }

    try {
        let cartesiContract
        let cartesiAddress
        if (network.name === "localhost") {
            cartesiContract = require(`../contracts/CartesiToken.json`)
            cartesiAddress = require(`../contracts/CartesiToken.json`).address
        } else if (network) {
            cartesiContract = require(`@cartesi/token/deployments/${network.name}/CartesiToken.json`)
            cartesiAddress = require(`@cartesi/token/deployments/${network.name}/CartesiToken.json`).address
        }
        return {
            cartesiContract,
            cartesiAddress
        };
    } catch (e) {
        return; // undefined
    }
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

export const cartesiTokenContract = () => {
    try {
        const { cartesiAddress, cartesiContract }: any = cartesiToken()
        return contractWithSigner(cartesiAddress, cartesiContract.abi)
    } catch (error: any) {
        throw error
    }
}
