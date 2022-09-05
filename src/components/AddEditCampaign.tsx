
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../common/Loading";
import { createNotifications } from "../common/Notification";
import { handleInspectApi } from "../helper/handleInspectApi";
import { handleResponse } from "../helper/handleResponse";
import { sendInput } from "../helper/sendInput";
import { getDepositInfo } from "../reducers/authSlice";
import { ROUTER_PATH } from "../routes/contants";
import { AppDispatch, RootState } from "../store";
import { Content, DefaultButton, FlexLayoutBtn, SuccessButton, Title } from "../styled/common";
import { ErrorText, Form, FormItem, Input, TextArea } from "../styled/form";
import { Loader, LoadingAbsolute } from "../styled/loading";
import { convertLocalToUtc, convertUtcToLocal } from "../utils/common";
import { CAMPAIGN_DETAIL, CREATE_CAMPAIGN, EDIT_CAMPAIGN, ERROR_MESSAGE, FORMAT_DATETIME, NOTI_TYPE, NO_RESPONSE_FROM_SERVER_ERROR_MESSAGE } from "../utils/contants";
import { AddEditDataType, MetadataType, OptionType, resInput } from "../utils/interface";
import { validateDate, validateField, validateFields, validateOptions } from "../utils/validate";
import CandidateOptions from "./CandidateOptions";

const FORMAT_DATE_PICKER = 'MM/dd/yyyy h:mm aa'

const SubmitButton = styled(SuccessButton)`
    display: flex;
    align-items: center;
`

const AddEditCampaign = () => {
    const initialValue = {
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        formErrors: { name: '', description: '', startDate: '', endDate: '' },
    }

    const OptionDefault: OptionType[] = [
        {
            name: '',
            brief_introduction: '',
            avatar: '',
            formErrors: { name: '', brief_introduction: '' },
        }
    ]

    const dispatch = useDispatch<AppDispatch>()
    let navigate = useNavigate();
    const { campaignId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataForm, setDataForm] = useState(initialValue)
    const [options, setOptions] = useState<OptionType[]>(OptionDefault)
    const metadata: MetadataType = useSelector((state: RootState) => state.auth.metadata)
    const { name, description, startDate, endDate, formErrors } = dataForm

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
                        const dataform = result.campaign[0]
                        const options = result.candidates.map((item: OptionType) => {
                            return {
                                name: item.name,
                                brief_introduction: item.brief_introduction,
                                avatar: item.avatar || '',
                                formErrors: { name: '', brief_introduction: '' },
                            }
                        })
                        setDataForm({
                            name: dataform.name,
                            description: dataform.description,
                            startDate: new Date(convertUtcToLocal(new Date(dataform.start_time))),
                            endDate: new Date(convertUtcToLocal(new Date(dataform.end_time))),
                            formErrors: { name: '', description: '', startDate: '', endDate: '' },
                        })
                        setOptions(options)
                    } else {
                        createNotifications(NOTI_TYPE.DANGER, result.error)
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

    const handleChange = (key: string) => (e: any) => {
        const value = e.target.value
        const validate = validateField(key, value)
        setDataForm({
            ...dataForm,
            formErrors: { ...formErrors, ...validate },
            [key]: value
        })
    }

    const handleChangeDate = (key: string) => (value: Date) => {
        const validate = validateDate(key, value, dataForm.endDate, dataForm.startDate)
        setDataForm({
            ...dataForm,
            formErrors: { ...formErrors, ...validate },
            [key]: value
        })
    }

    const createCampaign = async (data: AddEditDataType) => {
        try {
            setIsLoading(true)
            const { epoch_index, input_index }: resInput = await sendInput(data);
            handleResponse(epoch_index, input_index, ((payload: any) => {
                if (payload && !payload.error) {
                    setDataForm(initialValue)
                    setOptions(OptionDefault)
                    createNotifications(NOTI_TYPE.SUCCESS, 'Add campaign successfully!')
                    navigate(`${ROUTER_PATH.VOTING}/${payload.id}`, { replace: true });
                } else {
                    createNotifications(NOTI_TYPE.DANGER, payload.error || NO_RESPONSE_FROM_SERVER_ERROR_MESSAGE)
                }
                setIsLoading(false)
            }))
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error.message || ERROR_MESSAGE)
            setIsLoading(false)
            throw error
        } finally {
            dispatch(getDepositInfo())
        }
    }

    const editCampaign = async (data: AddEditDataType) => {
        try {
            setIsLoading(true)
            const { epoch_index, input_index }: resInput = await sendInput(data);
            handleResponse(epoch_index, input_index, ((payload: any) => {
                if (payload && !payload.error) {
                    setDataForm(initialValue)
                    setOptions(OptionDefault)
                    createNotifications(NOTI_TYPE.SUCCESS, 'Edit campaign successfully!')
                    navigate(`${ROUTER_PATH.VOTING}/${campaignId}`, { replace: true });
                } else {
                    createNotifications(NOTI_TYPE.DANGER, payload.error || NO_RESPONSE_FROM_SERVER_ERROR_MESSAGE)
                }
                setIsLoading(false)
            }))
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error.message || ERROR_MESSAGE)
            setIsLoading(false)
            throw error
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()

        const checkOptions = validateOptions(options)
        const checkFields = validateFields(dataForm)
        const checkDate = validateDate('startDate', dataForm.startDate, dataForm.endDate, dataForm.startDate)

        if (!checkOptions.isError && !checkFields.isError && !checkDate?.startDate) {
            const data: AddEditDataType = {
                action: !campaignId ? CREATE_CAMPAIGN : EDIT_CAMPAIGN,
                name: dataForm.name,
                description: dataForm.description,
                start_time: moment(convertLocalToUtc(dataForm.startDate)).format(FORMAT_DATETIME),   // Convert local datetime to UTC+0 datetime and format
                end_time: moment(convertLocalToUtc(dataForm.endDate)).format(FORMAT_DATETIME), // Convert local datetime to UTC+0 datetime and format
                candidates: checkOptions.data.map((item) => {
                    return {
                        name: item.name,
                        avatar: item.avatar,
                        brief_introduction: item.brief_introduction,
                    }
                })
            }
            if (!campaignId) {
                createCampaign(data)
            } else {
                const newData: AddEditDataType = {
                    id: parseInt(campaignId),
                    ...data
                }
                editCampaign(newData)
            }

        } else {
            setOptions(checkOptions.data)
            setDataForm({
                ...dataForm,
                formErrors: { ...checkFields.formErrors, ...checkDate }
            })
            createNotifications(NOTI_TYPE.DANGER, 'Please check the entered data!')
        }
    };

    return (
        <Content>
            {isLoading && (
                <LoadingAbsolute>
                    <Loading />
                </LoadingAbsolute>
            )}
            <Title>
                {!campaignId ? 'Create new campaign' : 'Edit campaign'}
            </Title>
            <Form onSubmit={onSubmit}>
                <FormItem>
                    <label>Name</label>
                    <Input type="text" name="name" value={name} placeholder="Campaign's name.." onChange={handleChange('name')} />
                    <ErrorText>{formErrors.name}</ErrorText>
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
                    <TextArea name="description" value={description} placeholder="Description..." onChange={handleChange('description')} />
                    <ErrorText>{formErrors.description}</ErrorText>
                </FormItem>
                <FormItem>
                    <label>Candidate options:</label>
                    <CandidateOptions options={options} setOptions={(data: OptionType[]) => setOptions(data)} />
                </FormItem>
                <FlexLayoutBtn>
                    <DefaultButton type="button" onClick={() => navigate(-1)}>Back</DefaultButton>
                    <SubmitButton type="submit">
                        {isLoading && (<Loader />)}
                        {!campaignId ? 'Create' : 'Save'}
                    </SubmitButton>
                </FlexLayoutBtn>
            </Form>
        </Content>
    )
}

export default AddEditCampaign