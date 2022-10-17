import { WithdrawContent } from "../../styled/list"
import GiftIcon from "../../images/Gift-box-1.png"
import GiftDisabledIcon from "../../images/Gift-box-2.png"
import ClaimedIcon from '../../images/claimed.png'
import styled from "styled-components"
import { SuccessButton } from "../../styled/common"
import { WithDrawType } from "../../utils/interface"


const ClaimButton = styled(SuccessButton)`
    display: block;
    margin: 0 auto;
    padding: 5px 18px;
    margin-bottom: 20px;
    margin-top: 10px;
    width: 75%;
    justify-content: center;
`

interface PropsType {
    data: WithDrawType
    onClick: any
}

const WithdrawItem = ({ data, onClick }: PropsType) => {
    const { id, isAllowExecute, isExecuted, amount, token } = data
    return (
        <WithdrawContent>
            <img src={isExecuted || isAllowExecute ? GiftIcon : GiftDisabledIcon} className="giftIcon" alt="gift" width={'50%'} />
            <div></div>
            <h5>Gift {id}</h5>
            <span>{amount} CTSI</span>
            {isExecuted ? (
                <img src={ClaimedIcon} alt="claimedIcon" width={100} style={{ marginTop: '10px' }} />
            ) : (
                <ClaimButton onClick={() => onClick(id, amount, token)} disabled={!isAllowExecute}>
                    Claim
                </ClaimButton>
            )}
        </WithdrawContent>
    )
}

export default WithdrawItem