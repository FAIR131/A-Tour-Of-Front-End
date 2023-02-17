import React, { Component } from 'react';
import YongZheng from './YongZheng';
import Context from '../context';
class KangXi extends Component {

    state={
        legacy:"龙椅"
    }

    render() {
        return (
            <div>
                康熙

                <button onClick={()=>{
                    this.setState({
                        legacy:"后宫"
                    })
                }}>changeLegacy</button>
                <hr />
                <Context.Provider value={{legacy:this.state.legacy,palace:<div>乾清宫</div>}}>
                    <YongZheng></YongZheng>
                </Context.Provider>
            </div>
        );
    }
}

export default KangXi;