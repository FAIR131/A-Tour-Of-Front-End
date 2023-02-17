import React, { useEffect,useState } from 'react';
import { Button,Upload,Form,message } from 'antd'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { InboxOutlined } from '@ant-design/icons';
import http from '../../../utils/request'
const {Dragger} =Upload
function Step3(props) {
    let history = useHistory();
    // useEffect(()=>{
    //     props.set_current()
    // },[])
    let [coachData,setCoachData]=useState({coachImgs:[],coachCardImgs:[],shortVideo:[],specialMemoImgs:[],contractImgs:[]});

    const setUpload = {
        name: 'file',
        multiple: true,
        action: `${http.defaults.baseURL}/file/uploadFile`
    };
    return (
        <>

            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
            >

                <Form.Item
                    label="教练照片"
                    name="coachImgs"
                >
                    <Dragger {...setUpload} onChange={(info)=>{
                        const { status } = info.file;
                        if (status === 'done') {
                            coachData.coachImgs.push(info.file.response.object.url)
                        }
                    }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
                    </Dragger>
                </Form.Item>
                <Form.Item
                    label="教练证照片"
                    name="coachCardImgs"
                >
                    <Dragger {...setUpload} onChange={(info)=>{
                        const { status } = info.file;
                        if (status === 'done') {
                            coachData.coachCardImgs.push(info.file.response.object.url)
                        }
                    }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
                    </Dragger>
                </Form.Item>
                <Form.Item
                    label="短视频介绍"
                    name="shortVideo"
                >
                    <Dragger {...setUpload} onChange={(info)=>{
                        const { status } = info.file;
                        if (status === 'done') {
                            coachData.shortVideo.push(info.file.response.object.url)
                        }
                    }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
                    </Dragger>
                </Form.Item>
                <Form.Item
                    label="特殊记忆点"
                    name="specialMemoImgs"
                >
                    <Dragger {...setUpload}  onChange={(info)=>{
                        const { status } = info.file;
                        if (status === 'done') {
                            coachData.specialMemoImgs.push(info.file.response.object.url)
                        }
                    }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
                    </Dragger>
                </Form.Item>
                <Form.Item
                    label="教练合同"
                    name="contractImgs"
                >
                    <Dragger {...setUpload}  onChange={(info)=>{
                        const { status } = info.file;
                        if (status === 'done') {
                            coachData.contractImgs.push(info.file.response.object.url)
                        }
                    }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
                    </Dragger>
                </Form.Item>

            </Form>

            <Button onClick={() => {
                props.prevStep();
                history.push("/home/input-coach/step2");
            }}>上一步</Button>
            <Button onClick={() => {
                props.init_coach(coachData)
                props.nextStep();
                history.push("/home/input-coach/step4");
            }}>下一步</Button>
        </>
    );
}

export default connect(
    (state) => {
        return {
            newCoach: state.newCoach
        }
    },
    (dispatch) => {
        return {
            nextStep: () => {
                dispatch({ type: "NEXT_STEP" })
            },
            prevStep: () => {
                dispatch({ type: "PREV_STEP" })
            },
            init_coach:(coach)=>{
                dispatch({type:"INIT_COACH",coach})
            }
            // set_current:()=>{
            //     dispatch({type:"SET_CURRENT",step:2})
            // }
        }
    }
)(Step3);