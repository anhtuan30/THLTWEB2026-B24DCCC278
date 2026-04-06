import { useState, useEffect } from 'react';
import { Form, Button, InputNumber, Select, message, Card, Progress } from 'antd';

interface Goal {
  subject: string;
  monthlyHours: number;
}

const ThietLapMucTieu = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [totalGoal, setTotalGoal] = useState<number>(0);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedGoals = localStorage.getItem('goals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
    const storedTotal = localStorage.getItem('totalGoal');
    if (storedTotal) {
      setTotalGoal(parseInt(storedTotal));
    }
    const storedSubjects = localStorage.getItem('subjects');
    if (storedSubjects) {
      const subs = JSON.parse(storedSubjects).map((s: any) => s.name);
      setSubjects(subs);
    }
    const storedSessions = localStorage.getItem('studySessions');
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    }
  }, []);

  const handleSetGoal = (values: any) => {
    if (values.subject && values.monthlyHours) {
      const newGoals = [...goals.filter(g => g.subject !== values.subject), { subject: values.subject, monthlyHours: values.monthlyHours }];
      setGoals(newGoals);
      localStorage.setItem('goals', JSON.stringify(newGoals));
      message.success('Đã đặt mục tiêu!');
    }
    if (values.totalHours) {
      setTotalGoal(values.totalHours);
      localStorage.setItem('totalGoal', values.totalHours.toString());
      message.success('Đã đặt mục tiêu tổng!');
    }
    form.resetFields();
  };

  const getProgress = (subject: string) => {
    const currentMonth = new Date().getMonth();
    const subjectSessions = sessions.filter(s => s.subject === subject && new Date(s.dateTime).getMonth() === currentMonth);
    const totalHours = subjectSessions.reduce((sum, s) => sum + s.duration / 60, 0);
    const goal = goals.find(g => g.subject === subject)?.monthlyHours || 0;
    return goal > 0 ? Math.min((totalHours / goal) * 100, 100) : 0;
  };

  const getTotalProgress = () => {
    const currentMonth = new Date().getMonth();
    const monthSessions = sessions.filter(s => new Date(s.dateTime).getMonth() === currentMonth);
    const totalHours = monthSessions.reduce((sum, s) => sum + s.duration / 60, 0);
    return totalGoal > 0 ? Math.min((totalHours / totalGoal) * 100, 100) : 0;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Thiết lập mục tiêu học tập hàng tháng</h2>
      <Form form={form} onFinish={handleSetGoal} layout="inline" style={{ marginBottom: 20 }}>
        <Form.Item name="subject" label="Môn học">
          <Select placeholder="Chọn môn học" style={{ width: 150 }}>
            {subjects.map(sub => <Select.Option key={sub} value={sub}>{sub}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item name="monthlyHours" label="Giờ/tháng">
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Đặt mục tiêu môn học</Button>
        </Form.Item>
      </Form>
      <Form form={form} onFinish={handleSetGoal} layout="inline" style={{ marginBottom: 20 }}>
        <Form.Item name="totalHours" label="Tổng giờ/tháng">
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Đặt mục tiêu tổng</Button>
        </Form.Item>
      </Form>
      <h3>Trạng thái mục tiêu</h3>
      {goals.map(goal => (
        <Card key={goal.subject} style={{ marginBottom: 10 }}>
          <p>Môn: {goal.subject} - Mục tiêu: {goal.monthlyHours} giờ</p>
          <Progress percent={getProgress(goal.subject)} status={getProgress(goal.subject) >= 100 ? 'success' : 'active'} />
        </Card>
      ))}
      {totalGoal > 0 && (
        <Card>
          <p>Tổng mục tiêu: {totalGoal} giờ</p>
          <Progress percent={getTotalProgress()} status={getTotalProgress() >= 100 ? 'success' : 'active'} />
        </Card>
      )}
    </div>
  );
};

export default ThietLapMucTieu;