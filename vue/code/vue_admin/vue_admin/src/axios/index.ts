import axios from 'axios'
import { ElMessage } from 'element-plus'
// import { useCounterStore } from '../stores/counter'
// const stores = useCounterStore()

let instance = axios.create({
    //配置请求端口
    baseURL: 'https://lianghj.top:8888/api/private/v1/',
    //配置响应时间
    timeout: 1000,
    //配置请求头
    // headers:{token:stores.login.token}
})
instance.interceptors.request.use(function (config:any) {
    //config 是axios本身
    // config.headers.token = stores.login.token
    return config
}, error => {
    return Promise.reject(error)
})
instance.interceptors.response.use(function (response) {
    return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)

}, error => {
    //error有信息说明有报错
    if (error.response) {
        switch (error.response.status) {
            case 404:
                ElMessage.error("访问资源不存在")
                break;
            case 500:
                ElMessage.error("服务器内部错误")
                break;
            case 403:
                ElMessage.error("身份验证失败")
                break;
        }
    } else {
        //error没有信息说明没网络
        ElMessage.error("网络中断")
    }
    return Promise.reject(error)
})
export default instance