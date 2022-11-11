import { yupResolver } from '@hookform/resolvers/yup'
import ModalComponent from "common/Modal"
import { createNotifications } from "common/Notification"
import { handleResponse } from "helper/handleResponse"
import { sendInput } from "helper/sendInput"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ButtonModal } from "styled/common"
import { ErrorText, FormItem, Input, WaitingMessage } from "styled/form"
import { Loader } from "styled/loading"
import { ADD_TOKEN, ERROR_MESSAGE, NOTI_TYPE, NO_RESPONSE_ERROR, UPDATE_TOKEN, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE } from "utils/contants"
import { resInput, tokenType, tokenTypePayload } from "utils/interface"
import * as yup from "yup"

interface PropsType {
    isVisible: boolean
    toggleModal: any
    data: tokenType | null
    getData: () => void
}

const iconDefault = 'https://cdn-icons-png.flaticon.com/512/2927/2927910.png'

const schema = yup.object({
    name: yup.string().required('Name is a required field!').max(200),
    address: yup.string().required('Address is a required field!').max(42),
    fee: yup.number().typeError('Fee must be a number!').positive('Fee must be a positive number!').required('Fee is a required field!'),
}).required();

const AddEditToken = ({ isVisible, toggleModal, data, getData }: PropsType) => {
    const { register, handleSubmit, formState: { errors } }: any = useForm<tokenType>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data ? data.name : '',
            address: data ? data.address : '',
            fee: data ? data.fee : 0,
            icon: data ? data.icon : '',
        }
    });
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [callMessage, setCallMessage] = useState<string>('')

    const onCancel = () => {
        toggleModal()
    }

    const onSubmit = async (dataForm: tokenType) => {
        try {
            const { name, fee, address, icon } = dataForm
            const payload: tokenTypePayload = {
                action: !data ? ADD_TOKEN : UPDATE_TOKEN,
                id: data ? data.id : 0,
                name,
                fee: typeof fee === 'string' ? parseFloat(fee) : fee,
                address,
                icon: icon ? icon : iconDefault
            }
            setIsLoading(true)
            setCallMessage(WAITING_FOR_CONFIRMATION)
            const { epoch_index, input_index }: resInput = await sendInput(payload);
            handleResponse(epoch_index, input_index, ((payload: any) => {
                if (!payload || payload.message !== NO_RESPONSE_ERROR && !payload.error) {
                    const message = payload ? payload.message : WAITING_RESPONSE_FROM_SERVER_MESSAGE
                    createNotifications(NOTI_TYPE.SUCCESS, message)
                    setIsLoading(false)
                    onCancel()
                    getData()
                } else if (payload.message === NO_RESPONSE_ERROR) {
                    setCallMessage(`Waiting: ${payload.times}s.`)
                } else {
                    createNotifications(NOTI_TYPE.DANGER, payload?.error || ERROR_MESSAGE)
                    setIsLoading(false)
                    onCancel()
                }
            }))
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
            setIsLoading(false)
            setCallMessage('')
            throw error
        }
    }

    return (
        <ModalComponent
            isVisible={isVisible}
            toggleModal={toggleModal}
            title={!data ? 'Create new token' : 'Edit token'}
            isLoading={isLoading}
            width="500px"
            userGuideType='depositModal'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <WaitingMessage>{callMessage}</WaitingMessage>
                <FormItem>
                    <label>Name</label>
                    <Input
                        type="text"
                        {...register("name")}
                        placeholder="Enter new token name..."
                    />
                    <ErrorText>{errors?.name?.message}</ErrorText>
                </FormItem>
                <FormItem>
                    <label>Address</label>
                    <Input
                        type="text"
                        {...register("address")}
                        placeholder="Enter token address..."
                    />
                    <ErrorText>{errors?.address?.message}</ErrorText>
                </FormItem>

                <FormItem>
                    <label>Image Link</label>
                    <Input
                        type="text"
                        {...register("icon")}
                        placeholder="Enter image link..."
                    />
                </FormItem>

                <FormItem>
                    <label>Fee</label>
                    <Input
                        type="string"
                        {...register("fee")}
                        placeholder="Enter the fee per transaction of the token..."
                    />
                    <ErrorText>{errors?.fee?.message}</ErrorText>
                </FormItem>

                <ButtonModal disabled={isLoading} type="submit" success>
                    {isLoading && (<Loader />)}
                    {!data ? 'Submit' : 'Save'}
                </ButtonModal>
            </form>
        </ModalComponent>
    )
}

export default AddEditToken