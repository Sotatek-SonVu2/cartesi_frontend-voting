import styled from "styled-components";

import { CoinItem } from "styled/list";
import { FlexLayout } from "styled/main";
import { tokenConfig } from "utils/tokenConfig";

interface PropsType {
    onChooseCoin: (coinToken: string) => void
    tokenType: string
}

interface tokenConfigType {
    key: number
    token_icon: string
    symbol: string
    token_name: string
    address: string
}

const NETWORK: any = process.env.REACT_APP_NETWORK || ''

const CoinWrapper = styled(FlexLayout)`
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 15px;
`

const TokensList = ({ onChooseCoin, tokenType }: PropsType) => {
    return (
        <CoinWrapper>
            {tokenConfig[NETWORK]?.map(({ key, token_icon, symbol, token_name, address }: tokenConfigType) => (
                <CoinItem key={key} onClick={() => onChooseCoin(token_name)} active={token_name === tokenType}>
                    <img src={token_icon} alt="token_icon" width={20} />
                    <span>{symbol}</span>
                </CoinItem>
            ))}
        </CoinWrapper>
    )
}

export default TokensList