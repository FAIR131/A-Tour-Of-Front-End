import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
class News extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                资讯
            </div>
        );
    }
}

export default withRouter(News);