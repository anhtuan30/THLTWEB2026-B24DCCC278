import { useState, useMemo } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface CauHoi {
  id: number;
  maCauHoi: string;
  monHoc: string;
  noiDung: string;
  mucDoKho: string;
  khoiKienThuc: string;
}

interface Filters {
  monHoc: string;
  mucDoKho: string;
  khoiKienThuc: string;
}

const QuanLyCauHoi = () => {
  const [dataSource, setDataSource] = useState<CauHoi[]>([
    { id: 1, maCauHoi: 'Q001', monHoc: 'CS101', noiDung: 'Giải thích cấu trúc dữ liệu stack', mucDoKho: 'Dễ', khoiKienThuc: 'Tổng quan' },
    { id: 2, maCauHoi: 'Q002', monHoc: 'CS102', noiDung: 'Thuật toán sắp xếp nhanh', mucDoKho: 'Khó', khoiKienThuc: 'Chuyên sâu' },
  ]);
  const [visible, setVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<CauHoi | null>(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState<Filters>({ monHoc: '', mucDoKho: '', khoiKienThuc: '' });

  const monHocOptions = ['CS101', 'CS102'];
  const mucDoKhoOptions = ['Dễ', 'Trung bình', 'Khó', 'Rất khó'];
  const khoiKienThucOptions = ['Tổng quan', 'Chuyên sâu'];

  const filteredData = useMemo(() => {
    return dataSource.filter(item =>
      (!filters.monHoc || item.monHoc === filters.monHoc) &&
      (!filters.mucDoKho || item.mucDoKho === filters.mucDoKho) &&
      (!filters.khoiKienThuc || item.khoiKienThuc === filters.khoiKienThuc)
    );
  }, [dataSource, filters]);

  const columns = [
    {
      title: 'Mã câu hỏi',
      dataIndex: 'maCauHoi',
      key: 'maCauHoi',
    },
    {
      title: 'Môn học',
      dataIndex: 'monHoc',
      key: 'monHoc',
    },
    {
      title: 'Nội dung',
      dataIndex: 'noiDung',
      key: 'noiDung',
    },
    {
      title: 'Mức độ khó',
      dataIndex: 'mucDoKho',
      key: 'mucDoKho',
    },
    {
      title: 'Khối kiến thức',
      dataIndex: 'khoiKienThuc',
      key: 'khoiKienThuc',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: CauHoi) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEdit = (record: CauHoi) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = (id: number) => {
    setDataSource(dataSource.filter(item => item.id !== id));
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        setDataSource(dataSource.map(item => item.id === editingRecord.id ? { ...item, ...values } : item));
      } else {
        const newItem: CauHoi = { id: Date.now(), ...values };
        setDataSource([...dataSource, newItem]);
      }
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Select placeholder="Chọn môn học" onChange={(value: string) => setFilters({ ...filters, monHoc: value })} allowClear>
          {monHocOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
        </Select>
        <Select placeholder="Chọn mức độ khó" onChange={(value: string) => setFilters({ ...filters, mucDoKho: value })} allowClear>
          {mucDoKhoOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
        </Select>
        <Select placeholder="Chọn khối kiến thức" onChange={(value: string) => setFilters({ ...filters, khoiKienThuc: value })} allowClear>
          {khoiKienThucOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Thêm mới</Button>
      </Space>
      <Table columns={columns} dataSource={filteredData} rowKey="id" />
      <Modal
        title={editingRecord ? 'Sửa câu hỏi' : 'Thêm câu hỏi'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="maCauHoi" label="Mã câu hỏi" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="monHoc" label="Môn học" rules={[{ required: true }]}>
            <Select>
              {monHocOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="noiDung" label="Nội dung" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="mucDoKho" label="Mức độ khó" rules={[{ required: true }]}>
            <Select>
              {mucDoKhoOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="khoiKienThuc" label="Khối kiến thức" rules={[{ required: true }]}>
            <Select>
              {khoiKienThucOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyCauHoi;