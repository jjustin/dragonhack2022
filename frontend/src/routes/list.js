import { Form, Input, Button, Select, Radio, Space, InputNumber } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { postApi } from "../utils/api";
const { TextArea } = Input;
const { Option } = Select;



const Demo = () => {
    const onFinish = (values) => {
        if (!values.price) {
            values.price = 5;
        }
        postApi('/newlisting', values).
            then(res => res.json()).
            then(res => {
                window.location.pathname = "/listing/" + res.id;
            })
    };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 8 }}
            onFinish={onFinish}
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
                <Radio.Group value="shirt">
                    <Radio.Button value="shirt">Shirt</Radio.Button>
                    <Radio.Button value="sweater">Sweater</Radio.Button>
                    <Radio.Button value="cardigan">Cardigan</Radio.Button>
                    <Radio.Button value="pants">Pants</Radio.Button>
                    <Radio.Button value="accessory">Accessory</Radio.Button>
                </Radio.Group>
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
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="uni">Unisex</Option>
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
                    <InputNumber addonAfter="swapcoin" defaultValue={5} />
                </Space>
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
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