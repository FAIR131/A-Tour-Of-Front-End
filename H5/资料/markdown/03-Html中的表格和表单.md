# HTML 中的表格和表单

## HTML 中的表格

### 创建一个表格

	<table border="" cellspacing="" cellpadding="" width="" height="">
		<tr>
			<td>Data</td>
		</tr>
		
		<tr>
			<td>Data</td>
		</tr>
	</table>
	
	表格由 <table> 标签来定义。
	每个表格均有若干行（由 <tr> 标签定义）
	每行被分割为若干单元格（由 <td> 标签定义）
	字母 td 指表格数据（table data），即数据单元格的内容
	
	数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等
	
	table 的属性值
		border : 设置表格最外部的框框
		bordercolor : 设置框框的颜色
		width : 设置表格整体的宽度
		height : 设置表格整体的高度
		cellspacing : 单元格外边距
		cellpadding : 单元格内边距
	
	tr 的属性值
		height : 单元格的高度
		align: 单元格内容的水平对齐方向 left左/right右/center居中 
		valign: 单元格内容的垂直对齐方式  top上/bottom下/middle居中
		
	td 的属性值
		width : 单元格的宽度,一般不去设置，会有新的问题出现
		height : 单元格的高度
		align : 单元格内容的水平对齐方向 left左/right右/center居中 
		valign : 单元格内容的垂直对齐方向 top 上/bottom下/middle居中 
		colspan : 向右合并单元格(跨列合并)
		rowspan : 向下合并单元格(跨行合并)
	
	特殊的标签
		<caption>标题内容</caption>
	
		表格行分组
		<thead></thead>      表头
		<tbody></tbody>      表体必需存在的标签
		<tfoot></tfoot>      表尾
		表格列分组
		<colgroup></colgroup>
	说明：一个Table中，只能包含一个thead,一个tfoot
	但可包含多个tbody,tbody标签是写表格时必备的标签
	
	可以设置的css属性
		table {
			border-collapse: collapse;  // 变成单线表格
	
			caption-side: bottom; // 设置标题的位置
	
			table-layout; fixed; // 设置单元格的内容
	 
		}


## HTML 中的表单

### 表单是什么

	对于用户而言是数据的录入和提交的界面
	对于网站而言获取用户信息的途径

### 创建一个表单

	<form action="" method="" name="">
	
	</form>
	
	action: 定义表单最终提交的地址
	method:	设定数据提交方式，用于根据不同的数据需求来选择合适的提交方式 xxx
		常见的提交方式有：GET,POST 
		GET 和 POST 的区别？
	name: 给表单一个名字，使其成为独一无二的表单 xxx

### 常用的表单元素

	<input type="" value="" name=""/>
	
	type : 类型 默认是 text 文本框 / password 密码框
			/ button 常规按钮 / submit 提交按钮 / reset 重置按钮
			
	value : 值
	placeholder : 提示文本
	
	文本输入框
	<input type="text" value="默认值" placeholder="请输入用户名" />
	密码输入框
	<input type="password" placeholder="请输入密码" />
	提交按钮
	<input type="submit" value="按钮内容" />
	重置按钮
	<input type="reset" value="按钮内容" />
	
	单选框
	<input type="radio" name="ral" value="radiovalue"/>
	<input type="radio" name="ral" checked="checked" />
	
	复选框
	<input type="checkbox" name="like" value="checkboxvalue" />
	
	单选按钮、复选按钮里的name属性必须写，同一组单选、复选按钮的name属性值必须一样
	checked="checked"表示默认被选中，可简写成checked
	disabled="disabled"表示禁用，可简写成disabled
	enabled:可用状态
	
	多行文本框（文本域）
	<textarea name="textareal" cols="字符宽度" rows="行数"></textarea>
	下拉菜单
	<select name="">
		<option name="" value="表单被提交时被发送到服务器的值" selected="selected">菜单内容</option>
	</select>
	
	上传文件框
	文件域：<input type="file" />
	上传图片框
	<input type="image" src="" width="100" height="100" alt="上传图片" />
	
	表单字段集
	<fieldset></fieldset>于对表单中的元素进行分组,可以嵌套
	功能：相当于一个方框，在字段集中可以包含文本和其他元素。该元素用于对表单中的元素进行分组并在文档中区别标出文本。fieldset元素可以嵌套，在其内部可以在设置多个fieldset对象
	
	字段级标题
	<legend></legend>
	功能：legend元素可以在fieldset对象绘制的方框内插入一个标题
	legend元素必须是fieldset内的第一个元素


	这表单长得也太丑了吧，怎么能让它变的好看一点呢？（师生互动）
	
	设计，加点样式..........