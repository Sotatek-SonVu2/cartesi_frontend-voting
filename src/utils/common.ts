import { ethers } from "ethers";
import { getNotice } from "../helper/notices";
import { sendInput } from "../helper/sendInput";
import { DEPOSIT_INFO } from "./contants";
import { MetadataType } from "./interface";

export const getBalance = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const erc20Address = await provider.getSigner().getAddress();
    const balance = await provider.getBalance(erc20Address)
    const balanceEth = parseFloat(ethers.utils.formatEther(balance))
    const formatBalance = Number((balanceEth).toFixed(4))
    return formatBalance
}

export const JsonStringifyFormat = (data: any) => {
    return JSON.stringify(data);
}

export const handleNotices = async (epoch: number, input: number, callback: any) => {
    const myInterval = setInterval(async () => {
        const result: any = await getNotice({
            epoch,
            input
        })
        console.log('result', result)
        if (result.length > 0) {
            if (result[0]?.payload) {
                clearInterval(myInterval);
                const payload = JSON.parse(result[0]?.payload)
                callback(payload)
            }
        }
    }, 1000)
}

export const hex_to_ascii = (str: string) => {
    var hex = str.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

export const ascii_to_hex = (str: string) => {
    var arr = [];
    for (var n = 0; n < str.length; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr.push(hex);
    }
    return arr.join('');
}

export const convertDataToHex = (data: any, metadata: MetadataType) => {
    const dataJson = JsonStringifyFormat(data)
    const dataHex = ascii_to_hex(dataJson)

    const payloadData = {
        metadata: metadata,
        payload: `0x${dataHex}`
    }
    const payloadJson = JsonStringifyFormat(payloadData)
    const payloadHex = ascii_to_hex(payloadJson)

    return payloadHex
}

export const convertHexToData = (payload: string) => {
    const sliceStr = payload.replace('0x', '');
    const str = hex_to_ascii(sliceStr)
    const obj = JSON.parse(str)
    return obj
}

export const getAvatar = (name: string) => {
    return name.charAt(0).toUpperCase()
}

export const formatAddress = (address: string) => {
    const firstAddress = address.slice(0, 5)
    const lastAddress = address.slice(-4)
    return `${firstAddress}...${lastAddress}`
}

export const randomColor = () => {
    let color = '#';
    for (let i = 0; i < 3; i++)
        color += (
            '0' +
            Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
        ).slice(-2);
    return color;
};



