import React from 'react';

function FnComp(props) {
    // 函数式组件中没有this,第一个形参就是props
    console.log(props);
    props.getHouse("别墅")
    return (
        <div>
            我是函数式组件:{props.house}
        </div>
    );
}

export default FnComp;