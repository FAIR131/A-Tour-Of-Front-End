import React, { Component } from 'react';
import LiJianCheng from './LiJianCheng';

import axios from 'axios'
import LishiMin from "./LishiMin";

class LiYuan extends Component {
    render() {

        axios.post("/api/haha").then(res=>{
            console.log(res);
        })

        return (
            <div>
                李渊
                <hr />
                <LiJianCheng></LiJianCheng>
                <hr />
                <LishiMin></LishiMin>
            </div>
        );
    }
}

export default LiYuan;