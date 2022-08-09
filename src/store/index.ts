import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import campaignReducer from '../reducers/campaignSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        campaign: campaignReducer
    },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch