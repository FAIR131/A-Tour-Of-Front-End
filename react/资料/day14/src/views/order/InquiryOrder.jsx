import React, { useEffect, useState } from 'react';
import CoachShow from '../../components/CoachShow';
import http from '../../utils/request'
import { Button, Checkbox, Form, Input,Radio } from 'antd';
import './inquiry_order.scss'
import PickArea from '../../components/PickArea';
function InquiryOrder(props) {

    let [dataSource, setDataSource] = useState([]);

    let [query, setQuery] = useState({pageNum:1,pageSize:10})

    useEffect(() => {
        initData()
    },[])

    let initData = () => {
        http.post("/coach/getCoachs",query).then(({ data: { object } }) => {
            setDataSource(object.list)
            setQuery({ total: object.total, pageNum: object.pageNum, pageSize: object.pageSize })
        })
    }

    return (
        <>
            <Form
                name="basic"
                onFinish={(values) => {
                    for (const key in values) {
                        query[key]=values[key]
                    }
                    setQuery(query)
                    initData()
                }}
                onFinishFailed={() => { }}
                autoComplete="off"
                layout="inline"
            >
                <Form.Item
                    label="教练名称"
                    name="name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="教练籍贯"
                    name="nativePlace"
                >
                    <PickArea getSite={(value)=>{
                        query.nativePlace=value.join("")
                        setQuery(query);
                        initData()
                    }}></PickArea>
                </Form.Item>

                <Form.Item
                    label="教练性别"
                    name="gender"
                >
                    <Radio.Group>
                        <Radio value={1}>男</Radio>
                        <Radio value={0}>女</Radio>
                    </Radio.Group>
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