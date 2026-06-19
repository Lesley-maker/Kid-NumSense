import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import SkyDecor, { StarSVG, StarBadge } from '../../components/SkyDecor';
import { mockStudents, mockCourses, mockQuestions } from '../../data/mockData';
import { UsersIcon, BookOpenIcon, ClipboardListIcon, ShieldCheckIcon } from 'lucide-react';

const AdminHome: React.FC = () => {
  const navigate = useNavigate();

  const pendingCourses = mockCourses.filter((c) => c.status === 'pending').length;
  const pendingQuestions = mockQuestions.filter((q) => q.status === 'pending').length;
  const totalStudents = mockStudents.length;
  const avgScore = Math.round(mockStudents.reduce((a, s) => a + s.preTestScore, 0) / mockStudents.length);

  const summaryCards = [
    { label: '学生总数', value: totalStudents, suffix: '人', icon: UsersIcon, emoji: '👨‍👩‍👧‍👦' },
    { label: '待审课程', value: pendingCourses, suffix: '个', icon: BookOpenIcon, emoji: '📚', urgent: pendingCourses > 0 },
    { label: '待审题目', value: pendingQuestions, suffix: '道', icon: ClipboardListIcon, emoji: '📝', urgent: pendingQuestions > 0 },
    { label: '平均分', value: avgScore, suffix: '分', icon: ShieldCheckIcon, emoji: '🏆' },
  ];

  const quickLinks = [
    { label: '数据监控', path: '/admin/data', emoji: '📊', desc: '全平台学习概览' },
    { label: '课程审核', path: '/admin/course-review', emoji: '📚', desc: `${pendingCourses} 个待审` },
    { label: '题目审核', path: '/admin/question-review', emoji: '📝', desc: `${pendingQuestions} 道待审` },
  ];

  return (
    <div data-cmp="AdminHome" className="mobile-page">
      <PageHeader title="管理员中心" subtitle="全平台数感训练管理后台" emoji="🛡️">
        <StarBadge count={5} size="md" />
      </PageHeader>

      <SkyDecor variant="blue" density="light" />

      <div className="px-4 max-w-md mx-auto">
        {/* Welcome banner */}
        <div
          className="rounded-3xl p-5 mb-5 flex items-center gap-4"
          style={{
            background: '#fff',
            border: '1.5px solid rgba(126,200,227,0.35)',
            boxShadow: '0 6px 22px rgba(126,200,227,0.15)',
          }}
        >
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)' }}
          >
            🛡️
          </div>
          <div>
            <div className="font-black text-lg" style={{ color: '#1A3A4A' }}>系统管理员</div>
            <div className="text-sm font-semibold mt-0.5" style={{ color: '#5A8EA0' }}>
              欢迎回来！今日有{' '}
              <strong style={{ color: '#3AAFCF' }}>{pendingCourses + pendingQuestions}</strong>{' '}
              项内容待审核
            </div>
            <div className="flex mt-2 gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="star-twinkle" style={{ animationDelay: `${i * 0.3}s` }}>
                  <StarSVG size={12} color="#7EC8E3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="flex items-center gap-2 mb-3">
          <StarSVG size={14} color="#7EC8E3" />
          <h2 className="text-base font-black" style={{ color: '#1A3A4A' }}>平台概览</h2>
        </div>
        <div className="flex flex-wrap gap-3 mb-5">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-3xl p-4 flex flex-col items-center gap-1 card-hover"
              style={{
                background: '#fff',
                border: `1.5px solid ${card.urgent ? 'rgba(126,200,227,0.7)' : 'rgba(126,200,227,0.3)'}`,
                boxShadow: card.urgent ? '0 4px 18px rgba(126,200,227,0.3)' : '0 4px 14px rgba(126,200,227,0.12)',
                flex: '1 1 calc(50% - 6px)',
                minWidth: '120px',
              }}
            >
              <span className="text-2xl">{card.emoji}</span>
              <div className="text-2xl font-black" style={{ color: card.urgent ? '#3AAFCF' : '#1A3A4A' }}>
                {card.value}<span className="text-sm">{card.suffix}</span>
              </div>
              <div className="text-xs font-bold text-center" style={{ color: '#5A8EA0' }}>{card.label}</div>
              {card.urgent && (
                <div
                  className="text-xs font-black px-2 py-0.5 rounded-full"
                  style={{ background: '#C5E9F5', color: '#3AAFCF' }}
                >
                  需处理
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="flex items-center gap-2 mb-3">
          <StarSVG size={14} color="#7EC8E3" />
          <h2 className="text-base font-black" style={{ color: '#1A3A4A' }}>快捷入口</h2>
        </div>
        <div className="flex flex-col gap-3 mb-4">
          {quickLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="rounded-3xl px-5 py-4 flex items-center gap-4 text-left card-hover w-full"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.3)',
                boxShadow: '0 4px 14px rgba(126,200,227,0.12)',
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #EAF6FB, #C5E9F5)' }}
              >
                {link.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-base" style={{ color: '#1A3A4A' }}>{link.label}</div>
                <div className="text-sm font-semibold" style={{ color: '#5A8EA0' }}>{link.desc}</div>
              </div>
              <div style={{ color: '#7EC8E3', fontSize: '20px', fontWeight: 900 }}>›</div>
            </button>
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
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.25)',
                boxShadow: '0 2px 8px rgba(126,200,227,0.08)',
              }}
            >
              <span className="text-xl flex-shrink-0">{s.avatar}</span>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-sm truncate block" style={{ color: '#1A3A4A' }}>{s.name}</span>
                <span className="text-xs font-semibold truncate block" style={{ color: '#5A8EA0' }}>{s.recentActivity}</span>
              </div>
              <div
                className="text-xs px-2 py-1 rounded-full font-bold flex-shrink-0"
                style={{ background: '#EAF6FB', color: '#3AAFCF' }}
              >
                {s.grade}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AppNav role="admin" userName="管理员" userAvatar="🛡️" />
    </div>
  );
};

export default AdminHome;
