### 1. Dom0，Dom1，Dom2，Dom3区别

前言：DOM(Document Object Model，文档对象模型)是针对HTML文档和XML(可扩展的标记语言)文档的一个API。DOM描绘了一个层次化的节点树，允许开发人员添加、移出和修改页面的某一部分，DOM脱胎于Netscape及微软公司创始的DHTML（动态HTML）。但现在它已经成为表现和操作页面标记的真正跨平台、语言中立的方式。

Netscape Navigator 4和IE4分别发布于1997年的6月和10月发布的DHTML，由于IE4和Netscape Navigator4分别支持不同的DHTML，为了统一标准，W3C开始制定DOM。1998年10月W3C总结了IE和 Navigator4的规范，制定了DOMLevel 1即DOM1，之前IE与Netscape的规范则被称为DOMLevel 0即DOM0。

+ Dom0
  + Dom0级事件具有极好的跨浏览器优势，会以最快的速度绑定。
  + 为某一个元素的同一个行为绑定不同的方法在行内会分别执行
  + 为某一个元素的同一个行为绑定不同的方法在script标签中后面的方法会覆盖前面的方法
  + 删除Dom0事件处理程序，只要将对应事件的属性设置为null即可
+ Dom1
  + Dom1一般只有设计规范没有具体实现，企业级应用无
+ Dom2
  + Dom2级事件是通过addEventListener绑定的事件，IE下的Dom2事件通过attachEvent绑定
  + 可以给某个元素的同一个行为绑定不同的方法在行内会分别执行
  + 删除Dom2事件处理程序通过removeEventListener
+ Dom3
  + Dom3级事件在Dom2级事件的基础上添加了更多的事件类型
  + 允许开发人员自定义一些事件

### 2. Dom0事件绑定和解绑

+ 不可以同时添加同一类事件多次，如果添加后面覆盖前面

+ dom0事件解绑  本质上就是把事件回调函数和事件对象的事件属性断开指向

  box.onclick= null

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			*{
				margin: 0;
				padding: 0;
			}
			#box{
				width: 200px;
				height: 200px;
				background-color: red;
			}
		</style>
	</head>
	<body>
		<div id="box"></div>
		<button>点击解绑</button>
		<script type="text/javascript">
			window.onload = function(){
				var box = document.getElementById('box');
				var btn = document.querySelector('button');
				//dom事件的绑定方式（高低浏览器通用）
				box.onclick = function(){
					console.log('老马');
				}	
				//dom0事件如果对同一个元素添加同样的事件监听多次，后面会覆盖前面
				box.onclick = function(){
					console.log('小马');
				}
				
				//dom0事件的解绑方式
				btn.onclick = function(){
					box.onclick = null;//null是专门用来初始化对象和删除对象用的
					//解绑方式本质就是把之前box这个对象身上的onclick属性和定义的函数数据断开指向
				}
			}
		</script>
	</body>
</html>

```

### 3. Dom2事件绑定和解绑

前言：dom2事件添加和解绑高低浏览器使用的方法是不同的

+ 高级浏览器

  + 添加事件监听方法1

    ```html
    <!DOCTYPE html>
    <html>
    	<head>
    		<meta charset="UTF-8">
    		<title></title>
    		<style>
    			*{
    				margin: 0;
    				padding: 0;
    			}
    			#box{
    				width: 200px;
    				height: 200px;
    				background-color: red;
    			}
    		</style>
    	</head>
    	<body>
    		<div id="box"></div>
    		<script type="text/javascript">
    			window.onload = function(){
    				var box = document.getElementById('box');
    				
    				//dom2事件添加和解绑高低浏览器使用的方法是不同的
    				//高级浏览器
    				//1、添加事件监听
    				box.addEventListener('click',function(){
    					console.log('老马去红浪漫');
    				});
    				
    				//dom2事件添加方式，如果添加多次，不会发生覆盖，会依次执行
    				box.addEventListener('click',function(){
    					console.log('老马带着小马去红浪漫');
    				});
    			}
    		</script>
    	</body>
    </html>
    ```

  + 添加事件监听方法2

    ```js
    function fn(){
    	console.log('马斯托洛夫斯基');
    }
    box.addEventListener('click',fn);

    function fn1(){
    	console.log('马坚强');
    }
    box.addEventListener('click',fn1);
    ```

  + 事件的解绑

    dom2事件解绑的时候，参数必须和绑定的时候一模一样

    ```html
    <!DOCTYPE html>
    <html>
    	<head>
    		<meta charset="UTF-8">
    		<title></title>
    		<style>
    			*{
    				margin: 0;
    				padding: 0;
    			}
    			#box{
    				width: 200px;
    				height: 200px;
    				background-color: red;
    			}
    		</style>
    	</head>
    	<body>
    		<div id="box"></div>
    		<button id="btn">点击解绑</button>
    		<script type="text/javascript">
    			window.onload = function(){
    				var box = document.getElementById('box');
    				var btn = document.getElementById('btn');		
    				//事件的解绑
    				//dom2事件解绑的时候，参数必须和绑定的时候一模一样
    				
    //				btn.onclick = function(){
    //					box.removeEventListener('click',function(){
    //						console.log('布鲁斯马!');
    //					});
    //				}  解绑不了，因为回调函数和绑定的虽然看着一样，但是不是同一个函数
    				
    				//如果dom2事件要解绑，那么就不能在方法内部去定义回调函数，必须添加的时候在外部定义有名函数	
    				function fn(){
    					console.log('杰森斯坦马');
    				}
    				box.addEventListener('click',fn);			
    				
    				btn.onclick = function(){
    					box.removeEventListener('click',fn);
    				}
    			}
    		</script>
    	</body>
    </html>
    ```

+ 低级浏览器

  + 添加事件监听1

    ```html
    <!DOCTYPE html>
    <html>
    	<head>
    		<meta charset="UTF-8">
    		<title></title>
    		<style>
    			*{
    				margin: 0;
    				padding: 0;
    			}
    			#box{
    				width: 200px;
    				height: 200px;
    				background-color: red;
    			}
    		</style>
    	</head>
    	<body>
    		<div id="box"></div>
    		<button id="btn">点击解绑</button>
    		<script type="text/javascript">
    			window.onload = function(){
    				var box = document.getElementById('box');
    				var btn = document.getElementById('btn');
    				//低级浏览器
    				//添加事件监听
    				box.attachEvent('onclick',function(){
    					console.log('哈哈');
    				})				
    				//如果添加多个时间，那么也会依次执行，只不过执行顺序和高级浏览器相反
    			}
    		</script>
    	</body>
    </html>

    ```

  + 添加事件监听2

    ```js
    function fn1(){
    	console.log('嘿嘿');
    }
    box.attachEvent('onclick',fn1);
    ```

  + 解绑方式

    ```js
    function fn1(){
    	console.log('嘿嘿');
    }
    box.attachEvent('onclick',fn1);
    btn.onclick = function(){
    		box.detachEvent('onclick',fn1);
    }
    ```

+ 封装绑定事件

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="UTF-8">
  		<title></title>
  		<style>
  			*{
  				margin: 0;
  				padding: 0;
  			}
  			#box{
  				width: 200px;
  				height: 200px;
  				background-color: red;
  			}
  		</style>
  	</head>
  	<body>
  		<div id="box"></div>
  		<button id="btn">点击解绑</button>
  		<script type="text/javascript">
  			window.onload = function(){
  				var box = document.getElementById('box');
  				var btn = document.getElementById('btn');
  				//兼容封装高低浏览器添加事件绑定
  				//dom2事件高级浏览器用的是高级浏览器的添加方式
  				//低级浏览器用的是低级浏览器的添加方式	
  				function addEvent(node,eventType,callBack){
  					if(node.addEventListener){
  						//高级浏览器node.addEventListener值是一个函数数据
  						node.addEventListener(eventType,callBack);
  					}else{
  						//低级浏览器node.addEventListener值是一个undefined
  						node.attachEvent('on' + eventType,callBack);
  					}
  					
  				}
  				function fn2(){
  					console.log('兼容成功');
  				}
  				addEvent(box,'click',fn2);
  			}
  		</script>
  	</body>
  </html>
  ```

+ 练习：封装解绑事件


### 4. 事件流

事件流：发生了事件之后的各个盒子的顺序

+ 捕获事件流（网景）   最终很少用几乎不用
+ 冒泡事件流（ie）        最终我们所用的事件传播都是冒泡
+ 标准DOM事件流      这个是我们现用的标准事件流，里面包含三个阶段： 有捕获  再去获取目标元素   最后冒泡，这个三个阶段当中的捕获和冒泡可以由程序员自己选择。但是通常情况我们都是使用默认 （冒泡）

![事件流](.\img\事件流.png)

#### 4.1 Dom0事件的事件流

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			*{
				margin: 0;
				padding: 0;
			}
			.laoda{
				position: relative;
				width: 500px;
				height: 500px;
				background-color: red;
			}
			.laoer{
				position: absolute;
				/*left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				margin: auto;*/
				
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				
				/*left: 50%;
				top: 50%;
				margin-left: -150px;
				margin-top: -150px;*/
				
				width: 300px;
				height: 300px;
				background-color: green;
			}
			.laomo{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				width: 100px;
				height: 100px;
				background-color: blue;
			}
		</style>
	</head>
	<body>
		<div class="laoda">
			<div class="laoer">
				<div class="laomo">
					
				</div>
			</div>
		</div>
		
		<script type="text/javascript">
			window.onload = function(){
				var laoda = document.querySelector('.laoda');
				var laoer = document.querySelector('.laoer');
				var laomo = document.querySelector('.laomo');
				//dom0事件的事件流都是冒泡，没有捕获
				//事件的事件流是客观存在的，和事件监听没关系；
				laoda.onclick = function(){
					console.log('我是老大');
				};
				laoer.onclick = function(){
					console.log('我是老二');
				};
				laomo.onclick = function(){
					console.log('我是老末');
				};
			}
		</script>
	</body>
</html>
```

4.2 事件流整体流程

```js
window.onload = function(){
				var laoda = document.querySelector('.laoda');
				var laoer = document.querySelector('.laoer');
				var laomo = document.querySelector('.laomo');
				//dom0事件的事件流都是冒泡，没有捕获
				//事件的事件流是客观存在的，和事件监听没关系；
				laoda.onclick = function(){
					console.log('我是老大');
				};
				laoer.onclick = function(){
					console.log('我是老二');
				};
				laomo.onclick = function(event){
					console.log('我是老末');
				};
				
				document.body.onclick = function(){
					console.log('我是body');
				};
				document.documentElement.onclick = function(){
					console.log('我是html');
				};
				document.onclick = function(){
					console.log('我是祖宗');
				}
}
```

#### 4.3 Dom2事件的事件流

Dom2事件**冒泡**

+ 高级浏览器：

```js
window.onload = function(){
				var laoda = document.querySelector('.laoda');
				var laoer = document.querySelector('.laoer');
				var laomo = document.querySelector('.laomo');
				laoda.addEventListener('click',function(){
					console.log('我是老大');
				},false);
				
				laoer.addEventListener('click',function(){
					console.log('我是老二');
				},false);
				
				laomo.addEventListener('click',function(){
					console.log('我是老末');
				},false);
}
```

+ 低级浏览器
  + 样式有的版本会丢失，暂时不做过多关注

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			*{
				margin: 0;
				padding: 0;
			}
			#laoda{
				position: relative;
				width: 500px;
				height: 500px;
				background-color: red;
			}
			#laoer{
				position: absolute;
				/*left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				margin: auto;*/
				
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				
				/*left: 50%;
				top: 50%;
				margin-left: -150px;
				margin-top: -150px;*/
				
				width: 300px;
				height: 300px;
				background-color: green;
			}
			#laomo{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				width: 100px;
				height: 100px;
				background-color: blue;
			}
		</style>
	</head>
	<body>
		<div id="laoda">
			<div id="laoer">
				<div id="laomo">

				</div>
			</div>
		</div>

		<script type="text/javascript">
			window.onload = function() {
				var laoda = document.getElementById('laoda');
				var laoer = document.getElementById('laoer');
				var laomo = document.getElementById('laomo');

				laoda.attachEvent('onclick', function() {
					console.log('laoda');
				});

				laoer.attachEvent('onclick', function() {
					console.log('laoer');
				});

				laomo.attachEvent('onclick', function() {
					console.log('laomo');
				})
			}
		</script>
	</body>
</html>

```

Dom2事件**捕获**

```js
window.onload = function(){
				var laoda = document.querySelector('.laoda');
				var laoer = document.querySelector('.laoer');
				var laomo = document.querySelector('.laomo');
				laoda.addEventListener('click',function(){
					console.log('我是老大');
				},true);
				
				laoer.addEventListener('click',function(){
					console.log('我是老二');
				},true);
				
				laomo.addEventListener('click',function(){
					console.log('我是老末');
				},true);
}
```

总结：dom0事件及低级浏览器的dom2事件（没有第三个参数）都是只有冒泡，以后我们用的最多的也是冒泡，捕获几乎不用，高级浏览器的dom2事件可以根据第三个参数选择是捕获还是冒泡，一般我们都不写，默认是冒泡

#### 4.4 阻止冒泡

+ Dom0阻止冒泡

```js
<script type="text/javascript">
			window.onload = function(){
				var laoda = document.querySelector('.laoda');
				var laoer = document.querySelector('.laoer');
				var laomo = document.querySelector('.laomo');
				//dom0事件的事件流都是冒泡，没有捕获
				//事件的事件流是客观存在的，和事件监听没关系；
				laoda.onclick = function(e){
					console.log('我是老大');
					e.stopPropagation();
				};
				laoer.onclick = function(e){
					console.log('我是老二');
					e.stopPropagation();
				};
				laomo.onclick = function(e){
					console.log('我是老末');
					e.stopPropagation();
				};
			}
</script>
```

+ Dom2高级浏览器阻止冒泡

```js
window.onload = function() {
				var laoda = document.querySelector('.laoda');
				var laoer = document.querySelector('.laoer');
				var laomo = document.querySelector('.laomo');
				laoda.addEventListener('click', function(e) {
					console.log('我是老大');
					e.stopPropagation();
				}, false);

				laoer.addEventListener('click', function(e) {
					console.log('我是老二');
					e.stopPropagation();
				}, false);

				laomo.addEventListener('click', function(e) {
					console.log('我是老末');
					e.stopPropagation();
				}, false);
			}
```

+ Dom2低级浏览器阻止冒泡

```js
<script type="text/javascript">
					window.onload = function(){
						var laoda = document.getElementById('laoda');
						var laoer = document.getElementById('laoer');
						var laomo = document.getElementById('laomo');
						
						laoda.attachEvent('onclick',function(e){
							console.log('laoda');
							// e.stopPropagation();
							e.cancelBubble = true;
						});
						
						laoer.attachEvent('onclick',function(e){
							console.log('laoer');
							// e.stopPropagation();
							e.cancelBubble = true;
						});
						
						laomo.attachEvent('onclick',function(e){
							console.log('laomo');
							// e.stopPropagation();
							e.cancelBubble = true;
						})	
					}
</script>
```

### 5. 事件委派

#### 5.1 什么是事件委派

+ 事件委派过程当中依赖了事件冒泡
+ 阻止事件冒泡//是为了解决冒泡给我们带来的困扰
+ 事件冒泡的好处就是可以进行事件委派（事件委托，事件代理）；把子元素的事件监听添加给父（祖先）元素，把子元素发生的事件委托给父元素进行处理

#### 5.2 事件委派用法

+ 什么时候用?

  + 当一个元素内部子元素（儿子）很多，并且每个子元素（儿子）都要添加相同的事件的时候，我们可以使用事件委派来提高效率
  + 出现新添加的东西，并且新添加的东西要和老的拥有同样的行为；此时我们就想事件委派；不用事件委派，老的身上会有想要的行为，而新添加的没有

+ 用法？

  + 事件委派的做法： 给父元素添加事件监听，不给元素本身添加，事件发生后通过event去找真正发生事件的目标元素进行处理

+ 好处？

  + 事件委派的好处：可以大大降低内存的占用，并且可以提高效率。

+ 总结

  ​	事件委派其实是借用事件冒泡去做的，因为事件冒泡导致内部所有的元素发生事件都会冒泡到祖先身上，我们不在子元素身上去添加事件监听和处理，而是在共同的祖先身上去添加，让祖先去处理子元素发生的事件；祖先去处理其实就是通过事件对象当中的target 去获取到真正发生事件的子元素；对子元素进行处理

+ 事件委派1

  + 普通移入变色

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="UTF-8">
  		<title></title>
  	</head>
  	<body>
  		<ul>
  			<li>我是列表项1</li>
  			<li>我是列表项2</li>
  			<li>我是列表项3</li>
  			<li>我是列表项4</li>
  			<li>我是列表项5</li>
  			<li>我是列表项6</li>
  			<li>我是列表项7</li>
  			<li>我是列表项8</li>
  		</ul>
  		<script type="text/javascript">
  			window.onload = function() {
  				var liNodes = document.querySelectorAll('li');
  				for (var i = 0; i < liNodes.length; i++) {
  					liNodes[i].onmouseover = function() {
  						this.style.backgroundColor = 'hotpink';
  					};
  					liNodes[i].onmouseout = function() {
  						this.style.backgroundColor = 'white';
  					};
  				}
  			}
  		</script>
  	</body>
  </html>
  ```

  + 事件委派变色

  ```js
  window.onload = function(){
  				//2、事件委派写法（子元素（儿子）很多）
  				//事件监听添加给共有的父（祖先）元素
  				//事件发生在子元素（儿子）身上的时候，会自动冒泡到父元素（爹）身上
  				//父元素（爹）感受到事件发生后，再回过头去找到发生事件的子元素（儿子）
  				// 进行处理
  				var ulNode = document.querySelector('ul');
  				ulNode.onmouseover = function(e){
  					//找到真正发生事件的儿子     目标元素
  					//目标元素是藏在事件对象当中的
  					//事件对象当中target属性就是发生事件的目标元素
  					// （代表的是最内部的一个）
  					console.log(e);
  					if(e.target.nodeName === 'LI'){//不加if有可能拿到的就是爹
  						//这个判断事件委派一般都会有，为了确保目标元素是我们找到的那个元素
  						e.target.style.backgroundColor = 'hotpink';
  					}
  				};		
  				ulNode.onmouseout = function(e){
  					if(e.target.nodeName === 'LI'){
  						e.target.style.backgroundColor = 'white';
  					}
  				};
  			}
  ```

  + 移入标签不是最内层标签

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="UTF-8">
  		<title></title>
  	</head>
  	<body>
  		<ul>
  			<li>我是列表项1</li>
  			<li>我是列表项2</li>
  			<li>我是列表项3</li>
  			<li>我是列表项4</li>
  			<li>我是列表项5</li>
  			<li>我是列表项6</li>
  			<li>我是列表项7</li>
  			<li><span>我是列表项8</span></li>
  		</ul>
  	
  		
  		<script type="text/javascript">
  			window.onload = function(){
  				var ulNode = document.querySelector('ul');
  				ulNode.onmouseover = function(e){
  					//找到真正发生事件的儿子     目标元素
  					//目标元素是藏在事件对象当中的
  					//事件对象当中target属性就是发生事件的目标元素（代表的是最内部的一个）
  					console.log(e);
  					if(e.target.nodeName === 'LI'){//不加if有可能拿到的就是爹
  						//这个判断事件委派一般都会有，为了确保目标元素是我们找到的那个元素
  						e.target.style.backgroundColor = 'hotpink';
  					}else if(e.target.parentElement.nodeName === 'LI'){
  						e.target.parentElement.style.backgroundColor = 'hotpink';
  					}
  					
  				};
  				
  				ulNode.onmouseout = function(e){
  					if(e.target.nodeName === 'LI'){
  						e.target.style.backgroundColor = 'white';
  					}else if(e.target.parentElement.nodeName === 'LI'){
  						e.target.parentElement.style.backgroundColor = 'white';
  					}
  				};
  			}
  		</script>
  	</body>
  </html>
  ```

+ 事件委派2

  + 普通使用

  ```html
  <!DOCTYPE html>
  <html>
  	<head>
  		<meta charset="UTF-8">
  		<title></title>
  	</head>
  	<body>
  		<ul>
  			<li>我是列表项1</li>
  			<li>我是列表项2</li>
  			<li>我是列表项3</li>
  			<li>我是列表项4</li>
  			<li>我是列表项5</li>
  			<li>我是列表项6</li>
  			<li>我是列表项7</li>
  			<li>我是列表项8</li>
  		</ul>
  		
  		<button>点击添加</button>
  		
  		<script type="text/javascript">
  			window.onload = function(){
  				//本来有一些，然后还可能去动态添加一些新的
  				//老的和新的都要有相同的行为效果
  				//此时就想事件委派
  //				//1、先让原来的li可以移入变色
  				var liNodes = document.querySelectorAll('li');
  				var btn = document.querySelector('button');
  				var ulNode = document.querySelector('ul');
  				
  				for(var i = 0; i < liNodes.length; i++){
  					liNodes[i].onmouseover = function(){
  						this.style.backgroundColor = 'hotpink';
  					};
  					
  					liNodes[i].onmouseout = function(){
  						this.style.backgroundColor = 'white';
  					};
  				}
  				
  				//2、点击按钮添加新的
  				btn.onclick = function(){
  					var liNode = document.createElement('li');
  					liNode.innerHTML = '我是新的';
  					ulNode.appendChild(liNode);
  					liNode.onmouseover = function(){
  						this.style.backgroundColor = 'hotpink';
  					};
  					liNode.onmouseout = function(){
  						this.style.backgroundColor = 'white';
  					};
  				}
  			}
  		</script>
  	</body>
  </html>

  ```

  + 事件委派

  ```js

  		<script type="text/javascript">
  			window.onload = function(){
  				//本来有一些，然后还可能去动态添加一些新的
  				//老的和新的都要有相同的行为效果
  				//此时就想事件委派
  //				//1、先让老的可以移入变色
  				var liNodes = document.querySelectorAll('li');
  				var btn = document.querySelector('button');
  				var ulNode = document.querySelector('ul');
  				//事件委派的写法
  				btn.onclick = function(){
  					var liNode = document.createElement('li');
  					liNode.innerHTML = '我是新的';
  					ulNode.appendChild(liNode);
  				}
  				
  				ulNode.onmouseover= function(e){
  					if(e.target.nodeName === 'LI'){
  						e.target.style.backgroundColor = 'hotpink';
  					}
  				};
  				
  				ulNode.onmouseout = function(e){
  					if(e.target.nodeName === 'LI'){
  						e.target.style.backgroundColor = 'white';
  					}
  				};
  			}
  		</script>
  ```



### 6. 两对移入移出区别

+ `onmouseover/onmouseout`       推荐

   如果是一个父子元素模型，对父元素添加移入和移出，当鼠标移入父元素里面的子元素的时候，事件会移出然后再移入。也就是说事件元素会有切换；事件委派的时候，必须使用这一对，大部分的时候我们使用的事件流都是冒泡，冒泡一定会涉及到事件的切换，所以我们常用双o事件；

+ `onmouseenter/onmouseleave`

  如果是一个父子元素模型，对父元素添加移入和移出，当鼠标移入父元素里面的子元素的时候，
  事件并没有移出然后再移入。也就是说事件元素没有切换；

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			*{
				margin: 0;
				padding: 0;
			}
			
			#box{
				width: 300px;
				height: 300px;
				background-color: red;
			}
			#box1{
				width: 150px;
				height: 150px;
				background-color: green;
			}
		</style>
	</head>
	<body>
		<div id="box">
			<div id="box1"></div>
		</div>
		
		<script type="text/javascript">
			window.onload = function(){
				var box = document.getElementById('box');
				//如果从外部元素移入到内部元素有事件切换，可以区分出不同元素的
//				box.onmouseover = function(){
//					console.log('移入')
//				};
//				
//				box.onmouseout= function(){
//					console.log('移出')
//				};
				
				//如果从外部元素移入到内部元素没有事件切换，认为内部元素和外部元素就是同一个
				box.onmouseenter = function(){
					console.log('移入')
				};
				
				box.onmouseleave= function(){
					console.log('移出')
				};
			}
		</script>
	</body>
</html>
```

