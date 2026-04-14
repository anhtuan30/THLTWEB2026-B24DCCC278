import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Tabs, Table, Button, Modal, Form, Input, InputNumber, 
  Select, Tag, Space, Card, Row, Col, Statistic, message
} from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

// --- TYPES ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  products: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

// --- DỮ LIỆU KHỞI TẠO ---
const defaultProducts = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
  { id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
  { id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
  { id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
  { id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
];

const defaultOrders = [
  {
    id: 'DH001',
    customerName: 'Nguyễn Văn A',
    phone: '0912345678',
    address: '123 Nguyễn Huệ, Q1, TP.HCM',
    products: [{ productId: 1, productName: 'Laptop Dell XPS 13', quantity: 1, price: 25000000 }],
    totalAmount: 25000000,
    status: 'Chờ xử lý',
    createdAt: moment().format('YYYY-MM-DD HH:mm'),
  }
];

const StoreManagementSystem = () => {
  // --- STATE QUẢN LÝ DỮ LIỆU LÕI (Có lưu LocalStorage) ---
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sms_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sms_orders');
    return saved ? JSON.parse(saved) : defaultOrders;
  });

  // Lưu dữ liệu mỗi khi state thay đổi
  useEffect(() => {
    localStorage.setItem('sms_products', JSON.stringify(products));
    localStorage.setItem('sms_orders', JSON.stringify(orders));
  }, [products, orders]);

  // --- STATE TÌM KIẾM & LỌC ---
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState(null);
  
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState(null);

  // --- STATE UI (Modals) ---
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm] = Form.useForm();

  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [orderForm] = Form.useForm();

  // ==========================================
  // 1. TÍNH TOÁN DASHBOARD (useMemo giúp không tính lại nếu data không đổi)
  // ==========================================
  const dashboardStats = useMemo(() => {
    const totalProducts = products.length;
    const inventoryValue = products.reduce((sum: number, p: Product) => sum + (p.price * p.quantity), 0);
    const totalOrders = orders.length;
    
    const completedOrders = orders.filter((o: Order) => o.status === 'Hoàn thành');
    const revenue = completedOrders.reduce((sum: number, o: Order) => sum + o.totalAmount, 0);

    const statusCounts = orders.reduce((acc: any, order: Order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return { totalProducts, inventoryValue, totalOrders, revenue, statusCounts };
  }, [products, orders]);

  // ==========================================
  // 2. NGHIỆP VỤ SẢN PHẨM
  // ==========================================
  const filteredProducts = useMemo(() => {
    return products.filter((p: Product) => {
      const matchName = p.name.toLowerCase().includes(productSearch.toLowerCase());
      const matchCat = productCatFilter ? p.category === productCatFilter : true;
      return matchName && matchCat;
    });
  }, [products, productSearch, productCatFilter]);

  const openEditProduct = (record: Product) => {
    setEditingProduct(record);
    productForm.setFieldsValue(record);
    setIsProductModalVisible(true);
  };

  const handleSaveProduct = (values: any) => {
    if (editingProduct) {
      setProducts(products.map((p: Product) => p.id === editingProduct.id ? { ...p, ...values } : p));
      message.success('Cập nhật sản phẩm thành công!');
    }
    setIsProductModalVisible(false);
  };

  // ==========================================
  // 3. NGHIỆP VỤ ĐƠN HÀNG (Logic cốt lõi)
  // ==========================================
  const filteredOrders = useMemo(() => {
    return orders.filter((o: Order) => {
      const matchSearch = o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) || o.id.toLowerCase().includes(orderSearch.toLowerCase());
      const matchStatus = orderStatusFilter ? o.status === orderStatusFilter : true;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Phân tích nghiệp vụ: Đồng bộ kho hàng khi đổi trạng thái
  const handleStatusChange = useCallback((orderId: string, newStatus: string) => {
    setOrders((prevOrders: Order[]) => prevOrders.map((order: Order) => {
      if (order.id !== orderId) return order;

      const oldStatus = order.status;
      // Nếu trạng thái mới là Hoàn thành -> Trừ kho
      if (newStatus === 'Hoàn thành' && oldStatus !== 'Hoàn thành') {
        setProducts((prevProds: Product[]) => {
          let updatedProds = [...prevProds];
          order.products.forEach((item: OrderItem) => {
            updatedProds = updatedProds.map((p: Product) => 
              p.id === item.productId ? { ...p, quantity: Math.max(0, p.quantity - item.quantity) } : p
            );
          });
          return updatedProds;
        });
      }
      
      // Nếu trạng thái mới là Đã hủy (và trước đó đã trừ kho) -> Hoàn kho
      if (newStatus === 'Đã hủy' && oldStatus === 'Hoàn thành') {
        setProducts((prevProds: Product[]) => {
          let updatedProds = [...prevProds];
          order.products.forEach((item: OrderItem) => {
            updatedProds = updatedProds.map((p: Product) => 
              p.id === item.productId ? { ...p, quantity: p.quantity + item.quantity } : p
            );
          });
          return updatedProds;
        });
      }

      return { ...order, status: newStatus };
    }));
    message.success(`Đã cập nhật trạng thái đơn ${orderId} thành ${newStatus}`);
  }, []);

  const handleCreateOrder = (values: any) => {
    // Tính toán tổng tiền
    let total = 0;
    const orderItems = values.products.map((productId: number) => {
      const prod = products.find((p: Product) => p.id === productId);
      // Giả sử mỗi sản phẩm thêm vào lấy mặc định số lượng 1. Ở mức nâng cao hơn, bạn sẽ làm form động (Form.List) để chọn số lượng từng món.
      const qty = 1; 
      total += prod.price * qty;
      return { productId: prod.id, productName: prod.name, quantity: qty, price: prod.price };
    });

    const newOrder = {
      id: `DH${Date.now().toString().slice(-4)}`,
      customerName: values.customerName,
      phone: values.phone,
      address: values.address,
      products: orderItems,
      totalAmount: total,
      status: 'Chờ xử lý',
      createdAt: moment().format('YYYY-MM-DD HH:mm'),
    };

    setOrders([newOrder, ...orders]);
    message.success('Tạo đơn hàng thành công!');
    setIsOrderModalVisible(false);
    orderForm.resetFields();
  };

  // ==========================================
  // CẤU TRÚC CỘT CHO TABLE
  // ==========================================
  const productColumns = [
    { title: 'STT', render: (text: any, record: any, index: number) => index + 1, width: 60 },
    { title: 'Tên sản phẩm', dataIndex: 'name', sorter: (a: Product, b: Product) => a.name.localeCompare(b.name) },
    { title: 'Danh mục', dataIndex: 'category' },
    { 
      title: 'Giá', 
      dataIndex: 'price', 
      render: (val: number) => `${new Intl.NumberFormat('vi-VN').format(val)} đ`,
      sorter: (a: Product, b: Product) => a.price - b.price
    },
    { 
      title: 'Tồn kho', 
      dataIndex: 'quantity',
      sorter: (a: Product, b: Product) => a.quantity - b.quantity 
    },
    {
      title: 'Trạng thái',
      render: (_: any, record: Product) => {
        let color = 'green';
        let text = 'Còn hàng';
        if (record.quantity === 0) { color = 'red'; text = 'Hết hàng'; }
        else if (record.quantity <= 10) { color = 'orange'; text = 'Sắp hết'; }
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: 'Thao tác',
      render: (_: any, record: Product) => (
        <Button type="link" icon={<EditOutlined />} onClick={() => openEditProduct(record)}>
          Sửa
        </Button>
      )
    }
  ];

  const orderColumns = [
    { title: 'Mã ĐH', dataIndex: 'id', width: 80 },
    { title: 'Khách hàng', dataIndex: 'customerName' },
    { 
      title: 'Tổng tiền', 
      dataIndex: 'totalAmount',
      render: (val: number) => <strong style={{color: '#cf1322'}}>{new Intl.NumberFormat('vi-VN').format(val)} đ</strong>,
      sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount
    },
    { title: 'Ngày tạo', dataIndex: 'createdAt', sorter: (a: Order, b: Order) => moment(a.createdAt).unix() - moment(b.createdAt).unix() },
    {
      title: 'Trạng thái',
      render: (_: any, record: Order) => (
        <Select 
          value={record.status} 
          style={{ width: 130 }} 
          onChange={(val) => handleStatusChange(record.id, val)}
          options={[
            { value: 'Chờ xử lý', label: 'Chờ xử lý' },
            { value: 'Đang giao', label: 'Đang giao' },
            { value: 'Hoàn thành', label: 'Hoàn thành' },
            { value: 'Đã hủy', label: 'Đã hủy' },
          ]}
        />
      )
    }
  ];

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: 24 }}>Hệ Thống Quản Lý Cửa Hàng</h2>
      
      <Tabs defaultActiveKey="1" type="card" style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
        
        {/* --- TAB 1: DASHBOARD --- */}
        <Tabs.TabPane tab="Tổng quan (Dashboard)" key="1">
          <Row gutter={16}>
            <Col span={6}>
              <Card><Statistic title="Tổng sản phẩm" value={dashboardStats.totalProducts} /></Card>
            </Col>
            <Col span={6}>
              <Card><Statistic title="Giá trị tồn kho" value={dashboardStats.inventoryValue} suffix="đ" /></Card>
            </Col>
            <Col span={6}>
              <Card><Statistic title="Tổng đơn hàng" value={dashboardStats.totalOrders} /></Card>
            </Col>
            <Col span={6}>
              <Card><Statistic title="Doanh thu (Hoàn thành)" value={dashboardStats.revenue} suffix="đ" valueStyle={{ color: '#3f8600' }}/></Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={24}>
              <Card title="Trạng thái đơn hàng">
                <Space size="large">
                  <Tag color="blue">Chờ xử lý: {dashboardStats.statusCounts['Chờ xử lý'] || 0}</Tag>
                  <Tag color="cyan">Đang giao: {dashboardStats.statusCounts['Đang giao'] || 0}</Tag>
                  <Tag color="green">Hoàn thành: {dashboardStats.statusCounts['Hoàn thành'] || 0}</Tag>
                  <Tag color="red">Đã hủy: {dashboardStats.statusCounts['Đã hủy'] || 0}</Tag>
                </Space>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>

        {/* --- TAB 2: SẢN PHẨM --- */}
        <Tabs.TabPane tab="Quản lý Sản phẩm" key="2">
          <Space style={{ marginBottom: 16 }}>
            <Input.Search placeholder="Tìm tên sản phẩm" onChange={e => setProductSearch(e.target.value)} style={{ width: 250 }} />
            <Select placeholder="Lọc danh mục" allowClear style={{ width: 150 }} onChange={setProductCatFilter}>
              <Option value="Laptop">Laptop</Option>
              <Option value="Điện thoại">Điện thoại</Option>
              <Option value="Máy tính bảng">Máy tính bảng</Option>
              <Option value="Phụ kiện">Phụ kiện</Option>
            </Select>
          </Space>
          <Table 
            columns={productColumns} 
            dataSource={filteredProducts} 
            rowKey="id" 
            pagination={{ pageSize: 5 }} 
          />
        </Tabs.TabPane>

        {/* --- TAB 3: ĐƠN HÀNG --- */}
        <Tabs.TabPane tab="Quản lý Đơn hàng" key="3">
          <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Space>
              <Input.Search placeholder="Tìm mã ĐH / Tên KH" onChange={e => setOrderSearch(e.target.value)} style={{ width: 250 }} />
              <Select placeholder="Trạng thái" allowClear style={{ width: 150 }} onChange={setOrderStatusFilter}>
                <Option value="Chờ xử lý">Chờ xử lý</Option>
                <Option value="Đang giao">Đang giao</Option>
                <Option value="Hoàn thành">Hoàn thành</Option>
                <Option value="Đã hủy">Đã hủy</Option>
              </Select>
            </Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOrderModalVisible(true)}>
              Tạo đơn hàng mới
            </Button>
          </Space>
          <Table 
            columns={orderColumns} 
            dataSource={filteredOrders} 
            rowKey="id" 
            pagination={{ pageSize: 5 }} 
          />
        </Tabs.TabPane>

      </Tabs>

      {/* --- MODAL: SỬA SẢN PHẨM --- */}
      <Modal 
        title="Chỉnh sửa sản phẩm" 
        visible={isProductModalVisible}
        onOk={() => productForm.submit()} 
        onCancel={() => setIsProductModalVisible(false)}
      >
        <Form form={productForm} layout="vertical" onFinish={handleSaveProduct}>
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
             <Select>
              <Option value="Laptop">Laptop</Option>
              <Option value="Điện thoại">Điện thoại</Option>
              <Option value="Máy tính bảng">Máy tính bảng</Option>
              <Option value="Phụ kiện">Phụ kiện</Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="quantity" label="Tồn kho" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* --- MODAL: TẠO ĐƠN HÀNG --- */}
      <Modal 
        title="Tạo Đơn Hàng Mới" 
        visible={isOrderModalVisible}
        onOk={() => orderForm.submit()} 
        onCancel={() => { setIsOrderModalVisible(false); orderForm.resetFields(); }}
        width={600}
      >
        <Form form={orderForm} layout="vertical" onFinish={handleCreateOrder}>
          <Form.Item name="customerName" label="Tên khách hàng" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>
          <Form.Item 
            name="phone" 
            label="Số điện thoại" 
            rules={[
              { required: true, message: 'Vui lòng nhập SĐT!' },
              { pattern: /^[0-9]{10,11}$/, message: 'SĐT không hợp lệ (10-11 số)!' }
            ]}
          >
            <Input placeholder="0912345678" />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="products" label="Chọn sản phẩm" rules={[{ required: true, message: 'Phải chọn ít nhất 1 sản phẩm!' }]}>
            <Select 
              mode="multiple" 
              placeholder="Vui lòng chọn sản phẩm"
              optionLabelProp="label"
            >
              {products.map((p: Product) => (
                <Option key={p.id} value={p.id} label={p.name} disabled={p.quantity === 0}>
                  {p.name} - {new Intl.NumberFormat('vi-VN').format(p.price)}đ (Tồn: {p.quantity})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StoreManagementSystem;