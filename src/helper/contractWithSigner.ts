import { ethers } from "ethers"
import ERC20Portal from '../abis/ERC20PortalFacet.json'
import InputFacet from '../abis/InputFacet.json'
import cartesiToken from '../abis/CartesiToken.json'

const SPENDER_ADDRESS = process.env.REACT_APP_SPENDER_ADDRESS || ''
const CARTERSI_TOKEN_ADDRESS = process.env.REACT_APP_CARTERSI_TOKEN_ADDRESS || ''

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

export const cartesiTokenContract = () => {
    try {
        return contractWithSigner(CARTERSI_TOKEN_ADDRESS, cartesiToken.abi)
    } catch (error: any) {
        throw error
    }
}
