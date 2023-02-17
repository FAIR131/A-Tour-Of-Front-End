import React, { Component } from 'react';
import LiJianCheng from './LiJianCheng';
import LiShiMin from './LiShiMin';
import axios from 'axios'

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
                <LiShiMin></LiShiMin>
            </div>
        );
    }
}

export default LiYuan;