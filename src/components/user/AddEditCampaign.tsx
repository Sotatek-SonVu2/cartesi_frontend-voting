
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "common/Loading";
import { createNotifications } from "common/Notification";
import Title from "common/Title";
import { handleInspectApi } from "helper/handleInspectApi";
import { handleResponse } from "helper/handleResponse";
import { sendInput } from "helper/sendInput";
import TrashIcon from 'images/trash.svg';
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDepositInfo } from "reducers/authSlice";
import { ROUTER_PATH } from "routes/contants";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import { Content, DefaultButton, FlexLayoutBtn, PrimaryButton, SuccessButton } from "styled/common";
import { ErrorText, Form, FormItem, Input, OptionLabel, TextArea, Wrapper } from "styled/form";
import { Loader } from "styled/loading";
import { convertLocalToUtc, convertUtcToLocal, randomColor } from "utils/common";
import {
    CAMPAIGN_DETAIL,
    CREATE_CAMPAIGN,
    EDIT_CAMPAIGN,
    ERROR_MESSAGE,
    FORMAT_DATETIME,
    NOTI_TYPE,
    NO_RESPONSE_ERROR, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE
} from "utils/contants";
import getTokenAddress from "utils/getTokenAddress";
import { AddEditDataType, MetadataType, OptionType, resInput } from "utils/interface";
import { validateDate } from "utils/validate";
import * as yup from "yup";
import AddCampaignModal from "./Modal/AddCampaignModal";

const FORMAT_DATE_PICKER = 'MM/dd/yyyy h:mm aa'

const SubmitButton = styled(SuccessButton)`
    display: flex;
    align-items: center;
`

const OptionDefault: OptionType[] = [
    {
        name: '',
        brief_introduction: '',
        avatar: '',
    }
]

const optionSchema = {
    name: yup.string().required('Name is a required field!').max(200),
    brief_introduction: yup.string().required('Brief introduction is a required field!').max(400),
}

const schema = yup.object({
    name: yup.string().required('Name is a required field!').max(200),
    description: yup.string().required('Desciption is a required field!').max(400),
    options: yup.array().of(yup.object().shape(optionSchema))
}).required();

const AddEditCampaign = () => {
    const dispatch = useDispatch<AppDispatch>()
    let navigate = useNavigate();
    const { campaignId } = useParams();
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const { tokenListing } = useSelector((state: RootState) => state.token)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [callMessage, setCallMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dateTime, setDateTime] = useState({
        startDate: new Date(),
        endDate: new Date(),
        formErrors: {
            startDate: '',
            endDate: ''
        }
    })
    const { register, handleSubmit, setValue, control, formState: { errors } }: any = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            options: campaignId ? [] : OptionDefault
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options"
    });
    const [dataCreate, setDataCreate] = useState<AddEditDataType>()
    const { startDate, endDate, formErrors } = dateTime

    useEffect(() => {
        const getData = async () => {
            // campaignId exits -> edit campaign
            if (campaignId) {
                try {
                    setIsLoading(true)
                    const data = {
                        action: CAMPAIGN_DETAIL,
                        campaign_id: parseInt(campaignId)
                    }
                    const result = await handleInspectApi(data, metadata)
                    if (!result.error) {
                        const { start_time, end_time, name, description } = result.campaign[0]
                        const options = result.candidates.map((item: OptionType) => {
                            return {
                                name: item.name,
                                brief_introduction: item.brief_introduction,
                                avatar: item.avatar || '',
                            }
                        })
                        setValue('name', name)
                        setValue('description', description)
                        setValue('options', [...options])
                        setDateTime({
                            startDate: new Date(convertUtcToLocal(new Date(start_time))),
                            endDate: new Date(convertUtcToLocal(new Date(end_time))),
                            formErrors: { startDate: '', endDate: '' },
                        })
                    } else {
                        createNotifications(NOTI_TYPE.DANGER, result?.error)
                    }
                } catch (error) {
                    createNotifications(NOTI_TYPE.DANGER, ERROR_MESSAGE)
                    throw error
                } finally {
                    setIsLoading(false)
                }
            }
        }

        getData()
    }, [campaignId])

    const handleChangeDate = (key: string) => (value: Date) => {
        const validate = validateDate(key, value, endDate, startDate)
        setDateTime({
            ...dateTime,
            formErrors: { ...formErrors, ...validate },
            [key]: value
        })
    }

    const createCampaign = async (token: string) => {
        try {
            setIsLoading(true)
            setIsVisible(false);
            setCallMessage(WAITING_FOR_CONFIRMATION)
            const { epoch_index, input_index }: resInput = await sendInput({
                ...dataCreate,
                token_address: getTokenAddress(tokenListing, token)
            });
            handleResponse(epoch_index, input_index, ((payload: any) => {
                if (!payload || payload.message !== NO_RESPONSE_ERROR && !payload.error) {
                    const message = payload ? 'Add campaign successfully!' : WAITING_RESPONSE_FROM_SERVER_MESSAGE
                    const router = payload ? `${ROUTER_PATH.VOTING}/${payload.id}` : ROUTER_PATH.HOMEPAGE
                    createNotifications(NOTI_TYPE.SUCCESS, message)
                    dispatch(getDepositInfo())
                    navigate(`${router}`, { replace: true });
                } else if (payload.message === NO_RESPONSE_ERROR) {
                    setCallMessage(`Waiting: ${payload.times}s.`)
                } else {
                    createNotifications(NOTI_TYPE.DANGER, payload?.error || ERROR_MESSAGE)
                    setIsLoading(false)
                }
            }))
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
            setIsLoading(false)
            setCallMessage('')
            throw error
        }
    }

    const editCampaign = async (data: AddEditDataType) => {
        try {
            setIsLoading(true)
            setCallMessage(WAITING_FOR_CONFIRMATION)
            const { epoch_index, input_index }: resInput = await sendInput(data);
            handleResponse(epoch_index, input_index, ((payload: any) => {
                if (!payload || payload.message !== NO_RESPONSE_ERROR && !payload.error) {
                    const message = payload ? 'Edit campaign successfully!' : WAITING_RESPONSE_FROM_SERVER_MESSAGE
                    createNotifications(NOTI_TYPE.SUCCESS, message)
                    dispatch(getDepositInfo())
                    navigate(`${ROUTER_PATH.VOTING}/${campaignId}`, { replace: true });
                } else if (payload.message === NO_RESPONSE_ERROR) {
                    setCallMessage(`Waiting: ${payload.times}s.`)
                } else {
                    createNotifications(NOTI_TYPE.DANGER, payload?.error || ERROR_MESSAGE)
                    setIsLoading(false)
                }
            }))
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
            setIsLoading(false)
            throw error
        }
    }

    const onSubmit = async (dataForm: any) => {
        const checkDate = validateDate('startDate', startDate, endDate, startDate)
        if (!checkDate?.startDate) {
            const data: AddEditDataType = {
                action: !campaignId ? CREATE_CAMPAIGN : EDIT_CAMPAIGN,
                name: dataForm.name,
                description: dataForm.description,
                start_time: moment(convertLocalToUtc(startDate)).format(FORMAT_DATETIME),   // Convert local datetime to UTC+0 datetime and format
                end_time: moment(convertLocalToUtc(endDate)).format(FORMAT_DATETIME), // Convert local datetime to UTC+0 datetime and format
                candidates: dataForm.options.map((item: OptionType) => {
                    return {
                        name: item.name,
                        brief_introduction: item.brief_introduction,
                        avatar: randomColor(),
                    }
                })
            }
            if (!campaignId) {
                setIsVisible(true);
                setDataCreate(data)
            } else {
                const newData: AddEditDataType = {
                    id: parseInt(campaignId),
                    ...data
                }
                editCampaign(newData)
            }
        } else {
            setDateTime({
                ...dateTime,
                formErrors: { ...formErrors, ...checkDate }
            })
            createNotifications(NOTI_TYPE.DANGER, 'Please check the entered data!')
        }
    };

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    return (
        <Content>
            {isLoading && (
                <Loading isScreenLoading={isLoading} messages={callMessage} />
            )}
            <Title
                text={!campaignId ? 'Create new campaign' : 'Edit campaign'}
                userGuideType={!campaignId ? 'create' : 'edit'}
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem>
                    <label>Name</label>
                    <Input type="text"  {...register("name")} placeholder="Campaign's name.." />
                    <ErrorText>{errors?.name?.message}</ErrorText>
                </FormItem>
                <FormItem>
                    <label>Start time</label>
                    <DatePicker
                        name="startDate"
                        selected={startDate}
                        onChange={handleChangeDate('startDate')}
                        customInput={<Input />}
                        showTimeSelect
                        dateFormat={FORMAT_DATE_PICKER}
                    />
                    <ErrorText>{formErrors.startDate}</ErrorText>
                </FormItem>
                <FormItem>
                    <label>End time</label>
                    <DatePicker
                        name="endDate"
                        selected={endDate}
                        onChange={handleChangeDate('endDate')}
                        customInput={<Input />}
                        minDate={startDate}
                        showTimeSelect
                        dateFormat={FORMAT_DATE_PICKER}
                    />
                    <ErrorText>{formErrors.endDate}</ErrorText>
                </FormItem>
                <FormItem>
                    <label>Description</label>
                    <TextArea name="description" {...register("description")} placeholder="Description..." />
                    <ErrorText>{errors?.description?.message}</ErrorText>
                </FormItem>
                <FormItem>
                    <Wrapper>
                        <label>Candidate options:</label>
                        {fields.map((_: any, index: number) => (
                            <div key={index}>
                                <OptionLabel>
                                    <label>Option {index + 1}</label>
                                    {fields.length > 1 && (
                                        <img src={TrashIcon} alt="trash icon" width={25} onClick={() => remove(index)} />
                                    )}
                                </OptionLabel>
                                <Input
                                    type="text"
                                    {...register(`options.${index}.name`)}
                                    placeholder="Option's name.."
                                />
                                <ErrorText>{errors?.options?.[index]?.name?.message}</ErrorText>
                                <TextArea
                                    {...register(`options.${index}.brief_introduction`)}
                                    placeholder="Brief Introduction..."
                                />
                                <ErrorText>{errors?.options?.[index]?.brief_introduction?.message}</ErrorText>
                            </div>
                        ))}
                    </Wrapper>
                    <PrimaryButton type="button" onClick={() => append(OptionDefault)}>Add Option</PrimaryButton>
                </FormItem>
                <FlexLayoutBtn>
                    <DefaultButton type="button" onClick={() => navigate(-1)}>Back</DefaultButton>
                    <SubmitButton type="submit" disabled={isLoading}>
                        {isLoading && (<Loader />)}
                        {!campaignId ? 'Create' : 'Save'}
                    </SubmitButton>
                </FlexLayoutBtn>
            </Form>

            {isVisible && (
                <AddCampaignModal
                    isVisible={isVisible}
                    toggleModal={toggleModal}
                    onClick={createCampaign}
                />
            )}
        </Content>
    )
}

export default AddEditCampaign