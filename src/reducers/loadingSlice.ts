import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoadingState {
	isLoading: boolean
	callMessage: string
}

const initialState: LoadingState = {
	isLoading: false,
	callMessage: '',
}

export const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<LoadingState>) => {
			state.isLoading = action.payload.isLoading
			state.callMessage = action.payload.callMessage
		},
	},
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer
