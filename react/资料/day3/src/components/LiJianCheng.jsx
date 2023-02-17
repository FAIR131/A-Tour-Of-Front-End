import React, { Component } from 'react';
import events from '../events';
class LiJianCheng extends Component {
    render() {

        events.on("say",function(word){
            console.log(word);
        })

        return (
            <div>
                李建成
            </div>
        );
    }
}

export default LiJianCheng;