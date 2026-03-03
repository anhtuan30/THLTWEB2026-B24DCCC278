import {Table, Button, Modal, Form, message, Input} from 'antd';
import { useState } from 'react';
const QuanLiTienDo = () => {
    const [datasource, setDatasource] = useState([
        {
            tenMon: 'Toán',
            ngayGio: '7h30 - 9h30, 20/2/2026',
            thoiLuongHoc: '2 giờ',
            noiDungDaHoc: 'Giới thiệu về đạo hàm',
            ghiChu: 'Cần ôn lại kiến thức về đạo hàm',
        },

        {
            tenMon: 'Văn',
            ngayGio: '13h30 - 15h30, 20/2/2026',
            thoiLuongHoc: '1 giờ',
            noiDungDaHoc: 'Giới thiệu về văn học hiện đại',
            ghiChu: 'Cần ôn lại kiến thức về văn học cổ điển',
        },

        {
            tenMon: 'Tiếng Anh',
            ngayGio: '7h30 - 9h30, 21/2/2026',
            thoiLuongHoc: '1 giờ 30 phút',
            noiDungDaHoc: 'Giới thiệu về tiếng Anh',
            ghiChu: 'Cần ôn lại kiến thức về ngữ pháp',
        },

        {
            tenMon: 'Lý',
            ngayGio: '14h00 - 16h00, 21/2/2026',
            thoiLuongHoc: '2 giờ',
            noiDungDaHoc: 'Giới thiệu về lý học',
            ghiChu: 'Cần ôn lại kiến thức về lý học cơ bản',
        },
    ]
  );

const columns = [
  {
    title: 'Tên môn',
    dataIndex: 'tenMon',
    key: 'tenMon',
  },
  {
    title: 'Ngày giờ',
    dataIndex: 'ngayGio',
    key: 'ngayGio',
  },
  {
    title: 'Thời lượng học',
    dataIndex: 'thoiLuongHoc',
    key: 'thoiLuongHoc',
  },
  {
    title: 'Nội dung đã học',
    dataIndex: 'noiDungDaHoc',
    key: 'noiDungDaHoc',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'ghiChu',
    key: 'ghiChu',
  },
  {
    title: 'Thao tác',
    dataIndex: 'thaoTac',
    key: 'thaoTac',
    render: () => (
      <>
      <Button type="primary" >Xóa</Button>
      <Button type="primary" style={{ marginLeft: '10px' }}>Sửa</Button>
      </>
    ),
  },
];

const [form] = Form.useForm();
const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
};

const handleOk = () => {
    form.validateFields().then((values) => {
    setDatasource(prev => [...prev, values]);
    message.success('Thêm lịch học thành công!');
    setIsModalOpen(false);
    form.resetFields();
    }).catch((info) => {
    console.log('Validate Failed:', info);
    });
};

const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
};
return (

    <div style={{ padding: '20px' }}>
        <h2>Quản lí tiến độ học tập</h2>
        <>
    <Button type="primary" onClick={showModal} style={{marginBottom:'20px'}}>Thêm Lịch học</Button>
    <Modal title="Thêm Lịch học"visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
        form={form}
        layout="vertical">
          
          <Form.Item
          label="Tên môn"
          name="tenMon"
          rules={[{ required: true, message: 'Vui lòng nhập tên môn!' }]}>
            <Input placeholder='Nhập tên môn' />
          </Form.Item>
          
          <Form.Item
          label="Ngày giờ"
          name="ngayGio"
          rules={[{ required: true, message: 'Vui lòng nhập ngày giờ!' }]}>
            <Input placeholder='Nhập ngày giờ' />
          </Form.Item>
          
          <Form.Item
          label="Thời lượng học"
          name="thoiLuongHoc"
          rules={[{ required: true, message: 'Vui lòng nhập thời lượng học!' }]}>
            <Input placeholder='Nhập thời lượng học' />
          </Form.Item>
          
          <Form.Item
          label="Nội dung đã học"
          name="noiDungDaHoc"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung đã học!' }]}>
            <Input placeholder='Nhập nội dung đã học'/>
          </Form.Item>
          
          <Form.Item
          label="Ghi chú"
          name="ghiChu">
            <Input placeholder='Nhập ghi chú'/>
          </Form.Item>
        
        </Form>
    </Modal>
    </>
    <Table dataSource={datasource} columns={columns} />
    </div>

);
};
export default QuanLiTienDo;