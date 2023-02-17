/*
    http协议 : 
        - 请求报文
        - 响应报文

    http状态码:
        1  指定用户相应动作
        2  成功的请求 200
        3  路径转移   304(使用缓存)
        4  客户端错误
        5  服务端错误

    url  :
        - http                 协议
        - www                  二级域名
        - baidu.com            一级域名
        - ?wd=xxx&s=xxx        查询字符串
        - #top                 hash

    form :
        - method="get"   enctype="text/plain"
        - method="post"  enctype="application/x-www-form-urlencoded"
        - method="post"  enctype="multipart/form-data"  84ee12211111

    get  :
        - url传参,相对不安全
        - 容量:2k 4k 8k ,长度 65535
        - 不可以上传文件
        - 可以产生缓存
        - 访问网页用get

    post : 
        - 请求体body传参
        - 没有容量的上限
        - 可以上传文件
        - 不能产生缓存
        - 提交数据用post

*/