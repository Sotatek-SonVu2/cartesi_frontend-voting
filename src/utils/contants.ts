export const ADDRESS_WALLET = 'ADDRESS_WALLET'

export const LIST_CAMPAIGN = 'LIST_CAMPAIGN'
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN'
export const EDIT_CAMPAIGN = 'EDIT_CAMPAIGN'
export const CAMPAIGN_DETAIL = 'CAMPAIGN_DETAIL'
export const CANDIDATE_DETAIL = 'CANDIDATE_DETAIL'
export const VOTING = 'VOTE'
export const RESULT = 'RESULT'
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN'
export const DEPOSIT_INFO = 'DEPOSIT_INFO'

export const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss'
export const ERROR_MESSAGE = 'Something went wrong! Please try again!'
export const CHAIN_ID_ERROR_MESSAGE = 'Current Chain ID does not match'
export const NONCE_TOO_HIGH_ERROR_MESSAGE = 'None too hight! Please reset your account on MetaMask!'
export const NONCE_TOO_HIGH_ERROR_CODE = -32603

export const NOTI_TYPE = {
    SUCCESS: 'success',
    DANGER: 'danger',
    INFO: 'info',
    DEFAULT: 'default',
    WARNING: 'warning'
}

export const LIST_STATUS = {
    ALL: 'ALL',
    ON_GOING: 'ON_GOING',
    FINISHED: 'FINISHED',
    VOTED: 'VOTED'
}

export const cadidateOptions = [
    {
        label: 'All Campaign',
        value: LIST_STATUS.ALL,
    },
    {
        label: 'On-going Campaign',
        value: LIST_STATUS.ON_GOING,
    },
    {
        label: 'Finished Campaign',
        value: LIST_STATUS.FINISHED,
    },
    {
        label: 'Voted Campaign',
        value: LIST_STATUS.VOTED,
    },
]

export const action = [
    {
        label: 'Delete',
        value: 'DELETE'
    },
    {
        label: 'Update',
        value: 'UPDATE'
    }
]

export const ITEM_TYPE = {
    LIST: 'LIST',
    RESULT: 'RESULT',
    ANSWER: 'ANSWER'
}