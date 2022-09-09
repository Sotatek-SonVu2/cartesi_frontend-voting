import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNotifications } from '../common/Notification';
import { handleInspectApi } from '../helper/handleInspectApi';
import { ADDRESS_WALLET, DEPOSIT_INFO, ERROR_MESSAGE, NOTI_TYPE } from '../utils/contants';
import { AuthState } from '../utils/interface';

export const getDepositInfo = createAsyncThunk(
    'auth/depositInfo',
    async () => {
        try {
            const data = {
                action: DEPOSIT_INFO,
            }
            const metadata = {
                msg_sender: localStorage.getItem(ADDRESS_WALLET)?.toLowerCase() || '',
                epoch_index: 0,
                input_index: 0,
                block_number: 0,
                timestamp: Date.now() / 1000 // millisecond
            }
            const result = await handleInspectApi(data, metadata)
            if (result && !result.error) {
                const { amount, used_amount, withdrawn_amount } = result
                const depositAmount = amount - used_amount - withdrawn_amount
                return {
                    amount: depositAmount,
                    used_amount
                }
            } else {
                createNotifications(NOTI_TYPE.DANGER, result?.error || ERROR_MESSAGE)
            }
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
            throw error
        }
    }
)

const initialState: AuthState = {
    address: localStorage.getItem(ADDRESS_WALLET) || '',
    deposit_info: {
        amount: 0,
        used_amount: 0
    },
    metadata: {
        msg_sender: localStorage.getItem(ADDRESS_WALLET)?.toLowerCase() || '',
        epoch_index: 0,
        input_index: 0,
        block_number: 0,
        timestamp: Date.now() / 1000  // millisecond
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
                    msg_sender: payload.toLowerCase(),
                    timestamp: Date.now() / 1000  // millisecond
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
        builder.addCase(getDepositInfo.pending, (state) => {
            state.isLoading = true
            return state
        })
        builder.addCase(getDepositInfo.fulfilled, (state, action) => {
            state.deposit_info = {
                amount: action.payload?.amount || 0,
                used_amount: action.payload?.used_amount || 0
            }
            state.isLoading = false
            return state
        })
        builder.addCase(getDepositInfo.rejected, (state) => {
            state.isLoading = false
            state.deposit_info = {
                amount: 0,
                used_amount: 0
            }
            return state
        })
    },
})

export const { setAccount, clearAccount } = authSlice.actions

export default authSlice.reducer