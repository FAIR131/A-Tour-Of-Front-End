import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class Film extends Component {
    render() {
        // console.log(this.props);
        return (
            <div>
                电影页面
            </div>
        );
    }
}

export default withRouter(Film);