/*
    模块化
        - 模块 : js文件
        - 包  : 文件夹(包含模块)

    包管理工具
        - npm : Node Package Manager
        - web js框架也会使用npm
        - 下载第三方的模块(别人写的)

    AppStore        
    GooglePlay    
    npm      js的应用商店
*/

/*
    使用npm
    1.创建好项目(包)
    2.打开终端
    3.调整终端路径,到当前项目
    4.npm init -y
        - 会生成 package.json
        - 作用是记录当前项目的描述
            - 使用哪些第三方包

    5.安装第一次包
        - npm install lodash
        - npm i lodash
        - 第一次安装会多两组文件
            - package-lock.json
            - node_modules 模块包
        - npm i nodemon -g
            - -g是全局安装 , 不会安装到node_modules中
            - package.json当中也不会记录
            - 安装的安装目录下 :  C:\APP\nodejs\node_modules
    6.删除包
        - npm remove lodash
    7.显示安装郭的包
        - npm list     显示当前目录安装过哪些包
        - npm list -g  显示全局目录安装过哪些包
   
    0.安装记录
        - npm i
        - 自动把package.json 当中的依赖包全部安装下来(根据相同的版本号安装)
    
    开发环境 :
        编写代码-测试
    生成环境 :
        测试完成--->给用户使用
*/