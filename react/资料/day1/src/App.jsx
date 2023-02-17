import './App.css'
import FnComp from './components/FnComp'
import ClzComp from './components/ClzComp'
function App() {
  // jsx语法可以将html标签当成js变量使用

  const elemet = <h1 style={{ background: "blue", fontSize: "40px" }}>我是标题</h1>

  let title = "xixi"

  let fruits = [
    { name: "苹果", key: "apple" },
    { name: "橘子", key: "orange" },
    { name: "香蕉", key: "banana" }
  ]

  // let list=[
  //   <li key="1">哈哈</li>,
  //   <li key="2">呵呵</li>,
  // ]

  // let list=[]

  // fruits.forEach(item=>{
  //   list.push(<li key={item.key}>{item.name}</li>)
  // })

  var arr = [1, 3, 5, 7, 9]
  var obj = { username: "zhangsan", age: 20 }


  return (
    <div className="App">
      {/* {elemet} */}

      {/* 模板语法的使用 */}
      {/* <hr/>
      {1+1} */}

      {/* <p title={title}>这是一段文本</p> */}

      {/* <ul>
        {
          fruits.map((item,index)=>{
            return <li key={item.key} className={index===1?'big':''}>{item.name}</li>
          })
          // list
        }
      </ul> */}

      {/* <label htmlFor="username">用户名</label><input id="username"></input> */}

      <FnComp house="茅屋" getHouse={(params)=>{
        console.log("子组件传过来的房子:"+params);
      }}></FnComp>

      {/* 组件传值:
          1、父传子通过自定义属性并赋值
          2、子传父通过给自定义属性赋值一个函数,子组件中执行这个函数
      */}
      <ClzComp money={100} getMoney={function (params) {
        console.log("子组件传过来的值:" + params);
      }}></ClzComp>

    </div>
  );
}

export default App;