import React, { Component,createRef } from 'react';
import { findDOMNode,unmountComponentAtNode } from 'react-dom'
import SON from './SON';
class Refs_DOM extends Component {
    
    mySON=createRef();

    render() {
        // let mySON=createRef();
        return (
            <div>
                {/* 
                // 字符串写法
                <p ref="myPNode">今天出太阳了</p>
                 */}

                 {/* 函数写法 */}
                <p ref={(node)=>{
                    console.log(node);
                }}>今天出太阳了</p>

                <hr />
                {/* <SON ref="mySON"></SON> */}

                {/* <SON ref={(node)=>{
                    console.log(node);
                }}></SON> */}

                {/* 新用法 */}
                <SON ref={this.mySON}></SON>
                <hr />
                <button onClick={()=>{
                    // findDOMNode接收一个组件实例,返回该组件的dom元素,进而进行dom操作,不推荐使用
                    let elements=findDOMNode(this);

                    // console.log(elements);
                    // elements.style.background="red";

                    // unmountComponentAtNode(document.getElementById("root")) //新版已废弃

                    // console.log(this.refs.myPNode);
                    // console.log(this.refs.mySON);

                    console.log(this.mySON.current);
                }}>获取dom</button>
            </div>
        );
    }
}

export default Refs_DOM;