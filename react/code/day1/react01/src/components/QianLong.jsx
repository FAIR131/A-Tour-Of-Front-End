import React, {Component} from 'react';
import Context from "../context";

class QianLong extends Component {
    render() {
        return (
            <div>
                乾隆：{this.context.legacy}
            </div>
        );
    }
}
QianLong.contextType=Context
export default QianLong;