import { DepositInfoType, tokenType } from "utils/interface";
import { GET_ALL_HAS_TOKEN, GET_ACTIVE_HAS_TOKEN, TOKEN_STATUS, GET_ALL_ACTIVE } from "utils/contants";
import { AppDispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getTokens } from "reducers/tokenSlice";

const useTokensList = (listType: 'GET_ACTIVE_HAS_TOKEN' | 'GET_ALL_HAS_TOKEN' | 'GET_ALL_ACTIVE') => {
    const dispatch = useDispatch<AppDispatch>()
    const deposit_info = useSelector((state: RootState) => state.auth.deposit_info)
    const { tokenListing, isLoading } = useSelector((state: RootState) => state.token)

    useEffect(() => {
        dispatch(getTokens())
    }, [])

    const tokenList = useMemo(() => {
        let data: any[] = []
        switch (listType) {
            case GET_ALL_ACTIVE:
                data = tokenListing.filter((token: tokenType) => token.is_disabled === TOKEN_STATUS.ACTIVE)
                break;
            case GET_ACTIVE_HAS_TOKEN:
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
            case GET_ALL_HAS_TOKEN:
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
        return data
    }, [listType, tokenListing, deposit_info])

    return {
        tokenList,
        isLoading
    }
}

export default useTokensList