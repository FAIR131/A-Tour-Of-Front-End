import React from 'react';
import './login.css'
import { Button, Checkbox, Form, Input, Image, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import http from '../utils/request'
import { connect } from 'react-redux'
function Login(props) {

    const onFinish = (values) => {
        http.post("/sysUser/login", values).then(res => {
            if (res.data.code) {
                props.init_current_user(res.data.object)
                sessionStorage.setItem("current_user", JSON.stringify(res.data.object))
                props.history.push("/home")
            } else {
                message.error(res.data.message)
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        message.error("请输入正确的账户和密码")
    };

    return (
        <div className='login'>
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Image preview={false}
                    width={104}
                    src="http://static.yqcode0563.cn/logo.png"
                />

                <Form.Item
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: '请输入账户',
                        },
                        {
                            min: 5, max: 15, message: "长度在5到15个字符之间"
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined style={{ color: "grey" }} />} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                        {
                            min: 5, max: 15, message: "长度在5到15个字符之间"
                        }
                    ]}
                >
                    <Input.Password prefix={<LockOutlined style={{ color: "grey" }} />} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>

                    <span style={{ color: "white", marginLeft: "16px" }}>重置</span>
                </Form.Item>
            </Form>
        </div>
    );
}

export default connect(() => {
    return {}
},
    (dispatch) => {
        return {
            init_current_user: (user) => {
                dispatch({ type: "INIT_CURRENT_USER", user })
            }
        }
    })(Login);