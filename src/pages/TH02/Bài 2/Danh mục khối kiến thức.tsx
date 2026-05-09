import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface KhoiKienThuc {
  id: number;
  tenKhoi: string;
  moTa: string;
}

const DanhMucKhoiKienThuc = () => {
    
  const [dataSource, setDataSource] = useState<KhoiKienThuc[]>([
    { id: 1, tenKhoi: 'Tổng quan', moTa: 'Kiến thức cơ bản' },
    { id: 2, tenKhoi: 'Chuyên sâu', moTa: 'Kiến thức nâng cao' },
  ]);
  const [visible, setVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<KhoiKienThuc | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEdit = (record: KhoiKienThuc) => {
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
        const newItem: KhoiKienThuc = { id: Date.now(), ...values };
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
      title: 'Tên khối kiến thức',
      dataIndex: 'tenKhoi',
      key: 'tenKhoi',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: KhoiKienThuc) => (
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
        title={editingRecord ? 'Sửa khối kiến thức' : 'Thêm khối kiến thức'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="tenKhoi" label="Tên khối kiến thức" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="moTa" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DanhMucKhoiKienThuc;