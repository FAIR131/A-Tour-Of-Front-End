/*
    我要调用的时别人家的API
    http://m.douban.com/rexxar/api/v2/movie/recommend?refresh=0&start=0&count=20

    cnpm install js-base64
*/
// const express = require("express");
const request = require("request");
const express = require("express");
const base64 = require("js-base64")

const app = new express();


app.get("/getmv", (req, res) => {
    //代理
    res.setHeader("Access-Control-Allow-Origin", "*");
    let url = base64.decode(req.query.url);
    // console.log(base64.decode(req.query.url));
    // console.log(req.query.url);
    request({
        url : url,
        method : "GET",
        json : true,
        headers : {
            "Referer":"https://movie.douban.com/explore",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
            "Cookie":`ll="118172"; bid=a5PaUCtQ-74; __utma=30149280.1862114967.1665455840.1665455840.1665542735.2; __utmz=30149280.1665542735.2.2.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmb=30149280.5.10.1665542735; __utmc=30149280; __utmt=1; ap_v=0,6.0; gr_user_id=e277a720-6e03-45f5-820d-260673028e10; gr_session_id_22c937bbd8ebd703f2d8e9445f7dfd03=83a36a06-9961-4148-8308-5bcd17f41871; gr_session_id_22c937bbd8ebd703f2d8e9445f7dfd03_83a36a06-9961-4148-8308-5bcd17f41871=true; gr_cs1_83a36a06-9961-4148-8308-5bcd17f41871=user_id%3A0; __utmt_douban=1; _ga_RXNMP372GL=GS1.1.1665542936.1.0.1665542939.57.0.0; _ga=GA1.1.1862114967.1665455840; __gads=ID=185b6989643219ff-22239875f6d6002d:T=1665542936:RT=1665542936:S=ALNI_MYPmqAjKGtB76So-oV9LQh0vMWxyw; __gpi=UID=000008830555183d:T=1665542936:RT=1665542936:S=ALNI_MbO2rtyG_eWU637moTAI_Wb9ekUZQ`
        }
    },function(error,response,body){
        if(error) throw error

        res.json(body.items);
    })


})


app.listen(80, () => {
    console.log(".......")
})


