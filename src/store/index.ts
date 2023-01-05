import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authSlice'
import tokenReducer from '../reducers/tokenSlice'
import LoadingReducer from '../reducers/loadingSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		token: tokenReducer,
		loading: LoadingReducer,
	},
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
