import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { getDepositInfo } from "../reducers/authSlice"
import { AppDispatch, RootState } from "../store"
import { Currency } from "../styled/header"
import { DepositInfoWrapper } from "../styled/list"
import { FlexLayout } from "../styled/main"
import { coinList } from "../utils/coinList"

const CHAIN_ID: any = process.env.REACT_APP_CHAIN_ID || 0

const FlexWrapper = styled(FlexLayout)`
    flex-wrap: wrap;
    justify-content: space-between;
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
        const coinListing = coinList[CHAIN_ID]
        if (deposit_info.length > 0) {
            coinListing.forEach((coin: any) => {
                let obj
                deposit_info?.forEach((item: any) => {
                    if (coin.address.toLowerCase() === item.contract_address) {
                        obj = {
                            ...item,
                            ...coin,
                        }
                        data.push(obj)
                    }

                })
            })
        } else {
            data = [...coinListing]
        }

        return (
            <FlexWrapper>
                {data.map((item: any) => (
                    <DepositInfoWrapper key={item.key}>
                        <Currency>
                            <img src={item.token_icon} alt="token_icon" width={20} />
                            <span>{item.symbol}: {item.amount || 0}</span>
                        </Currency>
                        <div className="tooltip-box">
                            <p>Used: {item.used_amount || 0} {item.symbol}</p>
                            <p>Withdraw: {item.withdrawn_amount || 0} {item.symbol}</p>
                        </div>
                    </DepositInfoWrapper>
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