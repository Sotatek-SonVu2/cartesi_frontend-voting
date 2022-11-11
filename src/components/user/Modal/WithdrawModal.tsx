import { yupResolver } from "@hookform/resolvers/yup"
import ModalComponent from "common/Modal"
import NoToken from "common/NoToken"
import TokensList from "common/TokensList"
import useTokensList from "hook/useTokensList"
import { useState } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { ButtonModal, ModalContent, ModalTitle } from "styled/common"
import { ErrorText, Input } from "styled/form"
import { GET_ALL_HAS_TOKEN, NO_TOKEN } from "utils/contants"
import * as yup from "yup"

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

const schema = yup.object({
    amount: yup.number().typeError('Amount must be a number!').positive('Amount must be a positive number!').required('Amount is a required field!'),
}).required();

const WithdrawModal = ({ isVisible, toggleModal, onAddVoucher }: Props) => {
    const { tokenList, isLoading } = useTokensList(GET_ALL_HAS_TOKEN)
    const [token, setToken] = useState<string>(tokenList[0]?.name)
    const { register, handleSubmit, formState: { errors } }: any = useForm<{ amount: number }>({
        resolver: yupResolver(schema),
        defaultValues: {
            amount: 0
        }
    });

    const onSubmit = async (dataForm: { amount: number }) => {
        onAddVoucher(dataForm.amount.toString(), token)
        toggleModal()
    }

    return (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal} title='Withdraw Token' userGuideType='withdrawModal'>
            {tokenList?.length > 0 ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalTitle>
                        <TokensList
                            tokenList={tokenList}
                            isLoading={isLoading}
                            onChooseCoin={(value: string) => setToken(value)}
                            tokenType={token}
                        />
                    </ModalTitle>
                    <ModalContent>
                        <FormItem>
                            <label>Amount</label>
                            <Input
                                type="string"
                                {...register("amount")}
                                placeholder="Enter amount.."
                            />
                        </FormItem>
                    </ModalContent>
                    <ErrorMessage>{errors?.amount?.message}</ErrorMessage>
                    <ButtonModal type="submit" disabled={isLoading} success>
                        Withdraw
                    </ButtonModal>
                </form>
            ) : (
                <NoToken type={NO_TOKEN} />
            )}
        </ModalComponent>
    )
}

export default WithdrawModal