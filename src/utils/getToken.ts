import { networks } from "../helper/networks";
import { CARTESI_TOKEN } from "./contants"

const CHAIN_ID: any = process.env.REACT_APP_CHAIN_ID || 0

export const getToken = (tokenType: string) => {
    try {
        const networkName = networks[CHAIN_ID].name;
        let tokenContract
        let tokenAddress
        if (networkName === "localhost") {
            tokenContract = require(`../contracts/${tokenType}.json`)
            tokenAddress = require(`../contracts/${tokenType}.json`).address
        } else if (networkName && tokenType === CARTESI_TOKEN) {
            tokenContract = require(`@cartesi/token/deployments/${networkName}/CartesiToken.json`)
            tokenAddress = require(`@cartesi/token/deployments/${networkName}/CartesiToken.json`).address
        } else if (networkName && tokenType !== CARTESI_TOKEN) {
            tokenContract = require(`../contracts/deployments/${networkName}/${tokenType}.json`)
            tokenAddress = require(`../contracts/deployments/${networkName}/${tokenType}.json`).address
        }
        return {
            tokenContract,
            tokenAddress
        };
    } catch (e) {
        return; // undefined
    }
}