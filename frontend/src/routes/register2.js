import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';

import { postApi } from '../utils/api'

export default function Login() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });


        values.code = params.code
        values.username = params.username

        postApi('/verification', values).
            then(res => res.json()).
            then(res => {
                if (res.error) {
                    form.setFields([
                        {
                            name: 'verification_code',
                            errors: ['There is an error with validating your verification code'],
                        },
                    ])
                    return
                }

                localStorage.setItem("token", res.token);
                localStorage.setItem("balance", res.balance);
                window.location.href = "/";
            })
    };

    return (
        <div style={{ padding: "60px", textAlign: "center", width: "100%", flex: 1 }}>
            <Form
                form={form}
                name="verification"
                labelCol={{}}
                wrapperCol={{}}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                style={{
                    maxWidth: "500px", margin: "auto"
                }}
            >
                <div>
                    Enter the verification code you received via SMS
                </div>
                <Form.Item
                    label="Verification code"
                    name="verification_code"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
}
