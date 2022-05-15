import { Form, Input, Button, Select, Radio, Space, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { postApi } from "../utils/api";
import { useState } from 'react';

const { TextArea } = Input;
const { Option } = Select;


const Demo = () => {
    const [form] = Form.useForm();

    let [fileList, setFileList] = useState([]);

    let handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-8);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.imgpath = file.response.image;
            }
            return file;
        });

        setFileList(fileList);
    };

    const uploadProps = {
        action: 'http://localhost:5000/upload',
        onChange: handleChange,
        multiple: true,
    };


    const onFinish = (values) => {
        console.log('Received values of form: ', fileList);

        if (fileList.length == 0) {
            form.setFields([
                {
                    name: 'images',
                    errors: ['No images provided'],
                },
            ])
            return
        }
        values.images = fileList.map(file => file.imgpath);
        console.log(values)

        postApi('/newlisting', values).
            then(res => res.json()).
            then(res => {
                window.location.pathname = "/listings/" + res.id;
            })
    };

    return (
        <Form
            form={form}
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
                rules={[{ required: true, message: 'Please input your title!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: 'Please input your item\'s size!' }]}
            >
                <Radio.Group value="shirt">
                    <Radio.Button value="shirt">Shirt</Radio.Button>
                    <Radio.Button value="sweater">Sweater</Radio.Button>
                    <Radio.Button value="cardigan">Cardigan</Radio.Button>
                    <Radio.Button value="pants">Pants</Radio.Button>
                    <Radio.Button value="shoes">Shoes</Radio.Button>
                    <Radio.Button value="accessory">Accessory</Radio.Button>
                </Radio.Group>

            </Form.Item>

            <Form.Item
                label="Size"
                name="size"
                rules={[{ required: true, message: 'Please input your item\'s size!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                wrapperCol={{
                    span: 10,
                }}
                initialValue={5}
                rules={[{ required: true, message: 'Please input your item\'s price!' }]}
            >
                <InputNumber addonAfter="swapcoin" />
            </Form.Item>

            <Form.Item
                label="Images"
                name="images"
                wrapperCol={{ span: 10 }}
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Upload {...uploadProps} fileList={fileList} >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
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