import { yupResolver } from '@hookform/resolvers/yup'
import Checkbox from 'common/Checkbox'
import ModalComponent from "common/Modal"
import { createNotifications } from "common/Notification"
import { handleResponse } from "helper/handleResponse"
import { sendInput } from "helper/sendInput"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import styled from 'styled-components'
import { ButtonModal } from "styled/common"
import { CheckboxGroup, ErrorText, FormItem, Input, RadioGroup, WaitingMessage } from "styled/form"
import { Loader } from "styled/loading"
import { ADD_TOKEN, ERROR_MESSAGE, NOTI_TYPE, NO_RESPONSE_ERROR, TOKEN_ACTION_ARRAY, TOKEN_STATUS, TOKEN_STATUS_ARRAY, UPDATE_TOKEN, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE } from "utils/contants"
import { resInput, tokenType, TokenForm, tokenTypePayload } from "utils/interface"
import * as yup from "yup"

interface PropsType {
    isVisible: boolean
    toggleModal: any
    data: tokenType | null
    getData: () => void
}

const Item = styled.div`
    width: 41%;
`

const iconDefault = 'https://cdn-icons-png.flaticon.com/512/2927/2927910.png'

const schema = yup.object({
    name: yup.string().required('Name is a required field!').max(200),
    address: yup.string().required('Address is a required field!').max(42),
    fee: yup.number().min(0).typeError('Fee must be a number!').required('Fee is a required field!'),
}).required();

const AddEditToken = ({ isVisible, toggleModal, data, getData }: PropsType) => {
    const { register, handleSubmit, control, formState: { errors } }: any = useForm<TokenForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: data ? data.name : '',
            address: data ? data.address : '',
            fee: data ? data.fee : 0,
            icon: data ? data.icon : '',
            status: data ? data.status.toString() : '1',
            can_create_campaign: data?.can_create_campaign === TOKEN_STATUS.ACTIVE,
            can_vote: data?.can_vote === TOKEN_STATUS.ACTIVE,
        }
    });

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [callMessage, setCallMessage] = useState<string>('')
    const [isCreate, setIsCreate] = useState<boolean>(data?.can_create_campaign === TOKEN_STATUS.ACTIVE)

    const onCancel = () => {
        toggleModal()
    }

    const onSubmit = async (dataForm: TokenForm) => {

        try {
            const { name, fee, address, icon, can_vote, can_create_campaign, status } = dataForm
            const payload: tokenTypePayload = {
                action: !data ? ADD_TOKEN : UPDATE_TOKEN,
                id: data ? data.id : 0,
                name,
                fee: isCreate ? fee : 0,
                address,
                can_vote: can_vote ? TOKEN_STATUS.ACTIVE : TOKEN_STATUS.DISABLED,
                can_create_campaign: can_create_campaign ? TOKEN_STATUS.ACTIVE : TOKEN_STATUS.DISABLED,
                status: parseInt(status),
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
                    <label>Name:</label>
                    <Input
                        type="text"
                        {...register("name")}
                        placeholder="Enter new token name..."
                    />
                    <ErrorText>{errors?.name?.message}</ErrorText>
                </FormItem>
                <FormItem>
                    <label>Address:</label>
                    <Input
                        type="text"
                        {...register("address")}
                        placeholder="Enter token address..."
                    />
                    <ErrorText>{errors?.address?.message}</ErrorText>
                </FormItem>

                <FormItem>
                    <label>Image Link:</label>
                    <Input
                        type="text"
                        {...register("icon")}
                        placeholder="Enter image link..."
                    />
                </FormItem>

                <FormItem>
                    <label>Campaign creation fee:</label>
                    <Input
                        type="string"
                        {...register("fee")}
                        placeholder="Enter the fee per campaign creation..."
                        disabled={!isCreate}
                    />
                    <ErrorText>{errors?.fee?.message}</ErrorText>
                </FormItem>

                <FormItem>
                    <label>Status:</label>
                    <RadioGroup>
                        {TOKEN_STATUS_ARRAY.map((item, index) => (
                            <Item key={index}>
                                <input type="radio" {...register("status")} value={item.value} />
                                <label>{item.label}</label>
                            </Item>
                        ))}
                    </RadioGroup>
                </FormItem>

                <FormItem>
                    <label>Actions:</label>
                    <Controller
                        control={control}
                        name="actions"
                        render={({
                            field: { onChange },
                        }) => (
                            <CheckboxGroup style={{ justifyContent: 'unset' }}>
                                {TOKEN_ACTION_ARRAY.map((item, index) => (
                                    <Item key={index}>
                                        <input
                                            type="checkbox"
                                            {...register(`${item.key}`)}
                                            onChange={(e) => {
                                                onChange(e.target.checked)
                                                if (item.key === 'can_create_campaign') {
                                                    setIsCreate(e.target.checked)
                                                }
                                            }}
                                        />
                                        <label>{item.label}</label>
                                    </Item>
                                ))}
                            </CheckboxGroup>
                        )}
                    />
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