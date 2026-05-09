import { useState } from 'react';
import { Table, Space, Button, Form, Modal, Input, message, InputNumber, DatePicker, Select, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

type TruongThongTin = {
    key: number;
    tenTruong: string;
    kieuDuLieu: 'String' | 'Number' | 'Date';
};

type ThongTinVanBang = {
    key: number;
    soVaoSo: number;
    soHieuVanBang: string;
    msv: string;
    hoTen: string;
    ngaySinh: Date;
    quyetDinhId: number;
    truongDong: Record<string, any>; // Các trường động từ cấu hình
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ThongTinVanBang = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [dsThongTinVanBang, setDsThongTinVanBang] = useState<ThongTinVanBang[]>([]);
    const [editingKey, setEditingKey] = useState<number | null>(null);

    // Giả sử danh sách quyết định (có thể lấy từ props hoặc API)
    const dsQuyetDinh = [
        { key: 1, soQD: 'QĐ 123/2023', trichYeu: 'Đợt 1 năm 2023' },
        { key: 2, soQD: 'QĐ 124/2023', trichYeu: 'Đợt 2 năm 2023' },
    ];

    // Giả sử danh sách trường thông tin động (từ cấu hình)
    const dsTruongThongTin: TruongThongTin[] = [
        { key: 1, tenTruong: 'Dân tộc', kieuDuLieu: 'String' },
        { key: 2, tenTruong: 'Điểm trung bình', kieuDuLieu: 'Number' },
        { key: 3, tenTruong: 'Ngày nhập học', kieuDuLieu: 'Date' },
    ];

    // Tính số vào sổ tiếp theo dựa trên quyết định
    const getNextSoVaoSo = (quyetDinhId: number) => {
        const existing = dsThongTinVanBang.filter((item) => item.quyetDinhId === quyetDinhId);
        return existing.length + 1;
    };

    const showModal = () => {
        form.resetFields();
        setEditingKey(null);
        setModalOpen(true);
    };

    const showEditModal = (record: ThongTinVanBang) => {
        form.setFieldsValue({
            soHieuVanBang: record.soHieuVanBang,
            msv: record.msv,
            hoTen: record.hoTen,
            ngaySinh: record.ngaySinh,
            quyetDinhId: record.quyetDinhId,
            ...record.truongDong,
        });
        setEditingKey(record.key);
        setModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const quyetDinhId = values.quyetDinhId;
            const soVaoSo = editingKey !== null
                ? dsThongTinVanBang.find((item) => item.key === editingKey)?.soVaoSo || getNextSoVaoSo(quyetDinhId)
                : getNextSoVaoSo(quyetDinhId);

            const truongDong: Record<string, any> = {};
            dsTruongThongTin.forEach((truong) => {
                truongDong[truong.tenTruong] = values[truong.tenTruong];
            });

            const record: ThongTinVanBang = {
                key: editingKey ?? Date.now(),
                soVaoSo,
                soHieuVanBang: values.soHieuVanBang,
                msv: values.msv,
                hoTen: values.hoTen,
                ngaySinh: values.ngaySinh,
                quyetDinhId,
                truongDong,
            };

            if (editingKey !== null) {
                setDsThongTinVanBang((prev) => prev.map((item) => (item.key === editingKey ? record : item)));
                message.success('Cập nhật thông tin văn bằng thành công!');
            } else {
                setDsThongTinVanBang((prev) => [...prev, record]);
                message.success('Thêm mới thông tin văn bằng thành công!');
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
        setDsThongTinVanBang((prev) => prev.filter((item) => item.key !== key));
        message.success('Xóa thông tin văn bằng thành công.');
    };

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Số vào sổ',
            dataIndex: 'soVaoSo',
            key: 'soVaoSo',
        },
        {
            title: 'Số hiệu văn bằng',
            dataIndex: 'soHieuVanBang',
            key: 'soHieuVanBang',
        },
        {
            title: 'MSV',
            dataIndex: 'msv',
            key: 'msv',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaySinh',
            key: 'ngaySinh',
            render: (date: Date) => new Date(date).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Quyết định',
            dataIndex: 'quyetDinhId',
            key: 'quyetDinhId',
            render: (id: number) => dsQuyetDinh.find((qd) => qd.key === id)?.soQD || 'N/A',
        },
        ...dsTruongThongTin.map((truong) => ({
            title: truong.tenTruong,
            key: truong.tenTruong,
            render: (_: any, record: ThongTinVanBang) => record.truongDong[truong.tenTruong] || '',
        })),
        {
            title: 'Thao tác',
            key: 'thaoTac',
            render: (_: any, record: ThongTinVanBang) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa thông tin văn bằng này không?"
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
            <h1>Thông tin văn bằng</h1>
            <Button type="primary" style={{ marginBottom: 15 }} onClick={showModal} icon={<PlusOutlined />}>
                Thêm mới văn bằng
            </Button>
            <Modal
                title={editingKey ? 'Chỉnh sửa thông tin văn bằng' : 'Thêm mới thông tin văn bằng'}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Số hiệu văn bằng"
                        name="soHieuVanBang"
                        rules={[{ required: true, message: 'Vui lòng nhập số hiệu văn bằng' }]}
                    >
                        <Input placeholder="Nhập số hiệu văn bằng" />
                    </Form.Item>
                    <Form.Item
                        label="MSV"
                        name="msv"
                        rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên' }]}
                    >
                        <Input placeholder="Nhập mã sinh viên" />
                    </Form.Item>
                    <Form.Item
                        label="Họ tên"
                        name="hoTen"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                    >
                        <Input placeholder="Nhập họ tên" />
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh"
                        name="ngaySinh"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
                    >
                        <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày sinh" />
                    </Form.Item>
                    <Form.Item
                        label="Quyết định tốt nghiệp"
                        name="quyetDinhId"
                        rules={[{ required: true, message: 'Vui lòng chọn quyết định' }]}
                    >
                        <Select placeholder="Chọn quyết định">
                            {dsQuyetDinh.map((qd) => (
                                <Select.Option key={qd.key} value={qd.key}>
                                    {qd.soQD} - {qd.trichYeu}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {dsTruongThongTin.map((truong) => (
                        <Form.Item
                            key={truong.key}
                            label={truong.tenTruong}
                            name={truong.tenTruong}
                            rules={[{ required: true, message: `Vui lòng nhập ${truong.tenTruong}` }]}
                        >
                            {truong.kieuDuLieu === 'String' && <Input placeholder={`Nhập ${truong.tenTruong}`} />}
                            {truong.kieuDuLieu === 'Number' && <InputNumber style={{ width: '100%' }} placeholder={`Nhập ${truong.tenTruong}`} />}
                            {truong.kieuDuLieu === 'Date' && <DatePicker style={{ width: '100%' }} placeholder={`Chọn ${truong.tenTruong}`} />}
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
            <Table columns={columns} dataSource={dsThongTinVanBang} pagination={{ pageSize: 5 }} scroll={{ x: 1200 }} />
        </div>
    );
};

export default ThongTinVanBang;