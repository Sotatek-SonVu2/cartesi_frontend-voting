import { ethers } from "ethers";
import moment from "moment";
import { FORMAT_DATETIME } from "./contants";
import { MetadataType } from "./interface";

export const JsonStringifyFormat = (data: {}) => {
    return JSON.stringify(data);
}

export const hex2str = (hex: string) => {
    try {
        return ethers.utils.toUtf8String(hex);
    } catch (e) {
        // cannot decode hex payload as a UTF-8 string
        return hex;
    }
};

export const hex_to_ascii = (str: string) => {
    const hex = str.toString();
    let strJson = '';
    for (let n = 0; n < hex.length; n += 2) {
        strJson += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return strJson;
}

export const ascii_to_hex = (str: string) => {
    let arr = [];
    for (let n = 0; n < str.length; n++) {
        const hex = Number(str.charCodeAt(n)).toString(16);
        arr.push(hex);
    }
    return arr.join('');
}
export const convertUtcToLocal = (date = new Date()) => {
    // Convert UTC+0 datetime to local datetime
    const offset = - (new Date().getTimezoneOffset() / 60);
    const result = date.setHours(date.getHours() + offset);
    return result;
}

export const convertLocalToUtc = (date = new Date()) => {
    // Convert local datetime to UTC+0 datetime
    const offset = (new Date().getTimezoneOffset() / 60);
    const result = date.setHours(date.getHours() + offset);
    convertUtcToLocal(date) // reverse the result
    return result;
}

export const convertUtcTimestamp = () => {
    const datetime = moment(convertLocalToUtc()).format(FORMAT_DATETIME)
    const timestamp = Date.parse(datetime) / 1000
    return timestamp
}

export const convertPayload = (data: any, metadata: MetadataType) => {
    const dataJson = JsonStringifyFormat(data)
    const dataHex = ascii_to_hex(dataJson)

    const payloadData = {
        metadata: metadata,
        payload: `0x${dataHex}`
    }
    const payloadJson = JsonStringifyFormat(payloadData)
    return payloadJson
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

export const onConvertDatetime = (start_time: Date | string, end_time: Date | string) => {
    const localStartTime = moment(convertUtcToLocal(new Date(start_time))).format(FORMAT_DATETIME)
    const localEndTime = moment(convertUtcToLocal(new Date(end_time))).format(FORMAT_DATETIME)
    const now = moment(new Date()).format(FORMAT_DATETIME)
    const isStartTime = moment(localStartTime).isBefore(now) // Compare start time with current datetime
    const isEndTime = moment(localEndTime).isBefore(now) // Compare end time with current datetime
    return {
        localStartTime,
        localEndTime,
        isStartTime,
        isEndTime
    }
}



