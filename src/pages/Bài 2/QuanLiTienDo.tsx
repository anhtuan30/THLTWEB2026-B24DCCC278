import {Table, Button, Modal} from 'antd';
import { useState } from 'react';
const QuanLiTienDo = () => {
    const datasource = [
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
    ];

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

const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

return (

    <div style={{ padding: '20px' }}>
        <h2>Quản lí tiến độ học tập</h2>
        
        
    <Button type="primary" onClick={showModal} style={{marginBottom:'20px'}}>Thêm Lịch học</Button>
    <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
    <Table dataSource={datasource} columns={columns} />
    </div>
);
};
export default QuanLiTienDo;