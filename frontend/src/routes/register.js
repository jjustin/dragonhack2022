import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Button
} from 'antd';

const { Option } = Select;

const RegistrationForm = () => {
    const [form] = Form.useForm();

    let lat, long = 0
    navigator.geolocation.getCurrentPosition((g) => {
        lat = g.coords.latitude
        long = g.coords.longitude
    })

    const onFinish = (values) => {
        values.geo = { lat, long }
        console.log('Received values of form: ', values);
    };


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 80,
                }}
            >
                <Option value="386">+386</Option>
                <Option value="387">+387</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    return (
        <div style={{ padding: "60px", textAlign: "center", width: "100%", flex: 1 }}        >
            <Form
                style={{
                    maxWidth: "500px", margin: "auto"
                }}

                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '386',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Please enter matching passwords!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{}}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default () => <RegistrationForm />;