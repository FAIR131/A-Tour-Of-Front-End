//一定要有commonjs规范
const http = require('http')

//创建服务器
http.createServer((req, res)=>{
//  res  接受浏览器传的参数，res 返回渲染内容
   /* res.write('hello word11');
    res.write('hello word22');
    */
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.write(`
    <html> 
    <div>aaa</div>
         <b>我是加粗的</b>
    </html>
    `)
    res.end()
    // res.end('[1,2,3]')//表示结束了，不然会超时

}).listen(3000,()=>{
    console.log('start')
})



