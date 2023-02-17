const http = require("http")
const https = require("https")
const url = require("url")
const cheerio = require('cheerio')

http.createServer((req, res) => {
    var urlobj = url.parse(req.url, true)
    // console.log(urlobj.query.callback)

    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8",
        //cors头，
        "access-control-allow-origin": "*"
    })

    switch (urlobj.pathname) {
        case "/api/aaa":
            //客户端，去要数据
            httpget((data) => {
                res.end(spider(data))
            })
            break;
        default :
            res.end("404")
    }
}).listen(3000)

function httpget(cb) {
    let data = ''
    https.get(`https://i.maoyan.com/`, (res) => {
        res.on('data', (chunk) => {
            data += chunk
        })

        res.on('end', () => {
            console.log(data)
            cb(data)
            // response.end(data)
        })
    })
}

function spider(data) {

    //npm i cheerio  解析html
    let $ = cheerio.load(data)

    let $movielist = $('.column.content')
    // console.log($movielist)
    let movie = [];
    $movielist.each((index, value) => {
        movie.push({
            title: $(value).find('.title').text(),
            grade: $(value).find('.grade').text()
        })

    })
    console.log(movie)
    return JSON.stringify(movie)
}