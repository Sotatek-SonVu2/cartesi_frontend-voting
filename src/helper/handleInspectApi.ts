import { convertPayload } from "../utils/common"
import { MetadataType } from "../utils/interface"
import { getInspect } from "./inspect"

export const handleInspectApi = async (data: any, metadata: MetadataType) => {
    const payload = convertPayload(data, metadata)
    const response = await getInspect({ payload })
    return response
}