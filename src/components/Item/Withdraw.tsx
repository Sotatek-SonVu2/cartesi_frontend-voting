import { WithdrawContent } from "../../styled/list"
import GiftIcon from "../../images/Gift-box-1.png"
import GiftDisabledIcon from "../../images/Gift-box-2.png"
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
    const { id, isAllowExecute, isExecuted, amount } = data
    return (
        <WithdrawContent>
            <img src={isExecuted || isAllowExecute ? GiftIcon : GiftDisabledIcon} alt="gift" width={'50%'} />
            <div></div>
            <h5>Gift {id}</h5>
            <span>{amount} CTSI</span>
            <ClaimButton onClick={() => onClick(id)} disabled={!isAllowExecute || isExecuted}>
                {isExecuted ? 'Claimed' : 'Claim'}
            </ClaimButton>
        </WithdrawContent>
    )
}

export default WithdrawItem