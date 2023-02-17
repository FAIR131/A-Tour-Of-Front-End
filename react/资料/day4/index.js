import React, { Component } from 'react';
export function debounce(fn, delay = 1000) {
    let timerId;
    return (e) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn(e)
        }, delay)
    }
}

export function throttle(fn,delay=1000) {
    let timerId;
    return (e) => {
        if(!timerId) {
            timerId=setTimeout(()=>{
                fn(e);
                timerId=undefined;
            },delay)
        }
    }
}

export function pointer(Comp){
    return class extends Component{
        render(){
            return (
                <div style={{cursor:"pointer"}}>
                    <Comp></Comp>
                </div>
            )
        }
    }
}

export function red(Comp){
    return function(){
        return (
            <div style={{background:"red",width:"300px"}}>
                <Comp></Comp>
            </div>
        )
    }
}

export function slideDelete(Comp){
    return class extends Component{
        state={
            start:{}
        }
        render(){
            return (
                <div 
                style={{background:"red",transition:"all .3s ease"}}

                onMouseDown={(e)=>{
                    // console.log(e.pageX,e.pageY);
                    this.setState({
                        start:{x:e.pageX,y:e.pageY}
                    })
                }}

                onMouseUp={(e)=>{
                    if(this.state.start.x-e.pageX>=20){
                        e.target.parentNode.style.transform="translateX(-150px)";
                        e.target.parentNode.style.opacity=0;
                    }
                }}
                
                >
                    <Comp></Comp>
                </div>
            )
        }
    }
}