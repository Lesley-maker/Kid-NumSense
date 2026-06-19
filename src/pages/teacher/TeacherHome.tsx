import React from 'react';
import { Link } from 'react-router-dom';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { ProgressBar, StarBadge, StarSVG } from '../../components/SkyDecor';
import { mockStudents } from '../../data/mockData';
import { ArrowRightIcon, UsersIcon, BookOpenIcon, TrendingUpIcon } from 'lucide-react';

const stats = [
  { label: '班级学生', value: mockStudents.length, icon: UsersIcon },
  { label: '已完成前测', value: mockStudents.filter((s) => s.preTestDone).length, icon: BookOpenIcon },
  { label: '平均分', value: Math.round(mockStudents.reduce((a, s) => a + s.preTestScore, 0) / mockStudents.length), icon: TrendingUpIcon },
];

const categoryAverages = [
  { label: '颜色认知', value: 78, emoji: '🌈' },
  { label: '大小认知', value: 72, emoji: '📏' },
  { label: '数字认知', value: 65, emoji: '🔢' },
  { label: '形状认知', value: 70, emoji: '⭕' },
];

const quickLinks = [
  { path: '/teacher/monitor', label: '学生监控', emoji: '🔍', desc: '查看实时学习状态' },
  { path: '/teacher/analysis', label: '学情分析', emoji: '📊', desc: '班级能力全貌报告' },
  { path: '/teacher/upload-course', label: '上传课程', emoji: '📤', desc: '新增课程内容' },
  { path: '/teacher/upload-question', label: '上传题目', emoji: '✍️', desc: '添加测试题目' },
];

const TeacherHome: React.FC = () => {
  return (
    <div data-cmp="TeacherHome" className="mobile-page">
      <PageHeader title="老师工作台" subtitle="你好，王老师！今天也加油呀" emoji="👩‍🏫" />

      <div className="px-4 max-w-md mx-auto">
        {/* Stats row */}
        <div className="flex gap-3 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex-1 rounded-3xl px-3 py-4 flex flex-col items-center gap-1 card-hover"
                style={{
                  background: '#fff',
                  border: '1.5px solid rgba(126,200,227,0.35)',
                  boxShadow: '0 4px 16px rgba(126,200,227,0.15)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center mb-1"
                  style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)' }}
                >
                  <Icon size={18} color="#1A6A8A" />
                </div>
                <span className="text-xl font-black" style={{ color: '#1A3A4A' }}>{stat.value}</span>
                <span className="text-xs font-bold text-center leading-tight" style={{ color: '#5A8EA0' }}>{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Quick links */}
        <div className="flex items-center gap-2 mb-3">
          <StarSVG size={14} color="#7EC8E3" />
          <h2 className="text-base font-black" style={{ color: '#1A3A4A' }}>快捷操作</h2>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="rounded-3xl px-5 py-4 flex items-center gap-4 card-hover no-underline"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.3)',
                boxShadow: '0 4px 14px rgba(126,200,227,0.12)',
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)' }}
              >
                {link.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-sm" style={{ color: '#1A3A4A' }}>{link.label}</div>
                <div className="text-xs font-semibold" style={{ color: '#5A8EA0' }}>{link.desc}</div>
              </div>
              <ArrowRightIcon size={16} color="#B8E2F2" />
            </Link>
          ))}
        </div>

        {/* Category averages */}
        <div className="flex items-center gap-2 mb-3">
          <StarSVG size={14} color="#7EC8E3" />
          <h2 className="text-base font-black" style={{ color: '#1A3A4A' }}>班级平均成绩</h2>
        </div>
        <div className="flex flex-col gap-3 mb-6">
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
              <span className="text-2xl">{cat.emoji}</span>
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

        {/* Recent activity */}
        <div className="flex items-center gap-2 mb-3">
          <StarSVG size={14} color="#7EC8E3" />
          <h2 className="text-base font-black" style={{ color: '#1A3A4A' }}>最近活动</h2>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          {mockStudents.slice(0, 4).map((s) => (
            <div
              key={s.id}
              className="rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.25)',
                boxShadow: '0 2px 8px rgba(126,200,227,0.08)',
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)' }}
              >
                {s.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-xs truncate" style={{ color: '#1A3A4A' }}>{s.name}</div>
                <div className="text-xs font-semibold truncate" style={{ color: '#5A8EA0' }}>{s.recentActivity}</div>
              </div>
              <StarBadge count={Math.ceil(s.preTestScore / 25)} size="sm" />
            </div>
          ))}
        </div>
      </div>

      <AppNav role="teacher" userName="王老师" userAvatar="👩‍🏫" />
    </div>
  );
};

export default TeacherHome;
