import React, { Component } from 'react';

class ClzComp extends Component {

    state = {
        num: 10,
        money:0
    }

    changeNum = () => {
        // this.state.num++;
        this.setState({
            num: ++this.state.num,
            money:this.props.money*3
        })
        console.log(this.state.num);

    }

    render() {
        // 父组件传值给子组件,如果子组件是类组件,通过this.props接收
        // console.log(this.props);


        // 在类组件中,声明状态数据用state属性,修改状态数据用this.setState函数,并且会触发render函数重新执行

        this.props.getMoney(this.props.money * 2)



        return (
            <div>
                我是类组件:{this.props.money}
                <hr />
                {this.state.num}---{this.state.money}
                <button onClick={this.changeNum}>改值</button>
            </div>
        );
    }
}

export default ClzComp;

// react class component

// react function component

// rsf