import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface MonHoc {
  id: number;
  maMon: string;
  tenMon: string;
  soTinChi: number;
}

const DanhMucMonHoc = () => {
  const [dataSource, setDataSource] = useState<MonHoc[]>([
    { id: 1, maMon: 'CS101', tenMon: 'Cấu trúc dữ liệu', soTinChi: 3 },
    { id: 2, maMon: 'CS102', tenMon: 'Thuật toán', soTinChi: 4 },
  ]);
  const [visible, setVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MonHoc | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEdit = (record: MonHoc) => {
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
        const newItem: MonHoc = { id: Date.now(), ...values };
        setDataSource([...dataSource, newItem]);
      }
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Mã môn',
      dataIndex: 'maMon',
      key: 'maMon',
    },
    {
      title: 'Tên môn',
      dataIndex: 'tenMon',
      key: 'tenMon',
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'soTinChi',
      key: 'soTinChi',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: MonHoc) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm mới
      </Button>
      <Table columns={columns} dataSource={dataSource} rowKey="id" />
      <Modal
        title={editingRecord ? 'Sửa môn học' : 'Thêm môn học'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="maMon" label="Mã môn" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tenMon" label="Tên môn" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="soTinChi" label="Số tín chỉ" rules={[{ required: true, type: 'number', min: 1 }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DanhMucMonHoc;