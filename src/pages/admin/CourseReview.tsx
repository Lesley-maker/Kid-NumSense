import React, { useState } from 'react';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { StatusBadge, CategoryBadge, StarSVG } from '../../components/SkyDecor';
import { mockCourses } from '../../data/mockData';
import { CheckIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

const CourseReview: React.FC = () => {
  const [filter, setFilter] = useState<FilterStatus>('pending');
  const [statuses, setStatuses] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>(() => {
    const init: Record<string, 'pending' | 'approved' | 'rejected'> = {};
    mockCourses.forEach((c) => { init[c.id] = c.status; });
    return init;
  });

  const handleApprove = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: 'approved' }));
    toast.success('课程已通过审核！');
    console.log('[CourseReview] approved:', id);
  };

  const handleReject = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: 'rejected' }));
    toast.error('课程已驳回。');
    console.log('[CourseReview] rejected:', id);
  };

  const filtered = mockCourses.filter((c) => filter === 'all' || statuses[c.id] === filter);

  const filterTabs: { key: FilterStatus; label: string; count: number }[] = [
    { key: 'all', label: '全部', count: mockCourses.length },
    { key: 'pending', label: '待审核', count: Object.values(statuses).filter((s) => s === 'pending').length },
    { key: 'approved', label: '已通过', count: Object.values(statuses).filter((s) => s === 'approved').length },
    { key: 'rejected', label: '已驳回', count: Object.values(statuses).filter((s) => s === 'rejected').length },
  ];

  return (
    <div data-cmp="CourseReview" className="mobile-page">
      <PageHeader title="课程审核" subtitle="审核老师上传的课程内容" emoji="📚" />

      <div className="px-4 max-w-md mx-auto">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className="btn-bubble flex-shrink-0 px-4 py-2 text-xs font-black transition-all duration-150"
              style={{
                background: filter === tab.key ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' : '#fff',
                color: filter === tab.key ? '#fff' : '#5A8EA0',
                border: `1.5px solid ${filter === tab.key ? 'transparent' : 'rgba(126,200,227,0.35)'}`,
              }}
            >
              {tab.label}
              <span
                className="ml-1 inline-block px-1.5 py-0.5 rounded-full text-xs"
                style={{
                  background: filter === tab.key ? 'rgba(255,255,255,0.25)' : '#EAF6FB',
                  color: filter === tab.key ? '#fff' : '#3AAFCF',
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Course list */}
        <div className="flex flex-col gap-4 mb-4">
          {filtered.map((course) => {
            const status = statuses[course.id];
            return (
              <div
                key={course.id}
                className="rounded-3xl overflow-hidden card-hover"
                style={{
                  background: '#fff',
                  border: '1.5px solid rgba(126,200,227,0.3)',
                  boxShadow: '0 4px 16px rgba(126,200,227,0.12)',
                }}
              >
                {/* Cover */}
                <div
                  className="flex items-center justify-center h-16 text-4xl"
                  style={{ background: `${course.coverColor}22` }}
                >
                  {course.emoji}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-base leading-tight mb-1" style={{ color: '#1A3A4A' }}>
                        {course.title}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <CategoryBadge category={course.category} />
                        <StatusBadge status={status} />
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-bold"
                          style={{ background: '#EAF6FB', color: '#5A8EA0' }}
                        >
                          Lv.{course.level}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <StarSVG key={i} size={12} color="#7EC8E3" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-semibold mb-3 leading-relaxed" style={{ color: '#5A8EA0' }}>
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-xs mb-3" style={{ color: '#B8E2F2' }}>
                    <span className="font-semibold">👩‍🏫 {course.uploadedBy}</span>
                    <span className="font-semibold">📅 {course.uploadDate}</span>
                  </div>

                  {/* Action buttons */}
                  <div className={status === 'pending' ? 'flex gap-2' : 'hidden'}>
                    <button
                      onClick={() => handleApprove(course.id)}
                      className="btn-bubble flex-1 py-3 font-black text-sm flex items-center justify-center gap-1 text-white"
                      style={{ background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' }}
                    >
                      <CheckIcon size={14} />
                      通过
                    </button>
                    <button
                      onClick={() => handleReject(course.id)}
                      className="btn-bubble flex-1 py-3 font-black text-sm flex items-center justify-center gap-1"
                      style={{
                        background: '#fff',
                        border: '1.5px solid rgba(126,200,227,0.4)',
                        color: '#5A8EA0',
                      }}
                    >
                      <XIcon size={14} />
                      驳回
                    </button>
                  </div>

                  <div className={status !== 'pending' ? '' : 'hidden'}>
                    <div
                      className="rounded-2xl py-3 text-center text-sm font-black"
                      style={{
                        background: status === 'approved' ? '#DDFBF1' : '#FFF3F3',
                        color: status === 'approved' ? '#2A8A6A' : '#E05050',
                      }}
                    >
                      {status === 'approved' ? '✅ 已通过' : '❌ 已驳回'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-12 gap-3">
              <div className="text-5xl bounce-gentle">📚</div>
              <div className="font-black text-base" style={{ color: '#5A8EA0' }}>暂无课程</div>
            </div>
          )}
        </div>
      </div>

      <AppNav role="admin" userName="管理员" userAvatar="🛡️" />
    </div>
  );
};

export default CourseReview;
