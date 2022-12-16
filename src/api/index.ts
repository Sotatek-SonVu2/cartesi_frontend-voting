import { createNotifications } from "common/Notification"
import { getInspect } from "helper/inspect"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "store"
import { convertPayload } from "utils/common"
import { ERROR_MESSAGE, NOTI_TYPE } from "utils/contants"
import { MetadataType } from "utils/interface"

const handleRequest = () => {
    // const [data, setData] = useState(null)
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [success, setSuccess] = useState<boolean>(false)
    // const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)

    // const fetch = async (params: any, onSuccess?: Function) => {
    //     try {
    //         setIsLoading(true)
    //         const payload = convertPayload(params, metadata)
    //         const response = await getInspect({ payload })
    //         if (!response.error) {
    //             setData(response)
    //             if (typeof onSuccess === 'function') {
    //                 return onSuccess(params, response)
    //             }
    //         } else {
    //             createNotifications(NOTI_TYPE.DANGER, response?.error || ERROR_MESSAGE)
    //         }
    //     } catch (error: any) {
    //         createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
    //         throw error
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    // return {
    //     isLoading,
    //     success,
    //     data,
    //     fetch
    // }
}

export default handleRequest