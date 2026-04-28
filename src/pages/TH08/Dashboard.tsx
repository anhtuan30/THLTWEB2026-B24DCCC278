import React from 'react';
import { Card, Row, Col, Statistic, Timeline, Progress, Space } from 'antd';

// Mock data cho biểu đồ
const weeklyWorkoutData = [
  { week: 'Tuần 1', sessions: 4 },
  { week: 'Tuần 2', sessions: 6 },
  { week: 'Tuần 3', sessions: 5 },
  { week: 'Tuần 4', sessions: 7 },
];

const weightData = [
  { date: '2023-10-01', weight: 70 },
  { date: '2023-10-08', weight: 69.5 },
  { date: '2023-10-15', weight: 69 },
  { date: '2023-10-22', weight: 68.5 },
];

const recentWorkouts = [
  { date: '2023-10-25', activity: 'Cardio - Chạy bộ', duration: 30 },
  { date: '2023-10-24', activity: 'Strength - Tập tạ', duration: 45 },
  { date: '2023-10-23', activity: 'Yoga', duration: 60 },
  { date: '2023-10-22', activity: 'HIIT', duration: 20 },
  { date: '2023-10-21', activity: 'Cardio - Xe đạp', duration: 40 },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard - Trang chủ</h1>

      {/* Thẻ chỉ số nhanh */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Tổng buổi tập tháng" value={22} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Tổng calo đốt" value={1500} suffix="kcal" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Streak ngày tập" value={7} suffix="ngày" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Mục tiêu hoàn thành" value={75} suffix="%" />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ - Số buổi tập theo tuần */}
      <Card title="Số buổi tập theo tuần" style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {weeklyWorkoutData.map((data, index) => (
            <div key={index}>
              <p style={{ marginBottom: 8 }}>{data.week}: {data.sessions} buổi</p>
              <Progress percent={(data.sessions / 7) * 100} />
            </div>
          ))}
        </Space>
      </Card>

      {/* Biểu đồ - Thay đổi cân nặng */}
      <Card title="Thay đổi cân nặng" style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {weightData.map((data, index) => {
            const minWeight = 68.5;
            const maxWeight = 70;
            const percent = ((maxWeight - data.weight) / (maxWeight - minWeight)) * 100;
            return (
              <div key={index}>
                <p style={{ marginBottom: 8 }}>{data.date}: {data.weight} kg</p>
                <Progress percent={percent} strokeColor={{ '0%': '#ff7a45', '100%': '#87d068' }} />
              </div>
            );
          })}
        </Space>
      </Card>

      {/* Timeline buổi tập gần nhất */}
      <Card title="5 buổi tập gần nhất">
        <Timeline>
          {recentWorkouts.map((workout, index) => (
            <Timeline.Item key={index}>
              <p>{workout.date}: {workout.activity} - {workout.duration} phút</p>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  );
};

export default Dashboard;