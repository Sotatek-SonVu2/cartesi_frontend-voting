import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIST_STATUS } from '../utils/contants';
import { CampaignState, isVisibleActionButton } from '../utils/interface';



const initialState: CampaignState = {
    isVisibleActionButton: {
        creator: '',
        isOpenVoting: false
    },
    listStatus: LIST_STATUS.ALL,
};

export const authSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        onChangeStatus: (state, action: PayloadAction<string>) => {
            state.listStatus = action.payload
        },
        onVisibleActionButton: (state, action: PayloadAction<isVisibleActionButton>) => {
            state.isVisibleActionButton.creator = action.payload.creator
            state.isVisibleActionButton.isOpenVoting = action.payload.isOpenVoting
        },
    },
})

export const { onChangeStatus, onVisibleActionButton } = authSlice.actions

export default authSlice.reducer