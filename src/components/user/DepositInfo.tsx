import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { TokenItem } from "styled/common"
import { DepositInfoBox } from "styled/list"
import { FlexLayout } from "styled/main"
import { tokenConfig } from "utils/tokenConfig"
import { tokenListType, DepositInfoType } from "utils/interface"
import { AppDispatch, RootState } from "store"
import { getDepositInfo } from "reducers/authSlice"

const NETWORK: any = process.env.REACT_APP_NETWORK || ''

const FlexWrapper = styled(FlexLayout)`
    flex-wrap: wrap;
    justify-content: center;
`

const DepositInfo = () => {
    const dispatch = useDispatch<AppDispatch>()
    const deposit_info = useSelector((state: RootState) => state.auth.deposit_info)

    useEffect(() => {
        dispatch(getDepositInfo())
        const myInterval = setInterval(() => {
            dispatch(getDepositInfo())
        }, 60000)

        return (() => {
            clearInterval(myInterval);
        })
    }, [])

    const render = () => {
        let data: any[] = []
        const tokenListing = tokenConfig[NETWORK]
        if (deposit_info?.length > 0) {
            tokenListing.forEach((coin: tokenListType) => {
                let obj
                let temp = deposit_info.find((element: DepositInfoType) => element.contract_address === coin.address.toLowerCase())
                if (temp) {
                    obj = {
                        ...temp,
                        ...coin,
                    }
                } else {
                    obj = {
                        ...coin,
                    }
                }
                data.push(obj)
            })
        } else {
            data = [...tokenListing]
        }
        return (
            <FlexWrapper className="deposit-info-step">
                {data.map((item: any) => (
                    <DepositInfoBox key={item.key}>
                        <TokenItem>
                            <img src={item.token_icon} alt="token_icon" width={20} />
                            <span>{item.symbol}: {item.amount - item.used_amount - item.withdrawn_amount || 0}</span>
                        </TokenItem>
                        <div className="tooltip-box">
                            <p>Deposits: {item.amount || 0} {item.symbol}</p>
                            <p>Used: {item.used_amount || 0} {item.symbol}</p>
                            <p>Withdraw: {item.withdrawn_amount || 0} {item.symbol}</p>
                        </div>
                    </DepositInfoBox>
                ))}
            </FlexWrapper>
        )
    }


    return (
        <div style={{ marginBottom: '2rem' }}>
            {render()}
        </div>
    )
}

export default DepositInfo