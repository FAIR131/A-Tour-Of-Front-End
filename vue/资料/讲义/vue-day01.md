[TOC]

# 一、Vue简介

## 1、概述

作者：尤雨溪

官网：https://cn.vuejs.org

Vue.js是一套构建用户界面的**渐进式**框架。**声明式渲染和组件系统是Vue的核心库所包含内容。**

- **构建用户界面:**  通过数据渲染成页面模板,展示给前端用户

- **渐进式**：循从`vue` 模板-指令-组件-路由- `vuex`等由简单=>复杂开发学习应用过程
- **框架**：半成品的应用，不断在维护更新的开源框架（之前学的jQuery也是一个框架）

![Vue特点](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/4f9e45db623e2c0f0dd1a45e985c36b83825ce6c.png?sign=cead88c04c73c6d314f093b1ef504d42&t=5f50707e)

![Vue与react在github上](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/229fe902962263af21443024e14a78b54ea5c3d1.png?sign=976600758fc879cea5db0a54774e1bda&t=5f5070ea)



- **声明**式渲染：（如同js基础一样，要使用变量则必须先声明变量，这种称之为声明式）

Vue.js的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进DOM的系统。也就是咱们后边数据驱动页面渲染。

- **组件化**应用构建

组件系统是Vue的另一个重要概念，因为它是一种抽象的允许我们使用**小型、独立**和通常**可复用**的“小积木”构建大型应用。几乎任意类型的应用界面都可以抽象为一个组件树。

![组件](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/279e26e948d53d33a2a05e10e7c29aa736fe80a1.png?sign=9f63925b42a763bb945ad25cda41928f&t=5f5073bf)

面试：vue两大核心：声明是渲染和组件系统

## 2、Vue的开发模式

面试：解释下mvvm是啥意思？

- M-V-VM
  - M：（model）普通的javascript数据对象（其实就是一个对象，对象里放了数据）
  - V：（view）前端展示页面（可以理解成html内容）
  - VM：（ViewModel）用于**双向绑定数据**与页面，对于我们的课程来说，就是vue的实例vm

MVVM 模式中的 ViewModel，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。**这种模式下，页面输入改变数据，数据改变影响页面数据展示与渲染**

> vue使用MVVM响应式编程模型，避免直接操作（真实）DOM , 降低DOM操作的复杂性。（虚拟DOM）

![MVVM](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/daf286bb718f7afb09ddea7205c58a18d56797f5.png?sign=9597d9d44c7ac8ace46d8ab7c0500407&t=5f560d40)



# 二、Vue入门

## 1、初识Vue

> vuejs文件分为“.min.js”与“.js”文件，区别在于其中带“.min”这个是生产版本（压缩版），不带“.min”的是测试版本（测试时用的，不压缩的）：
>
> - 生产版本
>   - 代码压缩体积小（代码不具备可读性)
>   - 不支持vue调试工具, 删除了警告,报错等提示信息。
> - 开发版本（vue.js）
>   - 代码不压缩（代码具备可读性）
>   - 支持vue的调试工具如警告



以输出“Hello World”为例，使用Vue.js实现输出“Hello World”案例：

> **步骤如下：**（仅限在vue的非工程化的环境下）
>
> - 在视图部分定义渲染的容器，正常情况下内容相对固定，一般是
>
>
> ```js
> <div id="app"></div>
> ```
>
> - 通过`script`标签引入下载好的`vue.js`文件，这样全局就会有一个Vue 构造函数。
> - new Vue() 创建vue实例对象 , 需要给实例传递配置选项（格式是一个对象）
> -  第一个参数 el： 指定vue负责渲染的容器的选择器，即元素挂载的位置，是CSS选择器或DOM选择器
> -  第二个参数 data:{ 定义数据} ，data 指定vue实例需要的数据（数据的初始化）
> -  页面展示数据的话使用插值表达式，形式`{{表达式}}`，在视图部分写，哪里需要值就在哪里写

- 代码片段如下：


~~~html
<body>
    <!-- 1. 定义渲染的容器 -->
    <div id="app">
        {{msg}}
        <div>
            <!-- 只要不出id=app这个容器的界限，不管多少深度，都没问题 -->
            {{msg}}
        </div>
    </div>
    <!-- 2. 引入vue.js文件 -->
    <!-- 通过`script`标签引入下载好的`vue.js`文件，这样全局就会有一个Vue 构造函数。 -->
    <script src="./js/vue.js"></script>
    <script>
        // 3. 产生vue实例（V是大写的），传递配置选项
        new Vue({
            // el => element，指定vue负责渲染的容器的选择器
            el: "#app",
            // data指定vue实例需要的数据（数据的初始化）
            data: {
                msg: "hello world",
            },
        });
    </script>
</body>
~~~

- 对应的data数据只能显示在对应的vue实例绑定的DOM 容器中 

```html
<body>
    <!-- 1. 定义渲染的容器1 -->
    <div id="app">
        <div>
            {{msg}}
        </div>
    </div>
    <!-- 2. 定义渲染的容器2 -->
    <div id="app2">
		<p>{{msg}}</p>   <!--该标签没有被绑定到对应的vue 实例，数据不会渲染 -->
	</div>
    <!-- 2. 引入vue.js文件 -->
    <script src="./js/vue.js"></script>
    <script>
        const vm1= new Vue({
            el: "#app",
            // data指定vue实例需要的数据（数据的初始化）
            data: {
                msg: "hello world",
            },
        });
        const vm2 = new Vue({
				data:{
					msg:'闻香识女人'
				}
			}) 
		vm.$mount('#app2') //实例对象绑定el的另一种方式
    </script>
</body>
```

上述提及的都是前端vue框架的模板语法，当然vue的模板不仅仅是上述这个2个，还有更多的，比如后面要学习的：

- 指令
- 事件
- 流程控制
- ....



## 2、vue devtools工具安装

1. 通过chrome中的谷歌插件商店安装Vue Devtools工具，此工具帮助我们进行vue数据调试所用，一定要安装。Vue工具在谷歌商店的地址是：https://chrome.google.com/webstore?utm_source=chrome-ntp-icon

> 请注意：打开chrome应用商店，**需要科学上网**才能访问到，至于怎么科学上网请各位自行解决。

![Vue工具谷歌商店](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/dc840deb63c247fb5b7fac6f162f3fece10832ae.png?sign=180564fbbac92d11b6e89e4e9d8df208&t=5f561a39)

安装好后打开Chrome的`开发者工具（F12或Ctrl+Shift+I）`即可使用：

![谷歌浏览器使用Vue工具](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/7ea8955be2b91f4c8530fdf7696fa2f5508b3a35.png?sign=2773c0e615128ca86b96c79bca31eaf4&t=5f561a6a)

2. **补充：如果自己解决不了科学上网问题，但是又需要用Vue开发工具那该怎么办？**

> 如果实在解决不了科学上网难题，Vue官方也提供了插件源码允许我们自己编译/构建Google Chrom插件，步骤如下（构建插件流程稍微麻烦一些<**不要求掌握如何构建**>，此处已为同学们构建好，可以直接使用）。
>
> ![Vue调试工具](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/6f094719844e04c1aa853b36c18b1e18c1ee6c2d.png?sign=55a5622a22b937b7b1b419ca67dafd6b&t=5f38fa24)

3. 安装chrome  Vue Devtools调试工具详细教程：

https://blog.csdn.net/li22356/article/details/113092495?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control



## 3、Vue模板语法

### 3.1、插值表达式

**插值表达式：**是vue框架提供的一种在HTML模板中绑定数据的方式，也叫 “Mustache”语法, 使用`{{变量名}}`方式绑定Vue实例中data中的数据变量，会将绑定的数据实时的在视图中显示出来。

插值表达式的写法支持使用：

- 变量名
- **部分**JavaScript表达式
  - 注：`{{  }}`括起来的区域，就是一个就是js语法区域，在里面可以写部份的js语法。不能写 var a = 10;分支语句;循环语句
- 三元运算符
- 方法调用（方法必须需要先声明）
- ...

~~~html
<body>
    <div id="app">
        <!-- 直接使用变量名 -->
        <h5>{{name}}</h5>
        <!-- 运算 -->
        <h5>{{name + '--好的'}}</h5>
        <h5>{{ 1 + 1 }}</h5>
        <!-- 使用函数 -->
        <h5>{{title.substr(0,6)}}</h5>
        <!-- 三目运算 -->
        <h5>{{ age > 18 ? '成年' : '未成年'}}</h5>
    </div>
</body>
<script src="./js/vue.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            title: "我是一个标题，你们看到没有",
            name: "张三",
            age: 20,
        },
    });
</script>
~~~



### 3.2、指令

**问1：什么是指令？**

- [x] 指令的本质就是标签中的vue**自定义属性**
- [x] 指令格式以“v-”开始，例如：v-cloak，v-text、v-html等

**指令的含义：在vue的html中，以`v-`开头的自定义属性就是指令。**

详见官网对指令的说明：https://cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4

**问2：指令有什么作用？**

正如插值表达式的效果，插值表达式只能用于标签之间的数据输出；在标签属性上，插值表达式无用武之地，但是有需要在属性中使用可变数据的情况，此时指令就能帮助我们解决这个问题。

语法糖：复杂操作的简化形式

当表达式的值改变时，将其产生的连带影响，响应式地作用于页面（DOM）。（简化操作）

**小试牛刀**：v-text指令与v-html指令【相当于innertHTML和innerText】

> **官网**
>
> v-text：https://cn.vuejs.org/v2/api/#v-text
>
> v-html：https://cn.vuejs.org/v2/api/#v-html



# 三、常用指令

## 1、v-text 数据绑定

- v-text	填充纯文本
  - 相当于之前原生的innerText
  - 相比插值表达式更加简洁
  - 不存在插值表达式的闪动问题

~~~html
<div id='app'>
    <!-- 插值表达式此时与v-text是等效的 -->
	<span>{{msg1}}</span>
    <span v-text="msg1"></span>
    
     <!-- 插值表达式此时与v-text是不等效的  ？？？？ -->
    <span>{{msg2}}</span>
	<span v-text="msg2"></span>
</div>

<script src="./js/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      msg1: '今晚da老虎',
      msg2:'<a href="http://www.baidu.com/">百度一下</a>'
    }
  })
</script>
~~~

## 2、v-html 数据绑定

- v-html 	填充HTML片段
  - 相当于原生innerHTML
  - 存在安全问题
  - 本网站内部数据可以使用，来自第三方的数据不可使用
    - 只有一个场景会使用：后台会用，比如有一个企业站，会发不企业的动态的新闻，这个时候会使用富文本编辑器，由于内容是自己人加的，所以可以放心使用。  自己攻击自己（自攻）

~~~html
<div id='app'>
     <!-- 插值表达式此时与v-html是等效的 -->
    <div>{{html1}}</div>
    <div v-html="html1"></div>
    <!--有xss攻击风险，获取当前本网站的cookie-->
    <div v-html="html2"></div>
</div>

<script src="./js/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      html1:'<a href="http://www.baidu.com/">百度一下</a>',//跳转到其他网站
      html2:'<span onclick="console.log(document.cookie)">测试</span>' 
    }
  })
</script>
~~~

> **有些时候我们不想指令中的表达式进行运行，只需要给表达式加个引号**。例如：

~~~html
<div v-html='"msg"'></div>
<div v-html="'msg'"></div>
~~~

针对后续想让指令属性值不解析的操作都可以这么去做。



