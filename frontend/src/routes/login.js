import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';

import { postApi } from '../utils/api'

export default function Login() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        postApi('/login', values).
            then(res => res.json()).
            then(res => {
                if (res.error) {
                    form.setFields([
                        {
                            name: 'password',
                            errors: ['Username or password incorrect'],
                        },
                    ])
                    return
                }
                localStorage.setItem("token", res.token);
                localStorage.setItem("balance", res.balance);
                window.location.href = "/";
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Login Failed:', errorInfo);
    };

    return (
        <div style={{ padding: "60px", textAlign: "center", width: "100%", flex: 1 }}>
            <Form
                form={form} 
                name="login"
                labelCol={{}}
                wrapperCol={{}}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{
                    maxWidth: "500px", margin: "auto"
                }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }, { min: 8, message: 'Password must be at least 8 characters' }]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{}}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item wrapperCol={{}}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <div>Not yet a member? <Link to="/register">Register here</Link></div>
        </div >
    );
}
