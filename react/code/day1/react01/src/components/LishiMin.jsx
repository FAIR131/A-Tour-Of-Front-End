import React, {Component} from 'react';
import events from "../events";

class LishiMin extends Component {
    render() {
        return (
            <div>
                李世民
                <button onClick={()=>{
                    events.emit('say','大哥，下去吧')
                }}>打个招呼</button>
            </div>
        );
    }
}

export default LishiMin;
