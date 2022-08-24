import styled from "styled-components"
import ModalComponent from "../../common/Modal"
import { PrimaryButton, ModalTitle } from "../../styled/common"
import { Loader } from "../../styled/loading"
import { ErrorText, Input } from "../../styled/form"
import { useState } from "react"


const Button = styled(PrimaryButton)`
    display: flex;
    margin: 0 auto;
    padding: 10px 20px;
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
}



const ERROR_TEXT = 'Please enter amount'

const WithdrawModal = ({ isVisible, toggleModal }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [amount, setAmount] = useState({
        value: '',
        errorText: ''
    });

    const handleChange = (value: string) => {
        setAmount({
            value,
            errorText: !value ? ERROR_TEXT : ''
        })
    }

    const onWithdraw = () => {
        console.log('onWithdraw', onWithdraw)
        return 123
    }

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title='Withdraw Token' isLoading={isLoading}>
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
                <Button onClick={onWithdraw} disabled={isLoading}>
                    {isLoading && (<Loader />)}
                    Save
                </Button>
            </div>
        </ModalComponent>
    )
}

export default WithdrawModal