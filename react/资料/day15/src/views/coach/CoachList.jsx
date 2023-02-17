import React, { useEffect, useState } from 'react';
import http from '../../utils/request'
import CoachShow from '../../components/CoachShow';
function CoachList(props) {

    let [dataSource, setDataSource] = useState([]);
    
    let [query,setQuery]=useState({})

    let initData=(pageNum=1,pageSize=10)=>{
        http.post("/coach/getCoachs", {
            pageNum,
            pageSize,
            isValid:4
        }).then(({data:{object}}) => {
            setDataSource(object.list)
            setQuery({total:object.total,pageNum:object.pageNum,pageSize:object.pageSize})
        })
    }

    useEffect(() => {
        initData()
    }, [])

    return (
        <CoachShow dataSource={dataSource} query={query} initData={initData}></CoachShow>
    );
}

export default CoachList;