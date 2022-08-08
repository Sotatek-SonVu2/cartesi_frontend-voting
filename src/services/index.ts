import axios from 'axios'

const BASE_URL_API = process.env.REACT_APP_BASE_URL_API || ''

const axiosInstanceBaseApi = () => {
    const instance = axios.create({
        baseURL: BASE_URL_API,
        headers: { 'Content-Type': 'application/json' },
    })

    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    instance.interceptors.response.use((response) => {
        return response.data;
    },
        (error) => {
            return Promise.reject(error)
        }
    )
    return instance
}


export const getDataApi = (payload?: any) =>
    axiosInstanceBaseApi().get(`/inspect/0x${payload}`)
