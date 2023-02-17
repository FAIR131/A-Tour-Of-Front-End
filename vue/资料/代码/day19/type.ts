// 数字类型
var num:number;
num=3.14;
console.log(num);

// 类型推断
var num2=0;

var str:string;
str="i'm string"

var str2="";

var bool:boolean;
bool=false

var bool2=false;
bool2=true;

var udf:undefined;
udf=undefined;

var nl:null;
nl=null;

// 联合类型
var abc:string|number|boolean;
abc=true;
abc="haha"
abc=123;

// 隐式类型推断
// let currentUser=sessionStorage.getItem("currentUser");
// currentUser&&JSON.parse(currentUser);

// 任意类型
var def:any;
def=123;
def=false;
def="haha";
// def=undefined;

var def2:unknown;
def2=123;
def2=false;
def2="hehe";
def2=undefined;

var def3:string;
def3="xixi";
// def3=def2;
def3=def;
console.log(def3);

// any类型的数据可以赋值给其他类型的变量,unknow不可以


// 数组类型
var arr:Array<number>=[];
arr.push(123);

var arr2:number[]=[];
arr2.push(456)

var arr3:Array<number|string|boolean>=[];
arr3.push(123);
arr3.push("xixi");
arr3.push(false);

var arr4:(number|string|boolean)[]=[];
arr4.push(123);
arr4.push("xixi");
arr4.push(false);

// 元组是一种特殊的数组
var arr5:[number,string]=[123,"xixi"];
console.log(arr5);

// 对象类型(interface和type都可以声明对象类型,interface可以继承)
interface objType{
    username:string,
    age:number,
    location?:string,//可选属性
    [propname:string]:any//扩展属性
}

var obj:objType={username:"zhangsan",age:20,class:11};
obj.username="lisi";
obj.location="杭州";
obj.address="旺田"
obj.score=100;

type objType2={
    nickName:string,
    avatar?:string,
    money:number
}

var obj2:objType2={nickName:"小李",money:100}

interface objType3 extends objType{
    phone:string
}

var obj3:objType3={username:"wangermazi",age:30,phone:"13838385438"};

// 枚举类型
enum Color{
    Red=5,
    Green=6,
    Blue=7
}
// console.log(Color.Green);
console.log(Color[5]);

// 函数类型
// 函数的参数必须声明类型
// function fn(x:number,y?:number){
//     let res=y?x+y:x;
//     console.log(res);
    
// }
// fn(1,100)

// 函数的参数声明类型后,对外部的调用和函数内部的操作都有类型检查
// function fn2(x:number,y:string){
//     console.log(x+y);    
// }
// fn2(123,"123")

// 函数的返回值声明在函数参数的小括号之后
// 函数的返回值类型是void即可有返回值也可没有
// let fn3:(x:number,y:string)=>void=function(x:number,y:string){
//     return ""
// }

// 函数的返回值是never类型
// let fn4:()=>never=function():never{
//     // throw Error();
//     while(true){}
// }

// 泛型(定义式不确定类型,调用时确定,用于约束多个数据类型要一致)
// function fn5<T>(x:T,y:number){
//     let abc:T=x;
//     return `${x}${y}${abc}`;
// }
// // console.log(fn5(1,2));
// console.log(fn5("haha",2));

// 可选参数往后写
// function fn6(x:string,y?:string){
//     return x+y;
// }
// fn6("haha")

interface aniType{
    mouth:string,
    leg?:string,
    [prop:string]:any
}

class Animal{
    constructor(ani:aniType){
        this.mouth=ani.mouth;
        // 手动类型推断
        this.leg=ani.leg as string;
    }
    mouth:string;
    leg:string;
}

var dog=new Animal({mouth:"狗嘴"});
// console.log(dog);


class Dog extends Animal{
    constructor(ani:aniType){
        super(ani);
        this.run=ani.run;
    }
    run:()=>void;
}

var wangcai=new Dog({mouth:"旺财的嘴",run:()=>{console.log("奔跑吧！狗子");}});

// console.log(wangcai);
wangcai.run()
