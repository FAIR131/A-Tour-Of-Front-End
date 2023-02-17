import './App.css';
import FnComp from "./components/FnComp";
import ClzComp from "./components/ClzComp";
import Event from "./components/Event";
import Props from "./components/Props";
import LifeCycle from "./components/LifeCycle";
import Refs_DOM from "./components/Refs_DOM";
import ControlComp from "./components/ControlComp";
import Kangxi from "./components/Kangxi";
import LiYuan from "./components/LiYuan";
import HighOrder from "./components/HighOrder";

function App() {
    //jsx可以将html标签当成js变量使用
    /* const element = <h1 style={{background:'pink'}}>我是标题</h1>

     let title='xixi'

     let fruits=[
       {name:'苹果',key:'apple'},
       {name:'橘子',key:'orange'},
       {name:'香蕉',key:'banana'},
     ]*/

    var arr=[1,3,5,7,9]
    var obj={username:'zs',age:20}

    return (
        <div className="App">
            {/*  {element}

      模板语法的使用
      <hr/>
      {1+1}

      <p title={title}>这是一段文字</p>

      <ul>
        {
        fruits.map((item,index)=>{
          return <li key={item.key} className={index===1?'big':''}>{item.name}</li>
        })
        }
      </ul>

      {/* 组件传值:
          1、父传子通过自定义属性并赋值
          2、子传父通过给自定义属性赋值一个函数,子组件中执行这个函数
      */}
        {/*<label htmlFor="username">用户名</label> <input type="text" id='username'/>*!/*/}
       {/*     <FnComp house='茅屋' getHouse={(params)=>{
                console.log('子组件传过来的值：'+params)
            }}></FnComp>*/}
            {/*<ClzComp money={100} getMoney={function (params){*/}
            {/*    console.log('子组件传过来的值:'+params)*/}
            {/*}}></ClzComp>*/}

            {/*<Event></Event>*/}
          {/*  <Props xixi={<span>嘻嘻</span>} hehe={<div>嘿嘿</div>}>
                <p>哈哈</p>
                {arr}
                {obj}
            </Props>*/}

            {/*<LifeCycle house={'valley'}></LifeCycle>*/}
            {/*<Refs_DOM></Refs_DOM>*/}


            {/*<ControlComp></ControlComp>*/}

            {/*<Kangxi></Kangxi>*/}

            {/*<LiYuan></LiYuan>*/}

            <HighOrder></HighOrder>
        </div>
    )
}

export default App;
