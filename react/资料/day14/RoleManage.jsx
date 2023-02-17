import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Descriptions, Tag, Tree, message, Form, Input, Select,Popconfirm } from 'antd';
import http from '../../utils/request'
import './roleManage.css'
function RoleManage(props) {
    let [roles, setRoles] = useState([])
    let [query, setQuery] = useState({ pageNum: 1, pageSize: 10 })
    let [menus, setMenus] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [grantModalOpen, setGrantModalOpen] = useState(false);
    let [grantRole, setGrantRole] = useState({})
    useEffect(() => {
        initData()
        http.get("/sysUser/getAllResources", { params: { pageNum: 1, pageSize: 10 } }).then(res => {
            // let result=[]
            // res.data.object.forEach(({name:title,id:key,children})=>{
            //     let childs=[];
            //     children.forEach(item=>{
            //         childs.push({title:item.name,key:item.id})
            //     })
            //     result.push({title,key,children:childs})
            // })
            // setMenus(result)

            setMenus(recursionTree(res.data.object))
        })
    }, [])

    function recursionTree(data) {
        let result = []
        data.forEach(item => {
            if (item.children) {
                let childs = recursionTree(item.children)
                result.push({ title: item.name, key: item.id, children: childs })
            } else {
                result.push({ title: item.name, key: item.id })
            }
        })
        return result;
    }

    let initData = () => {
        http.get("/sysUser/getAllRoles", { params: query }).then(({ data: { object } }) => {
            setRoles(object.list)
            setQuery({ ...query, total: object.total })
        })
    }
    const columns = [
        {
            title: "角色名称",
            dataIndex: "name"
        },
        {
            title: "类型",
            dataIndex: "type"
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
            title: "操作",
            render: (_) => {
                return (<>
                    <Button type='primary' onClick={async () => {
                        
                        setGrantModalOpen(true);
                        let {data:{object}}=await http.get("/sysUser/getRoleResources",{params:{roleId:_.id}});
                        setGrantRole({..._,roleMenus:object});
                    }}>授权</Button>
                    <Popconfirm
                        title="确认删除此角色吗?"
                        onConfirm={()=>{
                            http.delete("/sysUser/delRole",{params:{roleId:_.id}}).then(res=>{
                                if(res.data.code) message.success("删除角色成功");
                                initData()
                            })
                        }}
                        okText="确认"
                        cancelText="取消"
                    >
                    <Button type='primary' danger>删除</Button>
                    </Popconfirm>
                </>)
            }
        }
    ]


    // 树形控件数据

    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setGrantRole({...grantRole,roleMenus:checkedKeysValue})
    };

    let onOk=() => { 
        http.put("/sysUser/grantRole",{
            roleId:grantRole.id,
            menuIds:grantRole.roleMenus
        }).then(res=>{
            if(res.data.code){
                message.success(res.data.message)
            }
            setGrantModalOpen(false) 
        })
    }
    return (
        <>
            <Button type='primary' onClick={() => { setIsModalOpen(true) }}>添加角色</Button>
            <Modal title="创建角色" width={"50%"} open={isModalOpen} onCancel={() => { setIsModalOpen(false) }} footer={null}>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={(values) => {
                        http.put("/sysUser/addRole", values).then(res => {
                            res.data.code === 1 ? message.success("添加成功") : message.error(res.data.message);
                        })
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="角色名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入角色名称',
                            },
                            {
                                min: 3, max: 10, message: "长度在3到10个字符之间"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="角色代码"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '请选择角色类型',
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="请选择角色类型"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                {
                                    value: 'manager',
                                    label: '系统用户',
                                },
                                {
                                    value: 'user',
                                    label: '普通用户',
                                },
                                {
                                    value: 'guest',
                                    label: '来宾用户',
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>

                        <span style={{ color: "white", marginLeft: "16px" }}>重置</span>
                    </Form.Item>
                </Form>
            </Modal>

            <Table dataSource={roles} columns={columns} rowKey="id" pagination={
                {
                    total: query.total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条`,
                    onChange: (pageNum, pageSize) => {
                        query.pageNum=pageNum;
                        query.pageSize=pageSize;
                        initData();
                    }
                }
            } ></Table>
            <Modal title="角色授权" width={"80%"} open={grantModalOpen} onOk={onOk} onCancel={() => { setGrantModalOpen(false) }}>
                <Descriptions bordered>
                    <Descriptions.Item label="角色名称"><Tag color="blue">{grantRole.name}</Tag></Descriptions.Item>
                    <Descriptions.Item label="角色代码">{grantRole.code}</Descriptions.Item>
                    <Descriptions.Item label="角色类型">{grantRole.type}</Descriptions.Item>
                </Descriptions>
                <Tree
                    checkable
                    // checkStrictly
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={grantRole.roleMenus}
                    treeData={menus}
                />
            </Modal>
        </>
    );
}

export default RoleManage;