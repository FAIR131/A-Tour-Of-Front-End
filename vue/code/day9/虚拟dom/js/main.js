/*let pNode = document.querySelector('p')
console.dir(pNode);*/


let vd = {
    tagName:'div',
    props:{class:'redText',id:'app',style:{fontSize:'30px',backgroundColor:'pink'}},
    children:[
        '今天杭州下雨了',
        {
            tagName:'p',
            props:{style: {color:'blue',backgroundColor:'skyblue'}},
            children:[
                '我是p标签',
                {
                    tagName:'p',
                    props:{style: {color:'orange',backgroundColor:'yellow'}},
                    children:['你好']
                }
            ]
        }
    ]
}


onload=function(){
    document.body.replaceChild(createDom(vd),document.getElementById('app'))
//    （新，旧）
}
