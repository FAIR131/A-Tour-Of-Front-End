import React, { useEffect, useState } from 'react';
import CoachShow from '../../components/CoachShow';
import http from '../../utils/request'
import { Button, Checkbox, Form, Input } from 'antd';
import './inquiry_order.scss'
function InquiryOrder(props) {

    let [dataSource, setDataSource] = useState([]);

    let [query, setQuery] = useState({})

    useEffect(() => {
        initData()
    })

    let initData = (pageNum = 1, pageSize = 10) => {
        http.post("/coach/getCoachs", {
            pageNum,
            pageSize,
        }).then(({ data: { object } }) => {
            setDataSource(object.list)
            setQuery({ total: object.total, pageNum: object.pageNum, pageSize: object.pageSize })
        })
    }

    return (
        <>
            <Form
                name="basic"
                onFinish={()=>{}}
                onFinishFailed={()=>{}}
                autoComplete="off"
                layout="inline"
            >
                <Form.Item
                    label="教练名称"
                    name="username"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="教练籍贯"
                    name="password"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="教练性别"
                    name="gender"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
            </Form>

            <CoachShow dataSource={dataSource} query={query} initData={initData}></CoachShow>
        </>
    );
}

export default InquiryOrder;