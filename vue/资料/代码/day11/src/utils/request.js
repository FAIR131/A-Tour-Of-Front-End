import axios from 'axios'
import { Message } from 'element-ui'
let instance = axios.create({
  baseURL: "http://39.100.95.147:1404",
  timeout: 1000,
  // headers:{"X-host":"mall.film-ticket.film.list"}
})

// 添加一个请求拦截器
instance.interceptors.request.use(function (config) {
  // 请求发出之前的处理

  return config;
}, function (error) {
  // 请求出错时的处理
  return Promise.reject(error);
});

// 添加一个响应拦截器
instance.interceptors.response.use(function (response) {

  //当响应状态为2XX时,触发此函数,可以在此对响应数据做进一步处理 

  return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)

}, function (error) {
  // 当响应状态码为2XX范围之外时,触发此函数,可以在此处对错误进行处理
  if (error.response) {
    switch (error.response.status) {
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
  } else {
    Message.error("网络中断")
  }
  return Promise.reject(error);
});

export default instance;