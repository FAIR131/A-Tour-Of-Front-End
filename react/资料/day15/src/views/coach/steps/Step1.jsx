import React, { useState } from 'react';
import { Button, Checkbox, Form, Input,Radio,DatePicker } from 'antd'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import PickArea from '../../../components/PickArea';
function Step1(props) {
    let history = useHistory();
    const cert = [{ label: "C1证", value: "C1" }, { label: "C2证", value: "C2" }, { label: "D证", value: "D" }, { label: "E证", value: "E" }]
    let [coachData,setCoachData]=useState({});
    return (
        <div>
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
            >

                <Form.Item
                    label="培训证件"
                    rules={[
                        {
                            required: true,
                            message: '请选择培训证件',
                        }
                    ]}
                >
                    <Checkbox.Group options={cert} onChange={(licenseType) => {
                        setCoachData({...coachData,licenseType});
                    }} />
                </Form.Item>

                <Form.Item
                    label="教练名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入教练名称',
                        }
                    ]}
                >
                    <Input onChange={(e)=>{
                        setCoachData({...coachData,name:e.target.value});
                    }}/>
                </Form.Item>
                <Form.Item
                    label="教练性别"
                    name="gender"
                >
                    <Radio.Group onChange={(e)=>{
                        setCoachData({...coachData,gender:e.target.value});
                    }}>
                        <Radio value={1}>男</Radio>
                        <Radio value={0}>女</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="教练生日"
                    name="birthday"
                >
                    <DatePicker onChange={(date,birthday)=>{
                        setCoachData({...coachData,birthday});
                    }}/>
                </Form.Item>
                <Form.Item
                    label="教练籍贯"
                    name="nativePlace"
                >
                    <PickArea getSite={(site)=>{
                        setCoachData({...coachData,nativePlace:site.join("")});
                    }}></PickArea>
                </Form.Item>

                <Form.Item
                    label="教练手机"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: '请输入教练手机',
                        }
                    ]}
                >
                    <Input onChange={(e)=>{
                        setCoachData({...coachData,phone:e.target.value});
                    }}/>
                </Form.Item>

                <Form.Item
                    label="教练微信"
                    name="wechat"
                    rules={[
                        {
                            required: true,
                            message: '请输入教练微信',
                        }
                    ]}
                >
                    <Input onChange={(e)=>{
                        setCoachData({...coachData,wechat:e.target.value});
                    }}/>
                </Form.Item>

                <Form.Item
                    label="教练地址"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: '请输入教练地址',
                        }
                    ]}
                >
                    <PickArea showArea={true} getSite={(site)=>{
                        // console.log(site);
                        setCoachData({...coachData,provice:site[0],city:site[1],area:site[2]});
                    }}></PickArea>
                    <Input onChange={(e)=>{
                        setCoachData({...coachData,address:e.target.value});
                    }}/>
                </Form.Item>
            </Form>

            <Button onClick={() => {
                props.init_coach(coachData)
                props.nextStep();
                history.push("/home/input-coach/step2");
            }}>下一步</Button>
        </div>
    );
}

export default connect(
    (state) => {
        return {
        }
    },
    (dispatch) => {
        return {
            nextStep: () => {
                dispatch({ type: "NEXT_STEP" })
            },
            init_coach:(coach)=>{
                dispatch({type:"INIT_COACH",coach})
            }
        }
    }
)(Step1);