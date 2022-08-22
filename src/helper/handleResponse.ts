import { getNotice } from "../helper/notices";
import { getReport } from "./report";

// Call notices (fulfilled) and reports (rejected) to get response (If it fail, continue calling. Maximum number of call: 20)
export const handleResponse = async (epoch: number | undefined, input: number | undefined, callback: any) => {
    var times = 0;

    const myInterval = setInterval(async () => {
        try {
            let result
            const notices: any = await getNotice({
                epoch,
                input
            })
            // const convertNotice = JSON.parse(notices)
            // let convertReport
            // if (convertNotice?.length !== 0) {
            //     const reports: any = await getReport({
            //         epoch,
            //         input
            //     })
            //     convertReport = JSON.parse(reports)
            // }

            result = notices
            const arr = JSON.parse(result)
            console.log(`Number to calls notices: ${times}, call result:`, arr.length > 0 ? true : false)
            if (arr.length > 0) {
                const payload = JSON.parse(arr[0]?.payload)
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