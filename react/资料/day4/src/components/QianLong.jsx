import React, { Component } from 'react';
import context from '../context';
class QianLong extends Component {
    static contextType=context;
    render() {
        return (
            <div>
                {/* 祖先组件如果都暴露数据,后代组件接收时取最近的那个值 */}
                乾隆:
                {/* {this.context.legacy} */}

                {
                    this.context.palace
                }

                <context.Consumer>
                    {
                        value=>{
                            // 此处可增加额外的逻辑
                            return value.palace
                        }
                    }
                </context.Consumer>
            </div>
        );
    }
}

export default QianLong;