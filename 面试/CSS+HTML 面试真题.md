##### 1. ★ 父元素和子元素宽高不固定，如何实现水平垂直居中

```css
- 弹性盒模型
  -父元素设置：display:flex; justify-content:center; align-items:center
  -额外的骚操作：父元素设置弹性盒display:flex; 子元素可以设置margin: auto; 实现垂直水平居中
- 定位属性（position）配合位移属性（transform）
  - 父元素设置：position:relative，
  - 子元素设置：position:absolute; top:50%; left:50%; transform:translate(-50%，-50%)
```

##### 2. ★★ 分别实现骰子中的'一点' 和 '三点' 的布局。

链接：

```css
/*一点布局：原理就是将单个子元素垂直水平居中，利用弹性盒模型(display:flex)即可*/
父元素设置：display:flex; justify-content:center; align-items: center

/*三点布局：同样是使用弹性盒模型(display:flex)，只不过这次需要用到其他属性*/

父元素设置：display: flex; justify-content: space-between;
子元素设置： .child:nth-child(2){
              align-self: center;
            }
            .child:nth-child(3){
              align-self: flex-end;
            }

三点布局需要三个子元素，在这里的第一个子元素不需要设置排列方式，默认为 align-self: flex-start 
justify-content: space-between; 的作用是使子元素能够在水平方向上两边产生间隔并平均分布空间
align-self: flex-start(默认)/center/flex-end; 该属性作用在父元素设置了display:flex的子元素上，可以调整子元素自身的位置
```

##### 3. ★★ 简述选择器~和+的区别。

```css
~ 选择器的作用：
    1.选择紧跟着当前符合条件元素后面的同级元素
    2.可以匹配多个
+ 选择器的作用：
    1.选择紧跟在当前符合条件元素后面的同级元素
    2.只能匹配一个

例： <div class="box"></div>
    <p class="one"></p>
    <span class="two"></span>
    <p class="three"></p>
    <span class="four"></span>

    .box ~ p  ：可以选中box下的所有p元素，既是 one 和 three
    .box + span ：则匹配选中box相邻下符合条件的第一个元素，既是 two
```

##### 4. ★★ 简述box-sizing的有效值以及所对应的盒模型规则。

```css
/*box-sizing值*/
    box-sizing: content-box/border-box/inherit
 box-sizing属性用于更改用于计算元素的宽度和高度默认的CSS盒子模型，可以使用此属性来模拟不正确支持CSS盒子模型规范的游览器行为。
**content-box：
    1.box-sizing的默认属性
    2.是CSS2.1中规定的宽度高度的显示行为
    3.在CSS中定义的宽度和高度就对应到元素的内容框（即元素容器本身
    4.在CSS中定义的宽度和高度之外绘制元素的内边距和边框（即在元素容器本身上增加内边距和边框，容器宽高需要自增计算
    容器占据空间大小计算方式：content（容器宽高）+ margin（外边距） + border（边框）
**border-box:
    1.在CSS中微元素设定的宽度和高度就决定了元素的边框值
    2.元素在设置内边距和边框是在已经设定好的宽度和高度之内进行绘制
    3.CSS中设定的宽度和高度减去边框和内间距才能得到元素内容所占的实际宽度和高度
    容器占据空间大小计算方式：content（容器宽高）+padding（内边距）+border（边框）
**inherit：
    1.规定元素是从父容器继承box-sizing的属性值
```

##### 5. ★★★ html中元素的margin是否会叠加（合并）？如何解决？

```css
/*  会叠加   */
问题详解1： flex布局对子元素的影响
    1.子元素的float、clear和vertical-align属性将会失效
    2.解决了margin传递、重叠（叠加）问题

问题详解2：flex布局的margin传递叠加问题主要有以下两种
    1.父子间的margin，会由子级传递到父级
    —— 解决方法： margin传递的产生的原因是父级的高度没有被自动撑开，所以在父级父级增加属性：overflow: auto 即可解决
    2.兄弟间的margin值会重复叠加
    —— 解决方法： 浏览器为了保证列表的整齐，上下margin产生了叠加，不能直接解决。只能通过减少一个margin的方式。如只定义margin-top:100px;  margin-bottom:0px。的方式解决。
```

##### 6. ★★ 简述align-items和align-content的区别。

```css
align-items：可以应用于所有的flex容器，它的作用是设置flex子项在每个flex行的交叉轴上的默认对齐方式（相对Y轴

align-content：只适用于多行的flex容器，在使用前需在flex容器设置flex-wrap：wrap;表示子元素超出换行；align-content 它的作用是当flex容器在交叉轴上有多余的空间时，将子项作为一个整体进行对齐。
```

##### 7. ★★ 简述data-*属性的用法（如何设置，如何获取），有何优势？

```css
data-*定义：
    1.是用于储存页面或应用程序的私有自定义数据
    2.赋予我们在所有html元素上嵌入自定义data属性的能力

data-*用法：
    1.属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
    2.属性值可以是任意字符串
    3.一个元素可以拥有任意数量的data属性
    4.data属性无法储存对象，如需储存，可通过对象序列化

data-*如何设置、获取：
    1.如何设置
        通过JavaScript内置的setAttribute('data属性名','新内容')即可设置
        通过该数据类型的(dataset) API设置data值，IE10以上才支持；
            var button = document.queryselector('button')
            button.dataset.data属性名 = '新内容' ; 这里的data属性名是指data-后面的名字

    2.如何获取
        通过JavaScript内置的getAttribute('data属性名') 即可获取
        通过该数据类型的(dataset) API设置data值，IE10以上才支持；
            var button = document.queryselector('button')
            data = button.dataset.data属性名 ; 这里的data属性名是指data-后面的名字

data-*优势：
    1.其储存的自定义数据能够被页面的JavaScript利用，可以创建更好的用户体验
    2.可以通过JavaScript来构造数据、填充数据
    3.代码体积小、较为灵活
    4.解决网站的外观和实用性之间产生的冲突
```

##### 8. ★ 简述title与h1的区别，b与strong的区别，i与em的区别。

```css
《title与h1的区别》：
    1. 从网站角度看，title 更重于网站信息。title可以直接告诉搜索引擎和用户这个网站是关于什么主题和内容的。
    2. 从文章角度看，h1则是用于概括文章主题。
    3. 一个网站可以有多个title,最好一个单页用一个title，以便突出网站页面主体信息，从seo看，title权重比h1高，适用性比h1广。
    4. 标记了h1的文字页面给予的权重会比页面内其他权重高很多。一个好的网站是h1和title并存，既突出h1文章主题，又突出网站主题和关键字。达到双重优化网站的效果。

《b与strong 的区别》：
    1. b 是只是对文本的简单加粗， strong 是一个语义化标签，对相关文本具有强调作用
    2. b 标签只是侧重于字体加粗， strong标签加强字体的语气都是通过粗体来实现的，相比之下，搜索引擎更喜欢侧重于strong标签
    3. strong标签更注重于内容上的应用，在html中，对关键词的标明，然而还有一些网站上，也有使用strong标签登对小标题进行强调，但是在页面中，如果出现过多的strong标签，可能会对排名不利。

《i 与 em 的区别》：
    1. i(italic)是实体标签，用来使字符倾斜，em(emphasis)是逻辑标签，作用是强调文本内容 
    2. i标签只是斜体的样式，没有实际含义，常用来表达无强调或着重意味的斜体，比如生物学名、术语、外来语；
    3. em表示标签内字符重要，用以强调，其默认格式是斜体，但是可以通过CSS添加样式。
    建议：为了符合CSS3的规范，i 标签应尽量少用而应改用 em
```

##### 9. ★ 什么是标准文档流

```css
*** 标准文档流指的是元素排版布局过程中，元素会默认自动从左往右，从上往下的流式排列方式。当前面内容发生了变化，后面的内容位置也会随着发生变化。

*** HTML就是一种标准文档流文件。

简单的来说就是各种布局属性在html中所显示的效果，如display（行内元素与块级元素*非常重要*）、float、position
```

##### 10. ★ z-index是什么？在position的值什么时候可以触发?

```css
z-index : 指的是一个元素在当前文档页面定位时重叠层显示的层级等级，默认为0 ，数值不限，越大显示层级越高

触发机制：当position的值设置为absolute、relative和fixed时才能触发
```

##### 11. ★★ CSS3 如何实现圆角？

```css
border-radius属性
    1. 四个值: 第一个值为左上角，第二个值为右上角，第三个值为右下角，第四个值为左下角。
    2. 三个值: 第一个值为左上角, 第二个值为右上角和左下角，第三个值为右下角
    3. 两个值: 第一个值为左上角与右下角，第二个值为右上角与左下角
    4. 一个值： 四个圆角值相同
只需要使用border-radius将四个角设置为相适应的尺寸即可实现圆角
```

##### 12. ★★ HTML5有哪些缓存方式？

```css
1、localstorege缓存，将数据储存在本地客户端，只有用户手动清除才能清除缓存
    API：1.localstorege.setItem(key,value)，键值对的形式缓存
        2.localstorege.getItem(key)，根据键名来缓存值
        3.localstorege.length ，获取总缓存数量

2、sessionStorege 会话缓存，会话机制是指从打开浏览器开始访问页面的时候，到关闭这个页面的过程成为一个会话，sessionStorege储存的数据会随着页面关闭而销毁
    API: 1. sessionStorage.setItem(key,val)，localStorage是以键值对的形式创建的；
         2. sessionStorage.getItem(key)，根据键名来获取缓存的值；
         3. sessionStorage.length；获取总共缓存值得数量， localStoarge返回的是个对象；

3、离线缓存机制(Application Cache)
    1. 配置manifest文件，manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）
    2. manifest 文件可分为三个部分：
        1、CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
        2、NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
        3、FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）
    3. API： 0（UNCACHED） : 无缓存， 即没有与页面相关的应用缓存
            1（IDLE） : 闲置，即应用缓存未得到更新
            2 （CHECKING） : 检查中，即正在下载描述文件并检查更新
            3 （DOWNLOADING） : 下载中，即应用缓存正在下载描述文件中指定的资源
            4 （UPDATEREADY） : 更新完成，所有资源都已下载完毕
            5 （IDLE） : 废弃，即应用缓存的描述文件已经不存在了，因此页面无法再访问应用缓存
4、web SQL
    1. 关系数据库，通过SQL语句访问
    2. Web SQL 数据库API并不是HTML5 规范的一部分，但是它是一个独立的规范，引入了一组使用SQL操作客户端数据库的APIs
    3. 支持情况：Web SQL 数据库可以在最新版的 Safari, Chrome 和 Opera 浏览器中工作。
    4. API：1. openDatabase：这个方法使用现有的数据库或者新建的数据库创建一个数据库对象。
            2. transaction：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
            3. executeSql：这个方法用于执行实际的 SQL 查询。

5、 IndexDB
    1.索引数据库 (IndexedDB) API（作为 HTML5 的一部分）对创建具有丰富本地存储数据的数据密集型的离线 HTML5 Web 应用程序很有用。同时它还有助于本地缓存数据，使传统在线 Web 应用程序（比如移动 Web 应用程序）能够更快地运行和响应。
```

##### 13. ★★ CSS3新增伪类有那些？

```css
常用的伪类：
    1. :link 选择所有未访问的链接
    2. :visited 选择所有访问过的链接
    3. :active 选择正在活动的链接（或理解为鼠标点击瞬间效果）
    4. :hover 鼠标放到链接后的状态
    5. :focus 选择元素输入后具有焦点
    6. :before 在元素之前插入内容
    7. :after 在元素之后插入内容
```

##### 14. ★ 简述一下src与href的区别，title和alt的区别

```css
href：href表示超文本引用，用来建立当前元素和文档之间的链接，常用在link和a等元素上。
    注：当浏览器解析到这一句时会识别该文档为css文件，会下载并不会停止对当前文档的处理，所以建议使用link方式而不是@import加载css。

src：src表示引用资源，替换当前元素，是页面内容不可缺少的一部分，常用在img，script，iframe上。src指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；请求src资源时会将其指向的资源下载并应用到当前文档中,例如js脚本、img图片等。src链接内的地址不会有跨域问题
     注：当浏览器解析到这一句时会暂停其他资源的下载和处理，直至将该资源加载、编译、执行完毕。这也是js脚本放在底部而不是头部的问题

title：
    1. title属性是为元素提供额外的注释信息，当鼠标放在元素上时会有title文字显示，以达到补充说明或提示。
       2. title属性更倾向于用户体验的考虑。
    3. title既可以是元素的属性也可以是标签，作为属性可以用在除base,basefont,head,html,meta,param,script和title之外的任何标签上（title常与form以及a标签一同使用，以提供关于输入格式和链接目标的信息），title与style、id、class等一起作为HTML中许多标签共用的标准属性。

alt：
    1. alt属性是在你的图片无法显示时的替代文本，它会直接输出在原本加载图片的地方。
    2. alt属性有利于SEO，是搜索引擎搜录时判断图片与文字是否相关的重要依据。
    3. alt只能是元素的属性，只能用在img、area和input标签中（img,area中alt必须指定）。     

注：当a标签内嵌套img标签时，起作用的是img的title属性。
```

##### 15. ★ 什么是CSS hack？

```css
CSS hack：CSS hack是通过在CSS样式中加入一些特殊的符号，让不同的浏览器识别不同的符号（什么样的浏览器识别什么样的符号是有标准的，CSS hack就是让你记住这个标准），以达到应用不同的CSS样式的目的。

注：CSS属性Hack、CSS选择符Hack以及IE条件注释Hack， Hack主要针对IE浏览器。

例：margin属性在ie6中显示的距离会比其他浏览器中显示的距离宽2倍，也就是说margin-left:20px;在ie6中距左侧对象的实际显示距离是40px，而在非ie6中显示的距左侧对象的距离是设置的值20px;所以要想设置一个对象距离左侧对象的距离在所有浏览器中都显示是20px的宽度的样式应为：.kwstu{margin-left:20px;_margin-left:20px;}

CSS hack常见的三种形式：
    1. 属性级Hack：比如IE6能识别下划线“_”和星号“*”，IE7能识别星号“*”，但不能识别下划线”_ ”，而firefox两个都不能认识。
    2. 选择符级Hack：比如IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:first-child+html .class{}。
    3. IE条件注释Hack：IE条件注释是微软IE5开始就提供的一种非标准逻辑语句。比如针对所有IE：&lt;!-[if IE]&gt;&lt;!-您的代码-&gt;&lt;![endif]&gt;，针对IE6及以下版本：&lt;!-[if it IE 7]&gt;&lt;!-您的代码-&gt;&lt;![endif]-&gt;，这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效。
    PS：条件注释只有在IE浏览器下才能执行，这个代码在非IE浏览下被当做注释视而不见。可以通过IE条件注释载入不同的CSS、JS、HTML和服务器代码等。
```

##### 16. ★★ 什么叫做优雅降级和渐进增强？

```css
渐进增强 progressive enhancement： 
    1. 针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
    2. 渐进增强观点则认为应关注于内容本身。内容是我们建立网站的诱因。有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得“渐进增强”成为一种更为合理的设计范例。这也是它立即被 Yahoo! 所采纳并用以构建其“分级式浏览器支持 (Graded Browser Support)”策略的原因所在。

优雅降级 graceful degradation：
    1. 一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。
    2. 优雅降级观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 IE、Mozilla 等）的前一个版本。

区别：
    1. 优雅降级是从复杂的现状开始，并试图减少用户体验的供给
    2. 渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要
    3. 降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带
```

##### 17. ★★★ 移动端适配怎么做？

```css
方法一：@media 媒体查询，通过查询设备的宽度来执行不同的 css 代码，最终达到界面的配置。

方法二：Flex弹性布局

方法三：rem + viewport 缩放，屏幕宽度设定 rem 值，需要适配的元素都使用 rem 为单位，不需要适配的元素还是使用 px 为单位。
```

##### 18. ★★ 请问苹果原生浏览器中默认样式如何清除，例如button，input默认样式？

```css
清除苹果默认样式： css样式中加入 input,textarea,button { -webkit-appearance: none; border-radius:0px; border:none;}

input、button默认样式： input[type="button"], input[type="submit"], input[type="reset"] {-webkit-appearance: none;}
```

##### 19. ★ CSS清除浮动的方法。

```css
1. 在标签尾部添加空块级标签，设置样式属性为：clear：both；缺点：如果页面浮动布局多，就要增加很多空div，不利于页面的优化。
2. 父级定义伪类after和zoom，.box:after{display:block; clear:both; content:""; visibility:hidden; height:0;}  .box{ zoom: 1 }
3. 简单粗暴，父级设置overflow:hidden，缺点是不能和position配合使用
4. 直接给父元素单独设置高度（height）；缺点：只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题。对于响应式布局会有很大影响。
```

##### 20. ★★ PC端常用的布局方法。

```css
1、利用float+overflow实现
    左右定宽度，分布向两边浮动，中间如果没设置溢出处理默认宽度是100%，设置后就会截取两边的宽度从而实现中间自适应
2、flex布局
    通过flex相关的属性进行适配性的调整布局
3、Table表格布局
4、float+margin实现三列布局
5、定位absolute实现中间自适应
6、Grid网格布局
7、圣杯布局
8、双飞翼布局
9、等高布局
```

##### 21. ★★ 布局左边20%，中间自适应，右边200px，不能用定位。

```css
布局： <div class="box">
        <div class="left">left</div>
        <div class="right">right</div>
        <div class="content">content</div>
      </div>

样式：*,html,body{
          margin: 0;
          padding: 0;
        }
        .box{
          width: 1500px;
          height: 500px;
          background-color: rgb(215, 221, 221);
          margin: 0 auto;
        }
        .left{
          width: 20%;
          height: 200px;
          background-color: chocolate;
          float: left;
        }
        .right{
          width: 200px;
          height: 200px;
          float: right;
          background-color: cornflowerblue;
        }
        .content{
          overflow: hidden;
          height: 400px;
          background-color: darkblue;
        }
```

##### 22. ★★ 行内元素和块级元素？img算什么？行内元素怎么转化为块元素？

```css
行内元素：1.无法设置宽高；
        2. 对margin仅设置左右有效，上下无效；
        3. padding上下左右有效；不会自动换行
块级元素：1.可以设置宽高
        2. margin和padding的上下左右均对其有效
        3. 超出当前行会自动换行
        4. 多个块状元素标签写在一起，默认排列方式为从上至下
img：属于行内块元素(inline-block),即有行内元素的属性也有块级元素的属性

元素之间的转化可以通过设置样式：display:block/inline/inline-block来改变自身的元素属性
```

##### 23. ★★ 将多个元素设置为同一行? 清除浮动的几种方式？

```css
将多个元素设置为同一行：1. 浮动(float) 2.行内元素/行内块元素  
清除浮动：详见 19
```

##### 24. ★ 什么是CSS3 transform? animation? 区别是什么？

```css
transform：1. transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。
          2. transform属性是静态属性，需要配合transition和animation才能展现出动画效果。你可以把它看成是跟left、top等属性一样，只是一个静态样式而已。

animation：一个css3的动画属性，需要配合@keyframes 使用

区别： 1. transition是css中检测指定属性变化进行自动补间动画的属性。
      2. animate是先指定好动画过程中的关键帧属性，进行动画的属性。
```

##### 25. ★★ nth-of-type和nth-child的区别是什么？

```css
nth-of-type：该css伪类是针对具有一组兄弟节点的标签, 用 n 来筛选出在一组兄弟节点的位置。

nth-child：该css伪类首先是找到所有当前元素的兄弟元素，, 用 n 来筛选出在当前元素的兄弟元素节点的位置。

总的来说就是，nth-of-type 它是当前元素的兄弟元素的第n个，而nth-child 是当前元素的兄弟节点的第n个当前元素。

例：
      <p>第一个</p>
      <p>第二个</p>
      <h1>第三个</h1>
      <p>第四个</p>
      <p>第五个</p>

     p:nth-child(4){
      color: red;     //选中的是 ‘第四个’ 内容的 p 标签
    }

    p:nth-of-type(4){
      color: yellow;  //选中的是 ‘第五个’ 内容的 p 标签
    }
```

##### 26. ★★ :before 和 ::before区别是什么？

```css
区别：
    1. 叫法不同：一个是伪类，一个是伪元素
    2. 版本不同：作用都是一样，但单冒号伪类写法是旧版本css2写法， 双冒号伪元素是新版本css3写法
    3. 兼容性差异：单冒号伪类写法 兼容性比 双冒号要好。 :before > ::before
```

##### 27. ★★ 简述 viewport 所有属性

```css
width：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。

height：和 width 相对应，指定高度。

initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例（调整页面缩放比例）。

maximum-scale：允许用户缩放到的最大比例。

minimum-scale：允许用户缩放到的最小比例。

user-scalable：用户是否可以手动缩放
```

##### 28. ★ 如何理解HTML结构语义化？

```css
为什么要语义化：
    a. 为了在没有CSS的情况下，页面也能呈现出很好地内容结构、代码结构:为了裸奔时好看；

    b. 用户体验：例如title、alt用于解释名词或解释图片信息的标签尽量填写有含义的词语、label标签的活用；

    c. 有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；

    d. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以有意义的方式来渲染网页；

    e. 便于团队开发和维护，语义化更具可读性，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

写代码时要注意什么：
    1.  尽可能少的使用无语义的标签div和span；

    2.  在语义不明显时，既可以使用div或者p时，尽量用p, 因为p在默认情况下有上下间距，对兼容特殊终端有利；

    3.  不要使用纯样式标签，如：b、font、u等，改用css设置。

    4.  需要强调的文本，可以包含在strong或em标签中，strong默认样式是加粗（不要用b），em是斜体（不要用i）；

    5.  使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td；

    6.表单域要用fieldset标签包起来，并用legend标签说明表单的用途；demo

    7.每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。

    8.补充一点：不仅写html结构时，要用语义化标签，给元素写css类名时，也要遵循语义化原则，不要，随便起个名字就用，那样等以后，再重构时，非常难读。最忌讳的是不会英文，用汉语拼音代替。别那么LOW 。
```

##### 29. ★★ 伪类选择器和伪元素？CSS3中引入的伪元素有什么？

```css
1. 伪类选择器是css2版本中的旧写法，相对于css3中伪元素的的新写法兼容性会更好。

2. 伪元素只能在一个选择器中出现一次，且需要配合content属性一起使用

3. 伪元素不会出现在DOM中，所以不能通过js来进行操作，仅仅是在渲染层加入而已

css3引入的伪元素：
    1、 ::after  //在xxx之后插入内容
    2、 ::before     // 在xxx之前插入内容
    3、 ::first-letter  //选择xxx元素的首字母
    4、 ::first-line       //选择xxx元素的首行
    5、 ::selection     //选择用户选择的元素部分
```

##### 30. ★★ HTML5有哪些新特性，移除了哪些元素？如何处理HTML5新标签兼容问题？如何区分HTML和HTML5？

```css
HTML5 新特性：
    一、语义标签

    二、增强型表单

    三、视频和音频

    四、Canvas绘图

    五、SVG绘图

    六、地理定位

    七、拖放API

    八、WebWorker

    九、WebStorage

    十、WebSocket

移除的元素：
    1、纯表现的元素：basefont，big，center，font,s，strike，tt，u。

    2、对可用性产生负面影响的元素：frame，frameset，noframes。

处理HTML5新标签兼容问题： 使用html5shiv
    原理：用document.createElement()创建html5标签

    用法：1、在页面引入html5shiv.js
         2、在样式中编写 article,aside,dialog,footer,header,section,footer,nav,figure,menu
{display:block}

如何区分HTML和HTML5：
    HTML：  1）标识文本（eg: 定义标题文本、段落文本、列表文本、预定义文本）；
            2）建立超链接，便于页面链接的跳转；
            3）创建列表，把信息有序地组织在一起，方便浏览；
            4）在网页中显示“图像、声音、视频、动画”等多媒体信息，使网页设计更具冲击力；
            5）可制作表格，以便显示大量数据；
            6）可制作表单，允许在网页内输入文本信息，执行其他用户操作，方便信息互动；
            7）没有体现结构语义化的标签（常用命名方式如下，eg: <div id=“header”></div>, 该语句用来表示网站的头部）。

    HTML5： 1）用于绘画的canvas元素；
            2）用于媒介回放的video和audio元素；
            3）对本地离线存储有更好的支持；
            4）新的特殊内容元素（eg: article、footer、header、nav、section等）；
            5）新的表单控件（eg: calendar、date、time、email、url、search等）；
            6）有语义优势，提供了一些新标签，（eg: <header> <article> <footer> 提供了语义化标签），可以更好地支持搜索引擎的读取，便于SEO蜘蛛的爬行。
```

##### 31. ★★ 常见浏览器兼容性问题？

```css
1、不同浏览器下的padding和margin不同
    解决方法：使用通配符(*)将padding和margin设置为0

2、块属性标签float之后，又有横向的margin值，在IE6中显示会比设置的大（IE6双边距bug）
    解决方法：在float标签样式控制中加入display:inline;

3、设置较小的高度标签（一般小于10px），在IE6，IE7，遨游中超出自己设置的高度
    解决方法：给超出高度的标签设置overflow:hidden;或者设置行高line-height小于你设置的高度。

4、行内标签设置display:block;后又采用float布局，再设置横向margin值时，在IE6中显示会比设置的大（IE6双边距bug）
    解决方法：在display:block;后面加上display:inline;display:table;

5、……更多请看链接
```

##### 32. ★ 块级元素？行内元素？空元素？

```css
块级元素：1. 可以设置宽高值，元素大小超出html文档会自动换行
        2. 外边距和内边距都可控制
        3. 可以容纳行内元素和其他块元素

行内元素：1. 不可以设置宽高值，元素紧跟在前一个元素后面，不会换行
        2. 宽度就是它的文字或图片的宽度，不可改变；
        3. 内联元素只能容纳文本或者其他内联元素；

空元素： 1. 没有闭合标签的标签被称作为空标签。
        2.在我们使用的标签中，有的具有闭合标签。例如<td>标签，它有闭合标签</td>。但是也有一部分标签没有闭合标签，例如<br />标签，这一类标签我们称之为空标签。
```

##### 33. ★★ media属性？screen? All? max-width? min-width?

```css
media： 媒体查询

screen ：计算机屏幕

All ：默认，适合所有设备

max(min)-width ：规定目标显示区域的宽度

css合并写法： @media screen and (min-width:xxxpx) {}
```

##### 34. ★ meta标签的name属性值?

```css
解释：meta标签的 name 属性是用来定义一个 HTML 文档的描述、关键词，规定了元数据的名称，规定了content属性的信息/值的名称
属性值： 1. application-name  //规定页面所代表的Web应用程序的名称
        2. author     //规定页面文档的作者的名字
            实例： <meta name="author" content="作者名称">

        3. description    //规定页面的描述。搜索引擎会把这个描述显示在搜索结果中
            实例： <meta name="description" content="页面描述">

        4. gennerator    //规定用于生成文档的一个软件包（不用于手写页面）。
            实例： <meta name="generator" content="FrontPage 4.0">

        5. keywords    //规定一个逗号分隔的关键词列表 - 相关的网页（告诉搜索引擎页面是与什么相关的）。
            实例： <meta name="keywords" content="HTML, meta tag, tag reference"
            提示：总是规定关键词（对于搜索引擎进行页面分类是必要的）。
```

##### 35. ★★ 一般做手机页面切图的几种方式

```css
1、DPR：2    -----  切两倍图，（即设计原图大小，因为设计图是按原来的手机尺寸放大两倍之后的）  一般保存为xxx@2x

2、DPR：3 -----   切三倍图（即设计原图大小的1.5倍，因为设计图是按原来的手机尺寸放大两倍之后的）     一般保存为xxx@3x

切图的注意事项：
    1、 尺寸：一定是要偶数
    2、 命名：命名需要符合功能板块
    3、 ……更多详情看链接
```

##### 36. ★★ px/em/rem有什么区别？为什么通常给font-size设置的字体为62.5%

```css
px（像素）：页面默认的尺寸计算单位，绝对长度,它是相对于显示器屏幕分辨率而言的

    特点：1. IE无法调整那些使用px作为单位的字体大小
         2. 国外的大部分网站能够调整的原因在于其使用了em或rem作为字体单位；
         3. Firefox能够调整px和em，rem，但是96%以上的中国网民使用IE浏览器(或内核)。


em：相对长度，相对于应用在当前元素的字体尺寸；一般浏览器默认字体大小为16px，则 1em = 16px

    特点：1. em的值并不是固定的；
         2. em会继承父级元素的字体大小。


rem（root em）：相对单位，相对于html根元素字体大小的单位，当html的font-size：16px时，1rem = 16px

    特点：1. 这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。
         2. 除了IE8及更早版本外，所有浏览器均已支持rem。


为什么给font-size设置为62.5%： 方便换算！
    1. 因为绝大多数浏览器的默认字体大小为 16px ，而将font-size设置为 62.5% 则等价于字体大小的font-size:10px;
    2. 随之在其他的换算单位，如 rem 的字体换算时，则可以表示为 1rem = 10px， 整数值对于单位的换算会比较方便

    3. 但是在Chrome（谷歌浏览器）中，支持最小字体的大小为 12px ，解决办法就是 将html根字体设置为 font-size: 625%; 意：1rem = 100px ，以此单位换算
```

##### 37. ★★ sass和scss有什么区别? sass一般怎么样编译的

```css
区别：1、sass 书写时不带大括号, scss 带大括号
         例： sass-  .box
                       color:red

             scss-   .box{
                color:red;
               }
     2、 sass 没有 ; 号 , scss有

     3、 scss 写法和css 简直一样

sass编译：
    1. sass 是基于Ruby语言开发而成的，所以在使用 sass语言之前得先行安装Ruby编译器。
    2. Sass语言有两种后缀名，分别是 .sass 和 .scss ，两者只是写法有些许不同。
    3. 编译方式：
        1、命令行编译
            详情看链接↑
        2、插件保存编译
            详情看链接↑
```

##### 38. ★★ 如果对css进行优化如何处理？

```css
优化原则：减少css样式的渲染加载时间，通过削减css样式的代码体积等相关操作

实践型优化：
    1、内联首屏关键CSS（Critical CSS）：内联CSS能够使浏览器开始页面渲染的时间提前
        * 性能优化中有一个重要的指标——首次有效绘制（First Meaningful Paint，简称FMP）即指页面的首要内容（primary content）出现在屏幕上的时间
        ** 这一指标影响用户看到页面前所需等待的时间，而内联首屏关键CSS（即Critical CSS，可以称之为首屏关键CSS）能减少这一时间。

    注：内联css并不是不加以限制的，它的初始拥堵窗口3存在限制（TCP相关概念，通常是 14.6kb， 压缩后的大小），如果内联CSS后的文件超出了这一限制，系统就需要在服务器和浏览器之间进行更多次的往返，这样并不能提前页面渲染时间。

    2、异步加载CSS
        * CSS会阻塞渲染，在CSS文件请求、下载、解析完成之前，浏览器将不会渲染任何已处理的内容。
        ** 有时，这种阻塞是必须的，因为我们并不希望在所需的CSS加载之前，浏览器就开始渲染页面。
        *** 那么将首屏关键CSS内联后，剩余的CSS内容的阻塞渲染就不是必需的了，可以使用外部CSS，并且异步加载

        方式一、 使用JavaScript动态创建样式表link元素，并插入到DOM中。

        方式二、 将link元素的media属性设置为用户浏览器不匹配的媒体类型（或媒体查询），如media="print"，甚至可以是完全不存在的类型media="noexist"。对浏览器来说，如果样式表不适用于当前媒体类型，其优先级会被放低，会在不阻塞页面渲染的情况下再进行下载。


    3、文件压缩
        * 通过相关的构建工具对css样式进行打包压缩，去除多余的空格和换行。如 webpack、rollup、grunt/gulp.js 等    


    4、去除无用CSS
        1. 筛选去除相关重复的css样式
        2. 去除在页面中无法生效或不生效的css样式


建议型优化：
    1、有选择地使用选择器

    2、减少使用昂贵的属性
        1. 在浏览器绘制屏幕时，所有需要浏览器进行操作或计算的属性相对而言都需要花费更大的代价。

        2. 当页面发生重绘时，它们会降低浏览器的渲染性能。所以在编写CSS时，我们应该尽量减少使用昂贵属性
        * 昂贵属性： 如box-shadow/border-radius/filter/透明度/伪类:nth-child()等


    3、优化重排与重绘
        * 减少重排
            1. 重排会导致浏览器重新计算整个文档，重新构建渲染树，这一过程会降低浏览器的渲染速度。有很多操作会触发重排，我们应该避免频繁触发这些操作。

        ** 避免不必要的重绘
            1. 当元素的外观（如color，background，visibility等属性）发生改变时，会触发重绘。
            2. 在网站的使用过程中，重绘是无法避免的。不过，浏览器对此做了优化，它会将多次的重排、重绘操作合并为一次执行。
            3. 不过我们仍需要避免不必要的重绘，如页面滚动时触发的hover事件，可以在滚动的时候禁用hover事件，这样页面在滚动时会更加流畅。


    4、不要使用@import
        *** 不建议使用@import主要有以下两点原因。

        * 首先，使用@import引入CSS会影响浏览器的并行下载。使用@import引用的CSS文件只有在引用它的那个css文件被下载、解析之后，浏览器才会知道还有另外一个css需要下载，这时才去下载，然后下载后开始解析、构建render tree等一系列操作。这就导致浏览器无法并行下载所需的样式文件。

        ** 其次，多个@import会导致下载顺序紊乱。在IE中，@import会引发资源文件的下载顺序被打乱，即排列在@import后面的js文件先于@import下载，并且打乱甚至破坏@import自身的并行下载
```

##### 39. ★★ 如何对css文件进行压缩合并? gulp如何实现？

```css
如何压缩合并：
    ** 通过相关的构建工具对css样式进行打包压缩，去除多余的空格和换行。如 webpack、rollup、grunt/gulp.js 等

gulp 如何实现css压缩合并
    * 看链接
```

##### 40. ★ 如何实现图片和文字在同一行显示?

```css
1. 给img标签添加 “vertical-align:middle”属性

2. 如果是背景图，则通过background的 定位属性来设置位置

3. 分别把图片和文字放入不同的div中，设置“vertical-align:middle”属性
```

##### 41. ★★ a标签中 active hover link visited 正确的设置顺序是什么?

```css
a 标签的设置顺序： 
    1. link ， 链接平常的状态
    2. hover ，鼠标放置在链接上显示的样式
    3. active ，链接被按下的样式
    4. visited ， 链接被访问过后的状态
```

##### 42. ★★★ 手机端上图片长时间点击会选中图片，如何处理？

```css
img{ pointer-events:none }，禁止事件，但会把整个标签的事件都禁用掉，不建议使用

img{ -webkit-user-select:none }，用户选中状态

推荐：
    img{
            -webkit-touch-callout: none; //触摸
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
```

##### 43. ★ 简述video标签的几个属性和方法

```css
属性：
    src ：视频的属性
    poster：视频封面，没有播放时显示的图片
    preload：预加载
    autoplay：自动播放
    loop：循环播放
    controls：浏览器自带的控制条
    width：视频宽度
    height：视频高度
方法： 通过video id获取当前元素
    Media.paused; //是否暂停

    Media.defaultPlaybackRate = value;//默认的回放速度，可以设置

    Media.playbackRate = value;//当前播放速度，设置后马上改变

    Media.played; //返回已经播放的区域，TimeRanges，关于此对象见下文

    Media.seekable; //返回可以seek的区域 TimeRanges

    Media.ended; //是否结束

    Media.autoPlay; //是否自动播放

    Media.loop; //是否循环播放

    Media.play(); //播放

    Media.pause(); //暂停
    //视频控制

    Media.controls;//是否有默认控制条

    Media.volume = value; //音量

    Media.muted = value; //静音
```

##### 44. ★★ 常见的视频编码格式有几种？视频格式有几种？

```css
常见的视频编码格式，H264 , VP8， AVS, RMVB，WMV，QuickTime（mov）

视频格式有MPEG、AVI、nAVI、ASF、MOV、3GP、WMV、DivX、XviD、RM、RMVB、FLV/F4V。
```

##### 45. ★★ canvas在标签上设置宽高和在style中设置宽高有什么区别？

```css
在canvas标签上设置宽高， canvas画布发生的变化不会影响到画布内容，即画布内容不会发生改变

相反的，在style样式中设置宽高则会影响到画布内容的形状
```

##### 46. ★ 什么是border-image？什么是box-sizing?

border-image:![1620298378082](file:///C:/Users/007/AppData/Roaming/Typora/typora-user-images/1620298378082.png)

```css
border-image：字面意思为边框图片，它可以说是css3中的一个重量级属性，属于边框的一员；主要作用就是将图片规定为包围元素的边框
    API：可以简写
        border-image-source， //用在边框的图片的路径。
        border-image-slice   // 图片边框向内偏移
        border-image-width   //    图片边框的宽度
        border-image-outset   // 边框图像区域超出边框的量。
        border-image-repeat   //图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)。

box-sizing：允许您以特定的方式定义匹配某个区域的特定元素。

    ** 例如，假如您需要并排放置两个带边框的框，可通过将 box-sizing 设置为 "border-box"。这可令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中。
```

##### 47. ★★ 解释在ie低版本下的怪异盒模型和CSS3的怪异盒模型和弹性盒模型。

```css

```

##### 48. ★★ animation对应的属性。

```css

```

##### 49. ★★★ 说说对transition的了解。

```css

```

##### 50. ★★ canvas如何绘制一个三角形|正方形

```css

```

##### 51. ★★ CSS清除浮动的几种方式

```css

```

##### 52. ★★★ 为什么要初始化CSS样式？

```css

```

##### 53. ★★ 解释下CSS sprites，以及你要如何在页面或者网站中使用它。

```css

```

##### 54. ★★ a点击出现框，解决方法。

```css

```

##### 55. ★★ 如果我不输入<!DOCTYPE HTML>，HTML5能工作吗？

```css

```

##### 56. ★★ 哪些浏览器支持HTML5？

```css

```

##### 57. ★★★ CSS3中的选择器都有什么？

```css

```

##### 58. ★★ CSS3中多列布局的用处是什么？

```css

```

##### 59. ★★★ 本地存储有生命周期吗？

```css

```

##### 60. ★★ 本地存储和Cookies之间的区别是什么？

```css

```

##### 61. ★★ WebSQL是什么？WebSQL是HTML5规范的一部分吗？

```css

```

##### 62. ★ XHTML与HTML的有何异同？

```css

```

##### 63. ★★ 介绍一下CSS的盒子模型？弹性盒子模型是什么？

```css

```

##### 64. ★★ Doctype的作用？标准模式与兼容模式各有什么区别？

```css

```

##### 65. ★★ 介绍一下你对浏览器内核的理解？常见的浏览器内核有哪些？

```css

```

##### 66. ★★ 前端页面有哪三层构成？ 分别是什么？ 作用是什么？

```css

```

##### 67. ★★★ CSS选择符有哪些？优先级算法如何计算？

```css

```

##### 68. ★★★ iframe的优缺点？

```css

```

##### 69. ★★★★ 重排（reflow）与重绘（repaint）

```css

```

##### 70. ★★ 手写实现一个麻将三桶的布局。

```css

```

##### 71. ★★★★ BFC 是什么东西

```css

```

##### 72. ★★★★ flex布局有哪些属性

```css

```

##### 73. ★★ 列举你所知道的伪类和伪元素。伪类和伪元素有什么区别？

```css

```

##### 74. ★★ rem布局的本质。

```css

```

##### 75. ★ div+css的布局比较table布局有什么有点？

```css

```

##### 76. ★★★★ 单行或者多行文本溢出展示省略号的实现方法。

```css

```

##### 77. ★ display:none和visbility:hidden的区别是什么啊？

```css

```

##### 78. ★★ 浮动元素引起的问题和解决方法？

```css

```

##### 79. ★★ 可以有哪些方法清除浮动？

```css

```

##### 80. ★★ `pointer-events: none` 是干什么的？

```css

```

`pointer-events: none;` 表示元素不会对 `mouse/touch` 相关事件作出响应。

> 详细参考：https://segmentfault.com/a/1190000023070286

##### 81. ★★★★★ 移动端通用的1px边框的实现原理？

**一、产生原因：**

为什么会产生这个问题呢？主要是跟一个东西有关，DPR(devicePixelRatio) 设备像素比，它是默认缩放为100%的情况下，设备像素和CSS像素的比值。

```txt
window.devicePixelRatio = 物理像素 /CSS像素
```

目前主流的屏幕DPR=2 （iPhone 8）, 或者3（iPhone 8 Plus）。拿2倍屏来说，设备的物理像素要实现1像素，而DPR=2，所以css 像素只能是 0.5。一般设计稿是按照750来设计的，它上面的1px是以750来参照的，而我们写css样式是以设备375为参照的，所以我们应该写的0.5px就好了啊！ 试过了就知道，iOS 8+系统支持，安卓系统不支持。

**二、解决方案：**

- WWDC对iOS统给出的方案
- 使用边框图片
- 使用box-shadow实现
- 使用伪元素（推荐）
- 设置viewport的scale值

**三、使用伪元素方案代码：**

1、stylus

```css
.border
  width 1rem
  height 1rem
  margin .2rem
  position relative
  &::after
    content ''
    position absolute
    z-index 999
    left 0
    right 0
    bottom 0
    top 0
    border solid 1px #f00
    @media (-webkit-max-device-pixel-ratio: 1.49)
      transform scale(1)
      width 100%
      height 100%

    @media (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49)
      transform scale(0.5)
      width 200%
      height 200%

    @media (-webkit-min-device-pixel-ratio: 2.5)
      transform scale(0.3333333)
      width 300%
      height 300%

    transform-origin 0 0
```

2、sass

```css
@mixin border($border-width: 1px, $border-color: map-get($base, border-color), $border-style: solid, $radius: null) {
    // 为边框位置提供定位参考
    position: relative;
    @if $border-width == null {
        $border-width: 0;
    }
    border-radius: $radius;
    &::after {
        // 用以解决边框layer遮盖内容
        pointer-events: none;
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
        // fix当元素宽度出现小数时，边框可能显示不全的问题
        // overflow: hidden;
        content: "\0020";
        border-color: $border-color;
        border-style: $border-style;
        border-width: $border-width;
        // 适配dpr进行缩放
        @media (-webkit-max-device-pixel-ratio: 1.49) {
            width: 100%;
            height: 100%;
            @if $radius != null {
                border-radius: $radius;
            }
        }
        @media (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49) {
            width: 200%;
            height: 200%;
            transform: scale(.5);
            @if $radius != null {
                border-radius: $radius * 2;
            }
        }
        (-webkit-min-device-pixel-ratio: 2.5) {
            width: 300%;
            height: 300%;
            transform: scale(.3333333);
            @if $radius != null {
                border-radius: $radius * 3;
            }
        }
        @include transform-origin(0 0);
    }
}
```

> 详细参考：https://juejin.cn/post/6844903877947424782

##### 82. ★★★ 如何应用CSS获得当前设备的DPR？

##### 83. ★★★★ 如何在页面上添加 iconfont？在样式如何添加字体文本？

```css
li::before
  height 1rem
  content: "\e60d"
```

##### 84. ★★ 如何设置10px的字体大小？

```css
b
  font-size .12rem
  font-weight 400
  transform scale(0.8)
```

##### 85. ★★★★ 如何实现多行文本溢出隐藏？

```css
  ellipsis($width = 0, $line-clamp = 1)
  width $width
  display -webkit-box
  -webkit-line-clamp $line-clamp
  -webkit-box-orient vertical
  overflow hidden
```

##### 86. ★★★★ 如何实现横向容器自动伸展？

```css
width max-content
```

##### 87. ★★★★★ $nextTick 的使用场景？

- Better-Scroll

##### 88. ★★★ Better-Scroll 滚动条件？

- 容器的高度（宽度）要小于内容的高度（宽度）
- 容器的子元素要唯一
- new BScroll()时候，要有内容，如在Vue中，使用$nextTick()

##### 89. ★★★★ position:sticky 用过没，有啥效果？

[使用 position:sticky 实现粘性布局](https://www.cnblogs.com/coco1s/p/6402723.html)

##### 90. ★★★★ flex:1 的完整写法是？分别是什么意思？

[flex:1 到底代表什么?](https://zhuanlan.zhihu.com/p/136223806)

##### 91. ★★★★ 说说你对GPU的理解，举例说明哪些元素能触发GPU硬件加速？

- GPU: 图形处理器,用于处理图形有关的任务,用于渲染页面
- 在css中使用 transform: translateZ(0), opacity, filter 可以开启GPU硬件加速。

##### 92. ★★★★ 纯 CSS 方式实现 CSS 动画的暂停与播放

[纯 CSS 方式实现 CSS 动画的暂停与播放](https://www.cnblogs.com/libin-1/p/6645569.html)

##### 93. ★★★★ 使用CSS3动画代替JS动画的好处

[为什么要用css动画替换js动画?](https://www.cnblogs.com/xiaonian8/p/13834656.html)

##### 94. ★★★ 简述一下Sass，Less，请说明区别？

[Sass和Less的比较](https://www.cnblogs.com/pink-chen/p/10727915.html)