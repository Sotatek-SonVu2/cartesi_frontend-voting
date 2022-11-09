import { yupResolver } from "@hookform/resolvers/yup"
import Checkbox from "common/Checkbox"
import ModalComponent from "common/Modal"
import { createNotifications } from "common/Notification"
import { handleResponse } from "helper/handleResponse"
import { sendInput } from "helper/sendInput"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ButtonModal } from "styled/common"
import { CheckboxGroup, ErrorText, FormItem, Input, WaitingMessage } from "styled/form"
import { Loader } from "styled/loading"
import { ADD_ROLE, ERROR_MESSAGE, NOTI_TYPE, NO_RESPONSE_ERROR, UPDATE_ROLE, USER_AUTH, USER_AUTH_ARRAY, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE } from "utils/contants"
import { resInput, usersType, usersTypePayload } from "utils/interface"
import * as yup from "yup"

interface PropsType {
    isVisible: boolean
    toggleModal: any
    data: usersType | null
    getData: () => void
}

const schema = yup.object({
    user: yup.string().required('User is a required field!').max(200),
}).required();

const AddEditUser = ({ isVisible, toggleModal, data, getData }: PropsType) => {
    const initialCheckbox = {
        manage_post: data ? data.manage_post : 0,
        manage_system: data ? data.manage_system : 0,
        manage_token: data ? data.manage_token : 0,
        manage_user: data ? data.manage_user : 0,
    }

    const { register, handleSubmit, formState: { errors } }: any = useForm<usersType>({
        resolver: yupResolver(schema),
        defaultValues: {
            user: data ? data.user : '',
        }
    });
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [checkbox, setCheckbox] = useState(initialCheckbox)
    const [callMessage, setCallMessage] = useState<string>('')
    const { manage_post, manage_system, manage_token, manage_user } = checkbox

    const onChecked = (key: string) => (e: any) => {
        const data: any = { ...checkbox }
        data[key] = e.target.checked ? USER_AUTH.YES : USER_AUTH.NO
        setCheckbox({
            ...data
        })
    }

    const onCancel = () => {
        setCheckbox({ ...initialCheckbox })
        toggleModal()
    }

    const onSubmit = async (dataForm: usersType) => {
        try {
            const payload: usersTypePayload = {
                action: !data ? ADD_ROLE : UPDATE_ROLE,
                id: data ? data.id : 0,
                user: dataForm.user,
                manage_post,
                manage_system,
                manage_token,
                manage_user,
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
            toggleModal={onCancel}
            title={!data ? 'Create new user' : 'Edit user'}
            isLoading={isLoading}
            width="500px"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <WaitingMessage>{callMessage}</WaitingMessage>
                <FormItem>
                    <label>User:</label>
                    <Input
                        type="text"
                        {...register("user")}
                        placeholder="Enter user.."
                    />
                    <ErrorText>{errors?.user?.message}</ErrorText>
                </FormItem>

                <FormItem>
                    <label>Permisstion:</label>
                    <CheckboxGroup>
                        {USER_AUTH_ARRAY.map((item, index) => {
                            const obj: any = { ...checkbox }
                            const checked = obj[item.key] === USER_AUTH.YES
                            return (
                                <Checkbox
                                    key={index}
                                    label={item.label}
                                    onChange={onChecked(item.key)}
                                    checked={checked}
                                />
                            )
                        })}
                    </CheckboxGroup>
                </FormItem>

                <ButtonModal disabled={isLoading} type="submit" success>
                    {isLoading && (<Loader />)}
                    {!data ? 'Submit' : 'Save'}
                </ButtonModal>
            </form>
        </ModalComponent>
    )
}

export default AddEditUser