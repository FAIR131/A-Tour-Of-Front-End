//一定要有commonjs规范
const http = require('http')
const url = require('url')
const  moduleRenderHTML = require('./module/renderHTML.js')
const  moduleRenderStatus = require('./module/renderStatus.js')

//创建服务器
http.createServer((req, res) => {
//  res  接受浏览器传的参数，res 返回渲染内容
    /* res.write('hello word11');
     res.write('hello word22');
     */

    if(req.url==='/favicon.ico'){
        return
    }
    // console.log(url.parse(req.url).pathname)
    let urlobj = url.parse(req.url,true);
    console.log(urlobj.query)
    let pathname = url.parse(req.url).pathname;
    res.writeHead(moduleRenderStatus.renderStatus(pathname), {'Content-Type': 'text/html;charset=utf-8'})
    res.write(moduleRenderHTML.renderHTML(pathname));
    res.end()
    // res.end('[1,2,3]')//表示结束了，不然会超时

}).listen(3000, () => {
    console.log('start')
})






