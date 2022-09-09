import { Link } from "react-router-dom";
import AddIcon from '../../images/add.png';
import EditIcon from '../../images/edit.png';
import VoteIcon from '../../images/voting-box.png';
import VoucherIcon from '../../images/voucher.png';
import DepositIcon from '../../images/deposit.png';
import DeleteIcon from '../../images/trash-bin.png';
import WithdrawIcon from '../../images/withdraw.png';
import DecreseTokenIcon from '../../images/decreseToken.png';
import MinusIcon from '../../images/minus-button.png';
import { ROUTER_PATH } from "../../routes/contants";
import { HistoryTitle } from "../../styled/list";
import { CREATE_CAMPAIGN, DECREASE_TOKEN, DELETE_CAMPAIGN, DEPOSIT, EDIT_CAMPAIGN, EXECUTE_VOUCHER, VOTE, WITHDRAW } from "../../utils/contants";

interface PropsType {
    index: number
    data: any
}

const dataRender = (data: any) => {
    const { action, payload } = data

    switch (action) {
        case CREATE_CAMPAIGN:
            return {
                imageUrl: AddIcon,
                title: 'Create campaign',
                times: `${payload.time}`,
                color: 'rgb(12 255 120 / 50%)',
                content: (
                    <span>
                        You created campaign <Link to={`${ROUTER_PATH.VOTING}/${payload.campaign.id}`}>{payload.campaign.name}</Link>
                    </span>
                )
            }
        case VOTE:
            return {
                imageUrl: VoteIcon,
                title: 'Vote',
                times: `${payload.time}`,
                color: 'rgb(255 12 252 / 50%)',
                content: (
                    <span>
                        You voted for candidate
                        <Link to={`${ROUTER_PATH.RESULT}/${payload.campaign.id}`}>{payload.candidate.name}</Link>
                        in campaign <Link to={`${ROUTER_PATH.VOTING}/${payload.campaign.id}`}>{payload.campaign.name}</Link>
                    </span>
                )
            }
        case DEPOSIT:
            return {
                imageUrl: DepositIcon,
                title: 'Deposit',
                times: `${payload.time}`,
                color: 'rgb(255 83 155 / 50%)',
                content: (<span>You deposited to the DApp {payload.amount} tokens</span>)
            }
        case EDIT_CAMPAIGN:
            return {
                imageUrl: EditIcon,
                title: 'Edit campaign',
                times: `${payload.time}`,
                color: 'rgb(12 228 255 / 50%)',
                content: (
                    <span>
                        You edited info of campaign <Link to={`${ROUTER_PATH.VOTING}/${payload.campaign.id}`}>{payload.campaign.name}</Link>
                    </span>
                )
            }
        case DECREASE_TOKEN:
            return {
                imageUrl: DecreseTokenIcon,
                title: 'Decrease token',
                times: `${payload.time}`,
                color: 'rgb(255 243 83 / 50%)',
                content: (
                    <span>You had been charged {payload.amount} tokens because {payload.reason}</span>
                )
            }
        case DELETE_CAMPAIGN:
            return {
                imageUrl: DeleteIcon,
                title: 'Delete campaign',
                times: `${payload.time}`,
                color: 'rgb(228 17 66 / 65%)',
                content: (
                    <span>You deleted campaing {payload.campaign.name}</span>
                )
            }
        case WITHDRAW:
            return {
                imageUrl: WithdrawIcon,
                title: 'Withdraw',
                times: `${payload.time}`,
                color: 'rgb(255 99 12 / 50%)',
                content: (
                    <Link to={ROUTER_PATH.WITHDRAW}>You requested to withdraw {payload.amount} tokens.</Link>
                )
            }
        case EXECUTE_VOUCHER:
            return {
                imageUrl: VoucherIcon,
                title: 'Execute Voucher',
                times: `${payload.time}`,
                color: 'rgb(255 192 83 / 50%)',
                content: (
                    <span>You executed successfully voucher {payload.voucher_id} with amount {payload.amount} tokens.</span>
                )
            }
        default:
            return {
                imageUrl: MinusIcon,
                title: 'No data',
                times: `--`,
                color: 'rgb(153 166 168 / 50%)',
                content: '(Empty)'
            }
    }
}

const HistoryItem = ({ data, index }: PropsType) => {
    const { imageUrl, title, times, content, color } = dataRender(data)

    return (
        <li key={index}>
            <div className="timeline-tail"></div>
            <div className="timeline-head"></div>
            <div className={`timeline-content ${index % 2 === 0 && 'timeline-item-right'}`} style={{ background: `${color}` }}>
                <HistoryTitle>
                    <img src={imageUrl} alt="add icon" width={30} />
                    <div>
                        <p>{title}</p>
                        <p>{times}</p>
                    </div>
                </HistoryTitle>
                <p>{content}</p>
            </div>
        </li>
    )
}

export default HistoryItem