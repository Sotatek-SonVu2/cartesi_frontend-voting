
import { yupResolver } from "@hookform/resolvers/yup";
import MDEditor from "@uiw/react-md-editor";
import Label from "common/Label";
import Loading from "common/Loading";
import { createNotifications } from "common/Notification";
import Title from "common/Title";
import TokensList from "common/TokensList";
import { handleInspectApi } from "helper/handleInspectApi";
import { handleResponse } from "helper/handleResponse";
import { sendInput } from "helper/sendInput";
import useTokensList from "hook/useTokensList";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDepositInfo } from "reducers/authSlice";
import { ROUTER_PATH } from "routes/contants";
import { AppDispatch, RootState } from "store";
import styled from "styled-components";
import { Content, DefaultButton, FlexLayoutBtn, SuccessButton } from "styled/common";
import { ErrorText, Form, FormItem, Input } from "styled/form";
import { Loader } from "styled/loading";
import { convertLocalToUtc, convertUtcToLocal, randomColor } from "utils/common";
import {
    CAMPAIGN_DETAIL,
    CREATE_CAMPAIGN,
    EDIT_CAMPAIGN,
    ERROR_MESSAGE,
    FORMAT_DATETIME, GET_CAN_CREATE_ACTIVE, GET_CAN_VOTE_ACTIVE,
    NOTI_TYPE,
    NO_RESPONSE_ERROR, WAITING_FOR_CONFIRMATION, WAITING_RESPONSE_FROM_SERVER_MESSAGE
} from "utils/contants";
import getTokenAddress from "utils/getTokenAddress";
import { AddEditDataType, MetadataType, OptionType, resInput, tokenType } from "utils/interface";
import { validateDate } from "utils/validate";
import * as yup from "yup";
import CandidateOptions from "./Item/CandidateOptions";

const FORMAT_DATE_PICKER = 'MM/dd/yyyy h:mm aa'

const SubmitButton = styled(SuccessButton)`
    display: flex;
    align-items: center;
`

const NoTokens = styled.p`
    background: #dc3545;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
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
    fee: yup.number().min(0).typeError('Fee must be a number!').required('Fee is a required field!'),
    options: yup.array().of(yup.object().shape(optionSchema))
}).required();

const AddEditCampaign = () => {
    const dispatch = useDispatch<AppDispatch>()
    let navigate = useNavigate();
    const { campaignId } = useParams();
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const token_to_create = useTokensList(GET_CAN_CREATE_ACTIVE)
    const token_to_vote = useTokensList(GET_CAN_VOTE_ACTIVE)

    const [tokenToCreate, setTokenToCreate] = useState<string>('')
    const [tokenToVote, setTokenToVote] = useState<string>('')
    const [callMessage, setCallMessage] = useState<string>('')
    const [isWaiting, setIsWaiting] = useState<boolean>(false)
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
            fee: 0,
            options: campaignId ? [] : OptionDefault
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options"
    });
    const { startDate, endDate, formErrors } = dateTime

    useEffect(() => {
        const getData = async () => {
            // campaignId exits -> edit campaign -> call campaign detail api -> get data
            if (campaignId) {
                try {
                    setIsWaiting(true)
                    const data = {
                        action: CAMPAIGN_DETAIL,
                        campaign_id: parseInt(campaignId)
                    }
                    const result = await handleInspectApi(data, metadata)
                    if (!result.error) {
                        const { start_time, end_time, name, description, fee, accept_token } = result.campaign[0]
                        const token = token_to_vote.tokenList?.find((token: tokenType) => token.address === accept_token)?.name
                        const options = result.candidates.map((item: OptionType) => {
                            return {
                                name: item.name,
                                brief_introduction: item.brief_introduction,
                                avatar: item.avatar || '',
                            }
                        })
                        setValue('name', name)
                        setValue('description', description)
                        setValue('fee', fee)
                        setValue('options', [...options])
                        setTokenToVote(token)
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
                    setIsWaiting(false)
                }
            } else {
                setTokenToCreate(token_to_create.tokenList[0]?.name)
                setTokenToVote(token_to_vote.tokenList[0]?.name)
            }
        }
        getData()
    }, [campaignId, token_to_vote.isLoading, token_to_create.isLoading])

    const handleChangeDate = (key: string) => (value: Date) => {
        const validate = validateDate(key, value, endDate, startDate)
        setDateTime({
            ...dateTime,
            formErrors: { ...formErrors, ...validate },
            [key]: value
        })
    }

    const createCampaign = async (data: AddEditDataType) => {
        try {
            setIsWaiting(true)
            setCallMessage(WAITING_FOR_CONFIRMATION)
            const { epoch_index, input_index }: resInput = await sendInput(data);
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
                    setIsWaiting(false)
                }
            }))
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
            setIsWaiting(false)
            setCallMessage('')
            throw error
        }
    }

    const editCampaign = async (data: AddEditDataType) => {
        try {
            setIsWaiting(true)
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
                    setIsWaiting(false)
                }
            }))
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
            setIsWaiting(false)
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
                accept_token: getTokenAddress(token_to_vote.tokenList, tokenToVote),
                fee: dataForm.fee,
                candidates: dataForm.options.map((item: OptionType) => {
                    return {
                        name: item.name,
                        brief_introduction: item.brief_introduction,
                        avatar: randomColor(),
                    }
                })
            }

            if (!campaignId) {
                const newData: AddEditDataType = {
                    token_address: getTokenAddress(token_to_create.tokenList, tokenToCreate),
                    ...data
                }
                createCampaign(newData)
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

    return (
        <Content>
            {isWaiting && (
                <Loading isScreenLoading={isWaiting} messages={callMessage} />
            )}
            <Title
                text={!campaignId ? 'Create new campaign' : 'Edit campaign'}
                userGuideType={!campaignId ? 'create' : 'edit'}
            />
            {token_to_create.tokenList.length > 0 && token_to_vote.tokenList.length > 0 ? (
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem>
                        <Label required>Name:</Label>
                        <Input type="text"  {...register("name")} placeholder="Campaign's name.." />
                        <ErrorText>{errors?.name?.message}</ErrorText>
                    </FormItem>
                    <FormItem>
                        <Label required>Start time:</Label>
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
                        <Label required>End time:</Label>
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
                        <Label required>Description:</Label>
                        <Controller
                            control={control}
                            {...register("description")}
                            render={({
                                field: { value, onChange },
                            }) => (
                                <div style={{ margin: '10px 0px' }}>
                                    <MDEditor
                                        value={value}
                                        onChange={onChange}
                                        textareaProps={{
                                            placeholder: "Description... (Markdown writing is supported)"
                                        }}
                                    />
                                </div>
                            )}
                        />
                        <ErrorText>{errors?.description?.message}</ErrorText>
                    </FormItem>
                    {!campaignId && (
                        <FormItem>
                            <Title
                                text='Payments:'
                                userGuideType='can_create_campaign'
                                id='can_create_campaign'
                                type="dark"
                                titleStyle={{
                                    color: '#fff', fontSize: '16px', lineHeight: 'unset'
                                }}
                            />
                            <TokensList
                                onChooseCoin={(value: string) => setTokenToCreate(value)}
                                tokenType={tokenToCreate}
                                isLoading={token_to_create.isLoading}
                                tokenList={token_to_create.tokenList}
                                style={{
                                    justifyContent: 'left',
                                    marginTop: '10px',
                                }}
                            />
                        </FormItem>
                    )}
                    <FormItem>
                        <Title
                            text='Voting fee:'
                            userGuideType='can_vote'
                            type="dark"
                            id="can_vote"
                            titleStyle={{
                                color: '#fff', fontSize: '16px', lineHeight: 'unset'
                            }}
                        />
                        <TokensList
                            onChooseCoin={(value: string) => setTokenToVote(value)}
                            tokenType={tokenToVote}
                            isLoading={token_to_vote.isLoading}
                            tokenList={token_to_vote.tokenList}
                            style={{
                                justifyContent: 'left',
                                marginTop: '10px',
                                marginBottom: '0px',
                            }}
                        />
                        <Input type="text"  {...register("fee")} placeholder="Voting fee.." />
                        <ErrorText>{errors?.fee?.message}</ErrorText>
                    </FormItem>
                    <FormItem>
                        <CandidateOptions
                            fields={fields}
                            errors={errors}
                            register={register}
                            control={control}
                            onAdd={() => append(OptionDefault)}
                            onRemove={(index: number) => remove(index)}
                        />
                    </FormItem>

                    <FlexLayoutBtn>
                        <DefaultButton type="button" onClick={() => navigate(-1)}>Back</DefaultButton>
                        <SubmitButton type="submit" disabled={isWaiting}>
                            {isWaiting && (<Loader />)}
                            {!campaignId ? 'Create' : 'Save'}
                        </SubmitButton>
                    </FlexLayoutBtn>
                </Form>
            ) : (
                <NoTokens>
                    You can't create campaign right row! <br />
                    You can check out the Tokens page.
                </NoTokens>
            )}
        </Content>
    )
}

export default AddEditCampaign