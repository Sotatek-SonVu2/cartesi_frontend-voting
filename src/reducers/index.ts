import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authReducer from './authSlice';
import campaignReducer from './campaignSlice'


const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['isVisibleActionButton', 'listStatus', 'metadata']
};

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['address']
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    campaign: campaignReducer
});

export default persistReducer(rootPersistConfig, rootReducer);