import  { useState } from 'react';
import { Table, Input, Button, Modal, Form, InputNumber, Space, Popconfirm, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// Dữ liệu mẫu khởi tạo
const initialData = [
  { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
  { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
  { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
  { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
];

const ProductManagement = () => {
  // Quản lý state của danh sách sản phẩm và từ khóa tìm kiếm
  const [products, setProducts] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  
  // Quản lý trạng thái đóng/mở của Modal thêm sản phẩm
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // Hook của Ant Design để thao tác với Form
  const [form] = Form.useForm();

  // Lọc danh sách sản phẩm theo từ khóa tìm kiếm (realtime)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Xử lý khi nhấn nút Thêm sản phẩm
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Xử lý khi nhấn Hủy trên Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Xóa dữ liệu cũ trên form để lần sau mở lên form sẽ trống
  };

  // Xử lý khi Submit Form hợp lệ
  const handleAddProduct = (values: any) => {
    const newProduct = {
      id: Date.now(), // Tạo ID ngẫu nhiên bằng timestamp
      name: values.name,
      price: values.price,
      quantity: values.quantity,
    };
    // Cập nhật state bằng cách copy mảng cũ và thêm phần tử mới
    setProducts([...products, newProduct]);
    message.success('Thêm sản phẩm thành công!');
    
    // Đóng modal và reset form
    setIsModalVisible(false);
    form.resetFields();
  };

  // Xử lý khi xác nhận xóa sản phẩm
  const handleDelete = (id: number) => {
    const newProducts = products.filter(item => item.id !== id);
    setProducts(newProducts);
    message.success('Đã xóa sản phẩm!');
  };

  // Định nghĩa cấu trúc các cột cho Table
  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (text: any, record: any, index: number) => index + 1,
      width: 80,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá (VND)',
      dataIndex: 'price',
      key: 'price',
      // Format hiển thị tiền tệ
      render: (price: number) => new Intl.NumberFormat('vi-VN').format(price),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa sản phẩm này?"
          onConfirm={() => handleDelete(record.id)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
      <h2>Quản lý Danh sách Sản phẩm</h2>

      {/* Thanh công cụ: Tìm kiếm và Nút thêm */}
      <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="Tìm kiếm tên sản phẩm..."
          allowClear
          // Sự kiện onChange giúp cập nhật text liên tục khi gõ phím
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Thêm sản phẩm
        </Button>
      </Space>

      {/* Bảng dữ liệu */}
      <Table
        columns={columns}
        dataSource={filteredProducts} // Truyền dữ liệu đã lọc vào bảng
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal form thêm sản phẩm */}
      <Modal
        title="Thêm sản phẩm mới"
        visible={isModalVisible} // Lưu ý: Ở Antd v4 dùng 'visible', lên v5 sẽ đổi thành 'open'
        onOk={() => form.submit()} // Kích hoạt submit form khi nhấn OK
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          name="form_them_san_pham"
          onFinish={handleAddProduct} // Chỉ chạy hàm này khi dữ liệu pass qua hết các rules
        >
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá sản phẩm"
            rules={[
              { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
              { type: 'number', min: 1, message: 'Giá phải là số dương!' }
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Nhập giá" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng!' },
              { type: 'number', min: 1, message: 'Số lượng phải là số nguyên dương!' }
            ]}
          >
            {/* precision={0} đảm bảo người dùng chỉ nhập số nguyên */}
            <InputNumber style={{ width: '100%' }} placeholder="Nhập số lượng" precision={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;