import { FlexLayout } from "../styled/main"
import DepositIcon from '../images/deposit.png';
import { CoinBox } from "../styled/list";
import styled from "styled-components";
import { useState } from "react";

const data = [
    {
        image: DepositIcon,
        name: 'ETH',
    },
    {
        image: DepositIcon,
        name: 'BTC',
    },
    {
        image: DepositIcon,
        name: 'CTSI',
    },
    {
        image: DepositIcon,
        name: 'DOGE',
    }
]

interface PropsType {
    onChooseCoin: (coinToken: string) => void
}

const CoinWrapper = styled(FlexLayout)`
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 15px;
`

const CoinsList = ({ onChooseCoin }: PropsType) => {
    const [chooseCoin, setChooseCoin] = useState('')

    const onChoose = (name: string) => {
        if (name === chooseCoin) {
            setChooseCoin('')
            return false
        }
        setChooseCoin(name)
        onChooseCoin(name)
    }

    return (
        <CoinWrapper>
            {data.map(({ image, name }) => (
                <CoinBox onClick={() => onChoose(name)} active={name === chooseCoin}>
                    <img src={image} alt="coin-image" width={30} />
                    <div>{name}</div>
                </CoinBox>
            ))}
        </CoinWrapper>
    )
}

export default CoinsList