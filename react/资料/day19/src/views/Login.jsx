import React from 'react';
import './login.scss'
import {
    Image, Form,
    Input,
    Button,
    Checkbox,
    Toast
} from 'antd-mobile'
import http from '../utils/request'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Login(props) {
    let navigate = useNavigate();
    const onFinish = (values) => {
        // Dialog.alert({
        //     content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        // })
        http.post("/driverUser/login", values).then(res => {
            if (res.data.code) {
                sessionStorage.setItem("currentUser", JSON.stringify(res.data.object));
                props.init_current_user(res.data.object)

                Toast.show({
                    icon: 'success',
                    content: res.data.message,
                })

                navigate("/home")
            } else {
                Toast.show({
                    icon: 'fail',
                    content: res.data.message,
                })
            }
        })
    }

    return (
        <div className='container'>
            <Image src={require("../static/logo.png")} width={256} fit='fill' />

            <Form
                name='form'
                onFinish={onFinish}
                layout='horizontal'
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Item name='account' label='账户' rules={[{ required: true }]}>
                    <Input placeholder='请输入账户' />
                </Form.Item>
                <Form.Item name='password' label='密码' rules={[{ required: true }]}>
                    <Input placeholder='请输入密码' type={"password"} />
                </Form.Item>
                <Form.Item name='protocol' rules={[{ required: true, message: "请勾选服务协议" }]}>
                    <Checkbox>我已阅读并同意该条款<a className='protocol' href="https://zjcjj.net/protocol/">《服务协议》</a></Checkbox>
                </Form.Item>
            </Form>
        </div>
    );
}

export default connect(
    () => {
        return {}
    },
    (dispatch) => {
        return {
            init_current_user: (user) => {
                dispatch({ type: "INIT_CURRENT_USER", user })
            }
        }
    }
)(Login);