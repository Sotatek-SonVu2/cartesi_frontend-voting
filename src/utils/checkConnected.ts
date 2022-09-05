import { ethers } from "ethers";

export const checkConnected = async () => {
    try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
            return true
        } else {
            return false
        }
    } catch (error: any) {
        throw error
    }
}