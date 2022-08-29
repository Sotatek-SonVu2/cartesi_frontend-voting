import { WithdrawContent } from "../../styled/list"
import GiftIcon from "../../images/gift1.png"
import styled from "styled-components"
import { SuccessButton } from "../../styled/common"

const ClaimButton = styled(SuccessButton)`
    display: flex;
    margin: 0 auto;
    padding: 5px 18px;
    margin-bottom: 20px;
    margin-top: 10px;
    border: 2px solid #3eb991;
    color: #3eb991;
    background: rgba(0,0,0,0);
    width: 75%;
    border-radius: 4px;
    justify-content: center;
   

    &:hover {
        transition: ease .3s;
        background: #3eb991;
        color: #ffffff;
    }
`

interface PropsType {
    data: {
        destination: string
        epoch: number
        input: number
        id: string
        payload: string
        voucher: 0,
        amount: number,
        isExecute: boolean
    }
    onClick: any
}

const WithdrawItem = ({ data, onClick }: PropsType) => {
    const { id, isExecute, amount } = data

    return (
        <WithdrawContent>
            <img src={GiftIcon} alt="gift" width={'55%'} />
            <div></div>
            <h5>Gift {id}</h5>
            <span>{amount} CTSI</span>
            <ClaimButton onClick={() => onClick(id)} disabled={!isExecute}>
                Claim
            </ClaimButton>
        </WithdrawContent>
    )
}

export default WithdrawItem