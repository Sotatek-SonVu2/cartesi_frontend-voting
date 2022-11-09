import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTokens } from "reducers/tokenSlice";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import { CoinItem } from "styled/list";
import { Loader } from "styled/loading";
import { FlexLayout } from "styled/main";
import { GET_ALL_HAS_COIN, GET_ACTIVE_HAS_COIN, TOKEN_STATUS, GET_ALL_ACTIVE } from "utils/contants";
import { DepositInfoType, tokenType } from "utils/interface";

interface PropsType {
    onChooseCoin: (coinToken: string) => void
    tokenType: string
    listType?: 'GET_ACTIVE_HAS_COIN' | 'GET_ALL_HAS_COIN' | 'GET_ALL_ACTIVE'
    tokenListing: tokenType[]
    isLoading: boolean
}

const CoinWrapper = styled(FlexLayout)`
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 15px;
`

const TokensList = ({ onChooseCoin, tokenType, tokenListing, isLoading, listType = GET_ACTIVE_HAS_COIN }: PropsType) => {
    const dispatch = useDispatch<AppDispatch>()
    const deposit_info = useSelector((state: RootState) => state.auth.deposit_info)

    useEffect(() => {
        dispatch(getTokens())
    }, [])

    const render = () => {
        let data: any[] = []
        switch (listType) {
            case GET_ALL_ACTIVE:
                data = tokenListing.filter((token: tokenType) => token.is_disabled === TOKEN_STATUS.ACTIVE)
                break;
            case GET_ACTIVE_HAS_COIN:
                tokenListing.forEach((token: tokenType) => {
                    let obj
                    deposit_info.forEach((deposit: DepositInfoType) => {
                        const amount = deposit.amount - deposit.used_amount - deposit.withdrawn_amount
                        if (token.is_disabled === TOKEN_STATUS.ACTIVE && deposit.contract_address === token.address.toLowerCase() && amount > 0) {
                            obj = {
                                ...token,
                                ...deposit
                            }
                            data.push(obj)
                        }
                    })
                })
                break;
            case GET_ALL_HAS_COIN:
                tokenListing.forEach((token: tokenType) => {
                    let obj
                    deposit_info.forEach((deposit: DepositInfoType) => {
                        const amount = deposit.amount - deposit.used_amount - deposit.withdrawn_amount
                        if (deposit.contract_address === token.address.toLowerCase() && amount > 0) {
                            obj = {
                                ...token,
                                ...deposit
                            }
                            data.push(obj)
                        }
                    })
                })
                break;
        }

        return (
            <CoinWrapper>
                {!isLoading ? (
                    <>
                        {data?.map(({ id, name, icon, amount, used_amount, withdrawn_amount }) => (
                            <CoinItem
                                key={id}
                                onClick={() => onChooseCoin(name)}
                                active={name === tokenType}
                            // style={{ width: 'max-content' }}
                            >
                                <img src={icon} alt="token_icon" width={20} />
                                <span>{name}</span>
                            </CoinItem>
                        ))}
                    </>
                ) : (
                    <CoinItem style={{ background: '#99c2ff' }}>
                        <Loader />
                    </CoinItem>
                )}
            </CoinWrapper>
        )
    }


    return (
        <>{render()}</>
    )
}

export default TokensList