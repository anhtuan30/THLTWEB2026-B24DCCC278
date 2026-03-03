import {Table, Button, Modal, Form, Input, message, Popconfirm} from 'antd';
import { useState } from 'react';
const QuanLiDanhMuc = () => {
    const [datasource, setDatasource] = useState([
        {
            id: 1,
            tenDanhMuc: 'Toán',
        },
        {
            id: 2,
            tenDanhMuc: 'Văn',
        },
        {
            id: 3,
            tenDanhMuc: 'Tiếng Anh',
        },
        {
            id: 4,
            tenDanhMuc: 'Lý'
        },
    ]
);

const [isModalOpen, setIsModalOpen] = useState(false);
const [form] = Form.useForm();
const [editingId, setEditingId] = useState<number | null>(null);

const showAddModal = () => {
        setEditingId(null);
        form.resetFields();
        setIsModalOpen(true);
};

const showEditModal = (record: any) => {
        setEditingId(record.id ?? null);
        form.setFieldsValue({ id: record.id, tenDanhMuc: record.tenDanhMuc });
        setIsModalOpen(true);
};

const handleOk = () => {
        form.validateFields().then((values) => {
            if (editingId == null) {
                // add
                setDatasource(prev => [...prev, values]);
                message.success('Thêm danh mục thành công!');
            } else {
                // update
                setDatasource(prev => prev.map(item => item.id === editingId ? { ...item, ...values } : item));
                message.success('Sửa danh mục thành công!');
            }
            setIsModalOpen(false);
            form.resetFields();
            setEditingId(null);
        }).catch((info) => {
            console.log('Validate Failed:', info);
        });
};

const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setEditingId(null);
};

// delete handler
const handleDelete = (id: number) => {
    setDatasource(prev => prev.filter(item => item.id !== id));
    message.success('Xóa danh mục thành công!');
};

const columns = [
        {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        },

        {
        title: 'Tên danh mục',
        dataIndex: 'tenDanhMuc',
        key: 'tenDanhMuc',
        },

        {
            title: 'Thao tác',
            dataIndex: 'thaotac',
            key: 'thaotac',
                        render: (_: any, record: any) => (
                                <>
                                <Popconfirm
                                    title="Bạn có chắc muốn xóa?"
                                    onConfirm={() => handleDelete(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type='primary' danger>Xóa</Button>
                                </Popconfirm>
                                <Button type='primary' style={{ marginLeft: '10px' }} onClick={() => showEditModal(record)}>Sửa</Button>
                                </>
                        )
        },
];

return(
    <div style ={{ padding: '20px' }}>
        <h1> Quản Lí Danh Mục </h1>
        <>
    <Button type="primary" onClick={showAddModal} style={{marginBottom :'20px'}}>Thêm danh mục</Button>
    <Modal title={editingId ? 'Sửa danh mục' : 'Thêm danh mục'} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
    form={form}
    layout="vertical"
    >
    <Form.Item
            label="ID"
            name="id"
            rules={[
            { required: true, message: 'Vui lòng nhập ID!' },
            ]}
        >
            <Input placeholder="Nhập ID" disabled={editingId != null} />
        </Form.Item>

        <Form.Item
            label="Tên danh mục"
            name="tenDanhMuc"
            rules={[
            { required: true, message: 'Vui lòng nhập tên danh mục!'},
            ]}
        >
            <Input placeholder="Nhập tên danh mục" />
        </Form.Item>
        </Form>
    </Modal>
    </>
    
    <Table dataSource={datasource} columns={columns} />
    </div>
);

};

export default QuanLiDanhMuc;