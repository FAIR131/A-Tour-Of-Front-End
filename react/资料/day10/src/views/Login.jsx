import React from 'react';
import './login.css'
import { Button, Checkbox, Form, Input,Image } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
function Login(props) {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入账户',
                        },
                        {
                            min:5,max:15,message:"长度在5到15个字符之间"
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined style={{color:"grey"}}/>}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                        {
                            min:5,max:15,message:"长度在5到15个字符之间"
                        }
                    ]}
                >
                    <Input.Password prefix={<LockOutlined style={{color:"grey"}}/>}/>
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

                    <span style={{color:"white",marginLeft:"16px"}}>重置</span>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;