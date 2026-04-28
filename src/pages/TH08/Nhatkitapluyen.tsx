import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
// Mock data
const initialData = [
  { id: 1, date: '2023-10-25', type: 'Cardio', duration: 30, calories: 300, note: 'Chạy bộ', status: 'Hoàn thành' },
  { id: 2, date: '2023-10-24', type: 'Strength', duration: 45, calories: 400, note: 'Tập tạ', status: 'Hoàn thành' },
];

const Nhatkitapluyen: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [form] = Form.useForm();

  

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      date: moment(record.date),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };
      if (editingRecord) {
        setData(data.map(item => item.id === editingRecord.id ? { ...item, ...newValues } : item));
      } else {
        const newId = Math.max(...data.map(item => item.id)) + 1;
        setData([...data, { id: newId, ...newValues }]);
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Loại bài tập', dataIndex: 'type', key: 'type' },
    { title: 'Thời lượng (phút)', dataIndex: 'duration', key: 'duration' },
    { title: 'Calo đốt', dataIndex: 'calories', key: 'calories' },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'action',
      render: (record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Nhật ký tập luyện</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm buổi tập
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Modal title={editingRecord ? 'Sửa buổi tập' : 'Thêm buổi tập'} visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Ngày tập" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="type" label="Loại bài tập" rules={[{ required: true }]}>
            <Select>
              <Option value="Cardio">Cardio</Option>
              <Option value="Strength">Strength</Option>
              <Option value="Yoga">Yoga</Option>
              <Option value="HIIT">HIIT</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="duration" label="Thời lượng (phút)" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="calories" label="Calo đốt" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
            <Select>
              <Option value="Hoàn thành">Hoàn thành</Option>
              <Option value="Bỏ lỡ">Bỏ lỡ</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Nhatkitapluyen;