import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend,
} from 'recharts';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { ProgressBar, StarSVG } from '../../components/SkyDecor';
import { mockStudents, mockCourses, mockQuestions } from '../../data/mockData';

const weeklyData = [
  { day: '周一', sessions: 24 },
  { day: '周二', sessions: 31 },
  { day: '周三', sessions: 28 },
  { day: '周四', sessions: 35 },
  { day: '周五', sessions: 42 },
  { day: '周六', sessions: 18 },
  { day: '周日', sessions: 12 },
];

const pieData = [
  { name: '颜色认知', value: 28, color: '#7EC8E3' },
  { name: '大小认知', value: 22, color: '#3AAFCF' },
  { name: '数字认知', value: 30, color: '#9DD8ED' },
  { name: '形状认知', value: 20, color: '#C5E9F5' },
];

const gradeScores = [
  { grade: '大班', score: 72 },
  { grade: '中班', score: 65 },
  { grade: '小班', score: 58 },
  { grade: '托班', score: 48 },
];

const DataMonitor: React.FC = () => {
  const activeStudents = mockStudents.filter((s) => s.preTestDone).length;
  const totalCourses = mockCourses.filter((c) => c.status === 'approved').length;
  const totalQuestions = mockQuestions.filter((q) => q.status === 'approved').length;
  const avgScore = Math.round(mockStudents.reduce((a, s) => a + s.preTestScore, 0) / mockStudents.length);

  const stats = [
    { label: '活跃学生', value: activeStudents, suffix: '人', emoji: '👦' },
    { label: '上线课程', value: totalCourses, suffix: '个', emoji: '📚' },
    { label: '题库题目', value: totalQuestions, suffix: '道', emoji: '📝' },
    { label: '平台均分', value: avgScore, suffix: '分', emoji: '📊' },
  ];

  const categoryProgress = [
    { label: '颜色认知', value: 78, emoji: '🌈' },
    { label: '大小认知', value: 65, emoji: '📏' },
    { label: '数字认知', value: 55, emoji: '🔢' },
    { label: '形状认知', value: 70, emoji: '⭕' },
  ];

  return (
    <div data-cmp="DataMonitor" className="mobile-page">
      <PageHeader title="数据监控" subtitle="全平台学习数据实时监控" emoji="📊" />

      <div className="px-4 max-w-md mx-auto">
        {/* Stats grid */}
        <div className="flex flex-wrap gap-3 mb-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl p-4 flex flex-col items-center gap-1 card-hover"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.3)',
                boxShadow: '0 4px 14px rgba(126,200,227,0.12)',
                flex: '1 1 calc(50% - 6px)',
                minWidth: '120px',
              }}
            >
              <span className="text-2xl">{s.emoji}</span>
              <div className="text-2xl font-black" style={{ color: '#1A3A4A' }}>
                {s.value}<span className="text-sm">{s.suffix}</span>
              </div>
              <div className="text-xs font-bold" style={{ color: '#5A8EA0' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly activity */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: '#fff', border: '1.5px solid rgba(126,200,227,0.3)', boxShadow: '0 4px 16px rgba(126,200,227,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <StarSVG size={14} color="#7EC8E3" />
            <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>本周学习活跃度</span>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={weeklyData} barSize={24}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700, fill: '#5A8EA0' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#B8E2F2' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1.5px solid #C5E9F5', fontWeight: 700, fontSize: 12 }} />
              <Bar dataKey="sessions" fill="#7EC8E3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category distribution */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: '#fff', border: '1.5px solid rgba(126,200,227,0.3)', boxShadow: '0 4px 16px rgba(126,200,227,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <StarSVG size={14} color="#7EC8E3" />
            <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>分类学习占比</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={75}
                dataKey="value"
                label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
                labelLine={{ stroke: '#C5E9F5' }}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1.5px solid #C5E9F5', fontWeight: 700, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category progress */}
        <div className="flex items-center gap-2 mb-3">
          <StarSVG size={14} color="#7EC8E3" />
          <h2 className="text-base font-black" style={{ color: '#1A3A4A' }}>各维度掌握率</h2>
        </div>
        <div className="flex flex-col gap-3 mb-4">
          {categoryProgress.map((cat) => (
            <div
              key={cat.label}
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.3)',
                boxShadow: '0 3px 10px rgba(126,200,227,0.1)',
              }}
            >
              <span className="text-2xl flex-shrink-0">{cat.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold" style={{ color: '#5A8EA0' }}>{cat.label}</span>
                  <span className="text-xs font-black" style={{ color: '#3AAFCF' }}>{cat.value}%</span>
                </div>
                <ProgressBar value={cat.value} />
              </div>
            </div>
          ))}
        </div>

        {/* Grade score chart */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: '#fff', border: '1.5px solid rgba(126,200,227,0.3)', boxShadow: '0 4px 16px rgba(126,200,227,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <StarSVG size={14} color="#7EC8E3" />
            <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>各年级平均分</span>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={gradeScores} layout="vertical" barSize={20}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#B8E2F2' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="grade" tick={{ fontSize: 12, fontWeight: 700, fill: '#5A8EA0' }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1.5px solid #C5E9F5', fontWeight: 700, fontSize: 12 }} />
              <Bar dataKey="score" fill="#7EC8E3" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <AppNav role="admin" userName="管理员" userAvatar="🛡️" />
    </div>
  );
};

export default DataMonitor;
