import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Select,
  Rate,
  Typography,
  List,
  Divider,
  Statistic,
  Alert,
  Space,
  Progress
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface DiemDen {
  id: number;
  ten: string;
  loai: 'Biển' | 'Núi' | 'Thành phố';
  gia: number;
  rating: number;
  thoiGian: number; // giờ
  chiPhiAnUong: number;
  chiPhiLuuTru: number;
  chiPhiDiChuyen: number;
  hinhAnh: string;
}

interface ItineraryItem {
  id: number;
  day: number;
  diemDen: DiemDen;
}

const budgetThreshold = 12000000;
const defaultDays = [1, 2, 3, 4, 5];

const destinations: DiemDen[] = [
  {
    id: 1,
    ten: 'Đà Nẵng',
    loai: 'Biển',
    gia: 2200000,
    rating: 4.7,
    thoiGian: 8,
    chiPhiAnUong: 600000,
    chiPhiLuuTru: 1200000,
    chiPhiDiChuyen: 300000,
    hinhAnh: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    ten: 'Sapa',
    loai: 'Núi',
    gia: 1800000,
    rating: 4.5,
    thoiGian: 10,
    chiPhiAnUong: 500000,
    chiPhiLuuTru: 900000,
    chiPhiDiChuyen: 250000,
    hinhAnh: 'https://images.unsplash.com/photo-1526779259212-7d6938c4f1d6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    ten: 'Hà Nội',
    loai: 'Thành phố',
    gia: 1400000,
    rating: 4.3,
    thoiGian: 6,
    chiPhiAnUong: 400000,
    chiPhiLuuTru: 800000,
    chiPhiDiChuyen: 200000,
    hinhAnh: 'https://images.unsplash.com/photo-1555243896-362d9a9e30f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    ten: 'Ninh Bình',
    loai: 'Thành phố',
    gia: 1700000,
    rating: 4.6,
    thoiGian: 9,
    chiPhiAnUong: 450000,
    chiPhiLuuTru: 850000,
    chiPhiDiChuyen: 220000,
    hinhAnh: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    ten: 'Phú Quốc',
    loai: 'Biển',
    gia: 2600000,
    rating: 4.8,
    thoiGian: 9,
    chiPhiAnUong: 700000,
    chiPhiLuuTru: 1300000,
    chiPhiDiChuyen: 350000,
    hinhAnh: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
];

const TaoLichTrinh: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Tất cả' | 'Biển' | 'Núi' | 'Thành phố'>('Tất cả');
  const [sortKey, setSortKey] = useState<'default' | 'gia' | 'rating'>('default');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  const filteredDestinations = useMemo(() => {
    let list = [...destinations];
    if (selectedCategory !== 'Tất cả') {
      list = list.filter(item => item.loai === selectedCategory);
    }
    if (sortKey === 'gia') {
      list.sort((a, b) => a.gia - b.gia);
    }
    if (sortKey === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [selectedCategory, sortKey]);

  const handleAddDestination = (destination: DiemDen) => {
    setItinerary(prev => [
      ...prev,
      {
        id: Date.now() + destination.id,
        day: selectedDay,
        diemDen: destination,
      },
    ]);
  };

  const handleRemoveItem = (itemId: number) => {
    setItinerary(prev => prev.filter(item => item.id !== itemId));
  };

  const handleMoveItem = (itemId: number, direction: 'up' | 'down') => {
    setItinerary(prev => {
      const updated = [...prev];
      const index = updated.findIndex(item => item.id === itemId);
      if (index === -1) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= updated.length) return prev;
      [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
      return updated;
    });
  };

  const itineraryByDay = useMemo(() => {
    return defaultDays.map(day => ({
      day,
      items: itinerary.filter(item => item.day === day),
    }));
  }, [itinerary]);

  const summary = useMemo(() => {
    const totalCost = itinerary.reduce((sum, item) => sum + item.diemDen.chiPhiAnUong + item.diemDen.chiPhiLuuTru + item.diemDen.chiPhiDiChuyen, 0);
    const travelTime = itinerary.length > 1 ? (itinerary.length - 1) * 1.5 : 0; // 1.5h giữa mỗi điểm
    const totalTime = itinerary.reduce((sum, item) => sum + item.diemDen.thoiGian, 0) + travelTime;
    return {
      totalCost,
      totalTime,
      exceedBudget: totalCost > budgetThreshold,
      progress: Math.min(100, Math.round((totalCost / budgetThreshold) * 100)),
    };
  }, [itinerary]);

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Tạo lịch trình du lịch</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card title="Khám phá điểm đến" bodyStyle={{ padding: 16 }}>
            <Space wrap style={{ marginBottom: 16 }}>
              <Select value={selectedCategory} onChange={value => setSelectedCategory(value)} style={{ minWidth: 140 }}>
                <Option value="Tất cả">Tất cả</Option>
                <Option value="Biển">Biển</Option>
                <Option value="Núi">Núi</Option>
                <Option value="Thành phố">Thành phố</Option>
              </Select>
              <Select value={sortKey} onChange={value => setSortKey(value)} style={{ minWidth: 180 }}>
                <Option value="default">Sắp xếp mặc định</Option>
                <Option value="gia">Giá tăng dần</Option>
                <Option value="rating">Rating cao xuống thấp</Option>
              </Select>
              <Text>Ngày thêm: </Text>
              <Select value={selectedDay} onChange={value => setSelectedDay(value)} style={{ width: 100 }}>
                {defaultDays.map(day => (
                  <Option key={day} value={day}>{`Ngày ${day}`}</Option>
                ))}
              </Select>
            </Space>

            <Row gutter={[16, 16]}>
              {filteredDestinations.map(destination => (
                <Col key={destination.id} xs={24} sm={12} md={12} lg={8}>
                  <Card
                    cover={<img alt={destination.ten} src={destination.hinhAnh} style={{ objectFit: 'cover', height: 180 }} />}
                    actions={[
                      // eslint-disable-next-line react/jsx-key
                      <Button type="primary" icon={<PlusOutlined />} block onClick={() => handleAddDestination(destination)}>
                        Thêm
                      </Button>,
                    ]}
                  >
                    <Card.Meta title={destination.ten} description={destination.loai} />
                    <div style={{ marginTop: 12 }}>
                      <Text strong>{destination.gia.toLocaleString()} VNĐ</Text>
                      <div style={{ marginTop: 8 }}>
                        <Rate disabled allowHalf defaultValue={destination.rating} />
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Tóm tắt lịch trình" bodyStyle={{ padding: 16 }}>
            <Statistic title="Tổng chi phí" value={summary.totalCost} suffix="VNĐ" />
            <Statistic title="Tổng thời gian" value={`${summary.totalTime} giờ`} style={{ marginTop: 16 }} />
            <Divider />
            <Statistic title="Ngân sách tối đa" value={budgetThreshold.toLocaleString()} suffix="VNĐ" />
            <Progress percent={summary.progress} status={summary.exceedBudget ? 'exception' : 'active'} style={{ marginTop: 16 }} />
            {summary.exceedBudget && <Alert message="Đã vượt ngân sách" type="warning" showIcon style={{ marginTop: 16 }} />}
          </Card>

          <Card title="Lịch trình theo ngày" bodyStyle={{ padding: 16 }} style={{ marginTop: 24 }}>
            {itineraryByDay.map(section => (
              <div key={section.day} style={{ marginBottom: 24 }}>
                <Title level={5} style={{ marginBottom: 12 }}>{`Ngày ${section.day}`}</Title>
                {section.items.length === 0 ? (
                  <Text type="secondary">Chưa có điểm đến nào.</Text>
                ) : (
                  <List
                    itemLayout="vertical"
                    dataSource={section.items}
                    renderItem={item => (
                      <List.Item
                        key={item.id}
                        actions={[
                          // eslint-disable-next-line react/jsx-key
                          <Button icon={<ArrowUpOutlined />} disabled={itinerary.findIndex(it => it.id === item.id) === 0} onClick={() => handleMoveItem(item.id, 'up')} />, 
                          // eslint-disable-next-line react/jsx-key
                          <Button icon={<ArrowDownOutlined />} disabled={itinerary.findIndex(it => it.id === item.id) === itinerary.length - 1} onClick={() => handleMoveItem(item.id, 'down')} />, 
                          // eslint-disable-next-line react/jsx-key
                          <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleRemoveItem(item.id)}>
                            Xóa
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={item.diemDen.ten}
                          description={`${item.diemDen.loai} • Giá: ${item.diemDen.gia.toLocaleString()} VNĐ`}
                        />
                        <Space direction="vertical" size="small">
                          <Text>Thời gian tham quan: {item.diemDen.thoiGian} giờ</Text>
                          <Text>Chi phí ăn uống: {item.diemDen.chiPhiAnUong.toLocaleString()} VNĐ</Text>
                          <Text>Chi phí lưu trú: {item.diemDen.chiPhiLuuTru.toLocaleString()} VNĐ</Text>
                          <Text>Chi phí di chuyển: {item.diemDen.chiPhiDiChuyen.toLocaleString()} VNĐ</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                )}
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TaoLichTrinh;
