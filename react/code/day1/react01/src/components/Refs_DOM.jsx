import React, {Component, createRef} from 'react';
import {findDOMNode,unmountComponentAtNode} from "react-dom";
import Son from "./Son";

class RefsDom extends Component {
    mySon=createRef()
    render() {
// let mySon=createRef()
        return (
            <div>
          {/*      字符串写法
                <p ref='myPNode'>今天出太阳了</p>
                <Son ref='mySon'></Son>*/}

                {/*函数写法*/}
                <p ref={(node)=>{
                    console.log(node)
                }}>今天出太阳了</p>

              {/*  <Son ref={(node)=>{
                    console.log(node)
                }}></Son>*/}

            {/*    新用法   */}
                <Son ref={this.mySon
                }></Son>
                <hr/>
                <button onClick={()=>{
                    // findDOMNode接收一个组件实例,返回该组件的dom元素,进而进行dom操作,不推荐使用
                    // let elements=findDOMNode(this);

                    // console.log(elements);
                    // elements.style.background="red";

                    // unmountComponentAtNode(document.getElementById("root")) //新版已废弃

                    // console.log(this.refs.myPNode);
                    // console.log(this.refs.mySON);

                    console.log(this.mySon.current);
                }}>获取dom</button>
            </div>
        );
    }
}

export default RefsDom;