import React, {Component} from 'react';

class Props extends Component {
    render() {
        // console.log(this.props)
        let elements = []
        React.Children.forEach(this.props.children, (item) => {
            // 对标签增加额外的处理
            elements.push(item)
        })
        return (
            <div>
                {this.props.children[1]}
                {this.props.children[2]}
                {/*{this.props.children[3]}*/}
                <hr/>
           {/*     对象:{this.props.children[2].username}
                标签：{this.props.children}*/}

                {
                 /*   React.Children.map(this.props.children,(item)=>{
                    //    对标签增加额外的处理
                        return item
                    })*/
                    elements
                }
                {
                    this.props.xixi
                }
                {
                    this.props.hehe
                }
                <hr/>
                {
                    this.props.children.length
                }
                <hr/>
                {
                    React.Children.count(this.props.children)
                }
            </div>
        );
    }
}

export default Props;
