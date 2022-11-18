import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNotifications } from "common/Notification";
import { handleInspectApi } from "helper/handleInspectApi";
import { convertUtcTimestamp } from "utils/common";
import { ADDRESS_WALLET, ERROR_MESSAGE, LIST_TOKEN, NOTI_TYPE } from "utils/contants";
import { MetadataType, TokenState } from "utils/interface";

const initialState: TokenState = {
    tokenListing: [],
    isLoading: false
};

export const getTokens = createAsyncThunk(
    'token/getTokens',
    async () => {
        try {
            const data = {
                action: LIST_TOKEN,
            }
            const metadata: MetadataType = {
                msg_sender: localStorage.getItem(ADDRESS_WALLET)?.toLowerCase() || '',
                epoch_index: 0,
                input_index: 0,
                block_number: 0,
                timestamp: convertUtcTimestamp() // millisecond
            }
            const result = await handleInspectApi(data, metadata)
            if (result && !result.error) {
                return result.data
            } else {
                createNotifications(NOTI_TYPE.DANGER, result?.error || ERROR_MESSAGE)
            }
        } catch (error: any) {
            createNotifications(NOTI_TYPE.DANGER, error?.message || ERROR_MESSAGE)
            throw error
        }
    }
)

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTokens.pending, (state) => {
            state.isLoading = true
            return state
        })
        builder.addCase(getTokens.fulfilled, (state, action) => {
            state.tokenListing = action.payload
            state.isLoading = false
            return state
        })
        builder.addCase(getTokens.rejected, (state) => {
            state.tokenListing = initialState.tokenListing
            state.isLoading = false
            return state
        })
    },
})

export default tokenSlice.reducer