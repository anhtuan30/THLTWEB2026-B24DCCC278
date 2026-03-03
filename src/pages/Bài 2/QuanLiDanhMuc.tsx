import {Table, Button, Modal} from 'antd';
import { useState } from 'react';
const QuanLiDanhMuc = () => {
    const datasource = [
        {
            id: 1,
            tenDanhMuc: 'Toán',
        },
        {
            id: 2,
            tenDanhMuc: 'Văn',
        },
        {
            id: 3,
            tenDanhMuc: 'Tiếng Anh',
        },
        {
            id: 4,
            tenDanhMuc: 'Lý'
        },
    ];
    const columns = [
        {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        },

        {
        title: 'Tên danh mục',
        dataIndex: 'tenDanhMuc',
        key: 'tenDanhMuc',
        },

        {
            title: 'Thao tác',
            dataIndex: 'thaotac',
            key: 'thaotac',
            render: () => (
                <>
                <Button type = 'primary'>Xóa</Button>
                <Button type = 'primary'style={{ marginLeft: '10px' }}>Sửa</Button>
                </>
            )     
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


return(
    <div style ={{ padding: '20px' }}>
        <h1> Quản Lí Danh Mục </h1>
        <>
      <Button type="primary" onClick={showModal} style={{marginBottom :'20px'}}>Thêm danh mục</Button>
      <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
    
    <Table dataSource={datasource} columns={columns} />
    </div>
);

};

export default QuanLiDanhMuc;