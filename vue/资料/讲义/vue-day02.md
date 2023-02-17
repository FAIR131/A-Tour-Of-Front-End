[TOC]

# 一、常用指令

## 1、v-cloak

**作用：**解决浏览器在加载页面时因存在时间差而产生的`闪动`问题

**原理：**先隐藏元素挂载位置，处理好渲染后再显示最终的结果

> 注意：**通过属性选择器设置该元素的  `display: none;`

**文档地址：**https://cn.vuejs.org/v2/api/#v-cloak

**示例：**

~~~html
<style>
    [v-cloak] {
        display: none;
    }
</style>

<div v-cloak>
  {{ message }}
</div
~~~

> 如果后期有多个元素需要解决闪动问题，可以将`v-cloak`写在根元素上（id="app"顶级的div上）。



## 2、v-once

**作用：**只渲染**元素或组件**一次**，之后元素或组件将失去**响应式（数据层面）功能（对于数据的一锤子买卖）

> - 使用vm.message = 'hello world' ,页面不会重新渲染

**示例：**

~~~html
<div id="app">
	<h3>{{message}}</h3>
	<!-- 动态修改message值，此绑定将不会发生改变 -->
	<div v-once>{{message}}</div>
</div>
<script src="./js/vue.js"></script>
<script type='javascript'>
  const vm = new Vue({
      el: '#app',
      data: {
          message: '你好世界'
      }
  })
</script>
~~~

## 3、v-bind（重点）

**作用：**动态地绑定一个或多个`attribute`【实现了可以允许我们在html内置的属性值中使用变量】

场景：复用某个数据的时候会使用。例如：飞猪官网

~~~html
<!-- v-bind：给非指令的属性使用变量 -->
<a v-bind:href="url" v-bind:target="target">{{alt}}</a>

<!-- v-bind的简写形式，实际使用这样的写法 -->
<a :href="url" :target="target">{{alt}}</a>
~~~

**示例代码**

~~~html
<body>
    <div id="app">
        <!--v-bind  动态设置标签属性  -->
        <p v-bind:title="tit">北科千锋前端培训扛把子</p>
        <!-- 动态设置样式 -->
        <p v-bind:class="active">北科千锋前端培训扛把子</p>
        <!-- v-bind:属性名   缩写:属性名-->
        <p :class="active">北科千锋前端培训扛把子</p>
        <img :src ='imgUrl'/>
    </div>
</body>
<script src="./js/vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            tit: '千锋',
            active: 'on',        	          	                                       				imgUrl:'https://img0.baidu.com/it/u=25960041
            39,713266429&fm=253&fmt=auto&app=120&f=JPEG?w=524&h=500'
        }
    })
</script>
~~~

## 4、v-on（重点）

### 4.1、基本使用

**作用：**绑定事件监听器（事件绑定）

**示例代码：**

~~~html
<!-- 直接执行操作 -->
<!-- 常规写法 -->
<button v-on:click="num++"></button>
<!-- 简写 -->
<button @click="num++"></button>
<!--v-on 不允许使用内置函数的，必须要调用自己定义的函数，否则报错，你可以在自定义的函数内使用内置函数-->
<button @click="alert(123)">alert</button>
<!-- 事件处理函数调用：直接写函数名 -->
<button @click="say1">点击事件不传参</button>
<!-- 事件处理函数调用：常规调用 -->
<button @click="say2(100,$event)">点击事件传参数</button>

<script>
 const vm = new Vue({
        el: "#app",
        data: { // 数据
            num：10
        },
        methods: {// 方法集合
            say1: function (event) {
                consol.log(event)
            },
            say2: function (num, event) {
                consol.log(event)
                console.log('你点了' + num);
            }
        }
    })
</script>
~~~

在不传递自定义参数的时候，上述两种用法均可以使用；但是如果需要传递自定义参数的话，则需要使用第2种方式。

> 事件对象的传递与接收注意点
>
> - 如果事件直接使用函数名并且不写小括号，那么**默认**会将事件对象作为唯一参数进行传递，可以在定义函数的位置直接定义一个形参，并且在函数内可以使用该形参
> - 如果使用常规的自定义函数调用（只要写了小括号），那么如果需要使用**事件对象则必须作为参数进行传递**，且事件对象的名称必须是“$event”



### 4.2、事件修饰符

含义：用来处理事件的特定行为（也是vue提供一些语法糖）

- .once    事件只执行一次
- .self      只有触发事件源本身时才触发，也可用于阻止事件冒泡行为场景
- .stop    阻止事件冒泡
- .prevent 阻止事件默认行为

使用示例：

~~~html
<!-- 事件执行一次 -->
<button @click.once="doThis">抽奖</button> 
<!-- self 只有触发事件源本身时才触发，也可用于阻止事件冒泡行为场景-->
<!-- 点击子元素不会触发父元素的点击事件，因为父元素的点击事件只有点击本身才触发 -->  
<div @click.self ='fun1'>
    <p @click='fun2'>
       子元素 
    </p>
</div>
<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>
<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>
<!--  串联修饰符（连贯操作） -->
<button @click.stop.prevent="doThis"></button>
~~~

更多事件修饰符请参考官方文档：https://cn.vuejs.org/v2/api/#v-on



### 4.3、按键修饰符

按键修饰符：**注意必须是按键事件**

> 在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符。

- .enter   回车键的时候调用
- .delete  删除键的时候调用

**示例代码：**

~~~html
<!-- 只有在 `key` 是 `Enter` 回车键的时候调用 -->
<input @keyup.enter="submit">

<!-- 只有在 `key` 是 `Delete`删除键的时候调用 -->
<input v-on:keyup.delete="handle">
~~~

更多按键修饰符请参考官方文档：[https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6](https://cn.vuejs.org/v2/guide/events.html#按键修饰符)

## 5、循环分支指令

### 5.1、循环指令

**作用：**根据一组**数组**或对象的选项列表进行渲染。

**指令：**v-for

- 数组遍历使用示例：

~~~html
<!-- 模板部分 -->
<ul>
    <!-- 直接取值 -->
    <li v-for='item in fruits'>{{item}}</li>
     <!-- 带索引 -->
    <li v-for='(item,index) in fruits'>{{item}}{{index}}</li>
     <!-- 设置key -->
   <li :key='item.id' v-for='(item,index) in fruits'>{{item}}</li>
</ul>
<!-- JavaScript部分 -->
......
data: {
	fruits: ['apple','pear','banana','orange']
}
......
~~~

> 细节：key的作用，提高性能，不影响显示效果（`如果没有id，可以考虑使用索引替代或单元项本身`），切记`key`的值不能重复，只要遵循不重复的原则即可，值是什么无所谓。
>
> key的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。对冲diff 算法(后面讲)

**演示案例 - 设置key的必要性** 

```html
<!--模板部分-->
<input type="text" v-model='a' />
<button @click='add'>add</button>
<ul>
	<!--不设置key的话，新增后选中的复选框发生变化所以必须指key-->
	<li v-for="(item,index) in listName" :key='item.id'>
		<input type="checkbox" /> 
		{{index}}--{{item.name}}
	</li>
</ul>
<!--js部分-->
 const vm = new Vue({
    	el:'#app', 
    	data:{ 
    	    "a":'',
    		"listName":[
    			{"id":1,name:'德玛西亚'},
    			{"id":2,name:'德邦'},
    			{"id":3,name:'剑圣'}
    		]
    	},
    	methods:{
    		add(){
    			this.listName.unshift({id:this.listName.length+1,name:this.a})
    		}
    	}
```



- 对象遍历使用示例（了解）：

**示例代码：**

~~~html
<body>
    <div id="app">
        <!--遍历对象时 value对象属性值，key对象属性名 ，index 下标索引 -->
        <div>
            <ul>
                <li :key="index" v-for="(item,key,index) in user">{{key}}：{{item}}</li>
            </ul>
        </div>
    </div>
</body>
<script src="./js/vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            cars: ['bmw','aodi','benci','haima'],
            user: {
                username: 'zhangsan',
                gender: 'mele',//性别，sex
                age: 22
            }
        }
    })
</script>
~~~



### 5.2、分支指令

**作用：**根据表达式的布尔值(true/false)进行判断是否**渲染**/**显示**该元素

- v-if
- v-else
- v-else-if

> 上述三个指令是分支中最常见的。根据需求，v-if可以单独使用，也可以配合v-else一起使用，也可以配合v-else-if和v-else一起使用。

使用示例：

~~~html
<!-- 模板部分 -->
<div v-if="score >= 90">
  优秀
</div>
<div v-else-if="score >= 80 && score < 90">
  良好
</div>
<div v-else-if="score >= 70 && score < 80">
  一般
</div>
<div v-else>
  不及格
</div>

<!-- JavaScript部分 -->
......
data: {
	score: 88,
	flag:false
}
......
~~~

- v-show

   v-show是根据表达式之真假值，切换元素的 `display` CSS属性（是根据表达式的布尔值来判断是否**显示**该元  素）。

```html
<!-- v-show -->
<p v-show ='isflag'>是否显示内容</p>
<p v-if ='isflag'>是否显示内容</p>
<button @click='isflag=!isflag'>切换</button>

<!-- JavaScript部分 -->
data:{
	"isflag":true,
}
```



> 思考：v-if系列与v-show的区别是什么？
>
> v-if：控制元素是否渲染
>
> v-show：控制元素是否显示（**已经渲染**，display:none;）

> v-if系列指令、v-show指令可以与v-for指令结合起来使用（循环+分支）。例如

~~~html
<ul>
    <li v-for='(v,k,i) in obj' v-show='v==25'>{{v}}</li>
</ul>
~~~

**面试题：v-for与v-if谁的优先级高，能否一起使用？**

答：v-for优先级高于v-if，虽然可以一起使用但是不建议一起使用。因为v-for的优先级大于v-if，在循环元素时，==每个元素都要进行v-if判断，但是最终显示的元素太少造成资源浪费==，所以不建议一起使用。在需要v-for与v-if一起使用时可以用v-show代替v-if。

 **面试题：v-if 和 v-show的 使用区别？**

答： 如果元素频繁要切换显示隐藏 则使用v-show 更加合适

 	    如果元素被创建，可能不会进行状态得切换，使用v-if 

## 6、综合案例：简易购物车

**案例效果**

![简易购物车案例效果](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/09/306aab7bc3f508529eacd7e352283a5670a36873.gif?sign=c1f7cd1b184d05b5a750c70759eb9a0a&t=5f5748db)

> 细节：
>
> - 展示基本的商品信息
> - 计算每个商品的小计
> - 商品数量的加、减操作
>   - +：增加商品数量，同时更新小计
>   - -：减少商品数量，同时更新小计，如果本身为“1”，再点-号则需要移除商品

> 如果需要在Vue实例中访问自身data属性中的数据，可以使用以下方式：
>
> - **this.xxxxx**
> - this.$data.xxxxx
> - this._data.xxxxx

**参考核心代码**

~~~html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>综合案例：简易购物车</title>
    <meta name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link href="" rel="stylesheet" />
    <script src="./js/vue.js"></script>
</head>

<body>
    <div id="app">
        <ul>
            <li v-for="(item,index) in cartData" :key="item.id">
                商品id：{{item.id}}&emsp;&emsp;
                商品名称：{{item.name}}&emsp;&emsp;
                商品单价：{{item.price}}&emsp;&emsp;
                购买数量：<button @click="jian(item,index)">-</button>{{item.num}}<button
                    @click="item.num++">+</button>&emsp;&emsp;
                商品小计：{{item.price * item.num}}
            </li>
        </ul>
    </div>
    <script>
        new Vue({
            el: "#app",
            data: {
                cartData: [
                    {
                        id: 1,
                        name: '小米',
                        price: 100,
                        num: 1
                    },
                    {
                        id: 2,
                        name: '华为',
                        price: 200,
                        num: 1
                    },
                    {
                        id: 3,
                        name: '联想',
                        price: 300,
                        num: 1
                    }
                ]
            },
            // 处理程序
            methods: {
                // 减法操作处理
                jian(item, index) {
                    if (item.num === 1) {
                        if (confirm("确认不买一件吗？")) {
                            this.cartData.splice(index, 1)
                        }
                    } else {
                        // 够减
                        item.num--
                    }
                },
            }
        })
    </script>
</body>

</html>
~~~

> `&emsp;`表示`tab`，一个顶四个`&nbsp;`



## 8、样式绑定

### 8.1、class样式绑定

- 对象语法（`用于控制开关切换`）【高频】

~~~html
<style>
/* CSS片段 */
.on {
	color: red;
}
.big{
	font-size: 40px;
}
</style>

<!-- HTML片段 -->
<div v-bind:class="{on: isflag}">class样式</div>

<!-- 三目表达式 isflag为true,绑定类名on2，否则绑定类名 on3-->
<div v-bind:class="isflag?'on2':'on3'">三目运算符</div>
<!-- 数组写法-->
<div v-bind:class="[activeClass]">数组写法</div>

<!--在数组中使用三元表达式-->
<p :class="['on',isflag?'big':'']">{{msg}}</p>

<!--在数组中使用对象简化三元表达式-->
<p :class="['on',{big:isflag}]">{{msg}}</p>

<!--使用对象作为类样式-->
<p :class="{on:false,big:isflag}">{{msg}}</p>

<script type='text/javascript'>
// JavaScript片段
data: {
	isflag: true,
    activeClass:'on'
}
</script>
~~~



### 8.2、style样式处理

- 对象语法

~~~html
<!--vue中使用行内样式-->
<p  style="color:red">{{msg}}</p>
<!--行内样式对象写法-->
<p :style="{color:'red','font-size':'20px'}">{{msg}}</p>

~~~



## 9、v-model

**作用:**表单元素的绑定，实现了**双向数据绑定**，通过表单项可以更改数据。

![单向与双向数据绑定](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/9c5b0121053708abca7fb4fb7aad1ebbbccda672.png?sign=c753d4526e96e7bbb0e226e6b3036883&t=5f2d216b)

v-model会忽略所有表单元素的value、checked、selected特性的初始值,而总是将Vue实例的数据作为数据来源，应该在data选项中声明初始值。

- 普通文本框上的使用

~~~html
<div id='app'>
    <p>{{message}}</p>
    <input type='text' v-model='message'>

    <!--
    v-model其实是`语法糖`,它是下面这种写法的简写
    语法糖：这种语法对语言的功能并没有影响，但是更方便程序员使用
    -->
    <input type='text' :value='msg' @input='msg=$event.target.value'/>
</div>

<script type='text/javascript'>
new Vue({
    el: '#app',
    data: {
		msg: 'message默认值'
    }
})
</script>
~~~



- 多行文本框上的使用

~~~html
<div id='app'>
    <textarea v-model="message"></textarea>
</div>

<script type='text/javascript'>
new Vue({
	el: '#app',
	data: {
		message: '我是多行文本内容'
	}
})
</script>
~~~

**注意：在多行文本框中使用插值表达式无效（此时，其只能接受数据，不能改变数据）**



- 单个复选框上的使用

~~~html
<div id='app'>
    <input type="checkbox" v-model="checked">
</div>

<script type='text/javascript'>
new Vue({
	el: '#app',
	data:{
		checked:true
	}
})
</script>
~~~



- 多个复选框上的使用

~~~html
<div id='app'>
    <input type="checkbox" value="html" v-model="checkedNames">
    <input type="checkbox" value="css" v-model="checkedNames">
    <input type="checkbox" value="js" v-model="checkedNames">
</div>

<script type='text/javascript'>
new Vue({
	el: '#app',
	data:{
    	// 如果数组中有对应的value值，则此checkbox会被选中
		checkedNames:[]
	}
})
</script>
~~~

**注意：此种用法需要`input`标签提供`value`属性，并且需要注意属性的大小写要与数组元素的大小写一致**



- 单选按钮上的使用

~~~html
<div id='app'>
    男<input type="radio" name="sex" value="男" v-model="sex">
	女<input type="radio" name="sex" value="女" v-model="sex">
</div>

<script type='text/javascript'>
new Vue({
	el: '#app',
	data: {
		sex: '女'
	}
})
</script>
~~~



- 下拉框上的使用

~~~html
<div id='app'>
    <select v-model="selected">
        <option>请选择</option>
        <option>HTML</option>
        <option>CSS</option>
        <option>JS</option>
    </select>
</div>

<script type='text/javascript'>
new Vue({
	el: '#app',
	data: {
		selected: 'JS'
	}
})
</script>
~~~

### 1. 表单修饰符

表单修饰符：用来处理表单的一些特定行为

> .lazy：默认情况下Vue的数据同步采用`input`事件，使用`.lazy`将其修改为失去焦点时触发
>
> .number：自动将用户的输入值转为数值类型（如果能转的话）
>
> .trim：自动过滤用户输入的首尾空白字符

```html
<!--html 片段-->
<body>
    <div id='app'>
    	<!--不使用.lazy在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 ，
		使用 .lazy 将其修改为失去焦点时触发--> 
    	<input type="text" v-model.lazy="msg" @input="fun"/>
        <!--.number：自动将用户的输入值转为数值类型（如果能转的话）--> 
        <input type="text" v-model.number="num" />
        <!--.trim：自动过滤用户输入的首尾空白字符--> 
        <input type="text" v-model.trim="str" />
    </div>
</body>
<!--js 片段-->
const vm = new Vue({
			el: '#app',
			data: {
                msg: ''，	
                num：'',
                str:''
			},
			methods:{
			fun(){
				console.log(this.msg)
			}
		}
	})
```



### 2.Vue的双向数据绑定原理

**1.原理说明：**

当把一个普通的JavaScript对象传给Vue实例的data选项，Vue将遍历此对象所有的属性，使用Object.defineProperty 把这些属性全部转为getter/setter(数据劫持/数据映射)。在属性被访问和修改时通知变化。每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。

**2. Object.defineProperty(obj, prop, descriptor)** 

1. obj： 要定义属性的对象。 
2. prop：要定义或修改的属性的名称 。
3. descriptor: 描述选项。

​           3.1  value：默认值（给对象属性赋值）

​           3.2  writable： 是否能够写/修改 true | false（默认）

​           3.3  configurable： 是否能够删除 true | false（默认）

​           3.4  enumerable：是否可枚举（遍历） true | false（默认）

​           3.5  get：获取属性值 

​           3.6  set：设置属性值 

>**注意：  不能同时设置(writable，value) 和 get，set方法，否则浏览器会报错。 **

**3.代码演示** 

```js
var obj={
		name:'宝强'
	}
console.log(obj) // {name: "宝强"}

Object.defineProperty(obj,'name',{
	value:'马蓉'，
	writable:true， // 是否可修改
	enumerable:false，  // 是否可遍历
	configurable:false  // 是否可删除
});
console.log(obj) // {name: "宝强"，age：19}
obj.age=22;console.log(obj.age);   //22	 writable 为true可以被修改
delete obj.age;  // 删除对象属性

```

**4.代码演示vue 双向数据绑定原理**

```html
<body>
    <div>
         <!-- 输入框 -->
         <input type="text" id="inpt" oninput="changeVal(this.value)" />
     </div>
     <div id="content"></div>
</body >

<script type="text/javascript">
	let inp = document.querySelector('#inp');
	// 1. 定义数据源, 等同于之前的data属性
        var data = {
            msg: "hello world.",
        };
    // 2. 通过dom操作将数据写在页面上（一锤子买卖）
        document.getElementById("inpt").value = data.msg;
        document.getElementById("content").innerHTML = data.msg;
     var obj = {}
	Object.defineProperty(obj,'msg',{
		get(){
             // 获取msg值
			console.log('监听数据访问')
            return data.msg;
		},
		set(m){
            // 代理设置数据
			console.log('监听数据修改'+m)
			document.getElementById("content").innerText = m;
		}
	});
			
	 // 4. input事件的处理程序
        function changeVal(val) {
            console.log(val);
            // 更新数据源
            obj.msg = val;
        }

</script>
```

## 10、综合案例：全选/全不选

实现步骤：

- 添加input框，使得页面具备相同的效果
- 给`全选/全不选`的框添加==合适==的事件
- 指定事件处理程序

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript" src="./js/vue.js"></script>
		<style>
			li{
				list-style: none;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
			img{
				width: 100px;
				height: 50px;
			}
			#box{
				padding: 30px 0;
			}
		</style>
	</head>
	<body>
		<div id="app">
			<p><input type="checkbox" name="" v-model="checkFlag" @change="allcheck"  />全选/全不选</p>
			<ul>
				<li v-for="item in shopcar" :key= 'item.id'>
					<input type="checkbox" name="" v-model="checkGroup" :value="item"  @change="danxuan"  />
					<img :src="item.pic" >
					<div>
						<p>商品名称：{{item.name}}</p>
						<p>商品价格：{{item.price}}</p>
					</div>
					<p><button @click='item.num--' :disabled="item.num==1">-</button>{{item.num}}<button @click="item.num++" :disabled="item.num==item.limit">+</button></p>
					<button @click="del(item.id)">删除</button>
				</li>
			</ul>
			<div id="box">
				总价:{{sum()}}
			</div>
		</div>		
	</body>
</html>

<script type="text/javascript">
	const vm = new Vue({
		el: "#app",
		data: {
			checkFlag:false,
			checkGroup:[], // 
			shopcar:[
				{
					"id":0,
					"name":"商品1",
					"price":10,
					"num":1,
					"limit":5,            "pic":"https://static.maizuo.com/pc/v5/usr/movie/44dc08914d508fc47c8267c6ca73f2d8.jpg"
				},
				{
					"id":1,
					"name":"商品2",
					"price":20,
					"num":2,
					"limit":5,
					"pic":"https://static.maizuo.com/pc/v5/usr/movie/44dc08914d508fc47c8267c6ca73f2d8.jpg"
				},
				{
					"id":3,
					"name":"商品3",
					"price":30,
					"num":3,
					"limit":5,
					"pic":"https://static.maizuo.com/pc/v5/usr/movie/44dc08914d508fc47c8267c6ca73f2d8.jpg"
				}
			]
		},
		methods: {
			sum(){ // 总价
				//  只要checkGroup 这个数组发生变化，那么该函数就会被重新调用执行
				let total = 0;
				this.checkGroup.forEach((item)=>{
					total+=item.price*item.num
				})
				
				return total
			},
			del(id){ // 删除
				this.shopcar.forEach((item,i)=>{
					if(item.id == id){
						this.shopcar.splice(i,1)
					}
				})
					
				this.checkGroup= this.checkGroup.filter((item)=>{
					 return item.id !=id
				})	
				
				//调用
				this.danxuan()
			},
			allcheck(){ // 全选和全不选
				if(this.checkFlag){
					this.checkGroup = this.shopcar
				}else{
					this.checkGroup = []
				}
				
			},
			danxuan(){ // 单选
				if(this.checkGroup.length == this.shopcar.length){
					this.checkFlag =true
				}else{
					this.checkFlag =false
				}				
			}
		}
	})
</script>

```
