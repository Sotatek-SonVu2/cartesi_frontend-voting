import ModalComponent from "common/Modal"
import { createNotifications } from "common/Notification"
import { handleResponse } from "helper/handleResponse"
import { sendInput } from "helper/sendInput"
import { ChangeEvent, useState } from "react"
import { ButtonModal } from "styled/common"
import { ErrorText, FormItem, Input, WaitingMessage } from "styled/form"
import { Loader } from "styled/loading"
import { ADD_TOKEN, ERROR_MESSAGE, NOTI_TYPE, NO_RESPONSE_ERROR, UPDATE_TOKEN, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE } from "utils/contants"
import { resInput, tokenType, tokenTypePayload } from "utils/interface"
import { validateField, validateFields } from "utils/validate"

interface PropsType {
    isVisible: boolean
    toggleModal: any
    data: tokenType | null
    getData: () => void
}

const AddEditToken = ({ isVisible, toggleModal, data, getData }: PropsType) => {
    const initialValue: tokenType = {
        name: data ? data.name : '',
        fee: data ? data.fee : 0,
        address: data ? data.address : '',
        formErrors: {
            name: '',
            fee: '',
            address: ''
        },
    }
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [form, setForm] = useState<tokenType>(initialValue)
    const [callMessage, setCallMessage] = useState<string>('')
    const { name, fee, address, formErrors } = form

    const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        const validate = validateField(key, value)
        setForm({
            ...form,
            formErrors: { ...formErrors, ...validate },
            [key]: value
        })
    }

    const onCancel = () => {
        setForm({ ...initialValue })
        toggleModal()
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const checkFields = validateFields(form, initialValue.formErrors)
            if (!checkFields.isError) {
                const payload: tokenTypePayload = {
                    action: !data ? ADD_TOKEN : UPDATE_TOKEN,
                    id: data ? data.id : 0,
                    name,
                    fee: typeof fee === 'string' ? parseFloat(fee) : fee,
                    address,
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

            } else {
                setForm({
                    ...form,
                    formErrors: { ...checkFields.formErrors }
                })
            }
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
            <form onSubmit={onSubmit}>
                <WaitingMessage>{callMessage}</WaitingMessage>
                <FormItem>
                    <label>Name</label>
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Enter new token name..."
                        onChange={handleChange('name')}
                    />
                    <ErrorText>{formErrors?.name}</ErrorText>
                </FormItem>
                <FormItem>
                    <label>Address</label>
                    <Input
                        type="text"
                        name="address"
                        value={address}
                        placeholder="Enter token address..."
                        onChange={handleChange('address')}
                    />
                    <ErrorText>{formErrors?.address}</ErrorText>
                </FormItem>

                <FormItem>
                    <label>Fee</label>
                    <Input
                        type="number"
                        name="fee"
                        value={fee}
                        placeholder="Enter the fee per transaction of the token..."
                        onChange={handleChange('fee')}
                    />
                    <ErrorText>{formErrors?.fee}</ErrorText>
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