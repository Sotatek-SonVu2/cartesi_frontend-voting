import { getNotice } from "../helper/notices";
import { getReport } from "./report";

// Call notices (fulfilled) and reports (rejected) to get response (If it fail, continue calling. Maximum number of call: 20)
export const handleResponse = async (epoch: number | undefined, input: number | undefined, callback: any) => {
    var times = 0;
    const myInterval = setInterval(async () => {
        try {
            const notice = await getNotice({
                epoch,
                input
            })
            const report = await getReport({
                epoch,
                input
            })
            let [msgNotice, msgReport] = await Promise.all([notice, report]);
            const prsNotice = JSON.parse(msgNotice)
            const prsReport = JSON.parse(msgReport)
            const result = prsNotice.length > 0 ? prsNotice : prsReport
            console.log(`Number to calls notices: ${times}, call result:`, result.length > 0 ? true : false)
            if (result.length > 0) {
                const payload = JSON.parse(result[0]?.payload)
                if (payload) {
                    clearInterval(myInterval);
                    console.log('Call successful!')
                    callback(payload)
                }
            }
            if (++times === 20) {
                clearInterval(myInterval);
                console.log('Call fail!')
                callback('')
            }
        } catch (error) {
            clearInterval(myInterval);
            throw error
        }
    }, 1500)
}