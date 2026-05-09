import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Select, Rate, Input, Spin, Typography, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

// Mock data cho điểm đến (thay bằng API thực tế sau)
const mockDestinations = [
  {
    id: 1,
    name: 'Đà Nẵng',
    location: 'Việt Nam',
    image: 'https://via.placeholder.com/300x200?text=Da+Nang',
    rating: 4.5,
    type: 'biển',
    price: 2000000, // VND
  },
  {
    id: 2,
    name: 'Sapa',
    location: 'Việt Nam',
    image: 'https://via.placeholder.com/300x200?text=Sapa',
    rating: 4.2,
    type: 'núi',
    price: 1500000,
  },
  {
    id: 3,
    name: 'Hồ Chí Minh',
    location: 'Việt Nam',
    image: 'https://via.placeholder.com/300x200?text=Ho+Chi+Minh',
    rating: 4.0,
    type: 'thành phố',
    price: 1000000,
  },
  // Thêm nhiều điểm đến khác nếu cần
];

const TrangChu = () => {
  const [filteredDestinations, setFilteredDestinations] = useState(mockDestinations);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
    minRating: 0,
    search: '',
  });
  const [sortBy, setSortBy] = useState('rating'); // 'rating' hoặc 'price'

  useEffect(() => {
    setLoading(true);
    const filtered = mockDestinations.filter((dest) => {
      const matchesType = !filters.type || dest.type === filters.type;
      const matchesPrice =
        !filters.priceRange ||
        (filters.priceRange === 'low' && dest.price < 1500000) ||
        (filters.priceRange === 'medium' && dest.price >= 1500000 && dest.price < 2000000) ||
        (filters.priceRange === 'high' && dest.price >= 2000000);
      const matchesRating = dest.rating >= filters.minRating;
      const matchesSearch = !filters.search || dest.name.toLowerCase().includes(filters.search.toLowerCase());
      return matchesType && matchesPrice && matchesRating && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

    setFilteredDestinations(sorted);
    setLoading(false);
  }, [filters, sortBy]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToItinerary = (destination: typeof mockDestinations[number]) => {
    message.success(`${destination.name} đã được thêm vào lịch trình`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Khám phá điểm đến</Title>

      {/* Filter và Sort */}
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={6}>
          <Select
            placeholder="Lọc theo loại hình"
            style={{ width: '100%' }}
            allowClear
            value={filters.type}
            onChange={(value) => handleFilterChange('type', value)}
          >
            <Option value="biển">Biển</Option>
            <Option value="núi">Núi</Option>
            <Option value="thành phố">Thành phố</Option>
          </Select>
        </Col>
        <Col xs={24} sm={6}>
          <Select
            placeholder="Lọc theo giá"
            style={{ width: '100%' }}
            allowClear
            value={filters.priceRange}
            onChange={(value) => handleFilterChange('priceRange', value)}
          >
            <Option value="low">Dưới 1.5 triệu</Option>
            <Option value="medium">1.5 - 2 triệu</Option>
            <Option value="high">Trên 2 triệu</Option>
          </Select>
        </Col>
        <Col xs={24} sm={6}>
          <Select
            placeholder="Đánh giá tối thiểu"
            style={{ width: '100%' }}
            value={filters.minRating}
            onChange={(value) => handleFilterChange('minRating', value)}
          >
            <Option value={0}>Tất cả</Option>
            <Option value={3}>3 sao trở lên</Option>
            <Option value={4}>4 sao trở lên</Option>
            <Option value={5}>5 sao</Option>
          </Select>
        </Col>
        <Col xs={24} sm={6}>
          <Select
            placeholder="Sắp xếp theo"
            style={{ width: '100%' }}
            value={sortBy}
            onChange={setSortBy}
          >
            <Option value="rating">Đánh giá cao nhất</Option>
            <Option value="price">Giá thấp nhất</Option>
          </Select>
        </Col>
      </Row>

      {/* Search */}
      <Row style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Search
            placeholder="Tìm kiếm điểm đến"
            enterButton
            prefix={<SearchOutlined />}
            value={filters.search}
            onSearch={(value) => handleFilterChange('search', value)}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

      {/* Danh sách điểm đến */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredDestinations.map((dest) => (
            <Col xs={24} sm={12} md={8} lg={6} key={dest.id}>
              <Card
                hoverable
                cover={<img alt={dest.name} src={dest.image} style={{ height: 200, objectFit: 'cover' }} />}
                actions={[
                  <Button type="primary" key="add" block onClick={() => handleAddToItinerary(dest)}>
                    Thêm vào lịch trình
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={dest.name}
                  description={
                    <>
                      <p>{dest.location}</p>
                      <Rate disabled allowHalf value={dest.rating} />
                      <p>Giá: {dest.price.toLocaleString()} VND</p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default TrangChu;