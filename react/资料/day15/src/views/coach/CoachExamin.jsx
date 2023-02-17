import React, { useEffect, useState } from 'react';
import http from '../../utils/request'
import { connect } from 'react-redux'
import CoachShow from '../../components/CoachShow';
import { Button, Modal, Descriptions, Tag ,message} from 'antd';
function CoachExamin(props) {
    let [coachs, setCoachs] = useState([])
    let [query, setQuery] = useState({})
    let [showModal, setShowModal] = useState(false)
    let [currentCoach, setCurrentCoach] = useState({})
    useEffect(() => {
        initData()
    }, [])

    let initData = (pageNum = 1, pageSize = 10) => {
        http.post("/coach/getCoachs", {
            pageNum,
            pageSize,
            isValid: props.currentUser.roleCode
        }).then(({ data: { object } }) => {
            setCoachs(object.list)
            setQuery({ total: object.total, pageNum: object.pageNum, pageSize: object.pageSize })
        })
    }

    return (
        <>
            <CoachShow dataSource={coachs} query={query} initData={initData} columns={[]} action={{
                title: "操作",
                render: (record) => {
                    return <Button type='primary' danger onClick={() => {
                        setCurrentCoach(record)
                        setShowModal(true)
                    }}>教练审核</Button>
                }
            }}></CoachShow>
            <Modal title="教练审核" open={showModal} okText="通过" cancelText="驳回" onOk={() => {
                currentCoach.isValid=currentCoach.isValid+1;
                http.put("/coach/verifyCoach",currentCoach).then(res=>{
                    if(res.data.code) message.success("审核通过")
                    initData()
                })
                setShowModal(false)
            }} onCancel={() => {
                currentCoach.isValid=currentCoach.isValid-1;
                http.put("/coach/verifyCoach",currentCoach).then(res=>{
                    if(res.data.code) message.success("已驳回")
                    initData()
                })
                setShowModal(false)
            }}>
                <Descriptions bordered>
                    <Descriptions.Item label="教练名称"><Tag color="blue">{currentCoach.name}</Tag></Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
}

export default connect(
    (state) => {
        return {
            currentUser: state.currentUser
        }
    },
    () => {
        return {}
    }
)(CoachExamin);