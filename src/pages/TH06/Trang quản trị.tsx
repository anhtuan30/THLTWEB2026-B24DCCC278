import{Table, Button, Space, Modal, Form, Input, InputNumber, message, Rate, Upload} from 'antd';
import{useState} from 'react';
import{PlusOutlined, EditOutlined, DeleteOutlined,UploadOutlined} from '@ant-design/icons';
interface DiemDen {
    id: number,
    ten: string,
    moTa: string,
    thoiGian: number,
    chiPhiAnUong: number,
    chiPhiDiChuyen: number,
    chiPhiLuuTru: number,
    rating: number,
    hinhAnh?: string,
}
const TrangQuanTri = () => {
    const [editingItem, setEditngItem] = useState<DiemDen[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dsDiemDen, setDsDiemDen] = useState<DiemDen[]>([]);
    const [form] = Form.useForm();

    const handleAdd =() => {
        setIsModalOpen(true);
    };

    const handleEdit = (record: DiemDen) => {
        form.setFieldsValue(record);
        setEditngItem([record]);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa điểm đến này không?',
            onOk: () => {
                setDsDiemDen(dsDiemDen.filter(item => item.id !== id));
            },
        });
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            const newDiemDen = {...values, key: Date.now(),};
            setDsDiemDen([...dsDiemDen, newDiemDen]);
            setIsModalOpen(false);
            message.info('Thêm mới thành công!');
            form.resetFields();
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setEditngItem([]);
    };
    const columns =[
        {
            title: 'Tên Điểm Đến',
            dataIndex: 'ten',
            key: 'ten',
        },
        {
            title: 'Mô Tả',
            dataIndex: 'moTa',
            key: 'moTa',
        },
        {
            title: 'Thời Gian (giờ)',
            dataIndex: 'thoiGian',
            key: 'thoiGian',
        },
        {
            title: 'Chi Phí Ăn Uống (VNĐ)',
            dataIndex: 'chiPhiAnUong',
            key:'chiPhiAnUong',
            render: (value: number) => value.toLocaleString()
        },
        {
            title: 'Chi Phí Di Chuyển (VNĐ)',
            dataIndex: 'chiPhiDiChuyen',
            key:'chiPhiAnUong',
            render: (value: number) => value.toLocaleString()
        },
        {
            title: 'Chi Phí Lưu Trú (VNĐ)',
            dataIndex: 'chiPhiLuuTru',
            key:'chiPhiLuuTru',
            render: (value: number) => value.toLocaleString()
        },
        {
            title: 'Đánh Giá',
            dataIndex: 'rating',
            key:'rating',
            render: (value: number) => <Rate disabled value={value} />,
        },
        {
            title:'Thao tác',
            key:'thaoTac',
            render:(_: any, record: DiemDen)=>(
                <Space>
                    <Button type='default' icon={<EditOutlined/>} onClick={() => handleEdit(record)}>Sửa</Button>
                    <Button type='primary' icon={<DeleteOutlined/>}onClick={() => handleDelete(record.id)}>Xóa</Button>
                </Space>
            ),
        },

    ];
    return(
        <div>
            <h1>Quản lí điểm đến</h1>
            <Button type='primary' icon={<PlusOutlined/>} style={{marginBottom: 15}}
            onClick={handleAdd}>Thêm mới</Button>
            <Modal
            title='Thêm mới điểm đến'
            visible={isModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}>
                <Form form={form} layout='vertical'>
                    <Form.Item name='ten' label='Tên Điểm Đến' rules={[{required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='moTa' label='Mô Tả' rules={[{required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name='thoiGian' label='Thời Gian (giờ)' rules={[{required: true }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name='chiPhiAnUong' label='Chi Phí Ăn Uống (VNĐ)' rules={[{required: true }]}>
                        <InputNumber min={1000} />
                    </Form.Item>
                    <Form.Item name='chiPhiDiChuyen' label='Chi Phí Di Chuyển (VNĐ)' rules={[{required: true }]}>
                        <InputNumber min={1000} />
                    </Form.Item>
                    <Form.Item name='chiPhiLuuTru' label='Chi Phí Lưu Trú (VNĐ)' rules={[{required: true }]}>
                        <InputNumber min={1000} />
                    </Form.Item>
                    <Form.Item name='rating' label='Đánh Giá' rules={[{required: true }]}>
                        <Rate allowHalf defaultValue={2.5} />
                    </Form.Item>
                    <Form.Item name='hinhAnh' label='Hình Ảnh'>
                        <Upload listType="picture" maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={dsDiemDen} columns={columns} />
        </div>
    );
};
export default TrangQuanTri;