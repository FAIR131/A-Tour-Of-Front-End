# HTML5新增

## 什么是HTML5?

 HTML5 是下一代 HTML 标准
 HTML , HTML 4.01的上一个版本诞生于 1999 年。自从那以后，Web 世界已经经历了巨变
 HTML5 仍处于完善之中。然而，大部分现代浏览器已经具备了某些 HTML5 支持

 <!doctype> 声明必须位于 HTML5 文档中的第一行,使用非常简单
 对于中文网页需要使用 <meta charset="utf-8"> 声明编码，否则会出现乱码

## HTML5的语法

 内容类型（ContentType）
  HTML5的文件扩展符与内容类型保持不变，仍然为".html"或".htm"

 DOCTYPE声明
  不区分大小写

 指定字符集编码
  meta charset="UTF-8"

 可省略标记的元素
  不允许写结束标记的元素：br、col、embed、hr、img、input、、link、meta
  可以省略结束标记的元素：li、dt、dd、p、option、colgroup、thead、tbody、tfoot、tr、td、th
  可以省略全部标记的元素：html、head、body、colgroup、tbody

 省略引号
  属性值可以使用双引号，也可以使用单引号

## HTML5中的语义化标签

 HTML5 提供了新的语义元素来明确一个Web页面的不同部分
![Html5-layout](images/Html5-layout.jpg)
 <header></header>   定义文档的头部区域
 <nav></nav>     定义导航链接的部分
 <article></article>   定义独立的内容
 <section></section>   定义文档中的节（section、区段）
 <aside></aside>    定义页面主区域内容之外的内容（比如侧边栏）
 <footer></footer>   定义文档的底部区域
 <figure></figure>   定义独立的流内容（图像、图表、照片、代码等等）
 <figcaption></figcaption> 定义被置于 "figure" 元素的第一个或最后一个子元素的位置
 <mark></mark>    定义带有记号的文本

## HTML5中的表格



## 额外的表单元素

 select   下拉选择框
   size 显示的个数
  options     下拉选择项

 textarea  多行文本域
   cols
   rows

 fieldest   表单字段集
  	legend  表头

## HTML5中的 input  type 类型

 color   用于选取颜色
 date   用于从一个日期选择器选择一个日期
 datetime  用于选择一个日期（UTC 时间）
 datetime-local 用于选择一个日期和时间 (无时区)
 email   用于应该包含 e-mail 地址的输入域
 month   用于选择一个月份
 number   用于应该包含数值的输入域
 range   用于应该包含一定范围内数字值的输入域
 search   用于搜索域
 tel    用于电话号码字段
 url    用于应该包含 URL 地址的输入域
 week   用于选择周和年
 ......

## HTML5中的表单属性

 min, max, step  为包含数字或日期的 input 类型规定限定
     适用于以下类型的<input>标签：date pickers、number 以及 range
 multiple  规定<input>元素中可选择多个值
 pattern   规定一个正则表达式用于验证 <input> 元素的值
 required   规定必须在提交之前填写输入域（不能为空）
 novalidate  规定<input>元素在表单提交时无需被验证
 autofocus 规定在页面加载时，域自动地获得焦点
 autocomplete 规定 form 或 input 域应该拥有自动完成功能
 disabled   规定输入字段是禁用的
 size    规定输入字段的尺寸（以字符计）
 ......

## 关联文本

 点击文本时也可以控制表单元素的选择情况

 第一种方案
  <label>
   <input type="radio" name="agree" value="agree" />
   我同意此条款
  </label>

 第二种方案
  <input type="checkbox" name="agree" value="agree" id="box" />
  <label for="box">我同意此条款</label>

## HTML5中的音频和视频

 1、音频 <audio></audio>
  src   音频文件的 URL
  controls 向用户显示音频控件（比如播放/暂停按钮）
  autoplay 音频在就绪后马上播放
  loop  每当音频结束时重新开始播放
  muted  音频输出为静音
  preload  当网页加载时，音频是否默认被加载以及如何被加载

 2、视频 <video></video>
  src   音频文件的 URL
  controls 向用户显示音频控件（比如播放/暂停按钮）
  autoplay 音频在就绪后马上播放
  loop  每当音频结束时重新开始播放
  muted  音频输出为静音
  preload  当网页加载时，音频是否默认被加载以及如何被加载
  poster  视频正在下载时显示的图像，直到用户点击播放按钮
  width  视频播放器的宽度
  height  视频播放器的高度

## Canvas

### 什么是 canvas?

 HTML5 <canvas> 元素用于图形的绘制，通过脚本 (通常是JavaScript)来完成
 <canvas> 标签只是图形容器，您必须使用脚本来绘制图形
 你可以通过多种方法使用 canvas 绘制路径,盒、圆、字符以及添加图像

## 内联SVG

### 什么是SVG？

 SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
 SVG 用于定义用于网络的基于矢量的图形
 SVG 使用 XML 格式定义图形
 SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失
 SVG 是万维网联盟的标准

### SVG优势

 与其他图像格式相比（比如 JPEG 和 GIF），使用 SVG 的优势在于：

 SVG 图像可通过文本编辑器来创建和修改
 SVG 图像可被搜索、索引、脚本化或压缩
 SVG 是可伸缩的
 SVG 图像可在任何的分辨率下被高质量地打印
 SVG 可在图像质量不下降的情况下被放大

### SVG与Canvas区别

 SVG适用于描述XML中的2D图形的语言
 Canvas随时随地绘制2D图形（使用javaScript）
 SVG是基于XML的，意味这可以操作DOM，渲染速度较慢
 在SVG中每个形状都被当做是一个对象，如果SVG发生改变，页面就会发生重绘
 Canvas是一像素一像素地渲染，如果改变某一个位置，整个画布会重绘

| Canvas                           | SVG                        |
| -------------------------------- | -------------------------- |
| 依赖分辨率                       | 不依赖分辨率               |
| 不支持事件处理器                 | 支持事件处理器             |
| 能够以.png或.jpg格式保存结果图像 | 复杂度会减慢搞渲染速度     |
| 文字呈现功能比较简单             | 适合大型渲染区域的应用程序 |
| 最合适图像密集的游戏             | 不适合游戏应用             |
