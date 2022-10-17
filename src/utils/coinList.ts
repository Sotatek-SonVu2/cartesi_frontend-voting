
import { BINANCE_TOKEN, CARTESI_TOKEN, ETHEREUM_TOKEN } from "./contants";
import DepositIcon from '../images/deposit.png';
import CartesiIcon from "../images/cartesi_icon.png";
import BinanceIcon from "../images/bnb-icon.png";
import EtherIcon from "../images/ethereum-icon.svg";
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
            symbol: 'ETH',
            token_name: ETHEREUM_TOKEN,
            address: getToken(ETHEREUM_TOKEN)?.tokenAddress || ''
        },
        {
            key: 3,
            token_icon: BinanceIcon,
            symbol: 'BNB',
            token_name: BINANCE_TOKEN,
            address: getToken(BINANCE_TOKEN)?.tokenAddress || ''
        },
    ],
    5: [
        {
            key: 1,
            token_icon: DepositIcon,
            symbol: 'CTSI',
            token_name: CARTESI_TOKEN,
            address: getToken(CARTESI_TOKEN)?.tokenAddress || ''
        },
        {
            key: 2,
            token_icon: DepositIcon,
            symbol: 'ETH',
            token_name: ETHEREUM_TOKEN,
            address: getToken(ETHEREUM_TOKEN)?.tokenAddress || ''
        }
    ]
}