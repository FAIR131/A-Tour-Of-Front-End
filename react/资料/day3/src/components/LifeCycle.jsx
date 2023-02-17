import React, { Component } from 'react';
import Child from './Child';
class LifeCycle extends Component {

    state={
        num:10,
        doubleMoney:0,
        money:10,
        flag:true
    }

    constructor(props){
        // super方法调用之前,组件实例没有创建,所以没有this,但是父组件传过来的自定义属性已经接收了
        // console.log(props);
        super()
        // 第一个生命周期
        // console.log(this);
        
    }

    UNSAFE_componentWillMount(){//页面挂载之前调用,执行一次
        // console.log(document.getElementById("root").innerHTML);
        // setTimeout(()=>{
        //     this.setState({
        //         num:++this.state.num
        //     })
        // },1000)

        // this.setState({
        //     doubleMoney:this.props.money*2
        // })
    }

    // static UNSAFE_getDerivedStateFromProps(){//已废弃
    //     console.log("getDerivedStateFromProps 执行了");
    // }
    
    render() {
        // render函数在首次页面渲染和以后每次数据更新时都会执行

        console.log("render函数执行了");

        return (
            <div>
                生命周期
                num:{this.state.num},
                doubleMoney:{this.state.doubleMoney},
                money:{this.state.money}
                {/**
                 * 1、组件创建时,先创建父组件,再创建子组件,子组件创建实例之前,就已经拿到了父组件传过来的数据
                 * 2、props数据也是状态数据,当它的值更新时,也会触发子组件重新渲染
                 */}
                <button onClick={()=>{
                    this.setState({
                        money:this.state.money
                    })
                }}>改money</button>

                <button onClick={()=>{
                    this.setState({
                        num:this.state.num+1
                    })
                }}>改num</button>

                <button onClick={()=>{
                    this.setState({
                        flag:!this.state.flag
                    })
                }}>修改flag</button>
                <hr />
                {this.state.flag&&<Child money={this.state.money}></Child>}
            </div>
        );
    }

    componentDidMount(){
        // 组件创建时、渲染时都是先父组件执行后子组件执行
        // 组件挂载时先子组件挂载,后父组件挂载
        // componentDidMount生命周期在组件挂载完后执行,此时页面已经更新,执行一次
        // 一般在此处发送网络请求,开启定时器,更新数据等
        console.log("componentDidMount执行了");
        // console.log(document.getElementById("root").innerHTML);
    }

    // 更新期的生命周期

    // UNSAFE_componentWillReceiveProps(){
    //     console.log("UNSAFE_componentWillReceiveProps执行了");
    // }

    // shouldComponentUpdate(props,state){
    //     if(state.num===this.state.num){
    //         return false;
    //     }else{
    //         return true;
    //     }
    // }

    // UNSAFE_componentWillUpdate(props,state){//页面更新之前执行,参数拿到的是新值,页面上是老值
    //     console.log(state);
    //     console.log(this.state);
    //     console.log(document.getElementById("root").innerHTML);//拿到的是页面更新之前的内容
    // }


    // componentDidUpdate(props,state){//页面更新之后执行,参数拿到的是老值,页面上是新值
    //     console.log(state);
    //     console.log(this.state);
    //     // console.log(document.getElementById("root").innerHTML);//拿到的是页面更新之后的内容
    // }

    
}

export default LifeCycle;