import React, {Component} from 'react';

class ControlComp extends Component {
    state = {
        username: '',
        password: '',
        remarks: '',
        gender: 'male',
        hobbies: []
    }

    changeValue = (e) => {
        if (e.target.type === 'checkbox') {
            if (e.target.checked) {
                this.state.hobbies.push(e.target.value)
            } else {
                this.state.hobbies.splice(this.state.hobbies.indexOf(e.target.value), 1)
            }
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    render() {
        return (

            <div>
                {/* 受控组件 */}
                {/* <input type="text" value={this.state.username} onChange={(e) => {
                    this.setState({
                        username: e.target.value
                    })
                }} />

                <input type="password" value={this.state.password} onChange={(e) => {
                    this.setState({
                        password: e.target.value
                    })
                }} /> */}

                <input type="text" name='username' value={this.state.username} onChange={this.changeValue}/> <br/>
                <input type="text" name='password' value={this.state.password} onChange={this.changeValue}/> <br/>

                <textarea placeholder='请输入备注' name='remarks' value={this.state.remarks}
                          onChange={this.changeValue}></textarea>
                <br/>
                <input type="radio" name='gender' value='male' checked={this.state.gender === 'male'}
                       onChange={this.changeValue}/>男
                <input type="radio" name='gender' value='female' onChange={this.changeValue}/>女
                <br/>

                <input type="checkbox" name='hobbies' value='eat' onChange={this.changeValue}/>吃
                <input type="checkbox" name='hobbies' value='play' onChange={this.changeValue}/>玩
                <input type="checkbox" name='hobbies' value='drink' onChange={this.changeValue}/>喝

                <br/>
                <button onClick={() => {
                    console.log(this.state)
                }}>提交
                </button>
            </div>
        );
    }
}

export default ControlComp;
