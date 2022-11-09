import moment from "moment"
import { NUMBER_ERROR_MESSAGE, FORMAT_DATETIME } from "./contants"

const DATE_TIME_ERROR_MESSAGE = 'Invalid datetime! Make sure the start time is before the end time!'

const validateText: any = {
    startDate: 'Start Date is a required field!',
    endDate: 'End Date is a required field!',
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
        errorText = validateText[fieldName] || `${fieldName} is a required field!.`
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