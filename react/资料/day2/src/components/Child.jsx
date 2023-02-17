import React, { Component } from 'react';

class Child extends Component {

    constructor(){
        super();
        console.log("Child构造函数执行了");
    }

    render() {
        console.log("我是child中的render,我执行了");
        return (
            <div>
                我是孩子:{this.props.money}
            </div>
        );
    }
    componentDidMount(){
        console.log("子组件的componentDidMount执行了");
    }

    // UNSAFE_componentWillReceiveProps(props){
    //     // 页面更新之前执行,所以实例中的props还是老值,但是此函数的参数已经接收到了最新值
    //     console.log(this.props);
    //     console.log(props);
    //     console.log("UNSAFE_componentWillReceiveProps执行了");
    // }

    shouldComponentUpdate(props,state){
        if(JSON.stringify(props)===JSON.stringify(this.props)){
            return false;
        }else{
            return true;
        }
    }

    componentWillUnmount(){
        console.log("页面被卸载了");
    }
}

export default Child;