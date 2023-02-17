[TOC]

# 一、路由

## 1、路由的概念

路由的本质就是一种`对应关系`（此处的路由含义同之前nodejs的路由），根据不同的URL请求，返回对应不同的资源。那么url地址和真实的资源之间就有一种对应的关系，就是路由。

路由分为：`后端路由`和`前端路由`

- 后端路由：由服务器端进行实现并实现资源映射分发（nodejs、jsp、php等）
  - 概念：根据不同的用户URL请求，返回不同的内容（**地址与资源**产生对应关系）
  - 本质：URL请求地址与服务器资源之间的对应关系（映射）

![后端路由](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/a832ee01e808edae5e035257d6d9b65411ca0142.jpeg?sign=2a588882a568365ae19f525571bce452&t=5f3e3ebf)

- 前端路由：根据不同的**事件**来显示不同的页面内容，是事件与事件处理函数之间的对应关系
  - 概念：根据不同的用户事件，显示不同的页面内容（**地址与事件**产生对应关系）
  - 本质：用户事件与事件处理函数之间的对应关系

![前端路由](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/2bddc42178c6449942b3dfe53187a890a20f4c9f.png?sign=c895f41a55db1f871fee8c98db306c8e&t=5f3e41f2)



记住一句话：有请求就应该有响应，只不过区别在于，之前node是响应资源，现在在前端中通过事件来进行响应。



## 2、前端路由实现

> 面试题：请你说出前端路由是怎么实现的？或者有哪几种实现方式？
>
> 答：前端路由模式有两种实现方式：hash方式、history方式。

核心思想：通过**监听**地址栏的变化**事件**来实现资源的动态显示

前端路由有2种模式：

- hash模式

>  hash路由模式是这样的：http://xxx.abc.com/#/abx。 有带#号，hash值为 #/abc，它不会向服务器发出请求，因此也就不会刷新页面。并且每次hash值发生改变的时候，会触发hashchange事件。因此我们可以通过监听该事件，来知道hash值发生了哪些变化。

~~~javascript
window.addEventListener('hashchange', ()=>{
  // 通过 location.hash 获取到最新的 hash 值
  console.log(location.hash);
});
~~~

**hash路由原理：**

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title></title>
	<script type="text/javascript" src="js/vue.js"></script>
</head>
<body>
	<a href="#/a">去a页面</a>
	<a href="#/b">去b页面</a>
	<a href="#/c">去c页面</a>
	<a href="#/d">去d页面</a>
	<!-- 存放对应的页面 -->
	<div id="route-view"></div>
</body>
<script type="text/javascript">
	// hash 是指 url 中锚的部分，即（锚点链接）也就是从#开始的部分
	// 如： http://www.runoob.com/test.htm＃part2    输出 ＃part2 即为hash值
	// 获取元内容素
	var ctn = document.getElementById('route-view')
	// 默认渲染
	render('#/a')

	// 监听hashchange事件
	window.addEventListener('hashchange', function () {
		render(location.hash)
	})

	// 分支
	function render(router) {
		switch (router) {
			case '#/a':
				ctn.innerHTML = '这是a页面'
				break;
			case '#/b':
				ctn.innerHTML = '这是b页面'
				break;
			case '#/c':
				ctn.innerHTML = '这是c页面'
				break;
			case '#/d':
				ctn.innerHTML = '这是d页面'
				break;
			default:
				ctn.innerHTML = '404页面'
				break;
		}
	}
</script>
```



- history模式

> 形如：http://xxx.abc.com/xx/yy/zz。HTML5的History API为浏览器的全局history对象增加了该扩展方法。它是一个浏览器（bom）的一个接口，在window对象中提供了onpopstate事件来监听历史栈的改变，只要历史栈有信息发生改变的话，就会触发该事件。

~~~javascript
history.pushState({},title,url); // 向历史记录中追加一条记录
history.replaceState({},title,url); // 替换当前页在历史记录中的信息。
window.addEventListener('popstate', function(event) {
	console.log(event)
})
~~~

>注：浏览器地址没有#， 比如(http://localhost:3001/a); 它也一样不会刷新页面的。但是url地址会改变。**但它在服务器没有配置的情况下，不能手动刷新，否则返回404页面**



## 3、Vue Router

网址：https://router.vuejs.org/zh/，vuerouter是vue全家桶之一。

**此处建议创建一个不带`ESlint`、带Router的vue项目。**

### 3.1、介绍

**Vue Router 是 Vue.js 官方的路由管理器**。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由（套娃，父子路由）

- **模块化**的、基于组件的路由配置

- 路由参数、查询、通配符

- 带有自动激活（默认选中效果）的 CSS class 的链接

- HTML5 历史模式或 hash 模式




### 3.2、安装

如果在vue-cli创建项目时没有勾选上`vue-router`选项，此时就需要手动的来安装它（**切记，要进入项目中再去运行这个指令**）：

~~~shell
npm i -S vue-router
~~~

查看是否安装成功，查看此文件`/package.json`

![vue-router安装成功检查](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/da67726d850713a81b814a877c862431a1740a5c.png?sign=f20b3897f66ca81281c00986e18faee3&t=5f67297b)



### 3.3、Vue Router基本使用（了解）

Vue Router的基本使用步骤：

- 在src/创建路由文件的归档目录“router”
- 引入相关库文件
- VueRouter引入到Vue类中
- **定义路由组件规则**
- 创建路由实例
- 把路由挂载到Vue根实例中
- **添加路由组件渲染容器（router-view，组件）到对应组件中（占坑）**
  - 情况1：放在根组件中
  - 情况2：放在嵌套路由中的父组件中

~~~javascript
// 引入相关库文件
import Vue from 'vue'
import VueRouter from 'vue-router'

// VueRouter引入到Vue类中
Vue.use(VueRouter)

// 组件的引入
import Foo from './views/Foo'
import Bar from './views/Bar'

// 定义路由规则
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 创建路由实例
const router = new VueRouter({
  routes
  // routes: anyname
  // 传递规则的时候，传递的规则的属性名必须是`routes`
})

// 暴露router让外界使用（默认导出，一个模块只能默认导出1次）
export default router
// =====================================
// 挂载根实例（main.js）
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

<!-- html，添加路由组件渲染容器 -->
<div id="app">
	<router-view></router-view>
</div>
~~~

> - 后期在项目中以`index`命名的文件在引入时，可以省去文件名不写。
> - 在`import`的时候如果涉及到了路径，建议写`@`符号开头的路径（`@表示src目录`，这个操作是打包工具已经帮我们定义好了，vue-cli的功劳，后续webpack再去说明）
> - 名称的规范：
>   - 在`创建路由实例`的时候要去其属性名必须是`routes`
>   - 在`挂载路由实例到根实例`的时候要求属性名必须是`router`
>   - 请注意大小写

**示例代码：**

![routes/index.js](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/00810b3416ddd643264759afc7ad02b9d6833a82.png?sign=60800f7e2d3ebbcba55de10b29593aea&t=5f6871ac)

![main.js](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/d98d49a6c9f0358740b11c9b542b37ab51b44897.png?sign=2cf1003937bef9dc2ed1f55e790d3a28&t=5f6871e0)

![app.vue](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/1d97fb78f01c15d2cdaca96b6d110431802e46e8.png?sign=eb5a33ccb1361cb1f2cfcdd8d38b4a83&t=5f68720e)

**src/views/Hello.vue代码**

~~~vue
<template>
    <div>这是hello页面</div>
</template>
~~~

**src/views/News.vue代码**

~~~vue
<template>
    <div>这是新闻页面</div>
</template>
~~~

**实现效果：**

![实现效果](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/2fd0e496a9ce93a7398722534ca24f93abf8cdd0.gif)



### 3.4、路由模式切换

vue-router中默认使用的是hash模式的路由，也就是前面介绍的地址栏中URL带有“#”的形式，如果需要切换成history模式，则可以在创建路由实例时进行指定，指定的配置项为`mode`，可选值：

- hash：**默认**，设置路由模式为hash路由
- history：设置路由模式为history路由

例如，如果我们想设置路由模式从`hash`改变为`history`则可以配置路由入口文件为：

![](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/12/c735b5283efb3e76d43cf89b4b89c65dcba785c4.png?sign=6830b10dd2e39b531168ecd273d135cb&t=5fd8d66d)



### 3.5、导航方式

含义：从一个组件/地址去往另一个组件/地址的方式。

在页面中，导航实现有2种方式：

- 声明式导航：通过点击链接实现的导航方式，例如HTML中的“<a>”标签，Vue中的“<router-link>”所实现的。（其性质与a标签的性质类似）
- 编程式导航：通过调用JavaScript形式API实现的导航方式，例如location.href实现的跳转效果

#### 3.5.1、声明式导航

它就是先在页面中定义好跳转的路由规则，vueRouter中通过router-link组件来完成

~~~html
<router-link to="path">xxx</router-link>
<router-link :to="{path:'path'}">xxx</router-link>
<router-link to="path" tag="p">xxx</router-link>
<!-- 
	to 要跳转到的路由规则  string|object
	to="users"
	:to="{path:'path'}"

	tag="tagName"		去指定声明式导航产生的链接所使用的标签，默认是a标签
-->
~~~



#### 3.5.2、编程式导航

简单来说，编程式导航就是通过`JavaScript`来实现路由跳转

~~~javascript
this.$router.push("/login");
this.$router.push({ path:"/login" });
this.$router.push({ path:"/login",query:{username:"jack"} });
// 不要将path属性与params属性一起使用，这样会导致params路由参数获取不到
// name属性可以与params属性传参一起使用
this.$router.push({ name:'user' , params: {id:123} });
this.$router.go( n );//n为数字  负数为回退
this.$router.back(); // 返回上一页
~~~

**注意点：**编程式导航在跳转到与当前地址一致的URL时会报错，但这个报错不影响功能：

![重复导航错误](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/ffae8bf7ff5e46907768198ed81ce996be3ee11f.png?sign=fdd95d31c85eedc806e8e5b0817fc555&t=5f68a439)

如果患有强迫症，可以在路由入口文件`index.js`中添加如下代码解决该问题：

~~~javascript
// 该段代码不需要记，理解即可
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
~~~

**面试题问题：`this.$router`与`this.$route`有什么区别？**

答：`$router`是用于做编程式导航的（改变路由的）；`$route`是用户获取路由信息的。



### 3.6、路由重定向

- 概念：用户在访问地址 A 的时候，强制用户跳转到地址 C ，从而展示特定的组件页面
- 实现： 通过路由规则的` redirect `属性，指定一个新的路由地址，可以很方便地设置路由的重定向

**代码示例**

~~~html
<script type="javascript">
var router = new VueRouter({
    // routes是路由规则数组 
    routes: [
        // 每个路由规则都是个配置对象，至少有path和component两个属性（重定向除外）
        // path表示当前路由规则匹配的hash地址 
        // component表示当前路由规则对应要展示的组件
        { path: '/', redirect: '/user' },
        { path: '/user', component: User },
        { path: '/register', component: Register }
    ]
})
</script>
~~~

> component属性是可选属性，因此在写的时候需要注意，写错了也不会报错的。



### 3.7、嵌套路由（重点）

路由前缀： **/admin/user**/add    **/admin/user**/del   **/admin/user**/mod

相同部分可以**提取**出来，减少重复劳动。

————————————以上为nodejs中的概念————————————————

上述概念在vue中被称之为叫做嵌套路由。

套娃，可以按照之前的nodejs处的路由前缀去理解。（当有些路由有公共部分的前缀时，在vue中就可以使用嵌套路由）

嵌套路由最关键在于理解子级路由的概念：

比如我们有一个`/users`的路由，那么`/users`下面还可以添加子级路由，如:`/users/index`、`/users/add`等等，这样的路由情形称之为嵌套路由。

>  核心思想：在**父路由组件**的模板内容中添加子路由链接和子路由**填充位（占坑）**，同时在路由规则处为父路由配置**children属性**指定子路由规则：

~~~javascript
routes: [
  { 
      path: "/user", 
      component: User, 	//这个不能丢
      // 通过children属性为/user添加子路由规则
      children:[
          // 子路由地址前不能写“/”，如果写了则表示从根开始
          { path: "index", component: Index },
          { path: "add", component: Add },
      ]
  }
]
~~~

~~~html
<!-- 需要在 User组件中定义一个router-view 用于嵌套路由的渲染显示 -->
<router-view></router-view>
~~~



### 3.8、404路由

作用：用于处理当路由匹配不上的时候页面的展示（不做404路由，则页面显示白板页面）

由于Vue路由是**从上到下执行**的，**只要在路由配置规则中最后面放个*号（通配符）路由就可以了**，例如：

~~~javascript
const routes = [
    { path: "/hello", redirect: Hello },
    { path: "/about", component: About },
    { path: "/news", component: News },
    // 404路由
    { path: "*", component: NotFound },
];
~~~

问题：正常情况下404找不到会有状态码，是404，请问，为什么我们现在看到的状态码是200？

答：目前是在做前端开发，不是后端开发，无法指定返回的状态码，等到vue项目上线后可以与后端服务器结合实现状态码的指定。



### 3.9、动态路由匹配（重点）

> 本节知识点就是为了restful服务的，看如果在vue中使用restful形式进行**参数传递**。

所谓动态路由就是路由规则中有部分规则是动态变化的，不是固定的值，需要去匹配取出数据（即`路由参数`）。

- 如何传递
  
  在声明路由的时候，将可变部分通过“`:变量名`”的形式进行替代
- 如何获取

  获取this.$route来获取

~~~javascript
// 传递参数id
var router = new VueRouter({
    // routes是路由规则数组 
    routes: [
        { path: '/user/:id', component: User },
        // 此处的“:”只是在声明的时候写，在使用的时候不需要写“:”
    ]
})

// 组件视图中获取id值（html-vue形式组件）
const User = {
    template: '<div>User ID is {{$route.params.id}}</div>'
}

~~~

~~~vue
<template>
    <div>
        <!-- 单文件形式的组件, 可以在视图中直接接收路由参数，但是一般不这么用 -->
        这是news组件{{$route.params.id}}
    </div>
</template>
~~~

路由规则中的“:”只是在声明的时候写，在使用的时候不需要写“:”，例如如下代码：

![编程式导航](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/25307732297b5b553fed47d882adcf6f1c48dd0f.png?sign=044378c5358328bb077579da2ac5276e&t=5f69759e)



问题：如上代码，如果路由规则里声明需要传递参数，但是实际使用的时候没传递参数会怎么样？

答：如果声明需要传递参数，但是实际不传的话则会影响落地页的显示，显示成白板（但是不报错）。但是如果有404路由在规则的最后，则匹配404路由。



**注意：在实际开发的时候会有可能需要传参也可能不需要传参的情况，这个时候需要用到`可选路由参数`点。**

定义可选路由参数的方式很简单，只需要在原有的路由参数声明位置后面加上个`?`即可。例如：

~~~javascript
{ path: "showdetail/:id?", component: ShowDetail },
~~~



### 3.10、路由跳转传参的几种方式

声明式导航传参：

```js
// 传固定值
<router-link to="/about/1">About</router-link>
// 传数据
<router-link :to="'/about/' + id">About</router-link>
// 传对象 query方式  path与query 搭配
<router-link :to="{ path: '/test', query: { id: id, name: '张三' } }">About</router-link>
// 传对象 params方式 name与params 搭配
<router-link :to="{ name: 'About', params: { id: id, name: '李四' } }">About</router-link>

// 对应路由中的参数配置(:参数名1/:参数名2...)
{
    path: '/about/:id/:name',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
}
// 对应组件中获取参数
this.$route.params 或 this.$route.query(使用query方式传参)
```

编程式导航传参：

```js
// params 方式传参
this.$router.push({ name: "Test", params: { id: 123 } });
// query  方式传参
this.$router.push({ path: "/test", query: { id: 123, name: "李四" } });

// 对应组件中获取参数
this.$route.params 或 this.$route.query(使用query方式传参)
```



### 3.11、命名路由（可选）

命名路由：路由别名，顾名思义就是给路由起名字（外号）。

例如：阿列克赛·马克西莫维奇·彼什科夫					（高尔基）

通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。

~~~javascript
// 路由
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      name: 'user',
      component: User
    }
  ]
})
~~~

~~~html
<!-- 声明路由 -->
<router-link :to="{ name: 'user', params: { id: 123 }}">User</router-link>
~~~

问：一般什么使用用命名路由？

答：当路由本身的path写法比较长的时候，建议写命名的方式。而且需要注意，如果使用的是path写法，则当path发生变化后，其对应的导航地址也需要跟着变化。但是如果使用了别名则不用理会path内容的变化（只要名不变就没事）。

