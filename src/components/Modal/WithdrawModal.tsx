import { useState } from "react"
import styled from "styled-components"
import ModalComponent from "../../common/Modal"
import { colorTheme, ModalTitle, SuccessButton } from "../../styled/common"
import { ErrorText, Input } from "../../styled/form"
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
    onAddWithdraw: any
}

const WithdrawModal = ({ isVisible, toggleModal, onAddWithdraw }: Props) => {
    const [amount, setAmount] = useState({
        value: '',
        errorText: ''
    });

    const handleChange = (value: string) => {
        setAmount({
            value,
            errorText: validateAmount(value)
        })
    }

    const handleAddWithdraw = () => {
        if (validateAmount(amount.value)) {
            setAmount({
                ...amount,
                errorText: validateAmount(amount.value)
            })
        } else {
            onAddWithdraw(amount.value)
            toggleModal()
        }
    }

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title='Withdraw Token'>
            <div>
                <ModalTitle>
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
                </ModalTitle>
                <ErrorMessage>{amount.errorText}</ErrorMessage>
                <Button onClick={handleAddWithdraw}>
                    Withdraw
                </Button>
            </div>
        </ModalComponent>
    )
}

export default WithdrawModal