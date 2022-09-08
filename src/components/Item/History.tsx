import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "../../routes/contants";
import { CREATE_CAMPAIGN, DECREASE_TOKEN, DELETE_CAMPAIGN, DEPOSIT, EDIT_CAMPAIGN, EXECUTE_VOUCHER, VOTE, WITHDRAW } from "../../utils/contants";

interface PropsType {
    index: number
    data: any
}

const HistoryItem = ({ data, index }: PropsType) => {

    const historyMessage = (data: any) => {
        const { action, payload } = data

        switch (action) {
            case CREATE_CAMPAIGN:
                return (
                    <span>
                        You created campaign <Link to={`${ROUTER_PATH.VOTING}/${payload.campaign.id}`}>{payload.campaign.name}</Link>
                        at {payload.time}
                    </span>
                )
            case VOTE:
                return (
                    <span >
                        You voted for candidate
                        <Link to={`${ROUTER_PATH.RESULT}/${payload.campaign.id}`}>{payload.candidate.name}</Link>
                        in campaign <Link to={`${ROUTER_PATH.VOTING}/${payload.campaign.id}`}>{payload.campaign.name}</Link>
                        at {payload.time}
                    </span>
                )
            case DEPOSIT:
                return <span>You deposited to the DApp {payload.amount} tokens at {payload.time}</span>
            case EDIT_CAMPAIGN:
                return (
                    <span>
                        You edited info of campaign <Link to={`${ROUTER_PATH.VOTING}/${payload.campaign.id}`}>{payload.campaign.name}</Link>
                        at {payload.time}
                    </span>
                )
            case DECREASE_TOKEN:
                return (
                    <span>You had been charged {payload.amount} tokens at {payload.time} because {payload.reason}</span>
                )
            case DELETE_CAMPAIGN:
                return (
                    <span>You deleted campaing {payload.campaign.name} at {payload.time}</span>
                )
            case WITHDRAW:
                return (
                    <Link to={ROUTER_PATH.WITHDRAW}>You requested to withdraw {payload.amount} tokens at {payload.time}</Link>
                )
            case EXECUTE_VOUCHER:
                return (
                    <span>You executed successfully voucher {payload.voucher_id} with amount {payload.amount} tokens at {payload.time}</span>
                )
            default:
            // code block
        }
    }

    return (
        <li key={index}>
            <div className="timeline-tail"></div>
            <div className="timeline-head"></div>
            <div className={`timeline-content ${index % 2 === 0 && 'timeline-item-right'}`}>
                {historyMessage(data)}
            </div>
        </li>
    )
}

export default HistoryItem