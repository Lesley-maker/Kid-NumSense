import React, { useState } from 'react';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { ProgressBar, StarBadge, CategoryBadge, StarSVG } from '../../components/SkyDecor';
import { mockCourses } from '../../data/mockData';

type CategoryFilter = 'all' | 'color' | 'size' | 'number' | 'shape';

const categoryFilters: { key: CategoryFilter; label: string; emoji: string }[] = [
  { key: 'all', label: '全部', emoji: '📚' },
  { key: 'color', label: '颜色', emoji: '🌈' },
  { key: 'size', label: '大小', emoji: '📏' },
  { key: 'number', label: '数字', emoji: '🔢' },
  { key: 'shape', label: '形状', emoji: '⭕' },
];

const studentProgress: Record<string, number> = {
  c1: 100,
  c2: 60,
  c3: 40,
  c4: 0,
  c5: 70,
  c6: 0,
};

const StudentCourses: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const approvedCourses = mockCourses.filter((c) => c.status === 'approved');
  const filteredCourses =
    activeFilter === 'all' ? approvedCourses : approvedCourses.filter((c) => c.category === activeFilter);

  return (
    <div data-cmp="StudentCourses" className="mobile-page">
      <PageHeader title="我的课程" subtitle="选择一个课程开始学习吧！" emoji="📚" />

      <div className="px-4 max-w-md mx-auto">
        {/* Filter row */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {categoryFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="btn-bubble flex-shrink-0 px-4 py-2 text-sm font-black transition-all duration-200"
              style={{
                background: activeFilter === f.key
                  ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)'
                  : '#fff',
                color: activeFilter === f.key ? '#fff' : '#5A8EA0',
                border: `1.5px solid ${activeFilter === f.key ? 'transparent' : 'rgba(126,200,227,0.35)'}`,
                boxShadow: activeFilter === f.key ? '0 4px 14px rgba(126,200,227,0.35)' : 'none',
              }}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>

        {/* Course list */}
        <div className="flex flex-col gap-4 mb-4">
          {filteredCourses.map((course) => {
            const progress = studentProgress[course.id] ?? 0;
            const stars =
              progress >= 100 ? 5 : progress >= 75 ? 4 : progress >= 50 ? 3 : progress >= 25 ? 2 : progress > 0 ? 1 : 0;
            return (
              <div
                key={course.id}
                className="rounded-3xl overflow-hidden card-hover"
                style={{
                  background: '#fff',
                  border: '1.5px solid rgba(126,200,227,0.35)',
                  boxShadow: '0 6px 20px rgba(126,200,227,0.15)',
                }}
              >
                {/* Course header strip */}
                <div
                  className="h-20 flex items-center justify-between px-5"
                  style={{ background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' }}
                >
                  <div className="text-4xl bounce-gentle">{course.emoji}</div>
                  <div className="text-right">
                    <div className="text-white font-black text-base leading-tight">{course.title}</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      Lv.{course.level}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-semibold mb-3 leading-relaxed" style={{ color: '#5A8EA0' }}>
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <CategoryBadge category={course.category} />
                    <StarBadge count={stars} size="sm" />
                  </div>

                  <div className="mb-1 flex justify-between items-center">
                    <span className="text-xs font-bold" style={{ color: '#5A8EA0' }}>完成进度</span>
                    <span className="text-xs font-black" style={{ color: '#3AAFCF' }}>{progress}%</span>
                  </div>
                  <ProgressBar value={progress} />

                  <button
                    className="btn-bubble w-full py-3 mt-3 text-white font-black text-sm"
                    style={{ background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' }}
                  >
                    {progress === 0 ? '开始学习 🚀' : progress >= 100 ? '复习一下 🔄' : '继续学习 →'}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredCourses.length === 0 && (
            <div className="flex flex-col items-center py-12 gap-3">
              <div className="text-5xl bounce-gentle">🔍</div>
              <div className="font-black text-base" style={{ color: '#5A8EA0' }}>暂无课程</div>
              <div className="text-sm font-semibold" style={{ color: '#B8E2F2' }}>
                该分类下还没有课程，敬请期待～
              </div>
            </div>
          )}
        </div>
      </div>

      <AppNav role="student" userName="小明" userAvatar="🐻" />
    </div>
  );
};

export default StudentCourses;
