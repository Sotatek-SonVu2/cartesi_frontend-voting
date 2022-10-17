
import BinanceIcon from "../images/bnb-icon.png";
import CartesiIcon from "../images/cartesi_icon.png";
import EtherIcon from "../images/ethereum-icon.svg";
import { BINANCE_TOKEN, CARTESI_TOKEN, ETHEREUM_TOKEN, SOTATEK_TOKEN } from "./contants";
import { getToken } from "./getToken";

export const coinList: any = {
    31337: [
        {
            key: 1,
            token_icon: CartesiIcon,
            symbol: 'CTSI',
            token_name: CARTESI_TOKEN,
            address: getToken(CARTESI_TOKEN)?.tokenAddress || ''
        },
        {
            key: 2,
            token_icon: EtherIcon,
            symbol: 'SOTA',
            token_name: SOTATEK_TOKEN,
            address: getToken(SOTATEK_TOKEN)?.tokenAddress || ''
        },
    ],
    5: [
        {
            key: 1,
            token_icon: CartesiIcon,
            symbol: 'CTSI',
            token_name: CARTESI_TOKEN,
            address: getToken(CARTESI_TOKEN)?.tokenAddress || ''
        },
        {
            key: 2,
            token_icon: EtherIcon,
            symbol: 'ETH',
            token_name: ETHEREUM_TOKEN,
            address: getToken(ETHEREUM_TOKEN)?.tokenAddress || ''
        }
    ]
}