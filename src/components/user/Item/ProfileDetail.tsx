import Markdown from "common/Markdown"
import { useNavigate } from "react-router-dom"
import { ROUTER_PATH } from "routes/contants"
import { DetailItemContent, DetailItemHeader, DetailItemStatus } from "styled/profile"
import { formatAddress, onConvertDatetime } from "utils/common"
import { ProfileCampaignDataType } from "utils/interface"

interface PropsType {
    data: ProfileCampaignDataType
}

const ProfileDetailItem = ({ data }: PropsType) => {
    const navigate = useNavigate()
    const { start_time, end_time, id, creator, description, name } = data
    const { isStartTime, isEndTime } = onConvertDatetime(start_time, end_time)
    return (
        <DetailItemContent key={id} onClick={() => navigate(`${ROUTER_PATH.VOTING}/${id}`)}>
            <DetailItemHeader>
                <div>{formatAddress(creator)}</div>
                <DetailItemStatus isStartTime={isStartTime} isEndTime={isEndTime}>
                    {isStartTime && !isEndTime ? 'Starting ' : isEndTime ? 'Finished ' : 'Not start yet '}
                </DetailItemStatus>
            </DetailItemHeader>
            <h3>{name}</h3>
            <Markdown text={description || ''} isBreakWords={true} />
        </DetailItemContent>
    )
}

export default ProfileDetailItem