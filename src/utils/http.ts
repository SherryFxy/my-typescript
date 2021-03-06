import qs from 'qs';
import * as auth from '../auth-provider';
import { useAuth } from '../context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit{
    data?: object,
    token?: string
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            // 添加 token
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'applycation/json' : ''
        },
        ...customConfig
    }
    // 根据不同方法，修改传参形式
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`;
    }else{
        config.body = JSON.stringify(data || {})
    }

    // axios 和 fetch 的表现不一样，axios 可以直接在返回状态不为2XX的时候跑出异常
    // fetch 是只有在断网等的情况下才会跑出异常，4XX和5XX都不会抛出异常
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            console.log('response=', response);
            // 未登录或者token失效的情况下，返回401，是标志的resful，这时需要登出
            if (response.status === 401) {
                await auth.logout();
                // window.location.reload()
                return Promise.reject({message: '请重新登录'});
            }
            const data = await response.json()
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        })
}

export const useHttp = () => {
    const {user} = useAuth();
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token});
}