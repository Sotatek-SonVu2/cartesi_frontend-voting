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
export const WITHDRAW = 'WITHDRAW'
export const SAVE_EXECUTED_VOUCHER = 'SAVE_EXECUTED_VOUCHER'
export const LIST_EXECUTED_VOUCHER = 'LIST_EXECUTED_VOUCHER'

export const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss'
export const FORMAT_DATETIME_2 = 'DD/MM/YYYY HH:mm:ss'
export const ERROR_MESSAGE = 'Something went wrong! Please try again!'
export const CHAIN_ID_ERROR_MESSAGE = 'Current Chain ID does not match'
export const CONNECT_METAMASK_ERROR_CODE = -32002
export const CONNECT_METAMASK_ERROR_MESSAGE = 'Please connect to MetaMask.'
export const NETWORK_ERROR_MESSAGE = 'Please check your network and try again!'
export const AMOUNT_ERROR_MESSAGE = 'Invalid amount. Please enter again!'
export const NO_RESPONSE_FROM_SERVER_ERROR_MESSAGE = 'Unable to receive a response from server side. Please try again!'

export const NOTI_TYPE = {
    SUCCESS: 'success',
    DANGER: 'danger',
    INFO: 'info',
    DEFAULT: 'default',
    WARNING: 'warning'
}

export const WITHDRAW_RADIO_FILTER_STATUS = {
    ALL: 'all',
    CLAIMED: 'claimed',
    NOT_CLAIM: 'not_claim'
}

export const WITHDRAW_RADIO_FILTER = [
    {
        label: 'All',
        value: WITHDRAW_RADIO_FILTER_STATUS.ALL,
    },
    {
        label: 'Claimed',
        value: WITHDRAW_RADIO_FILTER_STATUS.CLAIMED,
    },
    {
        label: 'Not claim yet',
        value: WITHDRAW_RADIO_FILTER_STATUS.NOT_CLAIM,
    },
]

export const LIST_STATUS = {
    ALL: 'ALL',
    ON_GOING: 'ON_GOING',
    FINISHED: 'FINISHED',
    VOTED: 'VOTED'
}

export const cadidateOptions = [
    {
        label: 'All Campaigns',
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