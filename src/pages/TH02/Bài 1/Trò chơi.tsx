import { useState } from 'react';
import { Button, Card, List, Typography, Space } from 'antd';
import { ScissorOutlined, FrownOutlined, SmileOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Choice {
  key: string;
  label: string;
  icon: React.ReactElement;
}

interface HistoryItem {
  id: number;
  player: string;
  computer: string;
  result: string;
  time: string;
}

const choices: Choice[] = [
  { key: 'keo', label: 'Kéo', icon: <ScissorOutlined /> },
  { key: 'bua', label: 'Búa', icon: <FrownOutlined /> },
  { key: 'bao', label: 'Bao', icon: <SmileOutlined /> },
];

const TroChoi = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const play = (choice: Choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computer);

    let res = '';
    if (choice.key === computer.key) {
      res = 'Hòa';
    } else if (
      (choice.key === 'keo' && computer.key === 'bao') ||
      (choice.key === 'bua' && computer.key === 'keo') ||
      (choice.key === 'bao' && computer.key === 'bua')
    ) {
      res = 'Bạn thắng';
    } else {
      res = 'Bạn thua';
    }
    setResult(res);

    setHistory(prev => [...prev, {
      id: Date.now(),
      player: choice.label,
      computer: computer.label,
      result: res,
      time: new Date().toLocaleString()
    }]);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Trò chơi Oẳn Tù Tì</Title>
      <Card title="Chọn lựa của bạn" style={{ marginBottom: 20 }}>
        <Space>
          {choices.map(choice => (
            <Button
              key={choice.key}
              type="primary"
              icon={choice.icon}
              onClick={() => play(choice)}
            >
              {choice.label}
            </Button>
          ))}
        </Space>
      </Card>
      {result && (
        <Card title="Kết quả" style={{ marginBottom: 20 }}>
          <Text strong>Bạn chọn: {playerChoice?.label}</Text><br />
          <Text strong>Máy chọn: {computerChoice?.label}</Text><br />
          <Text strong>Kết quả: {result}</Text>
        </Card>
      )}
      <Card title="Lịch sử">
        <List
          dataSource={history}
          renderItem={item => (
            <List.Item>
              <Text>{item.time}: Bạn ({item.player}) vs Máy ({item.computer}) - {item.result}</Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default TroChoi;
