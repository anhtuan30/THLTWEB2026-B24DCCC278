import { useState } from 'react';
import { Table, Space, Button, Form, Modal, Input, message, Select, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

type TruongThongTin = {
    key: number;
    tenTruong: string;
    kieuDuLieu: 'String' | 'Number' | 'Date';
    moTa?: string;
};

const CauHinhSoVanBang = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [dsTruongThongTin, setDsTruongThongTin] = useState<TruongThongTin[]>([]);
    const [editingKey, setEditingKey] = useState<number | null>(null);

    const showModal = () => {
        form.resetFields();
        setEditingKey(null);
        setModalOpen(true);
    };

    const showEditModal = (record: TruongThongTin) => {
        form.setFieldsValue({
            tenTruong: record.tenTruong,
            kieuDuLieu: record.kieuDuLieu,
            moTa: record.moTa,
        });
        setEditingKey(record.key);
        setModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const isDuplicate = dsTruongThongTin.some(
                (item) =>
                    item.tenTruong.trim().toLowerCase() === values.tenTruong.trim().toLowerCase() &&
                    item.key !== editingKey,
            );
            if (isDuplicate) {
                message.error('Tên trường đã tồn tại. Vui lòng chọn tên khác.');
                return;
            }

            const record: TruongThongTin = {
                key: editingKey ?? Date.now(),
                tenTruong: values.tenTruong,
                kieuDuLieu: values.kieuDuLieu,
                moTa: values.moTa,
            };

            if (editingKey !== null) {
                setDsTruongThongTin((prev) => prev.map((item) => (item.key === editingKey ? record : item)));
                message.success('Cập nhật trường thông tin thành công!');
            } else {
                setDsTruongThongTin((prev) => [...prev, record]);
                message.success('Thêm mới trường thông tin thành công!');
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
        setDsTruongThongTin((prev) => prev.filter((item) => item.key !== key));
        message.success('Xóa trường thông tin thành công.');
    };

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Tên trường',
            dataIndex: 'tenTruong',
            key: 'tenTruong',
        },
        {
            title: 'Kiểu dữ liệu',
            dataIndex: 'kieuDuLieu',
            key: 'kieuDuLieu',
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
        },
        {
            title: 'Thao tác',
            key: 'thaoTac',
            render: (_: any, record: TruongThongTin) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa trường thông tin này không?"
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
            <h1>Cấu hình biểu mẫu phụ lục văn bằng</h1>
            <Button type="primary" style={{ marginBottom: 15 }} onClick={showModal} icon={<PlusOutlined />}>
                Thêm mới trường
            </Button>
            <Modal
                title={editingKey ? 'Chỉnh sửa trường thông tin' : 'Thêm mới trường thông tin'}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tên trường"
                        name="tenTruong"
                        rules={[{ required: true, message: 'Vui lòng nhập tên trường' }]}
                    >
                        <Input placeholder="Ví dụ: Dân tộc, Điểm trung bình" />
                    </Form.Item>
                    <Form.Item
                        label="Kiểu dữ liệu"
                        name="kieuDuLieu"
                        rules={[{ required: true, message: 'Vui lòng chọn kiểu dữ liệu' }]}
                    >
                        <Select placeholder="Chọn kiểu dữ liệu">
                            <Select.Option value="String">String</Select.Option>
                            <Select.Option value="Number">Number</Select.Option>
                            <Select.Option value="Date">Date</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Mô tả" name="moTa">
                        <Input.TextArea placeholder="Mô tả về trường thông tin (tùy chọn)" rows={2} />
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={dsTruongThongTin} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default CauHinhSoVanBang;