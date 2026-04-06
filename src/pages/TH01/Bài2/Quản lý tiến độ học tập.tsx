import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, InputNumber, message } from 'antd';
import moment from 'moment';
import { PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

interface StudySession {
  id: string;
  subject: string;
  dateTime: string;
  duration: number;
  content: string;
  notes: string;
}

const QuanLiTienDoHocTap = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedSessions = localStorage.getItem('studySessions');
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    }
    const storedSubjects = localStorage.getItem('subjects');
    if (storedSubjects) {
      const subs = JSON.parse(storedSubjects).map((s: any) => s.name);
      setSubjects(subs);
    }
  }, []);

  const saveToStorage = (data: StudySession[]) => {
    localStorage.setItem('studySessions', JSON.stringify(data));
    setSessions(data);
  };

  const handleAdd = () => {
    setEditingSession(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (session: StudySession) => {
    setEditingSession(session);
    form.setFieldsValue({
      ...session,
      dateTime: moment(session.dateTime),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    const newSessions = sessions.filter(s => s.id !== id);
    saveToStorage(newSessions);
    message.success('Đã xóa lịch học!');
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const sessionData = {
        ...values,
        dateTime: values.dateTime.format('YYYY-MM-DD HH:mm'),
      };
      if (editingSession) {
        const newSessions = sessions.map(s => s.id === editingSession.id ? { ...s, ...sessionData } : s);
        saveToStorage(newSessions);
        message.success('Đã cập nhật lịch học!');
      } else {
        const newSession: StudySession = { id: Date.now().toString(), ...sessionData };
        saveToStorage([...sessions, newSession]);
        message.success('Đã thêm lịch học!');
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'Môn học', dataIndex: 'subject', key: 'subject' },
    { title: 'Thời gian học', dataIndex: 'dateTime', key: 'dateTime' },
    { title: 'Thời lượng (phút)', dataIndex: 'duration', key: 'duration' },
    { title: 'Nội dung đã học', dataIndex: 'content', key: 'content' },
    { title: 'Ghi chú', dataIndex: 'notes', key: 'notes' },
    {
      title: 'Hành động',
      key: 'action',
      render: (text: any, record: StudySession) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }} type='primary' icon={<EditOutlined/>}>Sửa</Button>
          <Button danger onClick={() => handleDelete(record.id)} type='default' icon={<DeleteOutlined/>}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý tiến độ học tập</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }} icon={<PlusOutlined/>}>Thêm lịch học</Button>
      <Table columns={columns} dataSource={sessions} rowKey="id" />
      <Modal
        title={editingSession ? 'Sửa phiên học' : 'Thêm lịch học'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="subject" label="Môn học" rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}>
            <Select>
              {subjects.map(sub => <Select.Option key={sub} value={sub}>{sub}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="dateTime" label="Thời gian học" rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item name="duration" label="Thời lượng (phút)" rules={[{ required: true, message: 'Vui lòng nhập thời lượng!' }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="content" label="Nội dung đã học" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="notes" label="Ghi chú">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLiTienDoHocTap;