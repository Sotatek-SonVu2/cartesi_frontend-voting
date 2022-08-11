import { getDataApi } from "../services"
import { convertDataToHex, convertHexToData } from "../utils/common"
import { MetadataType } from "../utils/interface"

export const handleInspectApi = async (data: any, metadata: MetadataType) => {
    const payloadHex = convertDataToHex(data, metadata)
    const res: any = await getDataApi(payloadHex)
    const obj = convertHexToData(res.reports[0].payload)
    return obj
}