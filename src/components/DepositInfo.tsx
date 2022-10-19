import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { getDepositInfo } from "../reducers/authSlice"
import { AppDispatch, RootState } from "../store"
import { Currency } from "../styled/header"
import { DepositInfoBox } from "../styled/list"
import { FlexLayout } from "../styled/main"
import { coinList } from "../utils/coinList"
import { coinListType, DepositInfoType } from "../utils/interface"

const NETWORK: any = process.env.REACT_APP_NETWORK || ''

const FlexWrapper = styled(FlexLayout)`
    flex-wrap: wrap;
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
        const coinListing = coinList[NETWORK]
        console.log('deposit_info', deposit_info)
        if (deposit_info.length > 0) {
            coinListing.forEach((coin: coinListType) => {
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
            data = [...coinListing]
        }
        return (
            <FlexWrapper>
                {data.map((item: any) => (
                    <DepositInfoBox key={item.key}>
                        <Currency>
                            <img src={item.token_icon} alt="token_icon" width={20} />
                            <span>{item.symbol}: {item.amount - item.used_amount || 0}</span>
                        </Currency>
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