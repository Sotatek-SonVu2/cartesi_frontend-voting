import moment from "moment"
import { NUMBER_ERROR_MESSAGE, FORMAT_DATETIME } from "./contants"
import { OptionType } from "./interface"

const DATE_TIME_ERROR_MESSAGE = 'Invalid datetime! Make sure the start time is before the end time!'

const validateText: any = {
    name: 'Name is required.',
    description: 'Description is required',
    address: 'Address is required',
    startDate: 'Start Date is required.',
    endDate: 'End Date is required.',
    user: 'User is required.',
    fee: 'Fee is required.',
    brief_introduction: 'Brief Introduction is required.',
}

export const validateNumber = (value: string) => {
    // regex number
    const regex = /(\d*\.\d+|\d+),?/
    if (!value || !regex.test(value)) {
        return NUMBER_ERROR_MESSAGE
    }
    return ''
}

export const validateField = (fieldName: string, value: any) => {
    let errorText = ''
    if (!value) {
        errorText = validateText[fieldName] || `${fieldName} is required.`
    } else if (fieldName === 'name' && value.length > 200) {
        errorText = 'Please do not enter more than 200 characters!'
    } else if (fieldName === 'fee' || fieldName === 'amount') {
        errorText = validateNumber(value)
    }
    return {
        [fieldName]: errorText
    }
}

export const validateDate = (fieldName: string, value: string | Date, endDate: Date, startDate: Date) => {
    const valueFormat = value && moment(value).format(FORMAT_DATETIME)
    const date = fieldName === 'startDate' ? endDate : startDate
    const dateFormat = date && moment(date).format(FORMAT_DATETIME)
    const isAfter = moment(valueFormat).isAfter(dateFormat)
    const isSame = moment(valueFormat).isSame(dateFormat)
    let error
    if (value) {
        if (fieldName === 'startDate' && isAfter || isSame) {
            error = {
                startDate: DATE_TIME_ERROR_MESSAGE
            }
        } else if (fieldName === 'endDate' && !isAfter && !isSame) {
            error = {
                startDate: DATE_TIME_ERROR_MESSAGE
            }
        } else {
            error = {
                startDate: '',
                endDate: ''
            }
        }
    } else {
        error = validateField(fieldName, value)
    }
    return error
}

/**
 * fieldsNeedToCheck: object type, the fields you want to check 
 * formErrors: object type, used to get the text error of the form.
 */
export const validateFields = (fieldsNeedToCheck: any, formErrors: any) => {
    // let formErrors = { name: '', description: '', startDate: '', endDate: '' } 
    let isError: boolean = false
    for (const property in fieldsNeedToCheck) {
        const validate = validateField(property, fieldsNeedToCheck[property])
        if (validate[property]) isError = true
        formErrors = { ...formErrors, ...validate }
    }
    return {
        formErrors,
        isError
    }
}

export const validateOptions = (options: OptionType[]) => {
    let isError: boolean = false
    const data = options.map((item: OptionType) => {
        let nameError: any = { name: '' }
        let briefError: any = { brief_introduction: '' }
        if (!item.name) {
            nameError = validateField('name', item.name)
        }
        if (!item.brief_introduction) {
            briefError = validateField('brief_introduction', item.brief_introduction)
        }
        if (nameError['name'] || briefError['brief_introduction']) isError = true
        return {
            ...item,
            formErrors: { ...item.formErrors, ...nameError, ...briefError },
        }
    })
    return {
        data,
        isError
    }
}