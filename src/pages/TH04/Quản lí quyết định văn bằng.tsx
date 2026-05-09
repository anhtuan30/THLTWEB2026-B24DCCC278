import { useState } from 'react';
import { Table, Space, Button, Form, Modal, Input, message, DatePicker, Select, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

type QuyetDinh = {
    key: number;
    soQD: string;
    ngayBanHanh: Date;
    trichYeu: string;
    soVanBangId: number;
};

const QuanLiQuyetDinhVanBang = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [dsQuyetDinh, setDsQuyetDinh] = useState<QuyetDinh[]>([]);
    const [editingKey, setEditingKey] = useState<number | null>(null);

    // Giả sử danh sách sổ văn bằng (có thể lấy từ props hoặc API)
    const dsSoVanBang = [
        { key: 1, tenSoVanBang: 'Sổ 2023', namTotNghiep: 2023 },
        { key: 2, tenSoVanBang: 'Sổ 2024', namTotNghiep: 2024 },
    ];

    const showModal = () => {
        form.resetFields();
        setEditingKey(null);
        setModalOpen(true);
    };

    const showEditModal = (record: QuyetDinh) => {
        form.setFieldsValue({
            soQD: record.soQD,
            ngayBanHanh: record.ngayBanHanh,
            trichYeu: record.trichYeu,
            soVanBangId: record.soVanBangId,
        });
        setEditingKey(record.key);
        setModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const record: QuyetDinh = {
                key: editingKey ?? Date.now(),
                soQD: values.soQD,
                ngayBanHanh: values.ngayBanHanh,
                trichYeu: values.trichYeu,
                soVanBangId: values.soVanBangId,
            };

            if (editingKey !== null) {
                setDsQuyetDinh((prev) => prev.map((item) => (item.key === editingKey ? record : item)));
                message.success('Cập nhật quyết định thành công!');
            } else {
                setDsQuyetDinh((prev) => [...prev, record]);
                message.success('Thêm mới quyết định thành công!');
            }

            setModalOpen(false);
            form.resetFields();
            setEditingKey(null);
        } catch (errorInfo) {
            // Validation failed
        }
    };

    const handleCancel = () => {
        setModalOpen(false);
        setEditingKey(null);
    };

    const handleDelete = (key: number) => {
        setDsQuyetDinh((prev) => prev.filter((item) => item.key !== key));
        message.success('Xóa quyết định thành công.');
    };

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Số QĐ',
            dataIndex: 'soQD',
            key: 'soQD',
        },
        {
            title: 'Ngày ban hành',
            dataIndex: 'ngayBanHanh',
            key: 'ngayBanHanh',
            render: (date: Date) => date ? new Date(date).toLocaleDateString('vi-VN') : '',
        },
        {
            title: 'Trích yếu',
            dataIndex: 'trichYeu',
            key: 'trichYeu',
        },
        {
            title: 'Sổ văn bằng',
            dataIndex: 'soVanBangId',
            key: 'soVanBangId',
            render: (id: number) => dsSoVanBang.find((so) => so.key === id)?.tenSoVanBang || 'N/A',
        },
        {
            title: 'Thao tác',
            key: 'thaoTac',
            render: (_: any, record: QuyetDinh) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa quyết định này không?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="default" danger icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Quản lí quyết định văn bằng</h1>
            <Button type="primary" style={{ marginBottom: 15 }} onClick={showModal} icon={<PlusOutlined />}>
                Thêm mới quyết định
            </Button>
            <Modal
                title={editingKey ? 'Chỉnh sửa quyết định' : 'Thêm mới quyết định'}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Số QĐ"
                        name="soQD"
                        rules={[{ required: true, message: 'Vui lòng nhập số quyết định' }]}
                    >
                        <Input placeholder="Nhập số quyết định" />
                    </Form.Item>
                    <Form.Item
                        label="Ngày ban hành"
                        name="ngayBanHanh"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày ban hành' }]}
                    >
                        <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày ban hành" />
                    </Form.Item>
                    <Form.Item
                        label="Trích yếu"
                        name="trichYeu"
                        rules={[{ required: true, message: 'Vui lòng nhập trích yếu' }]}
                    >
                        <Input.TextArea placeholder="Nhập trích yếu" rows={3} />
                    </Form.Item>
                    <Form.Item
                        label="Sổ văn bằng"
                        name="soVanBangId"
                        rules={[{ required: true, message: 'Vui lòng chọn sổ văn bằng' }]}
                    >
                        <Select placeholder="Chọn sổ văn bằng">
                            {dsSoVanBang.map((so) => (
                                <Select.Option key={so.key} value={so.key}>
                                    {so.tenSoVanBang} ({so.namTotNghiep})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={dsQuyetDinh} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default QuanLiQuyetDinhVanBang;