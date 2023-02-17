import React from 'react';
import {useHistory} from 'react-router-dom'
function News(props) {
    let history=useHistory()
    console.log(history);
    return (
        <div>
            资讯
            <button onClick={()=>{
                history.push({pathname:"/mine",query:{username:"zhangsan",age:20}})
            }}>跳转</button>
        </div>
    );
}

export default News;