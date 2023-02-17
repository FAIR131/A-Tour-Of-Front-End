/*
    框架
    前置中间件(函数,预先运行函数,必须要比API先运行) 钩子函数
    路由 - API
    后置中间件(必须要比API晚运行)
*/

let valiaddr = function (req,res,next){
    console.log(req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '')
    //下一步
    next();
}
// console.log(">>>>>>",valiaddr)


module.exports = valiaddr;