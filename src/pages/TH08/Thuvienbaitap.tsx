import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, Input, Select, InputNumber, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Meta } = Card;

const initialExercises = [
  { id: 1, name: 'Chạy bộ', muscleGroup: 'Legs', difficulty: 'Dễ', description: 'Chạy bộ ngoài trời', caloriesPerHour: 500, instructions: 'Chạy chậm, tăng dần tốc độ.' },
  { id: 2, name: 'Tập tạ ngực', muscleGroup: 'Chest', difficulty: 'Trung bình', description: 'Đẩy tạ nằm', caloriesPerHour: 300, instructions: 'Nằm ngửa, đẩy tạ lên.' },
];

const Thuvienbaitap: React.FC = () => {
  const [exercises, setExercises] = useState(initialExercises);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingExercise, setEditingExercise] = useState<any>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  const filteredExercises = exercises.filter(ex =>
    ex.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterGroup === '' || ex.muscleGroup === filterGroup) &&
    (filterDifficulty === '' || ex.difficulty === filterDifficulty)
  );

  const handleAdd = () => {
    setEditingExercise(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (exercise: any) => {
    setEditingExercise(exercise);
    form.setFieldsValue(exercise);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingExercise) {
        setExercises(exercises.map(ex => ex.id === editingExercise.id ? { ...ex, ...values } : ex));
      } else {
        const newId = Math.max(...exercises.map(ex => ex.id)) + 1;
        setExercises([...exercises, { id: newId, ...values }]);
      }
      setIsModalVisible(false);
      // Reset filter để hiển thị bài tập vừa thêm/sửa
      setSearch('');
      setFilterGroup('');
      setFilterDifficulty('');
    });
  };

  const showDetail = (exercise: any) => {
    setSelectedExercise(exercise);
    setDetailModalVisible(true);
  };

  return (
    <div>
      <h1>Thư viện bài tập</h1>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Tìm kiếm tên bài tập" value={search} onChange={e => setSearch(e.target.value)} />
        <Select placeholder="Lọc nhóm cơ" value={filterGroup} onChange={setFilterGroup} allowClear>
          <Option value="Chest">Chest</Option>
          <Option value="Back">Back</Option>
          <Option value="Legs">Legs</Option>
          <Option value="Shoulders">Shoulders</Option>
          <Option value="Arms">Arms</Option>
          <Option value="Core">Core</Option>
          <Option value="Full Body">Full Body</Option>
        </Select>
        <Select placeholder="Lọc mức độ khó" value={filterDifficulty} onChange={setFilterDifficulty} allowClear>
          <Option value="Dễ">Dễ</Option>
          <Option value="Trung bình">Trung bình</Option>
          <Option value="Khó">Khó</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm bài tập
        </Button>
      </Space>
      <Row gutter={16}>
        {filteredExercises.map(exercise => (
          <Col span={8} key={exercise.id}>
            <Card
              hoverable
              actions={[
                // eslint-disable-next-line react/jsx-key
                <Button onClick={() => showDetail(exercise)}>Chi tiết</Button>,
                // eslint-disable-next-line react/jsx-key
                <Button icon={<EditOutlined />} onClick={() => handleEdit(exercise)} />,
                // eslint-disable-next-line react/jsx-key
                <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(exercise.id)}>
                  <Button icon={<DeleteOutlined />} danger />
                </Popconfirm>
              ]}
            >
              <Meta
                title={exercise.name}
                description={
                  <div>
                    <p>Nhóm cơ: {exercise.muscleGroup}</p>
                    <Tag color={exercise.difficulty === 'Dễ' ? 'green' : exercise.difficulty === 'Trung bình' ? 'orange' : 'red'}>
                      {exercise.difficulty}
                    </Tag>
                    <p>Calo/giờ: {exercise.caloriesPerHour}</p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal title={editingExercise ? 'Sửa bài tập' : 'Thêm bài tập'} visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên bài tập" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="muscleGroup" label="Nhóm cơ" rules={[{ required: true }]}>
            <Select>
              <Option value="Chest">Chest</Option>
              <Option value="Back">Back</Option>
              <Option value="Legs">Legs</Option>
              <Option value="Shoulders">Shoulders</Option>
              <Option value="Arms">Arms</Option>
              <Option value="Core">Core</Option>
              <Option value="Full Body">Full Body</Option>
            </Select>
          </Form.Item>
          <Form.Item name="difficulty" label="Mức độ khó" rules={[{ required: true }]}>
            <Select>
              <Option value="Dễ">Dễ</Option>
              <Option value="Trung bình">Trung bình</Option>
              <Option value="Khó">Khó</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Mô tả ngắn" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="caloriesPerHour" label="Calo đốt trung bình/giờ" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="instructions" label="Hướng dẫn thực hiện" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Chi tiết bài tập" visible={detailModalVisible} onCancel={() => setDetailModalVisible(false)} footer={null}>
        {selectedExercise && (
          <div>
            <h2>{selectedExercise.name}</h2>
            <p><strong>Nhóm cơ:</strong> {selectedExercise.muscleGroup}</p>
            <p><strong>Mức độ khó:</strong> <Tag color={selectedExercise.difficulty === 'Dễ' ? 'green' : selectedExercise.difficulty === 'Trung bình' ? 'orange' : 'red'}>{selectedExercise.difficulty}</Tag></p>
            <p><strong>Mô tả:</strong> {selectedExercise.description}</p>
            <p><strong>Calo/giờ:</strong> {selectedExercise.caloriesPerHour}</p>
            <p><strong>Hướng dẫn:</strong> {selectedExercise.instructions}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Thuvienbaitap;