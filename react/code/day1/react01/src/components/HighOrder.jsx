import React, {Component} from 'react';
import {debounce, pointer, red, slideDelete, throttle} from "../HOC";

@slideDelete
@red
class HighOrder extends Component {
    render() {
        return (
            <div>
                <input type="text" onChange={
                    debounce((event)=>{
                        console.log(event.target.value)
                    })
                }/>

                <button onClick={
                    throttle((e)=>{
                        console.log(1111)
                    })
                }>提交</button>

            </div>
        );
    }
}

export default pointer(HighOrder) ;