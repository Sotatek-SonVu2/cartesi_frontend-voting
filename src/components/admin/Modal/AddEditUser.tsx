import Checkbox from "common/Checkbox"
import ModalComponent from "common/Modal"
import { createNotifications } from "common/Notification"
import { handleResponse } from "helper/handleResponse"
import { sendInput } from "helper/sendInput"
import { ChangeEvent, useState } from "react"
import { ButtonModal } from "styled/common"
import { CheckboxGroup, ErrorText, FormItem, Input, WaitingMessage } from "styled/form"
import { Loader } from "styled/loading"
import { ADD_ROLE, ERROR_MESSAGE, NOTI_TYPE, NO_RESPONSE_ERROR, UPDATE_ROLE, USER_AUTH, USER_AUTH_ARRAY, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE } from "utils/contants"
import { resInput, usersType, usersTypePayload } from "utils/interface"
import { validateField, validateFields } from "utils/validate"

interface PropsType {
    isVisible: boolean
    toggleModal: any
    data: usersType | null
    getData: () => void
}

const AddEditUser = ({ isVisible, toggleModal, data, getData }: PropsType) => {
    const initialValue: usersType = {
        manage_post: data ? data.manage_post : 0,
        manage_system: data ? data.manage_system : 0,
        manage_token: data ? data.manage_token : 0,
        manage_user: data ? data.manage_user : 0,
        user: data ? data.user : '',
        formErrors: { user: '' },
    }

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [form, setForm] = useState<usersType>(initialValue)
    const [callMessage, setCallMessage] = useState<string>('')
    const { manage_post, manage_system, manage_token, manage_user, user, formErrors } = form

    const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        const validate = validateField(key, value)
        setForm({
            ...form,
            formErrors: { ...formErrors, ...validate },
            [key]: value
        })
    }

    const onChecked = (key: string) => (e: any) => {
        const data: any = { ...form }
        data[key] = e.target.checked ? USER_AUTH.YES : USER_AUTH.NO
        setForm({
            ...data
        })
    }

    const onCancel = () => {
        setForm({ ...initialValue })
        toggleModal()
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const fieldNeedToCheck = {
                user: form.user
            }
            const checkFields = validateFields(fieldNeedToCheck, initialValue.formErrors)

            if (!checkFields.isError) {
                const payload: usersTypePayload = {
                    action: !data ? ADD_ROLE : UPDATE_ROLE,
                    id: data ? data.id : 0,
                    manage_post,
                    manage_system,
                    manage_token,
                    manage_user,
                    user
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
            toggleModal={onCancel}
            title={!data ? 'Create new user' : 'Edit user'}
            isLoading={isLoading}
            width="500px"
        >
            <form onSubmit={onSubmit}>
                <WaitingMessage>{callMessage}</WaitingMessage>
                <FormItem>
                    <label>User:</label>
                    <Input
                        type="text"
                        name="user"
                        value={user}
                        placeholder="Enter user.."
                        onChange={handleChange('user')}
                    />
                    <ErrorText>{formErrors?.user}</ErrorText>
                </FormItem>

                <FormItem>
                    <label>Permisstion:</label>
                    <CheckboxGroup>
                        {USER_AUTH_ARRAY.map((item, index) => {
                            const obj: any = { ...form }
                            const checked = obj[item.key] === USER_AUTH.YES
                            return (
                                <Checkbox key={index} label={item.label} onChange={onChecked(item.key)} checked={checked} />
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