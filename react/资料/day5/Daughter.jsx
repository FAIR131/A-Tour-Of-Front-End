import React, { Component,PureComponent } from 'react';

class Daughter extends PureComponent {
    render() {
        console.log("女儿组件的render函数执行了");
        return (
            <div>
                {this.props.count}
            </div>
        );
    }
}

export default Daughter;