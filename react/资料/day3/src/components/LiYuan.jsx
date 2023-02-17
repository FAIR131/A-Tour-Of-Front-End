import React, { Component } from 'react';
import LiJianCheng from './LiJianCheng';
import LiShiMin from './LiShiMin';
class LiYuan extends Component {
    render() {
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