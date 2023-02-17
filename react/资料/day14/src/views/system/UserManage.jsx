import React, { useEffect, useState } from 'react';
import http from '../../utils/request'
import { Table, Button, Modal, Descriptions, Badge, Tag, Divider, Checkbox, Image, message } from 'antd';
function UserManage(props) {

    let [users, setUsers] = useState([])
    let [query, setQuery] = useState({pageNum:1,pageSize:10})
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [grantUser, setGrantUser] = useState({})
    let [roles, setRoles] = useState([])

    const handleOk = () => {
        http.put("/sysUser/grantUser", {
            userId: grantUser.id,
            roleIds:grantUser.roleIds
        }).then(res=>{
            res.data.code===1?message.success(res.data.message):message.error(res.data.message);
            setIsModalOpen(false);
        })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: "名称",
            dataIndex: "nickName"
        },
        {
            title: "头像",
            dataIndex: "avatarUrl",
            render: (url) => {
                return <Image src={url} width={50}></Image>
            }
        },
        {
            title: "手机号",
            dataIndex: "phone"
        },
        {
            title: "创建时间",
            dataIndex: "createDate"
        },
        {
            title: "修改时间",
            dataIndex: "updateDate"
        },
        {
            title: "状态",
            dataIndex: "isValid",
            render: (_) => {
                return _ === 1 ? <Tag color="blue">有效</Tag> : <Tag color="red">无效</Tag>
            }
        },
        {
            title: "操作",
            render: (_) => {
                return (<>
                    <Button type='primary' onClick={async () => {
                        let res=await http.get("/sysUser/getUserRoles",{params:{userId:_.id}})                        
                        setGrantUser({..._,roleIds:res.data.object});
                        setIsModalOpen(true)
                    }}>授权</Button>
                    <Button danger type='primary'>删除</Button>
                </>)
            }
        }
    ]

    useEffect(() => {
        initData()
        http.get("/sysUser/getAllRoles", { params: { pageNum:1, pageSize:10 } }).then(res => {
            let tmpArr = []
            res.data.object.list.forEach(item => {
                tmpArr.push({ label: item.name, value: item.id })
            })
            setRoles(tmpArr);
        })
    }, [])
    let initData=(pageNum,pageSize)=>{
        query.pageNum=pageNum;
        query.pageSize=pageSize;
        http.get("/sysUser/getAllUsers", { params: query }).then(({data:{object}}) => {
            setUsers(object.list);
            setQuery({...query,total:object.total})
        })        
    }
    return (
        <>
            <Table dataSource={users} columns={columns} rowKey="id" pagination={
                {
                    total: query.total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条`,
                    onChange: (pageNum, pageSize) => {
                        initData(pageNum, pageSize);
                    }
                }
            } ></Table>
            <Modal title="用户授权" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="80%">
                <Descriptions bordered>
                    <Descriptions.Item label="用户名称"><Tag color="blue">{grantUser.nickName}</Tag></Descriptions.Item>
                    <Descriptions.Item label="手机号">{grantUser.phone}</Descriptions.Item>
                    <Descriptions.Item label="状态">{grantUser.isValid ? "有效" : "无效"}</Descriptions.Item>
                </Descriptions>
                <Checkbox.Group options={roles} value={grantUser.roleIds} onChange={(roleIds) => {
                    setGrantUser({...grantUser,roleIds})
                }} />
            </Modal>
        </>
    );
}

export default UserManage;