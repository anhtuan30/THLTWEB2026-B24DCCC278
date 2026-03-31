import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Table, Modal, Button, Form, message, Input, InputNumber, DatePicker, Card, Statistic } from 'antd';

type ThongTinVanBang = {
    key: number;
    soHieuVanBang: string;
    soVaoSo: number;
    msv: string;
    hoTen: string;
    ngaySinh: Date;
    quyetDinh: string;
    luotTraCuu: number;
};

const TraCuuVanBang = () => {
    const [dsTraCuu, setDsTraCuu] = useState<ThongTinVanBang[]>([]);
    const [form] = Form.useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<ThongTinVanBang | null>(null);
    const [totalLuotTraCuu, setTotalLuotTraCuu] = useState(0);

    // Giả sử dữ liệu mẫu (thay bằng API)
    const mockData: ThongTinVanBang[] = [
        {
            key: 1,
            soHieuVanBang: 'VB2023001',
            soVaoSo: 1,
            msv: 'SV001',
            hoTen: 'Nguyễn Văn A',
            ngaySinh: new Date('2000-01-01'),
            quyetDinh: 'QĐ 123/2023',
            luotTraCuu: 5,
        },
        {
            key: 2,
            soHieuVanBang: 'VB2023002',
            soVaoSo: 2,
            msv: 'SV002',
            hoTen: 'Trần Thị B',
            ngaySinh: new Date('2000-02-02'),
            quyetDinh: 'QĐ 124/2023',
            luotTraCuu: 3,
        },
    ];

    const showModal = () => {
        form.resetFields();
        setModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            // Validation: ít nhất 2 tham số
            const filledFields = Object.values(values).filter((val) => val !== undefined && val !== null && val !== '');
            if (filledFields.length < 2) {
                message.error('Vui lòng nhập ít nhất 2 tham số để tra cứu.');
                return;
            }

            // Giả sử tìm kiếm (thay bằng API call)
            const results = mockData.filter((item) => {
                return (
                    (!values.soHieuVanBang || item.soHieuVanBang.includes(values.soHieuVanBang)) &&
                    (!values.soVaoSo || item.soVaoSo === values.soVaoSo) &&
                    (!values.msv || item.msv.includes(values.msv)) &&
                    (!values.hoTen || item.hoTen.toLowerCase().includes(values.hoTen.toLowerCase())) &&
                    (!values.ngaySinh || new Date(item.ngaySinh).toDateString() === new Date(values.ngaySinh).toDateString())
                );
            });

            setDsTraCuu(results);
            setModalOpen(false);
            message.success(`Tìm thấy ${results.length} kết quả.`);
        } catch (errorInfo) {
            // Validation failed
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setModalOpen(false);
    };

    const showDetail = (record: ThongTinVanBang) => {
        setSelectedRecord(record);
        setDetailModalOpen(true);
        // Ghi nhận lượt tra cứu
        setTotalLuotTraCuu((prev) => prev + 1);
        setDsTraCuu((prev) =>
            prev.map((item) =>
                item.key === record.key ? { ...item, luotTraCuu: item.luotTraCuu + 1 } : item
            )
        );
    };

    const handleDetailCancel = () => {
        setDetailModalOpen(false);
        setSelectedRecord(null);
    };

    const columns = [
        {
            title: 'Số hiệu văn bằng',
            dataIndex: 'soHieuVanBang',
            key: 'soHieuVanBang',
        },
        {
            title: 'Số vào sổ',
            dataIndex: 'soVaoSo',
            key: 'soVaoSo',
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
            dataIndex: 'quyetDinh',
            key: 'quyetDinh',
        },
        {
            title: 'Lượt tra cứu',
            dataIndex: 'luotTraCuu',
            key: 'luotTraCuu',
        },
        {
            title: 'Thao tác',
            key: 'thaoTac',
            render: (_: any, record: ThongTinVanBang) => (
                <Button type="primary" icon={<EyeOutlined />} onClick={() => showDetail(record)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div>
            <h1>Tra cứu văn bằng</h1>
            <Statistic title="Tổng lượt tra cứu" value={totalLuotTraCuu} style={{ marginBottom: 15 }} />
            <Button icon={<SearchOutlined />} type="primary" style={{ marginBottom: 15 }} onClick={showModal}>
                Tìm kiếm
            </Button>
            <Modal
                title="Tìm kiếm văn bằng"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Số hiệu văn bằng" name="soHieuVanBang">
                        <Input placeholder="Nhập số hiệu văn bằng" />
                    </Form.Item>
                    <Form.Item label="Số vào sổ" name="soVaoSo">
                        <InputNumber style={{ width: '100%' }} placeholder="Nhập số vào sổ" />
                    </Form.Item>
                    <Form.Item label="MSV" name="msv">
                        <Input placeholder="Nhập mã sinh viên" />
                    </Form.Item>
                    <Form.Item label="Họ tên" name="hoTen">
                        <Input placeholder="Nhập họ tên" />
                    </Form.Item>
                    <Form.Item label="Ngày sinh" name="ngaySinh">
                        <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày sinh" />
                    </Form.Item>
                    <div style={{ color: '#999', fontSize: '12px' }}>
                        * Ít nhất 2 tham số phải được nhập.
                    </div>
                </Form>
            </Modal>
            <Modal
                title="Chi tiết văn bằng"
                visible={isDetailModalOpen}
                onCancel={handleDetailCancel}
                footer={null}
            >
                {selectedRecord && (
                    <Card>
                        <p><strong>Số hiệu văn bằng:</strong> {selectedRecord.soHieuVanBang}</p>
                        <p><strong>Số vào sổ:</strong> {selectedRecord.soVaoSo}</p>
                        <p><strong>MSV:</strong> {selectedRecord.msv}</p>
                        <p><strong>Họ tên:</strong> {selectedRecord.hoTen}</p>
                        <p><strong>Ngày sinh:</strong> {new Date(selectedRecord.ngaySinh).toLocaleDateString('vi-VN')}</p>
                        <p><strong>Quyết định:</strong> {selectedRecord.quyetDinh}</p>
                        <p><strong>Lượt tra cứu:</strong> {selectedRecord.luotTraCuu}</p>
                    </Card>
                )}
            </Modal>
            <Table columns={columns} dataSource={dsTraCuu} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default TraCuuVanBang;