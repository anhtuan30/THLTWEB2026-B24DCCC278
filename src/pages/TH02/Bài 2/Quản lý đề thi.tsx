import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Space, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface CauHoi {
  id: number;
  maCauHoi: string;
  monHoc: string;
  noiDung: string;
  mucDoKho: string;
  khoiKienThuc: string;
}

interface CauTruc {
  mucDoKho: string;
  khoiKienThuc: string;
  soLuong: number;
}

interface DeThi {
  id: number;
  tenDeThi: string;
  monHoc: string;
  cauHoi: CauHoi[];
}

const QuanLyDeThi = () => {
  // Giả sử dữ liệu câu hỏi từ QuanLyCauHoi
  const cauHoiData: CauHoi[] = [
    { id: 1, maCauHoi: 'Q001', monHoc: 'CS101', noiDung: 'Giải thích cấu trúc dữ liệu stack', mucDoKho: 'Dễ', khoiKienThuc: 'Tổng quan' },
    { id: 2, maCauHoi: 'Q002', monHoc: 'CS102', noiDung: 'Thuật toán sắp xếp nhanh', mucDoKho: 'Khó', khoiKienThuc: 'Chuyên sâu' },
    { id: 3, maCauHoi: 'Q003', monHoc: 'CS101', noiDung: 'Cấu trúc dữ liệu queue', mucDoKho: 'Trung bình', khoiKienThuc: 'Tổng quan' },
  ];

  const [deThiData, setDeThiData] = useState<DeThi[]>([]);
  const [visible, setVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DeThi | null>(null);
  const [form] = Form.useForm();
  const [generateVisible, setGenerateVisible] = useState(false);
  const [selectedCauTruc, setSelectedCauTruc] = useState<{ monHoc: string; cauTruc: CauTruc[] } | null>(null);

  const monHocOptions = ['CS101', 'CS102'];
  const mucDoKhoOptions = ['Dễ', 'Trung bình', 'Khó', 'Rất khó'];
  const khoiKienThucOptions = ['Tổng quan', 'Chuyên sâu'];

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEdit = (record: DeThi) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = (id: number) => {
    setDeThiData(deThiData.filter(item => item.id !== id));
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        setDeThiData(deThiData.map(item => item.id === editingRecord.id ? { ...item, ...values } : item));
      } else {
        const newItem: DeThi = { id: Date.now(), ...values };
        setDeThiData([...deThiData, newItem]);
      }
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleGenerate = (cauTruc: { monHoc: string; cauTruc: CauTruc[] }) => {
    setSelectedCauTruc(cauTruc);
    setGenerateVisible(true);
  };

  const generateDeThi = () => {
    if (!selectedCauTruc) return;
    const { monHoc, cauTruc } = selectedCauTruc;
    const availableQuestions = cauHoiData.filter(q => q.monHoc === monHoc);
    const selectedQuestions: CauHoi[] = [];

    for (const ct of cauTruc) {
      const { mucDoKho, khoiKienThuc, soLuong } = ct;
      const filtered = availableQuestions.filter(q => q.mucDoKho === mucDoKho && q.khoiKienThuc === khoiKienThuc);
      if (filtered.length < soLuong) {
        message.error(`Không đủ câu hỏi cho ${mucDoKho} - ${khoiKienThuc}`);
        return;
      }
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      selectedQuestions.push(...shuffled.slice(0, soLuong));
    }

    const newDeThi: DeThi = {
      id: Date.now(),
      tenDeThi: `Đề thi ${monHoc} ${new Date().toLocaleDateString()}`,
      monHoc,
      cauHoi: selectedQuestions,
    };
    setDeThiData([...deThiData, newDeThi]);
    setGenerateVisible(false);
    message.success('Đề thi đã được tạo thành công');
  };

  const columns = [
    {
      title: 'Tên đề thi',
      dataIndex: 'tenDeThi',
      key: 'tenDeThi',
    },
    {
      title: 'Môn học',
      dataIndex: 'monHoc',
      key: 'monHoc',
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'cauHoi',
      key: 'cauHoi',
      render: (cauHoi: CauHoi[]) => cauHoi.map(q => q.maCauHoi).join(', '),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: DeThi) => (
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
        Tạo cấu trúc đề thi
      </Button>
      <Table columns={columns} dataSource={deThiData} rowKey="id" />
      <Modal
        title={editingRecord ? 'Sửa đề thi' : 'Tạo cấu trúc đề thi'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="tenDeThi" label="Tên đề thi" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="monHoc" label="Môn học" rules={[{ required: true }]}>
            <Select>
              {monHocOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
            </Select>
          </Form.Item>
          {/* Cấu trúc: Dynamic fields for mucDoKho, khoiKienThuc, soLuong */}
          <Form.List name="cauTruc">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name, 'mucDoKho']} rules={[{ required: true }]}>
                      <Select placeholder="Mức độ khó" style={{ width: 120 }}>
                        {mucDoKhoOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'khoiKienThuc']} rules={[{ required: true }]}>
                      <Select placeholder="Khối kiến thức" style={{ width: 120 }}>
                        {khoiKienThucOptions.map(opt => <Option key={opt} value={opt}>{opt}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'soLuong']} rules={[{ required: true }]}>
                      <InputNumber placeholder="Số lượng" min={1} />
                    </Form.Item>
                    <Button type="link" onClick={() => remove(name)}>Xóa</Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm cấu trúc
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
      <Modal
        title="Xác nhận tạo đề thi"
        visible={generateVisible}
        onOk={generateDeThi}
        onCancel={() => setGenerateVisible(false)}
      >
        <p>Bạn có muốn tạo đề thi từ cấu trúc này không?</p>
      </Modal>
    </div>
  );
};

export default QuanLyDeThi;