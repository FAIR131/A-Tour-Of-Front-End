
let querystring = require('querystring')
let str = `name = a&agr=18&sex =male`
let obj = querystring.parse(str);
console.log(obj)

var myobj = {
    a:1,
    b:2,
    c:3
}

var mystr = querystring.stringify(myobj)
console.log(mystr)


var str1 = 'id=3&city=北京&url=https://www.baidu.com'
var escaped = querystring.escape(str)
console.log(escaped)

var str2 = 'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com'
var unescaped = querystring.unescape(str2)
console.log(unescaped)