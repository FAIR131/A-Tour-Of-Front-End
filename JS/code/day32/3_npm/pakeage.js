/*
* 使用npm
* 1.创建好项目
* 2.打开终端
* 3.调整终端路径到当前目录
* 4_express脚手架.npm init -y
*      - 会生成package.json
*      - 作用是记录当前项目的描述
*          - 使用哪些第三方包
* 5.安装第一个包
*     - npm install lodash --save
*     - npm i lodash
*      -第一次安装会多两个文件
*           -package-lock.json
*           -node_module  模块包
*     - npm i nodemon -g
*       - -g是全局安装，不会安装到node_modules
*       - package.json中也不会记录
* 开发环境
*       编写代码-测试
*  生产环境
*       测试完成->给用户使用
* 6.删除包
*   - npm remove lodash
*0.安装记录
*   - npm i
*   - 自动把 package.json 当中的依赖包全部安装下来（相同的版本号安装）
* */