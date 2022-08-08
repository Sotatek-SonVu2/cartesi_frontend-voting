import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNotifications } from '../common/Notification';
import { getNotice } from '../helper/notices';
import { sendInput } from '../helper/sendInput';
import { getDataApi } from '../services';
import { convertHexToData, JsonStringifyFormat } from '../utils/common';
import { DEPOSIT_INFO, NOTI_TYPE } from '../utils/contants';
import { AuthState } from '../utils/interface';



const initialState: AuthState = {
    address: '',
    isDepositUpdate: false,
    metadata: {
        msg_sender: '',
        epoch_index: 0,
        input_index: 0,
        block_number: 0,
        timestamp: Date.now()
    },
    isLoading: false
};




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<string>) => {
            const data = {
                ...state,
                address: action.payload,
                metadata: {
                    ...state.metadata,
                    msg_sender: action.payload,
                    timestamp: Date.now()
                }
            }
            state = data
            return state
        },
        onDepositUpdate: (state) => {
            state.isDepositUpdate = !state.isDepositUpdate
            return state
        },
        clearAccount: (state) => {
            state = initialState
            return state
        },
    },
})

export const { setAccount, clearAccount, onDepositUpdate } = authSlice.actions

export default authSlice.reducer