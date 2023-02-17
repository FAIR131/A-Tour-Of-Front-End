import axios from 'axios'

let instance=axios.create({
    baseURL:"https://m.maizuo.com",
    timeout: 1000,
    // headers:{"X-host":"mall.film-ticket.film.list"}
})

// 添加一个请求拦截器
instance.interceptors.request.use(function (config) {
    // 请求发出之前的处理

    if((config.params&&config.params.ticketFlag)||config.url.indexOf("ticketFlag")>=0){
        config.headers["X-host"]="mall.film-ticket.cinema.list";
    }else{
        config.headers["X-host"]="mall.film-ticket.film.list";
    }

    return config;
  }, function (error) {
    // 请求出错时的处理
    return Promise.reject(error);
  });

// 添加一个响应拦截器
instance.interceptors.response.use(function (response) {

    //当响应状态为2XX时,触发此函数,可以在此对响应数据做进一步处理 

    if(response.data.status===1001){
        alert(response.data.msg)
    }

    return response.status===200?Promise.resolve(response):Promise.reject(response)

  }, function (error) {
    // 当响应状态码为2XX范围之外时,触发此函数,可以在此处对错误进行处理
    console.log("响应错误",error);
    if(error.response){
        switch(error.response.status){
            case 404:
                alert("访问资源不存在");
            case 500:
                alert("服务器内部错误");
            case 403:
                alert("身份验证失败")
        }
    }else{
        alert("网络中断")
    }


    return Promise.reject(error);
  });

export default instance;