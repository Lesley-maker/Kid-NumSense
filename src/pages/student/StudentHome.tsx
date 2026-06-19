import React from 'react';
import { Link } from 'react-router-dom';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { ProgressBar, StarBadge, StarSVG } from '../../components/SkyDecor';
import { ArrowRightIcon } from 'lucide-react';

const courseModules = [
  { path: '/student/courses', label: '颜色认知', emoji: '🌈', desc: '认识五彩缤纷的颜色世界', progress: 80 },
  { path: '/student/courses', label: '大小认知', emoji: '📏', desc: '学会比较大小和长短', progress: 60 },
  { path: '/student/courses', label: '数字认知', emoji: '🔢', desc: '认识数字，学习数数', progress: 45 },
  { path: '/student/courses', label: '形状认知', emoji: '⭕', desc: '认识各种几何形状', progress: 70 },
];

const stats = [
  { label: '学习天数', value: '12天', emoji: '📅' },
  { label: '完成课程', value: '8节', emoji: '📚' },
  { label: '获得星星', value: '24', icon: true },
  { label: '前测得分', value: '72分', emoji: '📊' },
];

const StudentHome: React.FC = () => {
  return (
    <div data-cmp="StudentHome" className="mobile-page">
      <PageHeader
        title="你好，小明！"
        subtitle="今天也要加油学习哦"
        emoji="🐻"
        variant="blue"
      />

      <div className="px-4 max-w-md mx-auto">
        {/* Stats row */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-shrink-0 rounded-3xl px-4 py-3 flex flex-col items-center gap-1 card-hover"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.35)',
                boxShadow: '0 4px 16px rgba(126,200,227,0.18)',
                minWidth: '76px',
              }}
            >
              {stat.icon ? (
                <div className="star-twinkle">
                  <StarSVG size={22} color="#7EC8E3" />
                </div>
              ) : (
                <span className="text-2xl">{stat.emoji}</span>
              )}
              <span className="text-base font-black" style={{ color: '#1A3A4A' }}>{stat.value}</span>
              <span className="text-xs font-bold" style={{ color: '#5A8EA0' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Course modules */}
        <div className="flex items-center gap-2 mb-3">
          <StarSVG size={16} color="#7EC8E3" />
          <h2 className="text-base font-black" style={{ color: '#1A3A4A' }}>我的课程</h2>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          {courseModules.map((mod) => (
            <Link
              key={mod.label}
              to={mod.path}
              className="rounded-3xl px-5 py-4 flex items-center gap-4 card-hover no-underline"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.35)',
                boxShadow: '0 4px 16px rgba(126,200,227,0.15)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 bounce-gentle"
                style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)' }}
              >
                {mod.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-sm mb-0.5" style={{ color: '#1A3A4A' }}>{mod.label}</div>
                <div className="text-xs font-semibold mb-2" style={{ color: '#5A8EA0' }}>{mod.desc}</div>
                <ProgressBar value={mod.progress} />
                <div className="flex justify-between items-center mt-1.5">
                  <StarBadge count={Math.round(mod.progress / 20)} size="sm" />
                  <span className="text-xs font-black" style={{ color: '#7EC8E3' }}>{mod.progress}%</span>
                </div>
              </div>
              <ArrowRightIcon size={16} color="#B8E2F2" />
            </Link>
          ))}
        </div>

        {/* Pre-test CTA */}
        <div
          className="rounded-3xl px-5 py-4 flex items-center gap-4 mb-4"
          style={{
            background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)',
            border: '1.5px solid rgba(126,200,227,0.4)',
            boxShadow: '0 6px 20px rgba(126,200,227,0.3)',
          }}
        >
          <div className="text-4xl bounce-gentle">📝</div>
          <div className="flex-1">
            <div className="font-black text-base text-white">前测已完成</div>
            <div className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
              得分 <strong>72分</strong>，继续加油！
            </div>
          </div>
          <Link
            to="/student/pretest-analysis"
            className="btn-bubble px-4 py-2 text-xs font-black flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.9)', color: '#3AAFCF', textDecoration: 'none' }}
          >
            查看分析
          </Link>
        </div>
      </div>

      <AppNav role="student" userName="小明" userAvatar="🐻" />
    </div>
  );
};

export default StudentHome;
