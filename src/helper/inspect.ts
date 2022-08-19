import { ethers } from "ethers";

interface Args {
    payload: string;
    url?: string;
}

const BASE_URL_API = process.env.REACT_APP_BASE_URL_API || ''

export const getInspect = async ({ payload, url = BASE_URL_API }: Args) => {
    const response = await fetch(`${url}/${payload}`);
    console.log(`Returned status: ${response.status}`);
    if (response.status === 200) {
        const result = await response.json();
        for (let i in result.reports) {
            let output = result.reports[i].payload;
            try {
                output = ethers.utils.toUtf8String(output);
            } catch (e) {
                // cannot decode hex payload as a UTF-8 string
            }
            return JSON.parse(output)
        }
    } else {
        console.log(JSON.stringify(await response.text()));
    }
}