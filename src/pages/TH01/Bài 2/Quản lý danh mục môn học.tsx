import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

interface Subject {
  id: string;
  name: string;
}

const QuanLiDanhMucMonHoc = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem('subjects');
    if (stored) {
      setSubjects(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (data: Subject[]) => {
    localStorage.setItem('subjects', JSON.stringify(data));
    setSubjects(data);
  };

  const handleAdd = () => {
    setEditingSubject(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    form.setFieldsValue(subject);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    const newSubjects = subjects.filter(s => s.id !== id);
    saveToStorage(newSubjects);
    message.success('Đã xóa môn học!');
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingSubject) {
        const newSubjects = subjects.map(s => s.id === editingSubject.id ? { ...s, ...values } : s);
        saveToStorage(newSubjects);
        message.success('Đã cập nhật môn học!');
      } else {
        const newSubject: Subject = { id: Date.now().toString(), ...values };
        saveToStorage([...subjects, newSubject]);
        message.success('Đã thêm môn học!');
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'Tên môn học', dataIndex: 'name', key: 'name' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text: any, record: Subject) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }} type='primary' icon={<EditOutlined/>}>Sửa</Button>
          <Button danger onClick={() => handleDelete(record.id)} type='default' icon={<DeleteOutlined/>}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý danh mục môn học</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }} icon={<PlusOutlined/>}>Thêm môn học</Button>
      <Table columns={columns} dataSource={subjects} rowKey="id" />
      <Modal
        title={editingSubject ? 'Sửa môn học' : 'Thêm môn học'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên môn học" rules={[{ required: true, message: 'Vui lòng nhập tên môn học!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLiDanhMucMonHoc;
