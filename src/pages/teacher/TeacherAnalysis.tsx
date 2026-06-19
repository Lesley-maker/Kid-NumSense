import React from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid,
} from 'recharts';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { ProgressBar, StarSVG } from '../../components/SkyDecor';
import { mockStudents } from '../../data/mockData';

const radarData = [
  { subject: '颜色', score: 78, fullMark: 100 },
  { subject: '大小', score: 72, fullMark: 100 },
  { subject: '数字', score: 65, fullMark: 100 },
  { subject: '形状', score: 70, fullMark: 100 },
];

const barData = [
  { name: '颜色', score: 78 },
  { name: '大小', score: 72 },
  { name: '数字', score: 65 },
  { name: '形状', score: 70 },
];

const trendData = [
  { week: '第1周', avg: 62 },
  { week: '第2周', avg: 67 },
  { week: '第3周', avg: 70 },
  { week: '第4周', avg: 73 },
  { week: '第5周', avg: 76 },
];

const categoryAverages = [
  { label: '颜色认知', value: 78, emoji: '🌈' },
  { label: '大小认知', value: 72, emoji: '📏' },
  { label: '数字认知', value: 65, emoji: '🔢' },
  { label: '形状认知', value: 70, emoji: '⭕' },
];

const TeacherAnalysis: React.FC = () => {
  const avgScore = Math.round(
    mockStudents.reduce((a, s) => a + s.preTestScore, 0) / mockStudents.length
  );
  const doneCount = mockStudents.filter((s) => s.preTestDone).length;
  const completionRate = Math.round((doneCount / mockStudents.length) * 100);

  return (
    <div data-cmp="TeacherAnalysis" className="mobile-page">
      <PageHeader title="学情分析" subtitle="全班数感能力可视化报告" emoji="📊" />

      <div className="px-4 max-w-md mx-auto">
        {/* Summary cards */}
        <div className="flex gap-3 mb-5">
          {[
            { label: '班级人数', value: mockStudents.length, suffix: '人', emoji: '👥' },
            { label: '平均分', value: avgScore, suffix: '分', emoji: '📊' },
            { label: '前测完成', value: completionRate, suffix: '%', emoji: '✅' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex-1 rounded-3xl px-3 py-4 flex flex-col items-center gap-1 card-hover"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.35)',
                boxShadow: '0 4px 14px rgba(126,200,227,0.14)',
              }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xl font-black" style={{ color: '#1A3A4A' }}>
                {item.value}<span className="text-sm">{item.suffix}</span>
              </span>
              <span className="text-xs font-bold text-center" style={{ color: '#5A8EA0' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Category scores */}
        <div className="flex items-center gap-2 mb-3">
          <StarSVG size={14} color="#7EC8E3" />
          <h2 className="text-base font-black" style={{ color: '#1A3A4A' }}>分类平均分</h2>
        </div>
        <div className="flex flex-col gap-3 mb-5">
          {categoryAverages.map((cat) => (
            <div
              key={cat.label}
              className="rounded-2xl px-4 py-3 flex items-center gap-3"
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
                  <span className="text-xs font-black" style={{ color: '#3AAFCF' }}>{cat.value}分</span>
                </div>
                <ProgressBar value={cat.value} />
              </div>
            </div>
          ))}
        </div>

        {/* Radar chart */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: '#fff', border: '1.5px solid rgba(126,200,227,0.3)', boxShadow: '0 4px 16px rgba(126,200,227,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <StarSVG size={14} color="#7EC8E3" />
            <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>能力雷达图</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#C5E9F5" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fontWeight: 700, fill: '#5A8EA0' }} />
              <Radar name="班级均分" dataKey="score" stroke="#7EC8E3" fill="#7EC8E3" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: '#fff', border: '1.5px solid rgba(126,200,227,0.3)', boxShadow: '0 4px 16px rgba(126,200,227,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <StarSVG size={14} color="#7EC8E3" />
            <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>柱状分布</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} barSize={28}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 700, fill: '#5A8EA0' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#B8E2F2' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1.5px solid #C5E9F5', fontWeight: 700, fontSize: 12 }} />
              <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="#7EC8E3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend chart */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: '#fff', border: '1.5px solid rgba(126,200,227,0.3)', boxShadow: '0 4px 16px rgba(126,200,227,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <StarSVG size={14} color="#7EC8E3" />
            <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>班级成绩趋势</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendData}>
              <CartesianGrid stroke="#EAF6FB" strokeDasharray="4 4" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fontWeight: 700, fill: '#5A8EA0' }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 85]} tick={{ fontSize: 11, fill: '#B8E2F2' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1.5px solid #C5E9F5', fontWeight: 700, fontSize: 12 }} />
              <Line type="monotone" dataKey="avg" stroke="#7EC8E3" strokeWidth={3} dot={{ r: 5, fill: '#7EC8E3', stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <AppNav role="teacher" userName="王老师" userAvatar="👩‍🏫" />
    </div>
  );
};

export default TeacherAnalysis;
