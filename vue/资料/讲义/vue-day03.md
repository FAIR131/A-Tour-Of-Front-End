[TOC]

# 一、Vue常用属性

## 1、自定义指令 - directive

[directive]:https://cn.vuejs.org/v2/guide/custom-directive.html

除了核心功能默认内置的指令，Vue也允许开发者注册自定义指令。有的情况下，对普通DOM元素进行底层操作，这时候就会用到自定义指令绑定到元素上执行相关操作。

**自定义指令分为：全局指令和局部指令**，当全局指令和局部指令同名时**以局部指令为准**（局部指令的优先级高于全局的）。

**问题：全局与局部有什么区别？**

- **在当前（非工程化，每一个文件都是一个html文件）的时候是没区别的**
- vue工程化的时候是有区别的
  - 全局的适用于整个项目的（常用）
  - 局部的适用于当前组件的

自定义指令**常用**钩子函数（或生命周期函数）有：

- bind：在**指令**第一次绑定到元素时调用（在**该环节中是获取不到父节点的**，父节点是null），序号：1
- inserted：被绑定**元素**插入父节点时调用（在**该环节中是可以获取到父节点的**），序号：2
- update：数据更新时调用，序号：3（该环节会重复触发）
- componentUpdated：指定元素及子节点更新完成后会触发
- unbind：取消绑定后触发

> 请注意：不管在定义全局还是局部自定义指令时，**所提及的指令名均是不带`v-`前缀的名称**。

**全局指令语法**

~~~js
// 无参
Vue.directive('指令名',{
	钩子函数名: function(el){
        // 业务逻辑
    	// el参数是挂载到的元素的DOM对象
    	// <div v-abc>123</div>
    }
}

// 传参
Vue.directive('指令名',{
	钩子函数名: function(el,binding){
    	let param = binding.value
        // 业务逻辑
    },
    ....
}
~~~

> **请务必注意，作为全局配置，不能将其写在指定的Vue实例里，后续其它全局配置亦是如此**

**局部自定义指令定义**

可以在`new Vue`的时候添加`directives`以注册局部自定义指令，局部自定义指令只能在当前组件实例中使用：

~~~javascript
directives: {
  指令名: {
    // 指令的定义
    钩子函数名: function (el,binding) {
      // 业务逻辑
    }
  }
}
~~~

**函数简写（了解，使用机会很少）**

> 部分时候，我们可能想在 `bind` **和 **`update` 时触发**相同**行为（如果只是其一，则还是单独分开声明），而不关心其它的钩子。那么这样写：

~~~javascript
// 全局
Vue.directive('指令名', function (el,binding) {
  // 业务逻辑
})

// 局部
directives: {
  指令名: function (el,binding) {
      // 业务逻辑
  }
}
~~~

> 在自定义指令的方法中，不能像以前的`methods`中的方法一样使用关键词`this`，此时`this`关键词指向的是`Window`对象。

案例：使用自定义指令实现以下效果

- 使用全局指令定义自定义的`v-red（不传参）`和`v-color（传参）`，在元素被插入时设置内容颜色
- 使用局部自定义指令实现`v-mobile（不传参）`验证用户输入的是否是合法的手机号，不合法手机号为红色，合法为黑色

~~~html
<div id="app">
    <div>
        <!-- 指令v-red，实现将文字的颜色设置成红色 -->
        <div v-red>武汉上演建党百年长江灯光秀</div>
        <!-- 指令v-color：实现将文字的颜色设置成指定的颜色 -->
        <div v-color="'blue'">将延长边境防疫管控1年?中方回应</div>
    </div>
    <div>
        <!-- 指令v-mobile：需要验证用户输入的手机号是否合法 -->
        <input type="text" v-model="mobile" v-mobile />
    </div>
</div>
<script src="./js/vue.js"></script>
<script>
    // 全局自定义指令
    Vue.directive("red", {
        // bind: function(el){
        //     // el是指令绑定的dom对象
        //     console.log(el);
        //     // 获取父节点，当然当前bind的时候是获取不到的，因此为null
        //     console.log(el.parentNode);
        // },
        inserted: function (el) {
            // el表示dom对象
            console.log(el);
            // el.parentNode表示其父节点
            console.log(el.parentNode);
            // 通过dom对象，设置颜色
            el.style.color = 'red'
        }
    });
    Vue.directive("color", {
        inserted: function (el, binding) {
            console.log(el, binding);
            // binding.value表示属性的值（该值不是看到的表达式，而是解析完后的值）
            el.style.color = binding.value
        }
    })
    new Vue({
        el: "#app",
        data: {
            mobile: ""
        },
        // 自定义指令：
        directives: {
            mobile: {
                // 定义需要使用的函数
                update: function (el) {
                    // console.log(el);
                    // 获取手机号
                    let mobile = el.value
                    // 正则表达式验证手机号是否合法
                    if (/^1[3-9]\d{9}$/.test(mobile)) {
                        el.style.color = "black"
                    } else {
                        el.style.color = "red"
                    }
                }
            }
        }
    })
</script>
~~~



## 2、计算属性 - computed

模板中放入太多的逻辑（方法）会让模板过重且难以维护，使用计算属性可以让模板变得简洁易于维护。计算属性是基于它们的响应式依赖进行**缓存**的，计算属性比较适合对多个变量或者对象进行处理后返回一个结果值，也就是数多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化。

计算属性定义在Vue对象中，通过关键词`computed`属性对象中定义一个个函数，并返回一个值，使用计算属性时和`data`中的数据使用方式一致。

核心点：

- 计算属性其在代码的表现也是方法，但是与methods不同
  
  计算属性必须有return
- 在某些场景下，计算属性的效率要比methods效率高
  
  计算属性支持数据的缓存操作（在依赖数据不变的情况下），而methods不行

**示例**

~~~html
<div id="app">
    <!-- 当多次调用 cfn计算属性时只要里面的 num值不改变,它会把第一次计算的结果直接返回直到data中的num值改变 计算属性才会重新发生计算 -->
    <div>{{ cfn }}</div>
    <div>{{ cfn }}</div>
    <!-- 调用methods中的方法的时候  他每次会重新调用 -->
    <div>{{ fn() }}</div>
    <div>{{ fn() }}</div>
</div>
<script src="./js/vue.js"></script>
<script type="text/javascript">
    const vm = new Vue({
        el: "#app",
        data: {
            num: abc,
        },
        // 方法
        methods: {
            fn() { 
                console.log("methods");// methods 中的方法每次调用都会执行
                return this.num.toUpperCase();
            },
        },
        // 计算属性
        computed: {
            cfn() {
                console.log("computed");// 如果依赖的数据没有变化，则计算属性会返回上一次结果，使用					缓存
                return this.num.toUpperCase();
            },
        },
    });
</script>
~~~

**注意：**只要依赖的数据源不发生改变，计算属性里的对应方法就只被调用1次，其它时候被调用时则使用缓存。提高效率。

- 计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

  ```js
  // html
  <div id="demo">{{ fullName }}</div>
  
  //js
  var vm = new Vue({
    el: '#demo',
    data: {
      firstName: 'Foo',
      lastName: 'Bar'
    },
    computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
  })
  ```

  课堂案例： 全选/反选/单选
  

​      ![image-20211014163502383](https://i.loli.net/2021/10/14/KXiYbI4NyRadPsZ.png)

**代码实现：**

```html
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
        <table>
            <tr v-for='item in goodlist'>
                <td>
                    <input type="checkbox" v-model='item.checked'>
                </td>
                <td>
                    商品名称：{{item.name}}
                </td>
                <td>
                    商品价格：{{item.price}}
                </td>
                <td>
                    数量：{{item.num}}
                </td>
            </tr>
        </table>
        <!-- 全选 -->
        <div>
            <input type="checkbox" name="" v-model='checkall'> 全选
        </div>
    </div>
</body>

</html>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            goodlist: [
                {
                    id: 0,
                    name: "苹果",
                    checked: true,
                    price: 100,
                    num: 1
                },
                {
                    id: 1,
                    name: "梨",
                    checked: false,
                    price: 200,
                    num: 2
                }, {
                    id: 2,
                    name: "香蕉",
                    checked: true,
                    price: 300,
                    num: 3
                }
            ]
        },
        computed: {
            checkall: {
                get() {
                    // 只要 checkall 依赖的数据发生变化，checkall就会重新调用get,也就是重新计算
                    console.log(11, this.goodlist.every((item) => { return item.checked == true }))
                    // checkall的结果为true或false 
                    return this.goodlist.every((item) => { return item.checked == true })
                },
                set(val) {
                    // 修改checkall 的值
                    console.log(val)
                    // 让每一个子复选框的checked = 全选的checked
                    this.goodlist.forEach(item => {
                        item.checked = val
                    });

                }
            }
        }
    })

</script>
```



## 3、监听器 - watch

使用watch来侦听**data**中数据的变化，**watch中的属性（watch是对象格式）一定是data 中已经存在的数据**。（特殊情况除外）

**使用场景：**数据变化时执行**异步或开销比较大的操作**。

**典型应用：**http://www.pinyinzi.cn/

![监听器](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/6ae51459d0c21c076baf58e26829a6265e3ee938.png?sign=87b53c566e524496faa45fc17ee38816&t=5f3648ac)

**案例：**给定三个输入框，第一个为姓输入框，第二个为名输入框，第三个为姓名组合结果框；要求当用户更新姓或名后，第三个输入框自动生成完整的姓名结果。

**语法**

~~~vue
new Vue({
	.....
	watch: {
		data中数据的名称: fn方法,
		....
	}
})
~~~

**参考代码：**

~~~html
<div id="app">
    <p><input type="text" v-model='firstName' placeholder="姓" /></p>
    <p><input type="text" v-model='lastName' placeholder="名" /></p>
    <p><input type="text" v-model='fullName' placeholder="全名" /></p>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
    const vm = new Vue({
        el: '#app',
        data: {
            firstName: '',
            lastName: '',
            fullName: ''
        },
        watch: {
            firstName: function(newvalue,oldvalue) {
                this.fullName = newvalue + ' ' + this.lastName
            },
            lastName: function(newvalue,oldvalue) {
                this.fullName = this.firstName + ' ' + newvalue
            }
        }
    })
</script>
~~~

> 注意点：
>
> - 声明监听器，使用的关键词是`watch`
> - 每个监听器的方法，可以接受2个参数，第一个参数是新的值，第二个参数是之前的值

**注意：**当需要监听一个对象的改变时，普通的watch方法无法监听到对象内部属性的改变，此时就需要deep属性对对象进行**深度监听**。

**使用对象的数据形式改写上述案例参考代码：**

~~~html
<div id="app">
    <p><input type="text" v-model='userinfo.firstName' placeholder="姓" /></p>
    <p><input type="text" v-model='userinfo.lastName' placeholder="名" /></p>
    <p><input type="text" v-model='userinfo.fullName' placeholder="全名" /></p>
</div>

<script src="./js/vue.js"></script>
<script type="text/javascript">
    const vm = new Vue({
        el: '#app',
        data: {
            userinfo: {
                firstName: '',
                lastName: '',
                fullName: ''
            }
        },
        watch: {
            userinfo: {
                // handler是固定的写法,监控处理函数
                handler(val) {
                    this.userinfo.fullName = val.firstName + ' ' + val.lastName
                    // 对象支持引用传值
                    val.fullName = val.firstName + ' ' + val.lastName
                },
                deep: true  // 深度监听
            }
        }
    })
</script>
~~~

**面试题：vue中计算属性与监听器有什么区别？？**

- 设计方式上的区别
  - 计算属性：依赖数据的，只要数据不变，它会套用固定的流程去执行。我们写好之后一劳永逸的。（我们只要告诉其数据的处理规则）
  - 监听器：需要我们自己去写比较复杂的数据处理过程，比如说一些异步的操作、开销大的操作（我们自己写数据处理逻辑）
- 响应方式上的区别
  - 计算属性：支持深度深度数据是否变化的监听的（默认的）
  - 监听器：默认不支持深度响应，仅支持字面量处理，但是其支持通过代码的改动来支持深度监听



## 4、综合案例：完善购物车

**进一步需求：**

- 增加自动计算总价功能，只计算被选中的商品【计算属性】
- 增加反选功能【事件绑定】
- 当手动选中全部商品，`全选`复选框自动选中，但凡有一个商品的复选框没有被选中，则`全选`复选框不选中【监听器】

实现代码参考代码文件。



## 5、过滤器 - filter

**作用：**格式化数据，比如将字符串格式化为首字母大写、将日期格式化为指定的格式等。

- 过滤器可以定义成全局过滤器和局部过滤器。
- **过滤器的本质就是一个方法**，使用过滤器实际上就相当于方法调用，仅是书写形式上的差异（使用的时候需要用“|”（shift + \），其也可以被称之为  **管道修饰符**）
  - 语法：
    - {{待修饰的数据|过滤器方法名}}
    - {{待修饰的数据|过滤器方法名(参数1,参数2....)}}
    - v-bind:动态属性="待修饰的数据|过滤器方法名"
- 这玩意在vue3中已经废弃了
  - vue3中解决办法是通过methods来替代

![过滤器](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/82ec23d614d0bf55ff0e2ecc1ac9414db2607490.png?sign=019afa9de124d3e56fb0fb0584616f73&t=5f364f40)

**声明语法：**

~~~javascript
// 全局过滤器
Vue.filter('过滤器名称',function(value){ //过滤器不传参
	//过滤器业务逻辑
	return ....
})

// 局部过滤器
el: '#app',
data: {},
filters: {
    过滤器名称: function(value,a,b){ //过滤器传参ab 为传的参数
        return something
    },
    // ....
}
// 案例  
// npm 安装 moment 时间格式插件
Vue.filter('formDate', function(data) {
	return moment(data).format('YYYY-MM-DD') // 将时间格式转换成YYYY-MM-DD
})
~~~

> 过滤器的处理函数中的第一个参数**固定**是`绑定的待处理数据`，后续可以根据需要添加自定义参数



**使用语法：**

~~~html
<!-- 过滤器使用 -->
<div>{{msg | upper}}</div>

<!-- 过滤器允许连续使用，“前 → 后”按顺序执行 -->
<div>{{msg | upper | lower}}</div>

<!-- 过滤器支持在v-bind中使用 -->
<div v-bind:id='id | formatId'></div>

<!-- 过滤器支持传参 -->
<div>{{msg | mysub(1,2)}}</div>
~~~



**案例：声明转字母为大写的全局过滤器和转字母为小写的局部过滤器并使用**

~~~html
<body>
    <div id="app">
        <h4>{{msg | toUpper}}</h4>
        <h4>{{msg | toLower}}</h4>
    </div>
</body>

<script src="./js/vue.js"></script>
<script type="text/javascript">
    // 全局过滤器：转字母为大写
    Vue.filter('toUpper',(val) => {
        return val.toUpperCase()
    })

    const vm = new Vue({
        el: '#app',
        data: {
            msg: 'HeLLo WoRld'
        },
        // 局部过滤器：转字母为小写
        filters: {
            toLower: (val) => {
                return val.toLowerCase()
            }
        }
    })
</script>
~~~

