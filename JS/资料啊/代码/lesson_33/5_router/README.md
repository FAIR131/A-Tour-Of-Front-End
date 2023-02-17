1.初始化npm
npm init -y

2.安装全局的express脚手架
npm i express-generator -g

3.自动生成框架
express --view=ejs 

4.安装依赖包
npm i

5.开启服务器
npm start

6.express结构

```
|project
|----.git    		(本地代码仓库)
|----.gitignore  	(哪些文件不提交到云平台 node_modules .git public/images)
|----package.json  
|----README.md      (写的是项目的环保部署方案)
|----app.js         (注册主文件)
|----bin/
	---- www        (监听服务的,端口再当前位置设置)
|----public/		(前端静态资源,如果是前后端分离的话,public没有作用)
	----images      (存储图片的)
	----javascripts
	----stylesheets
|>----views/        	(存放模板,如果是前后端分离的话,views没有作用)
|>----routers/       (存放路由的)
|----node_modules/  (第三方模块的存储目录)
|----middlewares/   (中间件)
|>----models/        (数据对接sql)
|----utils/         (工具栏目,mysql连接,邮件发送,手机短信)

//M(model 数据模型) V(views 模板) C( contrl 控制器)

						控制器
					 /           \
				 数据模型         模板
```