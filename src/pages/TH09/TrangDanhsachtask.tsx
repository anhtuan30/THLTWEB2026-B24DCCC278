import React, { useEffect, useState } from 'react';
import { Table, Input, Select, Button, Space, Tag, Modal, Form, DatePicker } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { Task, TaskStatus, Priority} from './taskData';
import { loadTasks, saveTasks, STATUS_LABELS, PRIORITY_LABELS, getStatusColor, getPriorityColor, formatDeadline } from './taskData';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const TrangDanhsach: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
    setFilteredTasks(loadedTasks);
  }, []);

  useEffect(() => {
    let filtered = tasks;
    if (searchText) {
      filtered = filtered.filter(task => task.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    setFilteredTasks(filtered);
  }, [tasks, searchText, statusFilter]);

  const showModal = (task?: Task) => {
    setEditingTask(task || null);
    if (task) {
      form.setFieldsValue({
        ...task,
        deadline: moment(task.deadline),
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newTask: Task = {
        id: editingTask?.id || `task-${Date.now()}`,
        name: values.name,
        description: values.description,
        deadline: values.deadline.format('YYYY-MM-DD'),
        priority: values.priority,
        status: editingTask?.status || 'todo',
        tags: values.tags || [],
        createdAt: editingTask?.createdAt || moment().toISOString(),
      };

      let newTasks;
      if (editingTask) {
        newTasks = tasks.map(task => task.id === editingTask.id ? newTask : task);
      } else {
        newTasks = [...tasks, newTask];
      }

      setTasks(newTasks);
      saveTasks(newTasks);
      setIsModalVisible(false);
      setEditingTask(null);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const columns = [
    {
      title: 'Tên công việc',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Task, b: Task) => a.name.localeCompare(b.name),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (deadline: string) => formatDeadline(deadline),
      sorter: (a: Task, b: Task) => moment(a.deadline).unix() - moment(b.deadline).unix(),
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: Priority) => <Tag color={getPriorityColor(priority)}>{PRIORITY_LABELS[priority]}</Tag>,
      filters: [
        { text: 'Cao', value: 'High' },
        { text: 'Trung bình', value: 'Medium' },
        { text: 'Thấp', value: 'Low' },
      ],
      onFilter: (value: string | number | boolean, record: Task) => record.priority === value,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: TaskStatus) => <Tag color={getStatusColor(status)}>{STATUS_LABELS[status]}</Tag>,
      filters: [
        { text: 'Cần làm', value: 'todo' },
        { text: 'Đang làm', value: 'doing' },
        { text: 'Hoàn thành', value: 'done' },
      ],
      onFilter: (value: string | number | boolean, record: Task) => record.status === value,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => tags.map(tag => <Tag key={tag}>{tag}</Tag>),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Task) => (
        <Space size="middle">
          <Button onClick={() => showModal(record)}>Sửa</Button>
          <Button danger onClick={() => deleteTask(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Danh sách công việc</h1>
      <Space style={{ marginBottom: '20px' }}>
        <Input
          placeholder="Tìm kiếm theo tên"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Lọc theo trạng thái"
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 150 }}
          allowClear
        >
          <Option value="todo">Cần làm</Option>
          <Option value="doing">Đang làm</Option>
          <Option value="done">Hoàn thành</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Thêm công việc
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingTask ? 'Chỉnh sửa công việc' : 'Thêm công việc'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên công việc" rules={[{ required: true, message: 'Vui lòng nhập tên công việc!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline" rules={[{ required: true, message: 'Vui lòng chọn deadline!' }]}>
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item name="priority" label="Ưu tiên" rules={[{ required: true, message: 'Vui lòng chọn ưu tiên!' }]}>
            <Select>
              <Option value="High">Cao</Option>
              <Option value="Medium">Trung bình</Option>
              <Option value="Low">Thấp</Option>
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="tags" placeholder="Nhập tags" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TrangDanhsach;