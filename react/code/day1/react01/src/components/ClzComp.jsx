import React, {Component} from 'react';

class ClzComp extends Component {
    state={
        num:10,
        // money:0
    }

    changeNum=()=>{
        this.setState({
            num:++this.state.num,
            // money:this.props.money*3
        })
        console.log(this.state.num)
    }
    render() {
        //父组件传值给子组建，如果子组建是类组件,通过this.props接受
        // console.log(this.props)
        // this.props.getMoney(this.props.money*2)
        return (
            <div>
                我是类组件
                {/*：{this.props.money}*/}
                <hr/>
                {this.state.num}
                {/*---{this.state.money}*/}
                <button onClick={this.changeNum}>改值</button>
            </div>
        );
    }
}

export default ClzComp;