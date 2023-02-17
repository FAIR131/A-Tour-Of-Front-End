import React, {Component} from 'react';
import YongZheng from "./YongZheng";
import Context from "../context";

class Kangxi extends Component {
    render() {
        return (
            <div>
                康熙：{this.context.legacy}
                <hr/>
                <Context.Provider value={{legacy: '皇位'}}>
                    <YongZheng></YongZheng>
                </Context.Provider>
            </div>
        );
    }
}

export default Kangxi;