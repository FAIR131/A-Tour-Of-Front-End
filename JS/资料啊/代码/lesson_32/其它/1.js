const http = require('http')
const fork = require('child_process').fork


const server = http.createServer((req, res) => {
    //req--->request--->请求对象
    //req.url ----> http://www.baidu.com/get-sum---->/get-sum
    if (req.url === "/get-sum") {
        console.log('主进程id', process.pid);
        // 开启子进程
        const computedProcess = fork('./computed.js')
        computedProcess.send('开始计算')
        computedProcess.on('message', data => {
            console.log('主进程收到的信息', data);
            res.end('sum is ' + data)
        })
        computedProcess.on('close', () => {
            console.log('子进程因报错而退出')
            computedProcess.kill()
            res.end('error')
        })
    }
})
server.listen(3000, () => {
    console.log('http://localhost:3000');
})
