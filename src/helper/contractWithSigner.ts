import { ethers } from "ethers"
import { abiConfig, tokenConfig } from "./config"

const SPENDER_ADDRESS = process.env.REACT_APP_SPENDER_ADDRESS || ''

export const contractWithSigner = (address: string, abi: any) => {
    const signer = window.ethereum && new ethers.providers.Web3Provider(window.ethereum).getSigner()
    return new ethers.Contract(address, abi, signer)
}

export const erc20Contract = () => {
    try {
        //ERC20PortalFacet: File name ABI
        const abi = abiConfig('ERC20PortalFacet')
        return contractWithSigner(SPENDER_ADDRESS, abi)
    } catch (error: any) {
        throw error
    }
}

export const inputContract = () => {
    try {
        //InputFacet: File name ABI
        const abi = abiConfig('InputFacet')
        return contractWithSigner(SPENDER_ADDRESS, abi)
    } catch (error: any) {
        throw error
    }
}

export const outputContract = () => {
    try {
        //OutputFacet: File name ABI
        const abi = abiConfig('OutputFacet')
        return contractWithSigner(SPENDER_ADDRESS, abi)
    } catch (error: any) {
        throw error
    }
}

export const tokenContract = (tokenAddress: string, token: string) => {
    try {
        const abi = tokenConfig(token)
        return contractWithSigner(tokenAddress, abi)
    } catch (error: any) {
        throw error
    }
}
