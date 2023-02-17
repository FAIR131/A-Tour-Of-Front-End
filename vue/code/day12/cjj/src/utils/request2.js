import axios from "axios";
import store from "@/store";
import {Message} from "element-ui";

let instance = axios.create({
    baseURL: "http://39.100.95.147:1404/",
    timeout: 1000,
})


// Add a request interceptor 添加一个请求拦截器
instance.interceptors.request.use(function (config) {
    // Do something before request is sent 请求发出时的处理
    config.headers.token = store.state.currentUser.token
    return config;
}, function (error) {
    // Do something with request error 请求出错时的处理
    return Promise.reject(error);
});

// Add a response interceptor 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response.data.data.cinemas)
    //当响应状态是200时触发次函数，可以在此对响应数据做进一步处理

    if(response.status===200){
       return Promise.resolve(response)
    }else {
        return Promise.reject(response)
    }
    // return response.status===200?Promise.resolve(response):Promise.reject(response)

}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //当响应状态码在2xx之外，在此处进行处理
    // console.log(error)

    if(error.response){
        switch(error.response.status){
            case 404:
                Message.error("访问资源不存在");
                break;
            case 500:
                Message.error("服务器内部错误");
                break;
            case 403:
                Message.error("身份验证失败")
                break;
        }
    }else{
        return Promise.reject(error);

    }
    return Promise.reject(error);
});

export default instance