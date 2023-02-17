import React, { Component } from 'react';

class Props extends Component {
    render() {

        console.log(this.props);

        let elemets=[]

        React.Children.forEach(this.props.children,(item)=>{
            // 对标签增加额外的处理
            elemets.push(item)
        })

        return (
            <div>
                {/* 数组:{this.props.children[1]}
                <hr />
                对象:{this.props.children[2].username}
                <hr /> */}
                {/* 标签:{this.props.children} */}

                {
                    // React.Children.map(this.props.children,(item)=>{
                    //     // 对标签增加额外的处理
                    //     return item
                    // })
                    elemets
                    
                }
                {
                    this.props.xixi
                }
                {
                    this.props.hehe
                }
                <hr />
                {
                    this.props.children.length
                }
                <hr />
                {
                    
                    React.Children.count(this.props.children)
                }

            </div>
        );
    }
}

export default Props;