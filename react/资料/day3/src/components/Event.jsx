import React, { Component } from 'react';

class Event extends Component {

    state={
        num:10
    }

    render() {
        
        let fn=(e,params)=>{
            // console.log(e);
            // 此处要注意this指向,如果是普通函数,则其有封闭作用域,不能访问到组件实例,要改成箭头函数
            // console.log(this.state.num);
            console.log(e.currentTarget);
        }

        // let fn2=function(e){
        //     console.log(e);
        // }
        return (
            <div>
                <button onClick={(e)=>{
                    // 事件传参
                    fn(e,123)
                }}>按钮</button>

                {/* <button onClick={fn2.bind(this)}>按钮</button> */}
                <p style={{width:"200px",height:"200px",background:"black"}} onTouchStart={()=>{
                    console.log(123);
                }}>测试</p>
            </div>
        );
    }
}

export default Event;