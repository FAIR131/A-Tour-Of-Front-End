[TOC]

# 一、Vue常用属性

## 1、生命周期

生命周期：从vue实例产生开始到vue实例被销毁这段时间所经历的过程。

vue更像工具人，在整个过程中只会按照作者预设的程序去做事，不能由开发者去控制或者diy。如果这样开发时限制是比较多的，因此作者开放了生命周期，允许我们定义vue在特定的时候去做我们让其做的事情（钩子函数）。

每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如需要设置数据监听、编译模板、挂载实例到 DOM，在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，目的是给予用户在一些特定的场景下添加他们自己代码的机会。

vue2中一共有11个生命周期。

Vue生命周期的**主要阶段**：

- 挂载（初始化相关属性）
  - beforeCreate    
    - **注意点**：vue实例创建前阶段，在此时不能获取data中的数据，也就是说`this.msg`得到的是`undefined`
  - created    
    - **注意点**：vue实例已经创建完成 ，在此时可以获取data中的数据和methods 中的方法
  - beforeMount
    - **注意点：**挂载前，还没有将渲染模板挂载在el #app元素上
  - mounted【页面加载完毕的时候就是此时】
    - **注意点**：默认情况下，在组件的生命周期中只会触发一次
- 更新（元素或组件的变更操作）
  - beforeUpdate
  - updated
    - **注意点**：可以重复触发的
- 销毁（销毁相关属性）
  - beforeDestroy
    - **注意点**：
  - destroyed

> 销毁（手动）使用`this.$destroy()`

**示例代码：**

```html
<!--html代码片段-->
<body>
    <div id="app">
        <input type="text" placeholder="用户名" v-model='inpvalue' />
        <button @click='add'>添加</button>
        <p id="myp">{{msg}}</p>
        <button @click='edit'>修改数据</button>
    </div>
</body>

</html>
<script type="text/javascript">
    // js代码片段
    const vm = new Vue({
        el: '#app',
        data: {
            "msg": "我是定义的数据",
            "inpvalue": ''
        },
        methods: {
            add() {
                console.log(this.inpvalue)
            },
            edit() {
                this.msg = '我被修改了'
            }
        },
        beforeCreate() {
            //组件实例创建前 
            console.log(this.msg) // undefined 表示此时data中得数据还没有初始化好
            console.log(this.add) // undefined 说明此时methods 中得方法还没有初始化好
        },
        created() {
            // 组件实例创建完成  第二个生命周期函数 
            console.log(this.msg) //可以输出  说明 此时data得数据已经初始化完毕 
            console.log(this.add) //add()   说明此时methods 中得方法 已经初始化完毕
        },
        beforeMount() {
            //第三个生命周期函数(表示 挂载前，还没有将渲染模板挂载在el #app元素上)
            console.log(222)
            console.log(1, document.getElementById('myp')) // 输出 <p id="myp">{{msg}}</p>
                //说明 此时页面还没有重新渲染，还是旧页面，但是数据渲染出来的页面模板已经在浏览器的内存中，还没有将该渲染好得模板替换  el#app 中得模板
        },
        mounted() {
            // 第4个生命周期函数,渲染模板已经挂载在el #app元素上
          console.log(document.getElementById('myp'))//输出 <p id="myp">我是定义的数据</p>
            //表示页面已经完成了渲染，浏览器内存中新的渲染模板页面已经替换掉了 el#app 中得旧模板页					面，即el#app 容器已经过载了新的渲染模板
            document.onclick = function() {
                console.log('document点击事件')
            }
        },
        beforeUpdate() {
            // 数据更新前触发
            console.log(this.msg) //输出结果： 我被修改了
            console.log(document.getElementById('myp').innerHTML) // 输出结果：我是定义的数据
            // 说明 此阶段 是数据已经被修改了，但是页面中的 el# app 容器内的 DOM 树还没有重新挂载					到 el 上，页面上还是旧数据，但是浏览器 内存中已经更新了 新的DOM 树了，
        },
        updated() {
            // data 中的数据修改后，触发该生命周期函数
            console.log(this.msg) //输出结果： 我被修改了
            console.log(document.getElementById('myp').innerHTML) // 输出结果：我被修改了
            // 此时： 页面中的el #app 中的dom 已经重新挂载，页面渲染渲染了新数据的页面
        },
        beforeDestroy() {
            // 实例销毁前触发
        },
        destroyed() {
            // 实例销毁后触发
            document.onclick = null // 这样切换路由组件后，其他组件上就没有document点击事件了
        }
    })
</script>	
```

![生命周期](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/5d6a79ad2a3b74d4ad9d70f868de0545f9939b8f.png?sign=b2936e9953891efac26abe8060495936&t=5f365858)

关于8个生命周期涉及到的方法，可以参考Vue官网API：[https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90](https://cn.vuejs.org/v2/api/#选项-生命周期钩



## 2、虚拟DOM与diff算法

**什么是虚拟DOM？**

![虚拟DOM](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/7782f6424492630815195ed5722bdae78448601c.png?sign=e33c1bcebed7f86de415715793bb5444&t=5f60a247)

定义：指将真实的dom按照特定的语法转化（抽象）成一个js对象，这个**js对象称之为虚拟dom**。



**什么是diff（different）算法？**

差异比较算法的一种，把树形结构按照层级分解，只**比较同级**元素。不同层级的节点只有创建和删除操作

![diff算法](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/925fb1057a940bea0ea1863cb6df88c72496d65f.png?sign=a480a62fcd8497af8a60acd193b4facd&t=5f60a529)

**`虚拟DOM+diff算法`的方式与`传统DOM操作`相比，有什么好处？**

**传统DOM操作**：在一次操作中，往往会伴随多次个DOM节点更新，浏览器收到第一个DOM请求后并不知道还有若干次更新操作，因此会马上执行流程，最终执行若干次次。而且操作DOM频繁还会出现页面卡顿，影响用户体验。

**虚拟DOM+diff算法**：若一次操作中有若干次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这若干次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象**一次性**放到DOM树上，再进行后续操作，避免大量无谓的计算量。

建议：面试之前一定要去找下比较正规的理论性的东西。



# 二、网络请求

## 1、fetch[了解]

### 1.1 fetch 介绍

优点：

- 浏览器内置的，相比jq而言，省去了导入js包的麻烦
- 可以看做是xhr的升级版
- 支持promise
- 支持多种请求类型，但是默认为get请求类型

官网地址：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

### 1.2 fetch 语法

语法1：

~~~js
// 使用fetch发送get（默认get）形式请求，返回数据采用json格式，最终打印获取到的数据
fetch(url).then(res => res.json()).then(res => console.log(res))

// 涉及到的数据的转化方法
res.json()		//res 它只是一个 HTTP 响应，而不是真的JSON。为了获取JSON的内容，我们需要使用 json()
~~~

语法2：

~~~js
// 发送json数据
fetch(url, {
	method: 'POST', // or 'PUT'
	body: JSON.stringify(data), // 发送的json数据
 	headers: new Headers({
    	'Content-Type': 'application/json'
  	})
}).then(res => res.json()).then(res => console.log(res))
~~~

语法3：

~~~js
// 发送表单数据
fetch(url, {
	method: 'POST', // or 'PUT'
	body: "username=zhangsan&age=11", // 发送的json数据
 	headers: new Headers({
    	'Content-Type': 'application/x-www-form-urlencoded'
  	})
}).then(res => res.json()).then(res => console.log(res))
~~~

### 1.3 使用案例

案例：使用fetch获取接口地址`https://api.i-lynn.cn/college`，获取到数据之后，将数据中的`list`展示在页面上即可

**注意：网络请求需要在**mounted周期中写**

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/vue.js"></script>
</head>
<body>
    <div id="app">

    </div>
</body>
</html>
<script>
    const vm = new Vue({
        el: "#app",
        data: {
            list: ''
        },
        methods: {
            // res.json()// 将返回的数据转化为json格式（常用）
            getData() {
                fetch("https://api.i-lynn.cn/college")
                    .then(res => res.json()).then(res => {
                    console.log(res)
                })
            },
            getData1() {
                // 发送表单数据
                fetch("https://api.i-lynn.cn/college", {
                    method: 'POST',
                    body: "username=zhangsan&age=11", // 发送的json数据
                    headers: new Headers({
                        // 参数是表单的编码格式
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                }).then(res => res.json()).then(res => console.log(res))
            },
            getData2() {
                // 发送json数据
                fetch("https://api.i-lynn.cn/college", {
                    method: 'POST',
                    body: JSON.stringify({ username: 123, age: 456 }), // 发送的json数据
                    headers: new Headers({
                        // 参数是对象形式
                        'Content-Type': 'application/json'
                    })
                }).then(res => res.json()).then(res => console.log(res))
            }
        },
        mounted() {
            this.getData()
            this.getData1()
            this.getData2()
        }

    })
</script>
~~~

作业：自己写一个表单，表单可以输入任意一个合法的ipv4地址，点击查询按钮查询接口：https://api.i-lynn.cn/ip?query=获取ip地址对应的信息，将信息展示在页面上即可。



## 2、axios

### 2.1 定义

- **1.文档：https://www.kancloud.cn/yunye/axios/234845**

axios 是一个基于 promise 的 **HTTP 库**，可以用在浏览器和node.js中。**axios是vue作者推荐使用的网络请求库**，它具有以下特性：

​				a.支持浏览器和node.js（降低学习成本） 

​				b.支持promise

​				c.能够拦截`请求和响应`（拦截器）

​				d.自动转换json数据

- **2.在使用axios之前需要在对应的模板文件中引入axios的js库文件**，随后按照以下用法使用axios：**

```JS
//使用 cdn:
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

### 2.2 语法

- 用法

~~~javascript
    const vm = new Vue({
        el: "#app",
        data: {
            list: ''
        },
        methods: {
            // get 请求方式1
            getData0() {
                axios.get('https://api.i-lynn.cn/college?id=100').then(ret => 		 					console.log(11, ret.data))
            },
            // get 请求方式2
            getData() {
                axios.get('https://api.i-lynn.cn/college', {
                    params: {
                        id: 10010,
                        name: 'zhangsan',
                        age: 26
                    }
                }).then(ret => console.log(11, ret.data))
            },
            // post 请求方式1
            getData1() {
                // 参数是对象形式的，axios发送的请求头是application/json
                axios.post('https://api.i-lynn.cn/college', {
                    firstName: 'zhang',
                    lastName: 'san'
                }).then(res => {
                    console.log(res)
                })
            },
            // post 请求方式2
            getData2() {
                // 参数是表单编码格式，axios发送的请求头是application/x-www-form-urlencoded 
                axios.post('https://api.i-lynn.cn/college', 		 				                         "firstName=zhang&lastName=san").then(res => {
                    console.log(res)
                })
            },
            // get 和 post 综合请求 1
            getData3() {
                // 先不指定请求类型，在配置中去指定请求类型（类似$.ajax）
                axios({
                    method: 'post',
                    url: 'https://api.i-lynn.cn/college',
                    // 超时时间：如果请求花的时候超过了预设时间，则请求取消
                    timeout: 1000,
                    // post 请求需要设置headers 请求头
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        // 'Content-Type': 'application/json'
                    },
                    data: "username=zhangsan&type=2",
                    // data: {
                    //     username: 'zhangsan',
                    //     type: 2
                    // }
                }).then(res => { console.log(res) })
            },
            // get 和 post 综合请求 2
            getData4() {
                // 先不指定请求类型，在配置中去指定请求类型（类似$.ajax）
                axios({
                    method: 'get',
                    url: 'https://api.i-lynn.cn/college',
                    // 超时时间：如果请求花的时候超过了预设时间，则请求取消
                    timeout: 1000,
                    // data: "username=zhangsan&type=2", // post请求方式
                    // data: {  // post请求方式
                    //     username: 'zhangsan',
                    //     type: 2
                    // },
                    params: { // get 请求方式
                        ID: 12345
                    },
                }).then(res => { console.log(22, res) })
            }
        },
        created() {
            this.getData0()
            // this.getData()
            // this.getData1()
            // this.getData2()
            // this.getData3()
            // this.getData4()
        }

    })
~~~

- axios 请求总结：


```js
1. axios：是vue作者推荐在vue中使用的网络请求库
2. 简写方式有：              
      ①get请求：
     	 axios.get(url).then(res => 处理程序)
      ②post请求         
         axios.post(url,请求体,{options}).then(res => 处理程序) 
3.常规写法有：
        axios({
        	url,
        	method, 
        	headers, 
        	params, // get方式传参
        	data, // post 方式参数
        	....
        }).then()
     
 4.与fetch 对比：
  与fetch不一样，fetch最终的res就是我们的返回值，而axios这里最后的res并不是我们的返回值，而是axios的请求   响应对象，我们的返回数据在res.data中
   
```

- 当然axios除了支持传统的`GET`和`POST`方式以外，常见的请求方式还支持：
  - put：修改数据
  - delete：删除数据

> **需要注意，针对POST请求，此处的参数提交格式以参数形式为准：**

```js
//1.发送json格式的数据：
   axios.post(url,{js对象}).then() // 头信息会自动被设置为application/json
//2. 发送表单格式的数据：
   axios.post(url,"a=1&b=2").then()  // 头信息会自动被设置成application/x-www-form-urlencoded
```

以上方的axios请求示例为例，接口响应结果（`ret`）的主要属性有：

​		a. **data：实际响应回来的数据（最常用）**

 	   b. status：响应状态码
 	
 	  c. statusText：响应状态信息



### 2.3 全局默认配置

​     在使用axios发送请求之前它允许我们通过**全局配置**做一些设置，这样可以方便后续的请求操作，例如：

```js
// 方式1：可以通过`axios.defaults`来进行全局默认配置。
axios.defaults.baseURL = 'http://localhost/app'; //【设置默认地址】
axios.defaults.timeout = 3000; //【设置超时时间】
axios.defaults.headers['_token'] = '123123123';//【设置请求头信息，通用头信息】
axios.defaults.headers.common['_token'] = '123123';//【通用头信息，common可以不写】


// 方式2：可以通过创建axios实例进行全局默认配置
 const instance = axios.create({
     baseURL: 'http://kumanxuan1.f3322.net:8001',
     timeout: 1000,
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
 });
```



### 2.4 使用案例

自己写一个表单，表单可以输入任意一个合法的ipv4地址，点击查询按钮查询接口：https://api.i-lynn.cn/ip?query=获取ip地址对应的信息，将信息展示在页面上即可。

![image-20211014143523009](https://i.loli.net/2021/10/14/UoSRzcwZdvVelt4.png)

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/vue.js"></script>
    <!-- 使用之前记得先导入axios文件 -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
    <div id="app">
        <div>
            <input type="text" v-model="ip" placeholder="请输入合法的ipv4地址" />
            <button @click="clickHandler">查询</button>
        </div>

        <div v-show="isShow">
            <div>查询的ip地址：{{res.ip}}</div>
            <div>国家/地区：{{res.country}}</div>
            <div>运营商：{{res.area}}</div>
        </div>
    </div>
</body>
</html>
<script>
    new Vue({
        el: "#app",
        data: {
            ip: "",
            res: {},
            isShow: false
        },
        // 点击事件处理程序
        methods: {
            clickHandler() {
                // 获取ip地址
                let ip = this.ip
                // get请求
                axios.get("https://api.i-lynn.cn/ip?query=" + ip).then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        this.res = res.data
                        this.isShow = true
                    }
                })
                // post请求
                axios.post("https://api.i-lynn.cn/ip", "query=" + ip).then((res) => {
                    if (res.status == 200) {
                        this.res = res.data
                        this.isShow = true
                    }
                });
                axios.post("https://api.i-lynn.cn/ip", { query: ip }).then((res) => {
                    if (res.status == 200) {
                        this.res = res.data
                        this.isShow = true
                    }
                });
            }
        }
    })
</script>
~~~

### 2.5 拦截器

```js
    // 设置请求拦截器
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        // 请求
        config.headers.token = 123
        console.log('请求拦截', config)
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // 设置响应拦截器
    instance.interceptors.response.use(function (response) {
        // Do something with response data
        console.log('响应拦截', response)
        alert('请求成功')
        return response;
    }, function (error) {
        // Do something with response error
        return Promise.reject(error);
    });
```

