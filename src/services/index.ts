import axios from 'axios'
import { checkConnected } from '../utils/checkConnected';
import { ADDRESS_WALLET } from '../utils/contants';

const BASE_URL_API = process.env.REACT_APP_BASE_URL_API || ''

const axiosInstanceBaseApi = () => {
    const instance = axios.create({
        baseURL: BASE_URL_API,
        headers: { 'Content-Type': 'application/json' },
    })

    instance.interceptors.request.use((async (config) => {
        // Do something before request is sent
        const isConnected = await checkConnected()
        if (!isConnected) {
            localStorage.setItem(ADDRESS_WALLET, '');
            window.location.reload();
        }
        return config;
    }), ((error) => {
        // Do something with request error
        return Promise.reject(error);
    }));


    instance.interceptors.response.use((response) => {
        return response.data;
    },
        (error) => {
            return Promise.reject(error)
        }
    )
    return instance
}


export const getDataApi = (payload?: string) =>
    axiosInstanceBaseApi().get(`/inspect/0x${payload}`)
