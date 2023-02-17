[TOC]



# 一、组件

## 1、什么是组件

组件 （Component）是 Vue.js 最强大的功能之一，**组件是一个自定义HTML元素（标签）**或称为一个模块，包括所需的模板（HTML）、逻辑（JavaScript）和样式（CSS）。

**组件化开发的特点：**

- 标准
- 分治（解耦）
- 重用
- 组合

组件也是有`全局（component）`与`局部（components）`之分。

## 2、组件的注册及使用

在使用组件时需要注意以下几点：

- 构造 Vue 实例时传入的各种选项**大多数**都可以基于原格式在组件里使用，只有一个例外：**data必须是函数，同时这个函数要求必须返回一个对象**

~~~javascript
data: function(){
    return {
        msg: '你好世界'
    }
}
~~~

- 组件模板`template`

  必须是单个根元素

  ```
  <!-- 单个根元素 div -->
  <div>
      <ul>
          <li></li>
      </ul>
      <ul>
          <li></li>
      </ul>
  </div>
  
  <!-- 没有包裹的根元素 -->
  <p></p>
  <p></p>
  ```

  支持模板字符串形式

- 组件名称命名方式

  短横线方式（推荐）
  
  - my-component
  
  - 大驼峰方式（只能在其他组件模板字符串中使用，不能在HTML模板中**直接**使用）
    - MyComponent

> 大驼峰式组件名不能在HTML模板中直接使用，如果需要在HTML模板中使用，需要将其进行特定规则转化：
>
> - 首字母从大写转为小写
> - 后续每遇到大写字母都要转化成小写并且在转化后的小写字母前加`-`
>
> 例如，`WoDeZuJian`这个大驼峰组件名在HTML中使用的时候需要写成`wo-de-zu-jian`



### 2.1、全局组件

全局组件注册形式如下：

~~~javascript
// 声明全局组件
Vue.component(componentName,{
    // 存放该组件需要使用的数据
    data: function(){
        return {
            
        }
    },
    // 用于定义组件的视图内容，必须有一个跟标签
    template: '组件模版内容'
})
~~~

上述示例中，`component()`的第一个参数是`组件名`（**实则可以看作是HTML标签名称**），第二个参数是一个对象形式的选项，里面存放组件的声明信息。全局组件注册后，任何Vue实例都可以使用。

代码演示：

~~~javascript
//html部分 
// 全局组件可以在不同实例使用
<body>
    <div id="app">
        <global-child></global-child>
    </div>
    <div id="app1">
        <global-child></global-child>  
    </div>
</body>

// js 部分 
// 声明一个全局的globalChild组件
    Vue.component("globalChild", {
        template: `<div><p>我是全局组件----{{globalname}}</p><p>我是第二个p</p></div>`,
        data() {
            return {
                globalname: "我是全局数据"
            }
        }
    })
    // 实例1
    const vm = new Vue({
        el: "#app",
        data: {

        }
    })
	//实例2
    const vm1 = new Vue({
        el: "#app1",
        data: {

        }
    })

~~~

### 2.2、局部组件

1. 局部组件定义后只能在当前注册它的Vue实例中使用，其是通过某个 Vue 实例/组件的实例选项 components 注册。

例如，有以下代码：

~~~javascript
// html 
<body>
    <div id="app">
        <partchild></partchild>
    </div>
</body>

// js
const vm = new Vue({
        el: "#app",
        data: {

        },
        components: {
            partchild: {
                template: `<p>我是局部组件---{{partname}}</p>`,
                data() {
                    return {
                        partname: "我是局部组件数据"
                    }
                }
            }
        }
    })
~~~

### 2.3、组件的使用

1. 在HTML模板中，组件以**一个自定义标签的形式存在**，起到占位符的功能。通过Vue.js的声明式渲染后，占位符将会被替换为实际的内容，下面是一个最简单的模块示例：

```html
<div id="app">
    <my-component></my-component>
</div>
```

2. 组件的嵌套：

也可以在一个组件的组件模板中去使用**其他已经注册的组件（一般是指全局组件）**的组件，例如：

~~~html
<body>
    <div id="app">
        <!-- 使用局部组件departchild -->
        <departchild></departchild>
    </div>
</body>

<script type="text/javascript">
    // 注册全局组件globalchild
    Vue.component('globalchild', {
        template: `<div>我是全局组件globalchild</div>`
    })
    new Vue({
        el: '#app',
        components: {
            // 注册局部组件departchild
            departchild: {
                template: `<div>
                                <div>我是局部组件departchild</div>
                                    <globalchild></globalchild>
                            </div>`
            }
        }
    })
</script>
~~~



## 3、组件间传值（重点）

### 3.1、父传子

- 父组件以属性的形式绑定值到子组件身上（传）
- 子组件通过使用属性props接收（收）
  - props是单向绑定的（只读属性）：当父组件的属性变化时，将传导给子组件，但是反过来不会
  - props属性支持两种常见的写法形式
    - 数组（推荐）
      - 优点：书写简单
      - 缺点：不能设置默认值、数据类型
    - 对象
      - 优点：可以设置数据默认值与数据类型
      - 缺点：写法复杂

**示例代码**

~~~html
<body>
    <div id="app">
        <child :day='day'></child>
	</div>
</body>

<script src="./js/vue.js"></script>
<script type="text/javascript">
    var child = {
        // props形式一：数组形式
        props: ['day'],
        // props形式二：对象形式
        props: {
            day: {
                default: '日',
                type: String
            }
        },
        template: '<p>星期{{day}}</p>'
    }
    const vm = new Vue({
        el: '#app',
        data: {
            day: '五'
        },
        components: {
            child
        }
    })
</script>
~~~

~~~text
扩展：实例属性
     在vue中，有一个实例属性也可以实现“父传子”的效果：$parent
     我们可以在子组件中通过`this.$parent.xxx`获取父中的`xxx`数据的值，从而在子组件自身中去使用`xxx`的值。

     但是需要注意，前面说的是父主动给数据给子，也就是父传子，而这里的$parent属于子去主动拿父的数据，语义上是两码事，但是效果一样。

代码示例：
// 取到父的msg，赋给子
this.msg = this.$parent.msg
~~~



### 3.2、子传父

- 子组件模版内容中用`$emit()`触发`自定义事件`，`$emit()`方法**至少**有2个参数
  - 第一个参数为自定义的事件名称（不要和内置的事件重名，例如click、change等）
  - 第二个参数为需要传递的数据（可选，可以是任何格式的数据）
- 父组件模板内容中的子组件占位标签上用v-on（或@）绑定子组件定义的自定义事件名，监听子组件的事件，实现通信 

**示例代码：每点击子组件按钮给父组件字体加9（由子决定，当然也可以写成其它的值）像素**

~~~html
<body>
    <div id="app">
       <p>{{msg}}</p> 
       <globalchild @transfer = 'getData'></globalchild>
    </div>
</body>

<script src="./js/vue.js"></script>
<script type="text/javascript">
   
// 1. 创建子组件
// 2.在子组件上定义事件，对应的执行函数 this.$emit("transfer",{name:"小红"})

 Vue.component('globalchild',{
     template:`<p @click = 'emitFn'>我是全局组件</p>`,
     methods:{
        emitFn(){
            // 参数1 自定义事件，参数2 传的数据
            this.$emit("transfer",{name:"小红"})
        }
     }
 })

const vm = new Vue({
    el:"#app",
    data:{
        msg:"张三",
        name:"小明"
    },
    methods:{
        getData(m){
            console.log(m)
            this.msg = m.name
        }
    }
})
</script>
~~~

![](https://storage.lynnn.cn/assets/markdown/91147/pictures/2021/03/74cca37e9f1958684fb725b118bdc6289d6b7a84.png?sign=f5d83cb284d62ddb900505cdcd7bfe6f&t=6061846a)

**父子组件传值案例效果：**

![image-20211013180908355](https://i.loli.net/2021/10/13/jLRkoSYuHi2Dtbl.png)

**演示代码**

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title></title>
	<script type="text/javascript" src="js/vue.js"></script>
</head>

<body>
	<div id="app">
		<!--使用子组件-->
		<publish @transfer='pushitem'></publish>
		<ul>
			<!--使用子组件-->
			<child v-for='(item,index) in list' :data='item'></child>
		</ul>
	</div>
</body>

</html>
<script type="text/javascript">
	const vm = new Vue({
		el: '#app',
		data: {
			msg: '我是父组件数据',
			list: [
				{
					name: "张三",
					content: '1111111'
				},
				{
					name: "李四",
					content: '222222'
				}
			]
		},
		methods: {
			pushitem(m) {
				console.log(m)
				this.list.push(m)
			}
		},
		components: {
			child: {
				props: ['data'],
				template: `<li>
					<h3>评论人:{{data.name}}</h3>
					<p>评论内容:{{data.content}}</p>
				</li>`,

			},
			publish: {
				template: `<p>
							<input type="text" placeholder="评论人" v-model='name'/>
							<input type="text" placeholder="评论内容" v-model='content'/>
							<button @click='pub'>发表</button>
						</p>`,
				data: function () {
					return {
						name: '',
						content: ''
					}
				},
				methods: {
					pub() {
						let obj = {
							name: this.name,
							content: this.content
						}
						//						console.log(obj)
						this.$emit('transfer', obj)
						// 每次点击完，清空输入框
						this.name = ''
						this.content = ''
					}
				}

			}
		}
	})
</script>
```



### 3.3、兄弟组件间传值

> EventBus又被称之为**中央事件总线**

在Vue中通过单独的`事件中心`来管理非`父子关系`组件（兄弟）间的通信：

![事件中心](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/297ffa8474e3e1ba1b392c422284a9889d9181f8.png?sign=b6a91e2548fd10fabc71f4adf538d61d&t=5f3a3491)

**核心步骤**

- 建立事件中心

  - ~~~javascript
    const eventBus = new Vue()
    ~~~

- 传递数据

  - ~~~javascript
    eventBus.$emit('自定义事件名',传递的数据)
    ~~~

- 接收数据

  - ~~~javascript
    eventBus.$on('自定义事件名'[,callback])
    ~~~

- 销毁事件中心

  - ~~~javascript
    eventBus.$off('自定义事件名')
    ~~~

```js
 <div id="app">
        <p>{{msg}}</p>
        <!--  使用全局组件-->
        <globalchild ></globalchild>
         <!--  使用局部组件-->
        <departchild></departchild>
    </div>
<script>
// 1. 注册2个兄弟组件
// 2. 创建中转站 eventBus = new Vue()
// 3. 兄弟1组件 @click = 'emitFn'  =   eventBus.$emit('transfer',{name:"小强"})
//4. 兄弟2组件  eventBus.$on('自定义事件',数据)
const eventBus = new Vue()

 Vue.component('globalchild',{
     template:`<p @click = 'emitFn'>我是全局组件</p>`,
     methods:{
        emitFn(){
            eventBus.$emit('transfer',{name:"小强"})
        }
     }
 })

const vm = new Vue({
    el:"#app",
    data:{
        msg:"张三",
        name:"小明"
    },
    components:{
        departchild:{
            template:`<p>我是局部组件--{{name}}</p>`,
            data(){
                return{
                    name:"小黑"
                }
            },
            created(){
                eventBus.$on('transfer',(m)=>{
                    console.log(m)
                    this.name = m.name
                })
            }
        }
    }
})

</script>
```

**案例：`互相伤害`**，具体代码实现可以查看本节对应的代码文件



### 3.4、ref

父取子的数据信息。（方向：子-父，但是区别于之前的子传父，之前是主动，现在是被动）

`ref`属性被用来给元素或子组件注册引用信息，引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用`ref`属性，则引用指向的就是 DOM 元素；如果`ref`属性用在子组件上，引用就指向子组件**实例**。

- `ref`放在标签上，拿到的是原生节点。`ref`放在组件上 拿到的是组件实例
- 原理：在父组件中通过`ref`属性（会被注册到父组件的`$refs`对象上）拿到组件/DOM对象，从而得到组件/DOM中的**所有的信息**，也包括值

~~~html
<!-- 普通DOM  拿到的是原生节点-->
<p ref="p" @click='handleClick'>hello</p>
<!-- 子组件 拿到的是组件实例-->
<child-comp ref="child"></child-comp>

<script>
new Vue({
    el: '#app',
    data: {

    },
    mounted: function(){
        console.log(this.$refs.p);
        console.log(this.$refs.child);
        this.$refs.comp.msg = '123' // 修改值
    },
     methods:{
        handleClick(){
            console.log(this.$refs.child)
        }
    }
})
</script>
~~~

> 注意：
>
> `ref`属性这种获取子元素/组件的方式虽然写法简单，容易上手，但是其由于权限过于开放，不推荐使用，有安全问题。（不仅可以获取值，还可以获取其他所有的元素/组件的数据，甚至可以修改这些数据。）



## 4、动态组件

通过使用保留的 `<component> `元素，动态地绑定到它的` is` 特性，==我们让多个组件可以使用同一个挂载点（位置），并动态切换。==

**示例代码**

~~~html
<body>
    <div id="app">
        <keep-alive>
    		<component :is="currentView"></component>
        </keep-alive>
    </div>
</body>

<script src="./js/vue.js"></script>
<script>
    // 多个组件
    var home = {}
    var posts = {}

    var vm = new Vue({
        el: "#app",
        data: {
            currentView: "home",
        },
        components: {
            home,
            posts,
        },
    });
</script>
~~~

> **keep-alive**的作用：
>
> `keep-alive`可以将已经切换出去的非活跃组件保留在内存中。如果把切换出去的组件保留在内存中，可以保留它的状态，避免重新渲染。

**案例：使用动态组件实现简易的步骤向导效果**

![简单步骤向导效果](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/74c301397cf23d1f0c58ce398c3d7fe73352ff44.gif?sign=82eb695c150acf8e3ce3ac7ec7e54009&t=5f5b549b)

**案例参考代码**

~~~html
<body>
    <div id="app">
        <button @click='change("step1")'>第一步</button>
        <button @click='change("step2")'>第二步</button>
        <button @click='change("step3")'>第三步</button>
        <keep-alive>
            <component :is="name"></component>
        </keep-alive>
    </div>

</body>

<script src="./js/vue.js"></script>
<script>
    var step1 = {template: '<div>这是第一步的操作</div>'}
    var step2 = {template: '<div>这是第二步的操作</div>'}
    var step3 = {template: '<div>这是第三步的操作</div>'}

    var vm = new Vue({
        el: "#app",
        data: {
            name: "step2",
        },
        components: {
            step1,
            step2,
            step3
        },
        methods: {
            change:function(name){
                this.name = name
            }
        }
    })
</script>
~~~

> 在动态组件中存在2个生命周期函数（需要配合keep-alive标签）：
>
> ​              activated：激活缓存组件的时候被触发
>
> ​              deactivated：离开缓存组件的时候被触发
>
> ​            当使用了keepalive组件后，组件在切换的时候就不会被销毁，而是被缓存起来了。【此处需要注意生命周期相关的执行情况】
>
> 上述2个周期函数与销毁2的2个周期函数如果都存在，则只会激活其中的一对（要么激活系列，要么销毁系列，可以看作激活系列是销毁系列的替代）。
>
> 如果使用了keepalive，则只有第一次渲染的时候会走前4个生命周期函数，后续再激活组件的时候，前四个周期就不会再产生触发效果。



## 5、插槽

插槽也是组件传值的一种方式。

组件的最大特性就是`重用`，而用好插槽能大大提高组件的可重用能力。

![小霸王](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/ccc81e4e187bb6ac614d3d69724cb4c5342fed73.jpeg?sign=b0c53aaaa69c1bdfe25e76e303c54362&t=5f5b5665)

**插槽的作用：**父组件（卡）向子组件（游戏机）传递内容。【插槽应该在子组件上】

![父组件向子组件传递内容](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/c5ddf742613c5886ff140e5d381f9ff76a803d8b.jpeg?sign=59bc2dccbbaf747f12c649b7c17d9415&t=5f3a3981)

通俗的来讲，**插槽无非就是在`子组件`中挖个坑，坑里面放什么东西由`父组件`决定。**（父-子）

插槽类型有：

- 单个（匿名）插槽
- 具名插槽
- 作用域插槽

### 5.1、匿名插槽

> 匿名插槽一般就是使用单个插槽

**示例代码**

~~~html
<body>
    <div id="app">
        <!-- 插槽内容 -->
        <alert-box>Something bad happened.</alert-box>
    </div>
</body>

<script src="./js/vue.js"></script>
<script type="text/javascript">
    Vue.component("alert-box", {
        template: `
                <div class='demo-alert-box'>
                    <strong>Error:</strong>
                    <slot></slot>
                </div>
		`
    });

    const vm = new Vue({
        el: "#app",
    });
</script>
~~~

> 注意：子组件的`slot`标签中允许书写内容，当父组件不往子组件传递内容时，`slot`中的内容才会被展示出来。



### 5.2、具名插槽

`slot` 元素可以用一个特殊的特性 `name` 来进一步配置如何分发内容。多个插槽可以有不同的名字，具名插槽将匹配内容片段中有对应 `slot` 特性的元素。【在使用具名插槽的时候，允许存在一个匿名插槽】

**`上中下`形式网页布局示例代码**

~~~html
<body>
    <div id="app">
        <app-layout>
            <h1 slot="header">这里可能是一个页面标题</h1>

            <p>主要内容的一个段落。</p>
            <p>另一个主要段落。</p>

            <p slot="footer">这里有一些联系信息</p>
        </app-layout>
    </div>
</body>

<script src="./js/vue.js"></script>
<script type="text/javascript">
    Vue.component("app-layout", {
        template: `
            <div class="container">
                <header>
                	<slot name="header"></slot>
                </header>
                <main>
                	<slot></slot>
    			</main>
                <footer>
                	<slot name="footer"></slot>
                </footer>
            </div>
            `
    });

    const vm = new Vue({
        el: "#app",
    });
</script>
~~~

> 具名插槽存在的意义就是为了解决在单个页面中同时使用多个插槽。



### 5.3、作用域插槽

**应用场景：**父组件对子组件的内容进行加工处理

作用域插槽是一种**特殊类型**的插槽，**作用域插槽会绑定了一套数据，父组件可以拿这些数据来用**，于是，情况就变成了这样：样式父组件说了算，但父组件中内容可以显示子组件插槽绑定的数据。

**示例代码**

~~~html
<body>
    <div id="app">
        <child>
            <div slot-scope="props">
                <div>父组件</div>
                <h3>{{ props.text }}</h3>
            </div>
        </child>
    </div>
</body>

<script src="./js/vue.js"></script>
<script type="text/javascript">
    Vue.component('child', {
        template: `
            <div>
            	<slot text="我是子组件中的内容"></slot>
            </div>
			`
    })
    const vm = new Vue({
        el: '#app'
    })
</script>
~~~

![](https://storage.lynnn.cn/assets/markdown/91147/pictures/2021/08/27c279c5c2c07acefa4b7ec07a2acf64299d355f.png?sign=6948c21a258d740a9aa42ca003c89f4c&t=612e0c13)



# 二、vue 工程化开发

vue command line tool，简单的来讲，就是一个基于命令行的vue开发工具。

**Vue-CLI ≠ Vue**，Vue-CLI就是一个Vue工具。

vue脚手架工具

## 1、单文件组件

在很多 Vue 项目中，我们使用 Vue.component 来定义全局组件，紧接着用 new Vue({ el: '#container '}) 在每个页面内指定一个容器元素。这种方式在很多中小规模的项目中运作的很好，在这些项目里 JS 只被用来加强特定的视图。但当在更复杂的项目中，或者你的前端完全由JS驱动的时候，下面这些缺点将变得非常明显：

- 所有的组件都放同一个html文件中
- 没有构建步骤(build操作)，不能使用npm来管理项目
- 缺乏语法高亮和提示
- 没有针对单个组件的css样式支持

针对于上述的问题，vue框架发布了`vue-cli`项目`生成`工具，Vue-cli是一个基于 Vue.js 进行快速开发的完整系统， 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。

![单文件组件](https://storage.lynnn.cn/assets/markdown/91147/pictures/2021/06/49ef84aa819fb546d90fbc68bdf652d5ef883ab3.png?sign=700ff63c1d28e5bf1b0fdd612a30ac6d&t=60daccd0)

单文件组件的要求：

- 后缀必须是“.vue”
- 需要使用三个标签将整个文件分成3部分
  - template标签：包裹的是html部分（视图部分）【必须要有的】
  - script标签：包裹的是JavaScript部分（逻辑部分）【必须要有的】
    - css-in-js：在JavaScript中写样式
  - style标签：包裹的css/scss/less等样式部分（样式部分）【可以没有】
    - 样式存在范围的问题的
      - 有“scoped”属性则表示该组件的样式代码只在当前组件生效
      - 如果没有“scoped”属性则表示该组件的样式会影响自己及后代，一般在工程化开发的模式中，只有根组件“App.vue”不写“scoped”属性（全局样式）
- 其他的语法与之前的一致
- 单文件组件只是工程化中的一个文件，无法单独运行，必须在项目中运行



## 2、工具安装

网址：http://npmjs.com

~~~shell
## 安装
# -g：全局安装
npm i -g @vue/cli

## 安装成功后，检查
vue --version
vue -V
#  Vue和VueCLI是两回事

## 卸载（了解）
npm uninstall -g @vue/cli
~~~

![版本检查](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/0a637b8f10a340665538af6f079480dabf686f21.png?sign=d4b0bcdfcda0c91a18b1212f24892c5d&t=5f63af2f)

> 如果需要安装其他版本，可以使用`npm install -g @vue/cli@版本号`的方式进行指定版本。

如果最新版安装不成功，可以尝试以下几种方式去解决：

- 断网，使用热点共享流量去执行安装命令
- 安装其他版本
- 切换一下npm镜像源，切换成淘宝镜像
- 卸载nodejs重安装
- 重装系统/换电脑



## 3、创建项目

脚手架创建初始项目的方式有2种：

- 通过UI界面方式去创建（了解）

  - 在命令行中输入以下命令启动UI界面：

  - ~~~shell
    vue ui
    ~~~

- 通过命令行的方式切创建（推荐）

  - 执行命令：

  - ~~~shell
    vue create 项目名	
    ~~~

~~~shell
# 首先需要进入到对应的目录中(英文目录不要有空格及中文),执行如下命令
# 如果当前你的终端工作路径带有中文或者空格，你可以使用`cd 路径`形式进行路径切换，切换到符合要求的路径中
vue create 项目名称(创建时会自己以对应的项目名称生成目录)
## 例
vue create myproject
# 上述命令中，可以允许变的就是`myproject`部分
~~~

**以下步骤以`Vue CLI v4.5.6`为例，仅供参考，在实际使用时，请以自身需求为准进行配置**

- 预设选择

![预设选择](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/3306e33dc3e5d81070a8dc78b02d897565e97ad7.png?sign=c5f7873bfe1db941667c2c8f4c1660bf&t=5f6725b8)

- 选择预设功能（**根据自身项目需要选择**）

![预设功能选择](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/983429d74ae8a2b0bcbe6989c9ba9222a7ef6c2a.png?sign=cc4159e20f273686b40ac1c0caac9d05&t=5f672644)

- 选择Vue版本

![vue版本选择](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/675e2b02b44d13452ad50edff22290e7940cd982.png?sign=59a0c6ddfea13fde357d1f384296978e&t=5f67266e)

- 选择`ESlint`配置（如果启用）

![eslint](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/82a888c3ce2ab58c6f0af95423d671b7def7c823.png?sign=1f6540c77f791528813ac36e2de731c3&t=5f6726bb)

- 选择额外的`eslint`功能

![额外lint选配](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/43ca4b950cee6c4b437521ce5eda7d7435c2488a.png?sign=fe94111f1dd389c051af27ede9dd231f&t=5f67278e)

- 是否独立配置

![是否独立配置](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/c73968823c3540002ba7365381f9a2d075c15ac4.png?sign=2baba46888f7a176c6d27f3441522b1a&t=5f6727b1)

- 是否保存本次操作预设

![保存预设](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/4f8734a2d5581a1616b4ebfe1117b6b2fa322618.png?sign=beda5914c014f84d5a02b61f89c49ca8&t=5f6727eb)

- 项目创建成功

![创建成功](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/74b3f1f5a30596606c16b93fc24ab018e6e98487.png?sign=531f60f30c89e95c6718fad45ee248d0&t=5f6728ae)



## 4、目录结构介绍

- public：不需要去改动现有的文件，里面存放的是浏览器访问的入口文件（index.html）

- src（**后期很多操作都在这个目录中完成**）
  - main.js：项目/程序入口文件 （该文件中JavaScript代码都会被执行）
  - App.vue：根组件（万物之根）
  - components：存放自定义的`功能`组件（涉及到业务逻辑）
  - assets：静态资源目录（图片、视频、音频等就是静态资源），这里面的静态资源浏览器是无法直接访问的，而是给组件通过模块化的方式导入进组件使用的。
    - 项目中的静态资源有2个地方可以放
      - public：供在public/index.html中直接引入（link标签、script标签）的
      - src/assets：供单文件组件导入时需要的静态资源文件（import ...）
  - **views：（当前是没有的，但是后期要用）存放`视图`组件的**（只是涉及到页面的布局排版）

如何很好的划分功能组件与视图组件呢？

小技巧：可以被复用的就算它功能组件，不能被复用的就算它是视图组件。



补充：（readme.md文件中的内容）后续入职的时候项目给到的代码可能不不包含node_modules目录，需要自己执行`npm i`，随后项目才完整。



## 5、项目的运行及注意事项

### 5.1、项目的启停

![创建成功](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/74b3f1f5a30596606c16b93fc24ab018e6e98487.png?sign=531f60f30c89e95c6718fad45ee248d0&t=5f6728ae)

如上图所示，在创建项目完成后有提示我们后续的操作：

- 在命令行中进入项目目录
- 运行`npm run serve`命令来启动项目

按照上述命令执行后，我们会见到如下的效果，即表示项目运行成功：

![项目启动成功](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/1335f9133e19d0a1d6b2f629bc8b7bde9a0868d8.png?sign=5b56d2e029b8969783fd1c82dc299261&t=5f683757)

>  注意：默认端口号会从8080开始，如果再次启动其他项目后续会以8081、8082……进行监听。

如果需要停止正在运行的项目，可以选择以下两种方式任一：

- 关闭终端
- 在终端中按下组合键`Ctrl + C`（Cancel），随后选择`Y`并键入`回车`（如下图）
- 也可以按下两次`Ctrl + C`

![关闭项目运行](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/987aba14adc55be552add382c8c565d82dbf5b90.png?sign=ffaad83e946c9b1205a489388dc64adc&t=5f68396c)

> 部分同学的机器在启动vue项目的时候可能会出现卡在“40%”的进度并且长时间不动，如果这样，则直接`Ctrl + C`停止本次启动，重新再去尝试启动。

==关于项目运行时，如果修改了项目代码是否需要重启的说明：==

是否需要重启取决于我们修改了什么内容，如果只是修改了代码部分（js、css、vue文件等）是不需要开发者手动重启项目的，系统会自动重新编译（有点nodemon感觉）；**但是如果修改的是配置文件，则必须需要自己先去停止项目，然后再去启动项目（手动实现重启）。**



### 5.2、关于ESlint

1. ESlint用于规范项目的编码，大型项目一般多人开发，为了避免一些个人编程恶习`坑自己坑别人`，项目中使用了ESlint会起到`紧箍咒`的作用，强制开发人员注意代码规范。例如，在不使用ESlint的情况下，JS允许我们声明一个不变量但不使用。如果使用了ESlint，在上述情况下会报错如下：

![eslint报错演示](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/b83ccf704842a3a495c99aba44baa772ede48a7b.png?sign=787cecc32474ee8d85b6b6a6ffd1116c&t=5f6838c1)

关于ESlint的报错，有一份错误参照，可以访问以下地址查看：https://cn.eslint.org/docs/rules/

在前期学习阶段不建议去使用ESlint，所以待会会重新创建一个不带有`eslint`的项目来学习路由的使用。但是，以后企业中开发项目的时候都会启用eslint。

2.开发阶段关闭eslint

- 在项目根目录创建vue.config.js 文件，配置如下：

- ```js
  module.exports = {
      lintOnSave: false// eslint-loader 是否在保存的时候检查
  }
  ```

  

### 5.3、环境变量

环境变量=配置文件

问题：此处的配置文件与之前模块化拆分出来的config.js文件有啥区别？

答：虽然都能实现配置，但是还是有区别的。区别在于，config.js文件是模块化产物，在使用的时候需要导入；而此处的环境变量的配置文件是属于系统性质的文件，不需要（我们自己）导入，系统在运行的时候自动引入。

步骤：

①在vue中是支持环境变量的使用的，但是其默认没有给我们提供环境变量配置文件，需要自己创建：

​	a. 环境变量配置文件创建的位置在：**项目的根目录下**

​	b. 环境变量的配置文件名称固定：

   				1.  `.env`：该文件里放的是全局的环境变量的配置（该文件中的配置项在任何的时候都会被使用）
      	                    				2.  `.env.development`：该文件里放的是开发环境下才使用的配置（该文件中的配置只有在运行`npm run serve`的时候会被加载）
         	              				3.  `.env.production`：该文件里放的是生产环境下才使用的配置（该文件中的配置只有在运行`npm run build`的时候才会被加载）

​    c. 三个文件的名称千万不能写错，我们也不用自己去考虑应该导入哪个，全是系统自动判断

4. 在上述三个配置文件中，配置项的名字必须以`VUE_APP_`开头，如果不是，则该配置项不会生效

5. 如果有一个配置项，例如`VUE_APP_NAME`同时存在于上述三个配置文件中，优先级是怎么样的？

     如果是开发模式（npm  run serve）：.env.development > .env

     如果是生产模式（npm run build）：  .env.production > .env

②在代码中去获取配置项的值采用以下语法：

~~~js
process.env.VUE_APP_XXXX_YYYY
~~~

③如果配置文件中的某配置项暂时性的不想要，则可以采用注释的方式临时取消，注释符是`#`



