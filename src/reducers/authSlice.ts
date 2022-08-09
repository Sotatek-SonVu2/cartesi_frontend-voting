import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNotifications } from '../common/Notification';
import { getDataApi } from '../services';
import { convertDataToHex, convertHexToData } from '../utils/common';
import { ADDRESS_WALLET, DEPOSIT_INFO, ERROR_MESSAGE, NOTI_TYPE } from '../utils/contants';
import { AuthState } from '../utils/interface';

export const getDepositInfo = createAsyncThunk(
    'auth/depositInfo',
    async () => {
        try {
            console.log('getDepositInfo')
            const data = {
                action: DEPOSIT_INFO,
            }
            const metadata = {
                msg_sender: '',
                epoch_index: 0,
                input_index: 0,
                block_number: 0,
                timestamp: Date.now()
            }
            const payloadHex = convertDataToHex(data, metadata)
            const res: any = await getDataApi(payloadHex)
            const obj = convertHexToData(res.reports[0].payload)
            if (!obj.error) {
                const amount = obj.amount - obj.used_amount
                return amount
            } else {
                createNotifications(NOTI_TYPE.DANGER, obj.error)
            }
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error.message || ERROR_MESSAGE)
            throw error
        }
    }
)

const initialState: AuthState = {
    address: localStorage.getItem(ADDRESS_WALLET) || '',
    deposit_amount: 0,
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
            const { payload } = action
            const data = {
                ...state,
                address: payload,
                metadata: {
                    ...state.metadata,
                    msg_sender: payload,
                    timestamp: Date.now()
                }
            }
            state = data
            localStorage.setItem(ADDRESS_WALLET, payload);
            return state
        },
        clearAccount: (state) => {
            state = initialState
            localStorage.setItem(ADDRESS_WALLET, '');
            return state
        },
    },
    extraReducers: builder => {
        builder.addCase(getDepositInfo.pending, (state, action) => {
            state.isLoading = true
            return state
        })
        builder.addCase(getDepositInfo.fulfilled, (state, action) => {
            state.deposit_amount = action.payload || 0
            state.isLoading = false
            return state
        })
        builder.addCase(getDepositInfo.rejected, (state, action) => {
            state.isLoading = false
            state.deposit_amount = 0
            return state
        })
    },
})

export const { setAccount, clearAccount } = authSlice.actions

export default authSlice.reducer