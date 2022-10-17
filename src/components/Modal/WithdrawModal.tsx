import { useState } from "react"
import styled from "styled-components"
import CoinsList from "../../common/CoinsList"
import ModalComponent from "../../common/Modal"
import { colorTheme, ModalContent, ModalTitle, SuccessButton } from "../../styled/common"
import { ErrorText, Input } from "../../styled/form"
import { CARTESI_TOKEN } from "../../utils/contants"
import { validateAmount } from "../../utils/validate"

const Button = styled(SuccessButton)`
    background-color: ${colorTheme.success};
    color: #ffffff;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
`

const ErrorMessage = styled(ErrorText)`
    text-align: center;
`

const FormItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    & label {
        margin-right: 20px;
        font-size: 15px;
        font-weight: 400;
    }
`

type Props = {
    isVisible: boolean
    toggleModal: any
    onAddVoucher: (value: string, tokenType: string) => void
}

const WithdrawModal = ({ isVisible, toggleModal, onAddVoucher }: Props) => {
    const [amount, setAmount] = useState({
        value: '',
        errorText: ''
    });
    const [tokenType, setTokenType] = useState<string>(CARTESI_TOKEN)

    const handleChange = (value: string) => {
        setAmount({
            value,
            errorText: validateAmount(value)
        })
    }

    const handleAddVoucher = () => {
        if (validateAmount(amount.value)) {
            setAmount({
                ...amount,
                errorText: validateAmount(amount.value)
            })
        } else {
            onAddVoucher(amount.value, tokenType)
            toggleModal()
        }
    }

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title='Withdraw Token'>
            <div>
                <ModalTitle>
                    <CoinsList onChooseCoin={(token: string) => setTokenType(token)} tokenType={tokenType} />
                </ModalTitle>
                <ModalContent>
                    <FormItem>
                        <label>Amount</label>
                        <Input
                            type="number"
                            name="amount"
                            value={amount.value}
                            placeholder="Enter amount.."
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                        />
                    </FormItem>
                </ModalContent>
                <ErrorMessage>{amount.errorText}</ErrorMessage>
                <Button onClick={handleAddVoucher}>
                    Withdraw
                </Button>
            </div>
        </ModalComponent>
    )
}

export default WithdrawModal