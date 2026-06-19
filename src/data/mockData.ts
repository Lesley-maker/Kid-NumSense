// Mock data for the entire app

export type UserRole = 'student' | 'teacher' | 'admin';

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  preTestScore: number;
  preTestDone: boolean;
  progress: Record<string, number>;
  recentActivity: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'color' | 'size' | 'number' | 'shape';
  description: string;
  uploadedBy: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  level: number;
  coverColor: string;
  emoji: string;
}

export interface Question {
  id: string;
  text: string;
  category: 'color' | 'size' | 'number' | 'shape';
  difficulty: 'easy' | 'medium' | 'hard';
  uploadedBy: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'choice' | 'match' | 'order';
}

export interface PreTestResult {
  studentId: string;
  date: string;
  colorScore: number;
  sizeScore: number;
  numberScore: number;
  shapeScore: number;
  total: number;
}

export const mockStudents: Student[] = [
  { id: 's1', name: '小明', age: 7, grade: '一年级', avatar: '🐻', preTestScore: 72, preTestDone: true, progress: { color: 80, size: 60, number: 45, shape: 70 }, recentActivity: '完成了颜色认知第3课' },
  { id: 's2', name: '小花', age: 6, grade: '学前班', avatar: '🐰', preTestScore: 55, preTestDone: true, progress: { color: 65, size: 50, number: 30, shape: 55 }, recentActivity: '完成了前测' },
  { id: 's3', name: '小强', age: 8, grade: '二年级', avatar: '🐸', preTestScore: 88, preTestDone: true, progress: { color: 95, size: 85, number: 70, shape: 80 }, recentActivity: '完成了数字认知第5课' },
  { id: 's4', name: '小美', age: 7, grade: '一年级', avatar: '🦊', preTestScore: 0, preTestDone: false, progress: { color: 20, size: 10, number: 0, shape: 15 }, recentActivity: '刚刚加入' },
  { id: 's5', name: '小龙', age: 9, grade: '二年级', avatar: '🐼', preTestScore: 61, preTestDone: true, progress: { color: 70, size: 65, number: 55, shape: 60 }, recentActivity: '完成了形状认知第2课' },
  { id: 's6', name: '乐乐', age: 6, grade: '学前班', avatar: '🐨', preTestScore: 48, preTestDone: true, progress: { color: 40, size: 35, number: 20, shape: 30 }, recentActivity: '完成了大小认知第1课' },
];

export const mockCourses: Course[] = [
  { id: 'c1', title: '彩虹颜色初识', category: 'color', description: '认识红、橙、黄、绿、蓝、紫六种基本颜色', uploadedBy: '王老师', uploadDate: '2024-03-01', status: 'approved', level: 1, coverColor: '#F9C6D0', emoji: '🌈' },
  { id: 'c2', title: '颜色小达人', category: 'color', description: '通过游戏巩固颜色认知，学会颜色的搭配', uploadedBy: '李老师', uploadDate: '2024-03-05', status: 'approved', level: 2, coverColor: '#FFD9A0', emoji: '🎨' },
  { id: 'c3', title: '大大小小比一比', category: 'size', description: '通过对比学习大、小、中等尺寸概念', uploadedBy: '王老师', uploadDate: '2024-03-08', status: 'approved', level: 1, coverColor: '#B5E5A0', emoji: '🔵' },
  { id: 'c4', title: '数字123', category: 'number', description: '认识1到5的数字，学会数数', uploadedBy: '张老师', uploadDate: '2024-03-10', status: 'pending', level: 1, coverColor: '#C8B4E8', emoji: '🔢' },
  { id: 'c5', title: '形状大冒险', category: 'shape', description: '认识圆形、三角形、正方形、长方形', uploadedBy: '李老师', uploadDate: '2024-03-12', status: 'approved', level: 1, coverColor: '#7EC8E3', emoji: '⭐' },
  { id: 'c6', title: '数字678进阶', category: 'number', description: '认识6到10的数字，学习简单加减', uploadedBy: '张老师', uploadDate: '2024-03-15', status: 'rejected', level: 2, coverColor: '#F9C6D0', emoji: '🎯' },
];

export const mockQuestions: Question[] = [
  { id: 'q1', text: '下面哪个是红色的苹果？', category: 'color', difficulty: 'easy', uploadedBy: '王老师', uploadDate: '2024-03-01', status: 'approved', type: 'choice' },
  { id: 'q2', text: '把相同颜色的气球连起来', category: 'color', difficulty: 'medium', uploadedBy: '李老师', uploadDate: '2024-03-02', status: 'approved', type: 'match' },
  { id: 'q3', text: '大象和小老鼠，谁更大？', category: 'size', difficulty: 'easy', uploadedBy: '王老师', uploadDate: '2024-03-03', status: 'pending', type: 'choice' },
  { id: 'q4', text: '把积木从大到小排列', category: 'size', difficulty: 'medium', uploadedBy: '张老师', uploadDate: '2024-03-04', status: 'approved', type: 'order' },
  { id: 'q5', text: '数一数，图中有几只小鸭子？', category: 'number', difficulty: 'easy', uploadedBy: '李老师', uploadDate: '2024-03-05', status: 'approved', type: 'choice' },
  { id: 'q6', text: '这个形状叫什么名字？', category: 'shape', difficulty: 'easy', uploadedBy: '王老师', uploadDate: '2024-03-06', status: 'pending', type: 'choice' },
];

export const mockPreTestResults: PreTestResult[] = [
  { studentId: 's1', date: '2024-02-20', colorScore: 85, sizeScore: 75, numberScore: 60, shapeScore: 68, total: 72 },
  { studentId: 's2', date: '2024-02-21', colorScore: 70, sizeScore: 60, numberScore: 40, shapeScore: 50, total: 55 },
  { studentId: 's3', date: '2024-02-19', colorScore: 95, sizeScore: 88, numberScore: 80, shapeScore: 89, total: 88 },
  { studentId: 's5', date: '2024-02-22', colorScore: 72, sizeScore: 68, numberScore: 50, shapeScore: 54, total: 61 },
  { studentId: 's6', date: '2024-02-23', colorScore: 55, sizeScore: 50, numberScore: 38, shapeScore: 49, total: 48 },
];

export const categoryLabels: Record<string, string> = {
  color: '颜色认知',
  size: '大小认知',
  number: '数字认知',
  shape: '形状认知',
};

export const categoryColors: Record<string, string> = {
  color: 'bg-macaron-pink',
  size: 'bg-macaron-green',
  number: 'bg-macaron-purple',
  shape: 'bg-macaron-blue',
};

export const categoryEmojis: Record<string, string> = {
  color: '🌈',
  size: '📏',
  number: '🔢',
  shape: '⭐',
};

export const preTestQuestions = [
  { id: 'pt1', text: '下面哪个颜色是蓝色？', options: ['红色🔴', '蓝色🔵', '绿色🟢', '黄色🟡'], answer: 1, category: 'color', emoji: '🎨' },
  { id: 'pt2', text: '大象和猫咪，谁更大一些？', options: ['猫咪🐱', '大象🐘', '一样大', '不知道'], answer: 1, category: 'size', emoji: '📏' },
  { id: 'pt3', text: '图中有几个苹果？🍎🍎🍎', options: ['2个', '3个', '4个', '5个'], answer: 1, category: 'number', emoji: '🔢' },
  { id: 'pt4', text: '这个形状是什么？（圆形）⭕', options: ['三角形', '正方形', '圆形', '长方形'], answer: 2, category: 'shape', emoji: '⭕' },
  { id: 'pt5', text: '下面哪个颜色是粉色？', options: ['黑色⚫', '白色⬜', '粉色🌸', '橙色🟠'], answer: 2, category: 'color', emoji: '🌸' },
  { id: 'pt6', text: '西瓜和葡萄，哪个更大？', options: ['西瓜🍉', '葡萄🍇', '一样大', '不确定'], answer: 0, category: 'size', emoji: '📐' },
];
