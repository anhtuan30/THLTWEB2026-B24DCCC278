import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, DatePicker, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const initialData = [
  { id: 1, date: '2023-10-25', weight: 70, height: 170, heartRate: 60, sleepHours: 8 },
  { id: 2, date: '2023-10-24', weight: 69.5, height: 170, heartRate: 62, sleepHours: 7.5 },
];

const calculateBMI = (weight: number, height: number) => {
  const heightM = height / 100;
  return (weight / (heightM * heightM)).toFixed(1);
};

const getBMITag = (bmi: number) => {
  if (bmi < 18.5) return <Tag color="blue">Thiếu cân</Tag>;
  if (bmi < 25) return <Tag color="green">Bình thường</Tag>;
  if (bmi < 30) return <Tag color="yellow">Thừa cân</Tag>;
  return <Tag color="red">Béo phì</Tag>;
};

const Nhatkichisosuckhoe: React.FC = () => {
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
    { title: 'Cân nặng (kg)', dataIndex: 'weight', key: 'weight' },
    { title: 'Chiều cao (cm)', dataIndex: 'height', key: 'height' },
    {
      title: 'BMI',
      key: 'bmi',
      render: (record: any) => {
        const bmi = parseFloat(calculateBMI(record.weight, record.height));
        return <span>{bmi} {getBMITag(bmi)}</span>;
      },
    },
    { title: 'Nhịp tim (bpm)', dataIndex: 'heartRate', key: 'heartRate' },
    { title: 'Giờ ngủ', dataIndex: 'sleepHours', key: 'sleepHours' },
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
      <h1>Nhật ký chỉ số sức khỏe</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm chỉ số
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Modal title={editingRecord ? 'Sửa chỉ số' : 'Thêm chỉ số'} visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Ngày" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="weight" label="Cân nặng (kg)" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.1} />
          </Form.Item>
          <Form.Item name="height" label="Chiều cao (cm)" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="heartRate" label="Nhịp tim (bpm)" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="sleepHours" label="Giờ ngủ" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.5} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Nhatkichisosuckhoe;