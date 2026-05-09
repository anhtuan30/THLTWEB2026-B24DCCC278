/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Button, Modal, Form, Input, Select, DatePicker, Tag, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Task, TaskStatus} from './taskData';
import { loadTasks, saveTasks, STATUS_LABELS, PRIORITY_LABELS, getPriorityColor, formatDeadline } from './taskData';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const TrangKanban: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId as TaskStatus;
    newTasks.splice(destination.index, 0, movedTask);

    setTasks(newTasks);
    saveTasks(newTasks);
  };

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

  const columns: TaskStatus[] = ['todo', 'doing', 'done'];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kanban Board</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
        Thêm công việc
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          {columns.map(status => (
            <div key={status} style={{ flex: 1 }}>
              <h3>{STATUS_LABELS[status]}</h3>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: '#f0f0f0',
                      padding: '10px',
                      minHeight: '400px',
                      borderRadius: '4px',
                    }}
                  >
                    {tasks
                      .filter(task => task.status === status)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                marginBottom: '10px',
                              }}
                            >
                              <Card
                                size="small"
                                title={task.name}
                                extra={
                                  <Space>
                                    <Button size="small" onClick={() => showModal(task)}>Sửa</Button>
                                    <Button size="small" danger onClick={() => deleteTask(task.id)}>Xóa</Button>
                                  </Space>
                                }
                              >
                                <p>{task.description}</p>
                                <p><strong>Deadline:</strong> {formatDeadline(task.deadline)}</p>
                                <p><strong>Ưu tiên:</strong> <Tag color={getPriorityColor(task.priority)}>{PRIORITY_LABELS[task.priority]}</Tag></p>
                                <div>
                                  {task.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                                </div>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

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

export default TrangKanban;