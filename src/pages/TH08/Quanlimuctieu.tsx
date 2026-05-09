import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select, DatePicker, Progress, Segmented, Popconfirm, Space, InputNumber } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

const initialGoals = [
  { id: 1, name: 'Giảm 5kg', type: 'Giảm cân', target: 5, current: 2, deadline: '2023-12-31', status: 'Đang thực hiện' },
  { id: 2, name: 'Tăng cơ tay', type: 'Tăng cơ', target: 10, current: 8, deadline: '2023-11-30', status: 'Đang thực hiện' },
];

const Quanlimuctieu: React.FC = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any>(null);
  const [form] = Form.useForm();
  const [filter, setFilter] = useState('Tất cả');

  const filteredGoals = filter === 'Tất cả' ? goals : goals.filter(g => g.status === filter);

  const handleAdd = () => {
    setEditingGoal(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (goal: any) => {
    setEditingGoal(goal);
    form.setFieldsValue({
      ...goal,
      deadline: moment(goal.deadline),
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingGoal(null);
    };

  const handleDelete = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleUpdateCurrent = (id: number, value: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, current: value } : g));
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newValues = {
        ...values,
        deadline: values.deadline.format('YYYY-MM-DD'),
      };
      if (editingGoal) {
        setGoals(goals.map(g => g.id === editingGoal.id ? { ...g, ...newValues } : g));
      } else {
        const newId = Math.max(...goals.map(g => g.id)) + 1;
        setGoals([...goals, { id: newId, ...newValues }]);
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <h1>Quản lý mục tiêu</h1>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm mục tiêu
        </Button>
        <Segmented options={['Tất cả', 'Đang thực hiện', 'Đã đạt', 'Đã hủy']} value={filter}
          onChange={(value) => setFilter(value as string)}/>
      </Space>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {filteredGoals.map(goal => (
          <Card key={goal.id} style={{ width: 300 }} actions={[
            // eslint-disable-next-line react/jsx-key
            <Button onClick={() => handleEdit(goal)}>Sửa</Button>,
            // eslint-disable-next-line react/jsx-key
            <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(goal.id)}>
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          ]}>
            <p><strong>{goal.name}</strong></p>
            <p>Loại: {goal.type}</p>
            <p>Giá trị hiện tại: <InputNumber min={0} 
                style={{ marginLeft: 8 }}
                value={goal.current} 
                onChange={(value) => value !== null && handleUpdateCurrent(goal.id, value)} /></p>
            <Progress percent={(goal.current / goal.target) * 100} />
            <p>Deadline: {goal.deadline}</p>
            <p>Trạng thái: {goal.status}</p>
          </Card>
        ))}
      </div>
      <Modal title={editingGoal ? 'Sửa mục tiêu' : 'Thêm mục tiêu'} visible={isModalVisible} 
      onCancel={handleCancel}
      onOk={handleOk}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên mục tiêu" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
            <Select>
              <Option value="Giảm cân">Giảm cân</Option>
              <Option value="Tăng cơ">Tăng cơ</Option>
              <Option value="Cải thiện sức bền">Cải thiện sức bền</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
          <Form.Item name="target" label="Giá trị mục tiêu" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="current" label="Giá trị hiện tại" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
            <Select>
              <Option value="Đang thực hiện">Đang thực hiện</Option>
              <Option value="Đã đạt">Đã đạt</Option>
              <Option value="Đã hủy">Đã hủy</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};


export default Quanlimuctieu;