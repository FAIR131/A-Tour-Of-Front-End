import React, {Component} from 'react';
import QianLong from "./QianLong";
import Context from "../context";

class YongZheng extends Component {
    render() {
        return (
            <div>
                雍正: {this.context.legacy}
                <hr/>
                <Context.Provider value={{legacy: '甄嬛'}}>
                    <QianLong></QianLong>
                </Context.Provider>
            </div>
        );
    }
}

YongZheng.contextType = Context
export default YongZheng;