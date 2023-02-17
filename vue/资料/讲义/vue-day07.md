[TOC]

# 一、路由守卫

## 1. 全局前置守卫

概念： 顾名思义就是在路由跳转前执行一些操作。

你可以使用 `router.beforeEach` 注册一个全局前置守卫： 

```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

- **`to: Route`**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#路由对象)
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **`next()`**: 进行管道中的下一个钩子，通俗得讲就是对该路由进行放行。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

##  2. 路由独享的守卫

定义： 顾名思义就是对应得某个路由路径独享得守卫。

```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // 这些守卫与全局前置守卫的方法参数是一样的。
        // ...
      }
    }
  ]
})
```

## 3. 组件内的守卫

 你可以在路由组件内直接定义以下路由导航守卫： 

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

# 二、Vuex 全局状态管理

## 1.为什么使用vuex

### 1.1、介绍

- 如果遇到组件间嵌套层次较多，比较复杂得化，多个组件之间共有一个数据，使用组件传值处理起来得话，就比较麻烦
- vuex 是vue 配套的数据管理工具，我们可以将组件共享数据保存到vuex 中，方便整个程序中得任何组件都可以获取和修改 vuex 中保存得公共数据

## 2.安装vuex

```js
npm install vuex --save  // 安装
```

## 3.使用vuex

```js
 import Vue from 'vue'
 import Vuex from 'vuex'
 Vue.use(Vuex)
 
 //创建一个store 实例
 const store = new Vuex.Store({
  state: {
    count: 0  // 全局数据count 
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
 
 new Vue({
  el: '#app',
  store: store,  //挂载到vue 实例上，这样每个子组件都可以访问了。
})
```

## 4. vuex 核心概念  

### 4.1模块介绍

#### state

概念： 提供全局唯一得公共数据源，所有的共享数据都要放在store 中得state 进行存储。 可以理解相当于 组件中的data

-  组件中访问state 中得值：第一种方式：

  ```js
  this.$store.state.数据名称
  ```

- 组件中访问state 中得值：第二种方式：

​       使用mapState 辅助函数

```js
  import {mapState} from 'vuex'  // 从vuex 中按需导入
  computed:{
			...mapState(['count'])，// 将该组件需要的vuex中得全局数据映射到该组件计算属性中
		},
```

#### mutations

概念：同步修改state中的数据, 通过mutations 修改数据虽然繁琐一些，但是可以集中监控所有数据得变化

> **注意： 只能通过mutations 修改store中得数据，不能直接修改store得数据**

```js
const store  = new Vuex.Store({
	state:{ //存放公共数据的
		count:0
	},
	mutations:{ //操作state数据
		add(state){ // 不传参 第一个参数永远是state
			state.count++
		},
		addStep(state,step){ // 传参,第一个参数永远是state
			state.count+=step
		},
		sub(state){
			state.count--
		},
		subStep(state,step){
			state.count-=step
		}
	},
    actions:{
		addAsync(context){
			setTimeout(()=>{
				context.commit('add')
			},1000)	
		},
		addStepAsync(context,step){
			setTimeout(()=>{
				context.commit('addStep',step)
			},1000)	
		},
		subAsync(context){
			context.commit('sub')
		},
		subStepAsync(context,step){
			setTimeout(()=>{
				context.commit('subStep',step)
			},1000)	
		}
	},
    getters:{
		formatCount(state){ // 相当于组件中的计算属性，对state 中的数据进行处理
			return `包装后的${state.count}`
		}
	}
})
```

- 组件中修改state中的数据----第一种方式

```
this.$store.commit(“add”)  // 不传参
this.$store.commit(“addStep”,10) // 传参
```

- 修改state中的数据----第二种方式

​       使用mapMutations 辅助函数

```
import {mapMutations} from 'vuex'
methods:{
    ...mapMutations(['sub','subStep']),  // 将vuex 中sub和subStep方法映射到组件的methods 中
}
```

#### actions 

概念：异步修改state 中得数据

> **注意： action 不能直接修改state中的数据，需要间接通过触发mutation中得方法修改数据。**

- 组件中修改state中的数据----第一种方式

```js
this.$store.dispatch(“addAsync”)  // 不传参
this.$store.dispatch(“addStepAsync”,10) // 传参
```

- 组件中修改state中的数据----第二种方式

  使用mapActions辅助函数

```js
import {mapActions} from ‘vuex’
methods:{
	...mapActions(['subAsync','subStepAsync'])// 将vuex 中subAsync和subStepAsync方法映射到组件的methods 中
}
```

#### getters

概念：用于对store中得数据进行加工处理成新的数据。类似与vue 得计算属性

> **注意：store中得数据发生变化时，则getter 中对应的数据也发生变化。getter不会修改store 中得数据，只是包装**

- 组件中第一种使用方式

```
this.$store.getters.方法名 
或直接在标签中使用 
<p>{{$store.getters.方法名 }}</p>

```

- 组件中第二种使用方式

  使用mapGetters辅助函数

```
import {mapGetters} from 'vuex'
computed:{
	...mapGetters(['formatCount'])  // 将vuex中的getters方法映射到组件中计算属性中
}
//使用如下
<p>包装后count 值为：{{formatCount}}</p>
```

#### mudules

概念： 如果项目中使用单一的模块，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿，vuex 允许我们将 store 分割成多个模块（module）。每个模块拥有自己的 state、mutation、action、getter

注意： 分模块开发时，必须给每个模块设置命名空间   `namespaced:true`, 

```
//如下是 vuex 拆分出来的 moduleA 模块 
export default{
	namespaced:true, 
	state:{
		num:0
	},
	mutations:{
		addNum(state){
			state.num++
		},
		addNumStep(state,step){
			state.num+=step
		}
	},
	actions:{
		addNumAsync(context){
			setTimeout(()=>{
				context.commit('addNum')
			},1000)
		},
		addNumStepAsync(context,step){
			setTimeout(()=>{
				context.commit('addNumStep',step)
			},1000)	
		}
	}
}
```

- 组件中第一种使用方式：

```
<!-- 调用模块A的方法 -->
// html
<h3>num:{{$store.state.moduleA.num}}</h3> // 使用的时候，说明是那个模块下的num 变量
<button @click="addnum">模块++</button>
//js
methods:{
    addnum(){
         // 同步不传参调用
   		 this.$store.commit('moduleA/addNum') // 调用的时候，必须说明那个模块下的addNum方法
   		 // 同步传参调用
   		 this.$store.commit('moduleA/addNumAsync',10)
   		 // 异步不传参调用
   		 this.$store.dispatch('moduleA/addNumAsync')
   		 // 异步传参调用
   		 this.$store.dispatch('moduleA/addNumStepAsync',10)
    }
}
```

- 组件中第二种使用方式：

 使用mapMutations 和mapActions 辅助函数映射。

```
<!-- 调用模块A的方法 -->
// html
<h3>num:{{$store.state.moduleA.num}}</h3>
<button @click="addNum">模块++</button>
<button @click="addNumStep(10)">模块++</button>
// js
methods:{
		// 需要说明是那个模块中的方法
		...mapMutations('moduleA',['addNum','addNumStep']), // ('模块名'，['方法1'，'方法2'])
		...mapActions('moduleA',['addNumAsync','addNumStepAsync'])
	}
```

案例：

demo.js

```
<template>
 <div>
     <h1>vuex demo</h1>
     <p>{{ this.$store.state.home.num }} ---{{  this.$store.state.home.str }}</p>
     <p>{{ this.$store.getters["home/getNum"] }} --- {{ this.$store.getters["home/getStr"] }}</p>
     <p>{{ num }} -- {{ str }}</p>
     <p>{{ getNum }} --- {{ getStr }}</p>
     <button @click="addFun">+1</button>
     <button @click="addFun1">+1</button>
     <button @click="incre(3)">+1</button>
     <button @click="increAction(4)">+1</button>
 </div>
</template>

<script>
/* 
  vuex模块化取数据方法
  1.this.$store.state.home.num
  2.this.$store.getters["home/getNum"]
  3....mapState('home',['num']),
  4. ...mapGetters('home',['getNum']),
  vuex模块化更新数据
  1.this.$store.commit('home/incre',1)
  2.this.$store.dispatch('home/increAction',2)
  3....mapMutations('home',['incre']),
  4.  ...mapActions('home',['increAction']),
*/
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
    methods:{
        ...mapMutations('home',['incre']),
        ...mapActions('home',['increAction']),
        addFun(){
            this.$store.commit('home/incre',1)
        },
        addFun1(){
            this.$store.dispatch('home/increAction',2)
        }
    },
 computed:{
     ...mapState('home',['num','str']),
     ...mapGetters('home',['getNum','getStr']),
 }
}
</script>

<style>

</style>
```

store/modules/home.js

```
//属于home这个模块
export default {
    namespaced:true,//开启模块化
    state:{
        num:100,
        str:'abc'
    },
    getters:{
        getNum(state){
            return state.num
        },
        getStr(state){
            return state.str
        }
    },
    mutations:{
        incre(state,val){
            state.num +=val
        }
    },
    actions:{
        increAction({commit},val){
            commit('incre',val)
        }
    }
}
```

store/index.js

```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './modules/home'
import user from './modules/user'
export default new Vuex.Store({
    modules:{ //模块化
        home,
        user
    }
    // state:{
    //     num:10,
    //     str:'abc'
    // },
    // getters:{
    //     getNum(state){
    //         return state.num
    //     }
    // },
    // mutations:{
    //     incre(state){
    //         state.num++ 
    //     }
    // },
    // actions:{
    //     incrAction({commit}){
    //         commit('incre')
    //     }
    // },
   
})
```

