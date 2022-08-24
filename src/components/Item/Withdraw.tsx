import { WithdrawContent } from "../../styled/list"
import GiftIcon from "../../images/gift1.png"
import styled from "styled-components"
import { SuccessButton } from "../../styled/common"

interface PropsType {
    data: any
}

const ClaimButton = styled(SuccessButton)`
    display: flex;
    margin: 0 auto;
    padding: 7px 18px;
    margin-bottom: 20px;
    border: 0px;
`

const WithdrawItem = ({ data }: PropsType) => {
    return (
        <WithdrawContent>
            <img src={GiftIcon} alt="ethIcon" width={'62%'} />
            <h5>Gift {data}</h5>
            {/* <span>1000$</span> */}
            <ClaimButton>
                Claim
            </ClaimButton>
        </WithdrawContent>
    )
}

export default WithdrawItem