import React, { useEffect, useState } from 'react';
import http from '../../utils/request'
import { connect } from 'react-redux'
import CoachShow from '../../components/CoachShow';
import { Tag } from 'antd'
function CoachSubmitted(props) {
    /**
     * 0:未提审
     * 1：经理审核中
     * 2：副总审核中
     * 3：总经理审核中
     * 4：审核通过
     */
    let [coachs, setCoachs] = useState([])
    let [query, setQuery] = useState({})
    useEffect(() => {
        initData()
    }, [])

    let initData = (pageNum = 1, pageSize = 10) => {
        http.post("/coach/getCoachs", {
            pageNum,
            pageSize,
            declareId: props.currentUser.id
        }).then(({ data: { object } }) => {
            setCoachs(object.list)
            setQuery({ total: object.total, pageNum: object.pageNum, pageSize: object.pageSize })
        })
    }
    return (
        <CoachShow dataSource={coachs} query={query} initData={initData}
            columns={[{
                title: "状态", dataIndex: "isValid", render: (_) => {
                    switch (_) {
                        case 0:
                            return <Tag color='blue'>未提审</Tag>
                        case 1:
                            return <Tag color='blue'>经理审核中</Tag>
                        case 2:
                            return <Tag color='blue'>副总审核中</Tag>
                        case 3:
                            return <Tag color='blue'>总经理审核中</Tag>
                        case 4:
                            return <Tag color='blue'>审核通过</Tag>
                    }
                }
            }]}></CoachShow>
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
)(CoachSubmitted);