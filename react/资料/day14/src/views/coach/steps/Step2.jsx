import React,{useState} from 'react';
import {Button,Input,Form,Radio} from 'antd'
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux'
function Step2(props) {
    let [coachData,setCoachData]=useState({});
    let history=useHistory();
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
                    label="执教年限"
                    name="teachYears"
                    rules={[
                        {
                            required: true,
                            message: '请输入执教年限',
                        }
                    ]}
                >
                    <Input type='number' onChange={(e)=>{
                        setCoachData({...coachData,teachYears:e.target.value});
                    }}/>
                </Form.Item>

                <Form.Item
                    label="车辆品牌"
                    name="carBrand"
                    rules={[
                        {
                            required: true,
                            message: '请输入车辆品牌',
                        }
                    ]}
                >
                    <Input  onChange={(e)=>{
                        setCoachData({...coachData,carBrand:e.target.value});
                    }}/>
                </Form.Item>
                <Form.Item
                    label="变速器类型"
                    name="transType"
                >
                    <Radio.Group onChange={(e)=>{
                        setCoachData({...coachData,transType:e.target.value});
                    }}>
                        <Radio value={1}>手动</Radio>
                        <Radio value={2}>自动</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="所属驾校"
                    name="schoolName"
                >
                    <Input onChange={(e)=>{
                        setCoachData({...coachData,schoolName:e.target.value});
                    }}/>
                </Form.Item>
                <Form.Item
                    label="场地地址"
                    name="fieldAddress"
                    rules={[
                        {
                            required: true,
                            message: '请输入车辆品牌',
                        }
                    ]}
                >
                    <Input onChange={(e)=>{
                        setCoachData({...coachData,fieldAddress:[e.target.value]});
                    }}/>
                </Form.Item>

                <Form.Item
                    label="接送范围"
                    name="pickupRange"
                >
                    <Input onChange={(e)=>{
                        setCoachData({...coachData,pickupRange:e.target.value});
                    }}/>
                </Form.Item>

            </Form>

            <Button onClick={()=>{
                props.prevStep();
                history.push("/home/input-coach/step1");
            }}>上一步</Button>
            <Button onClick={()=>{
                props.init_coach(coachData)
                props.nextStep();
                history.push("/home/input-coach/step3");
            }}>下一步</Button>
        </>
    );
}

export default connect(
    (state)=>{
        return {            
        }
    },
    (dispatch)=>{
        return {
            nextStep:()=>{
                dispatch({type:"NEXT_STEP"})
            },
            prevStep:()=>{
                dispatch({type:"PREV_STEP"})
            },
            init_coach:(coach)=>{
                dispatch({type:"INIT_COACH",coach})
            }
        }
    }
)(Step2);