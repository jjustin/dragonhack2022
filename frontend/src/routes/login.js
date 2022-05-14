import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';

export default function Login() {
    const onFinish = (values) => {
        console.log('Login Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Login Failed:', errorInfo);
    };

    return (
        <div style={{ padding: "60px", textAlign: "center", width: "100%", flex: 1 }}>
            <Form
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
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{}}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

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
