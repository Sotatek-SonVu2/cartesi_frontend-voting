import styled from "styled-components";

import { CoinBox } from "../styled/list";
import { FlexLayout } from "../styled/main";
import { coinList } from "../utils/coinList";

interface PropsType {
    onChooseCoin: (coinToken: string) => void
    tokenType: string
}

interface CoinListType {
    key: number
    token_icon: string
    symbol: string
    token_name: string
    address: string
}

const CHAIN_ID: any = process.env.REACT_APP_CHAIN_ID || 0

const CoinWrapper = styled(FlexLayout)`
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 15px;
`

const CoinsList = ({ onChooseCoin, tokenType }: PropsType) => {
    return (
        <CoinWrapper>
            {coinList[CHAIN_ID]?.map(({ key, token_icon, symbol, token_name, address }: CoinListType) => (
                <CoinBox key={key} onClick={() => onChooseCoin(token_name)} active={token_name === tokenType}>
                    <img src={token_icon} alt="token_icon" width={30} />
                    <div>{symbol}</div>
                </CoinBox>
            ))}
        </CoinWrapper>
    )
}

export default CoinsList