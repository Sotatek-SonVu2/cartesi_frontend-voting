import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import rootReducer from '../reducers'

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer<any>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);