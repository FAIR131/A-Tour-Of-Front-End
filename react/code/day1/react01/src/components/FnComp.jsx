import React from 'react';

function FnComp(props) {
    //函数式组件没有this，第一个形参
    console.log(props)
    props.getHouse('别墅')
    return (
        <div>
            我是函数组件：{props.house}
        </div>
    );
}

export default FnComp;


