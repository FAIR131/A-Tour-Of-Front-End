import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Descriptions, Badge, Tag, Divider, Tooltip, Image, Pagination } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import http from "../utils/request"
function CoachShow(props) {
    const columns = [        
        {
            title: '教练名称',
            dataIndex: 'name',
        },
        {
            title: '教练性别',
            dataIndex: 'gender',
            render: (text, record) => {
                // console.log(record);
                return text === 1 ? "男" : "女"
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
        {...props.columns},
        props.action||{
            title: '操作',
            render: (record) => {
                return <Button type='primary' onClick={async () => {
                    record.price = []
                    let res = await http.get("/coach/getCoachLicenses", { params: { coachId: record.id } })
                    res.data.object.forEach(item => {
                        record.price.push({ licenseType: item.licenseType, listPrice: item.listPrice, cooperatePrice: item.cooperatePrice })
                    })

                    setCurrentCoach(record)
                    setIsModalOpen(true)
                }}>详情</Button>
            }
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    let [currentCoach, setCurrentCoach] = useState({});
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Table dataSource={props.dataSource} columns={columns} rowKey="id" pagination={
                {
                    total: props.query.total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条`,
                    onChange: (pageNum, pageSize) => {
                        props.initData(pageNum, pageSize);
                    }
                }
            } />
            <Modal title="教练详情" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="80%">
                <Descriptions bordered>
                    <Descriptions.Item label="教练名称"><Tag color="blue">{currentCoach.name}</Tag></Descriptions.Item>
                    <Descriptions.Item label="教练性别">{currentCoach.gender ? "男" : "女"}</Descriptions.Item>
                    <Descriptions.Item label="培训证件">
                        {
                            currentCoach.licenseType && JSON.parse(currentCoach.licenseType).map(item => {
                                return <Tag color="blue" key={item}>{item}证</Tag>
                            })
                        }
                    </Descriptions.Item>
                    {
                        currentCoach.licenseType && JSON.parse(currentCoach.licenseType).map(item => {
                            return <Descriptions.Item label={item + "证价格组成"} key={item}>
                                <p>挂牌价组成:</p>
                                <Divider />
                                <p>合作价组成:</p>
                                <Divider />
                                <Tooltip placement="top" title={currentCoach.price.map(price => {
                                    if (price.licenseType === item) {
                                        return <span key={price.licenseType}>{item + "证挂牌价:￥" + price.listPrice + "," + item + "证合作价:￥" + price.cooperatePrice}</span>
                                    }
                                })}><SmileOutlined /></Tooltip>
                            </Descriptions.Item>
                        })
                    }
                    <Descriptions.Item label="教练照片">
                        {
                            currentCoach.coachImgs && JSON.parse(currentCoach.coachImgs).map(item => {
                                return <Image src={item} key={item} width={200}></Image>
                            })
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                    <Descriptions.Item label="Config Info">
                        Data disk type: MongoDB
                        <br />
                        Database version: 3.4
                        <br />
                        Package: dds.mongo.mid
                        <br />
                        Storage space: 10 GB
                        <br />
                        Replication factor: 3
                        <br />
                        Region: East China 1
                        <br />
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
}

export default CoachShow;