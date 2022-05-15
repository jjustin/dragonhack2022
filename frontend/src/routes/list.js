import { Form, Input, Button, Select, Space, InputNumber } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;



const Demo = () => {
    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <Form
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 7 }}
            style={{
                marginTop: "30px",
                marginLeft: "20px"
            }}
        >
            <Form.Item
                label="Title"
                name="title"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Type"
                name="type"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Size"
                name="size"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Gender"
                name="gender"
            >
                <Select defaultValue="" style={{ width: 120 }} >
                    <Option value="male">M</Option>
                    <Option value="female">F</Option>
                    <Option value="uni">Other</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                wrapperCol={{
                    span: 10,
                }}
            >
                <Space direction="vertical">
                    <InputNumber addonAfter="€" defaultValue={5} />
                </Space>
            </Form.Item>

            <Form.Item
                label="Description"
                name="Description"
                wrapperCol={{
                    span: 10,
                }}
            >
                <TextArea rows={4} placeholder="Please describe your article" />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 2,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    );
};

export default Demo;