import React, { Component,PureComponent } from 'react';
import Daughter from './Daughter';
class SelfComp extends Component {
    state = {
        num:0,
        count:0,
        arr:[1,3,7,9,6]
    }
    render() {
        console.log("render函数执行了");
        return (
            <>
                <p>num:{this.state.num}</p>
                <button onClick={()=>{
                    this.setState({
                        num:this.state.num+1
                    })
                }}>改Num</button>
                <hr />
                {this.state.arr} <br />
                <button onClick={()=>{
                    let tmpArr=JSON.parse(JSON.stringify(this.state.arr));
                    tmpArr.sort((a,b)=>{
                        return a-b
                    })
                    this.setState({
                        arr:tmpArr
                    })

                }}>排序</button>
                
                {/* <hr />

                <button onClick={()=>{
                    this.setState({
                        count:this.state.count
                    })
                }}>改count</button>
                <Daughter count={this.state.count}></Daughter> */}
            </>
        );
    }
}

export default SelfComp;