### 1. Bom

​	Browser Object Model是浏览器对象模型，它提供了一系列对象用于与浏览器窗口进行交互，浏览器对象模型提供了独立与内容的，可以与浏览器窗口进行互动的对象结构，Bom由多个对象构成，其中代表浏览器窗口的window对象是Bom对象的顶层对象，其他对象都是该对象的子对象。

![bom](.\img\bom.png)

### 2. window对象（bom的顶级对象）

window，顾名思义，窗口对象。它表示整个浏览器窗口，主要用来操作浏览器窗口。同时， window对象还是 ECMAScript 中的 Global 对象，因而所有全局变量和全局函数都是它的属性，且所有原生的构造函数及其他函数也都存在于它的命名空间下。

+ var  a;   window.a;

+ function  fn(){}    window.fn();

+ document    window.document

+ window.onload

+ alert('提示信息')

+ confirm("确认信息")

+ prompt("弹出输入框")

+ open("url地址"，“_black或_self”）　　

+ window.onresize

  ```js
  window.onresize = function(){
  		//也是一个事件，浏览器窗口发生大小改变的时候这个事件函数就会自动执行
  		console.log(document.documentElement.clientWidth);//固定拿视口宽度的
  		console.log(document.documentElement.clientHeight);//固定拿视口宽度的
  };
  ```

+ window.onscroll

  ```js
  window.onscroll = function(){//系统滚动事件
  		console.log('滚');
  }
  ```

### 3. location对象-浏览器的地址

```js
console.log(window.location.href);
window.location.href = 'https://www.baidu.com';

location.hostname 返回 web 主机的域名

location.pathname 返回当前页面的路径和文件名

location.port 返回 web 主机的端口 （80 或 443）

location.portocol 返回页面使用的web协议。 http:或https:
```

### 4. history对象   管历史记录

history对象包含有关用户的访问历史记录

- length 返回浏览器历史列表中的 URL 数量
- forward() 加载 history 列表中的下一个 URL
- `back()` 加载 history 列表中的上一个 URL
- `go()` 加载 history 列表中的某个具体页面
- history.go(-1)    后退一页
- history.go(1)    前进一页

```js
<a href="javascript:history.back()">上一页</a>
<a href="javascript:history.forward()">下一页</a>
<a href="javascript:window.history.go(-1)">指定页</a>//回到指定的历史记录  0代表当前页   负数代表前面的页  正数代表后面的页
```

### 5. navigator   管浏览器的版本内核信息

navigator对象用于提供与用户浏览器相关的信息

- appCodeName 属性返回浏览器的代码名
- appName 属性返回浏览器的名称
- cookieEnabled 属性返回指明浏览器中是否启用cookie的布尔值
- platform 属性返回运行浏览器的操作系统平台
- appVersion 属性返回浏览器的平台和版本信息
- `userAgent` 属性返回用户浏览器发送服务器的user-agent头部的值
- language: "zh-CN"  判断用户浏览器语言设置

识别浏览器

```js
var str1=window.navigator.userAgent;
var str2=window.navigator.appVersion;
console.log(navigator.appName);//浏览器名字Netscape（网景）
console.log(navigator.appCodeName);//核心名称，但是不准
console.log(navigator.appVersion);//应用的版本
```

### 6. screen 

screen对象包含有关客户端显示屏幕的信息

- width 属性返回显示器屏幕的宽度
- height 属性返回显示器屏幕的高度
- availHeight 属性返回显示屏幕的高度 (除 Windows 任务栏之外)
- availWidth 属性返回显示屏幕的宽度 (除 Windows 任务栏之外)

### 7. document对象 文档对象

- document 对象是 Window 对象的一部分
- 可通过 window.document 属性对其进行访问
- 每个载入浏览器的 HTML 文档都会生成 document 对象
- document 对象与它所包含的各种节点构成了早期的文档对象模型（DOM 0级）
- document：包含整个 HTML 文档，可被用来访问文档内容及其所有页面元素

