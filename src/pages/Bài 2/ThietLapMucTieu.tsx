import { useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, Progress, Tag, Card, Typography, Select, message } from 'antd';
import { TagOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ThietLapMucTieu = () => {
  const [goals, setGoals] = useState([
    { id: 1, monHoc: 'Toán', mucTieu: 40, daHoanThanh: 30 },
    { id: 2, monHoc: 'Tiếng Anh', mucTieu: 20, daHoanThanh: 25 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddGoal = (values: any) => {
    const newGoal = {
      id: Date.now(),
      ...values,
      daHoanThanh: 0, // Mặc định mục tiêu mới chưa có giờ học nào
    };
    setGoals([...goals, newGoal]);
    message.success('Đã thiết lập mục tiêu mới!');
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: 'Môn học', dataIndex: 'monHoc', key: 'monHoc' },
    { 
      title: 'Mục tiêu (Giờ)',
      dataIndex: 'mucTieu',
      key: 'mucTieu',
      render: (_: any,text: any ) => <b>{text} giờ</b>
    },
    { 
      title: 'Đã học',
      dataIndex: 'daHoanThanh',
      key: 'daHoanThanh',
      render: (_: any, text: any) => <span>{text} giờ</span>
    },
    {
      title: 'Tiến độ',
      key: 'progress',
      render: (_: any, record: any) => {
        const percent = Math.round((record.daHoanThanh / record.mucTieu) * 100);
        return <Progress percent={percent} size="small" status={percent >= 100 ? 'success' : 'active'} />;
      }
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: any) => {
        const isDone = record.daHoanThanh >= record.mucTieu;
        return (
          <Tag color={isDone ? 'green' : 'orange'} style={{ borderRadius: '10px' }}>
            {isDone ? 'Đã đạt mục tiêu' : 'Đang thực hiện'}
          </Tag>
        );
      }
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <Title level={3}><TagOutlined /> Mục tiêu học tập tháng 3/2026</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Thiết lập mục tiêu
          </Button>
        </div>

        <Table dataSource={goals} columns={columns} rowKey="id" pagination={false} />
      </Card>

      <Modal
        title="Thiết lập mục tiêu mới"
        visible={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
      >
        <Form form={form} layout="vertical" onFinish={handleAddGoal}>
          <Form.Item name="monHoc" label="Chọn môn học" rules={[{ required: true }]}>
            <Select placeholder="Chọn môn từ danh mục">
              <Select.Option value="Toán">Toán</Select.Option>
              <Select.Option value="Văn">Văn</Select.Option>
              <Select.Option value="Tiếng Anh">Tiếng Anh</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="mucTieu"
            label="Số giờ mục tiêu trong tháng"
            rules={[{ required: true, type: 'number', min: 1, message: 'Vui lòng nhập số giờ dương' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Ví dụ: 30" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ThietLapMucTieu;



