import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTokens } from "reducers/tokenSlice"
import { AppDispatch, RootState } from "store"
import styled from "styled-components"
import { TokenItem } from "styled/common"
import { DepositInfoBox } from "styled/list"
import { Loader } from "styled/loading"
import { FlexLayout } from "styled/main"
import { TOKEN_STATUS } from "utils/contants"
import { DepositInfoType, tokenType } from "utils/interface"

const FlexWrapper = styled(FlexLayout)`
    flex-wrap: wrap;
    justify-content: center;
`

const DepositInfo = () => {
    const deposit_info = useSelector((state: RootState) => state.auth.deposit_info)
    const dispatch = useDispatch<AppDispatch>()
    const { tokenListing, isLoading } = useSelector((state: RootState) => state.token)

    useEffect(() => {
        dispatch(getTokens())
    }, [])

    const render = () => {
        let data: tokenType[] = []
        if (deposit_info?.length > 0) {
            tokenListing.forEach((token: tokenType) => {
                let obj
                deposit_info.forEach((deposit: DepositInfoType) => {
                    if (deposit.contract_address === token.address) {
                        const amount = deposit.amount - deposit.used_amount - deposit.withdrawn_amount
                        if (token.is_disabled === TOKEN_STATUS.ACTIVE || (amount > 0 && token.is_disabled === TOKEN_STATUS.DISABLED)) {
                            obj = {
                                ...deposit,
                                ...token,
                            }
                            data.push(obj)
                        }
                    }
                })
            })
        } else {
            data = [...tokenListing]
        }

        return (
            <FlexWrapper className="deposit-info-step">
                {!isLoading ? (
                    <>
                        {data?.length > 0 ? data.map((item: any) => (
                            <DepositInfoBox key={item.id} is_disabled={item.is_disabled === TOKEN_STATUS.DISABLED}>
                                <TokenItem>
                                    <img src={item.icon} alt="token_icon" width={20} />
                                    <span>{item.name}: {item.amount - item.used_amount - item.withdrawn_amount || 0}</span>
                                </TokenItem>
                                <div className="tooltip-box">
                                    <p>Deposits: {item.amount || 0} {item.symbol}</p>
                                    <p>Used: {item.used_amount || 0} {item.symbol}</p>
                                    <p>Withdraw: {item.withdrawn_amount || 0} {item.symbol}</p>
                                    <small>{item.is_disabled === TOKEN_STATUS.DISABLED ? '(Inactive Token)' : '(Active Token)'}</small>
                                </div>
                            </DepositInfoBox>
                        )) : (
                            <DepositInfoBox style={{ width: 'unset' }}>
                                The current system does not support any tokens!
                            </DepositInfoBox>
                        )}
                    </>
                ) : (
                    <>
                        <DepositInfoBox style={{ display: 'flex', justifyContent: 'center' }}>
                            <Loader />
                        </DepositInfoBox>
                    </>
                )}
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