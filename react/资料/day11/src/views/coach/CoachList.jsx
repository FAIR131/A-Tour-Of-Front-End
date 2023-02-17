import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import http from '../../utils/request'
function CoachList(props) {

    let [dataSource,setDataSource]=useState([])

    useEffect(() => {
        http.post("/coach/getCoachs", {
            pageNum: 1,
            pageSize: 10,
        }).then(res=>{
            // console.log(res);
            setDataSource(res.data.object.list)
        })
    }, [])



    const columns = [
        {
            title: '教练名称',
            dataIndex: 'name',
        },
        {
            title: '教练性别',
            dataIndex: 'gender',
            render:(text)=>{
                return text==1?"男":"女"
            }
        },
        {
            title: '教练电话',
            dataIndex: 'phone',
        },
        {
            title: '教练微信',
            dataIndex: 'wechat',
        },
        {
            title: '驾校名称',
            dataIndex: 'address',
        },
        {
            title: '操作',
            dataIndex: 'address',
        },
    ];
    return (
        <Table dataSource={dataSource} columns={columns} rowKey="id"/>
    );
}

export default CoachList;