// 虚拟dom
var vd = {
    tagName: "div",
    key:"1-1",
    props: { 
        class: "redText", 
        id: "app", 
        style: { fontSize: "30px", background: "black" } 
    },
    children: [
        "今天杭州下雨了",
        {
            tagName: "p",
            key:"1-1-1",
            props: { style: { color: "blue", background: "green" } },
            children: [
                "我是P标签",
                {
                    tagName: "span",
                    children: ["你好"],
                    key:"1-1-1-1"
                }
            ]
        },
        {
            tagName:"ul",
            props:{},
            key:"1-1-2",
            children:[
                {tagName:"li",children:["苹果"],key:"1-1-2-1"},
                {tagName:"li",children:["橘子"],key:"1-1-2-2"},
                {tagName:"li",children:["香蕉"],key:"1-1-2-3"}
            ]
        }
    ]
}

document.body.replaceChild(createDom(vd), document.getElementById("app"))

var newVd = {
    tagName: "div",
    key:"1-1",
    props: { 
        class: "yellowText", 
        id: "app", 
        style: { fontSize: "30px", background: "black" } 
    },
    children: [
        "今天杭州下雨了,好冷,没衣服穿了",
        {
            tagName: "p",
            key:"1-1-1",
            props: { style: { color: "blue", background: "green" } },
            children: [
                "我是P标签的新版",
                {
                    tagName: "span",
                    children: ["你好呀"],
                    key:"1-1-1-1"
                }
            ]
        },
        {
            tagName:"ul",
            props:{},
            key:"1-1-2",
            children:[
                {tagName:"li",children:["苹果"],key:"1-1-2-1"},
                {tagName:"li",children:["橘子"],key:"1-1-2-2"},
                {tagName:"li",children:["香蕉"],key:"1-1-2-3"},
                {tagName:"li",children:["菠萝"],key:"1-1-2-4"}
            ]
        }
    ]
}


// 比较新老虚拟dom的不同,找出页面变化
/**
 * patchs={
 *  "1-1":{type:"ATTR",name:"class",value:"yellowText"}
 * }
 */

// 调用diff算法,获得补丁包
 var patches=diff(vd,newVd);
console.log(patches);
// 将补丁包打到页面上
doPatchs(patches)