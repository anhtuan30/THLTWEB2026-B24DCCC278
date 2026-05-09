import moment from 'moment';

export type TaskStatus = 'todo' | 'doing' | 'done';
export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  name: string;
  description: string;
  deadline: string;
  priority: Priority;
  status: TaskStatus;
  tags: string[];
  createdAt: string;
}

export const TASK_STORAGE_KEY = 'th09-kanban-tasks';

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'Cần làm',
  doing: 'Đang làm',
  done: 'Hoàn thành',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  High: 'Cao',
  Medium: 'Trung bình',
  Low: 'Thấp',
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: 'default',
  doing: 'processing',
  done: 'success',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  High: 'red',
  Medium: 'orange',
  Low: 'green',
};

const sampleTasks: Task[] = [
  {
    id: 'task-1',
    name: 'Lập kế hoạch học tập',
    description: 'Viết danh sách các môn cần học và deadline ôn tập.',
    deadline: moment().add(2, 'days').format('YYYY-MM-DD'),
    priority: 'High',
    status: 'todo',
    tags: ['Học tập', 'Ưu tiên'],
    createdAt: moment().subtract(2, 'days').toISOString(),
  },
  {
    id: 'task-2',
    name: 'Chuẩn bị slide thuyết trình',
    description: 'Hoàn thành slide báo cáo nhóm vào cuối tuần.',
    deadline: moment().add(1, 'days').format('YYYY-MM-DD'),
    priority: 'Medium',
    status: 'doing',
    tags: ['Báo cáo'],
    createdAt: moment().subtract(1, 'days').toISOString(),
  },
  {
    id: 'task-3',
    name: 'Nộp bài tập môn lập trình',
    description: 'Kiểm tra và nộp bài tập trước hạn.',
    deadline: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    priority: 'High',
    status: 'done',
    tags: ['Lập trình'],
    createdAt: moment().subtract(4, 'days').toISOString(),
  },
];

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASK_STORAGE_KEY);
    if (!raw) {
      saveTasks(sampleTasks);
      return sampleTasks;
    }
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : sampleTasks;
  } catch (error) {
    console.error('Không tải được tasks từ localStorage', error);
    return sampleTasks;
  }
}

export function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Không lưu được tasks vào localStorage', error);
  }
}

export function getStatusColor(status: TaskStatus): string {
  return STATUS_COLORS[status] || 'default';
}

export function getPriorityColor(priority: Priority): string {
  return PRIORITY_COLORS[priority] || 'default';
}

export function formatDeadline(date: string): string {
  return moment(date).format('DD/MM/YYYY');
}
