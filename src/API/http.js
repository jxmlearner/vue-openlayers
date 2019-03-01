import Qs from 'qs'
import axios from 'axios'
import {apiAddr} from '../mapconfig'
//import router from '../router'

// 自定义axios实例
let instance = axios.create()

//instance.defaults.baseURL = apiAddr;

instance.defaults.timeout = 20000;

// 自动发送cookie中的认证信息
//instance.defaults.withCredentials = true;

instance.defaults.transformRequest = [function (data) {
    data = JSON.stringify(data)
    return data
}]

// instance.defaults.transformResponse = [function (data) {
//     data = JSON.parse(data)
//     return data
// }]

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
instance.interceptors.request.use(
    config => {
        // if(!/login|registe/.test(config.url)){   //登录注册页不用在header中增加token
        //     const token=sessionStorage.getItem('token')
        //     config.headers.Authorization = `Bearer ${token}`
        // }        
        return config
    }, error => {
        return Promise.reject(error)
    }
);

instance.interceptors.response.use((res) => {
    // 对于任何接口请求行为, API 服务会确认认证信息
    // 当认证信息不存在时, API 服务会返回未认证消息,
    // 对于这种情况, 在此处做统一的拦截处理, 重定向到登录页
    if (res.data.code === 401) {
        console.log('登录失效, 请重新登录!')
        //router.push('/login')
    }
    return res;
}, (error) => {
    console.log("请求错误")
    return Promise.reject(error)
});

export default instance
