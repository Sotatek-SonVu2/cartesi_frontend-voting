import { getNotice } from "../helper/notices";

// Call notices to get response (If it fail, continue calling. Maximum number of call: 20)
export const handleNotices = async (epoch: number, input: number, callback: any) => {
    var times = 0;
    const myInterval = setInterval(async () => {
        const result: any = await getNotice({
            epoch,
            input
        })
        console.log(`Number to calls notices: ${times}, call result:`, result.length > 0 ? true : false)
        if (result.length > 0) {
            if (result[0]?.payload) {
                clearInterval(myInterval);
                const payload = JSON.parse(result[0]?.payload)
                console.log('Call successful!')
                callback(payload)
            }
        }
        if (++times === 20) {
            clearInterval(myInterval);
            console.log('Call fail!')
            callback('')
        }
    }, 1000)
}