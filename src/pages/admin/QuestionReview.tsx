import React, { useState } from 'react';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { StatusBadge, CategoryBadge, StarSVG } from '../../components/SkyDecor';
import { mockQuestions } from '../../data/mockData';
import { CheckIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

const difficultyLabel: Record<string, { label: string; bg: string; color: string }> = {
  easy: { label: '简单', bg: '#DDFBF1', color: '#2A8A6A' },
  medium: { label: '中等', bg: '#EAF6FB', color: '#3AAFCF' },
  hard: { label: '困难', bg: '#FFF3E0', color: '#A06020' },
};

const typeLabel: Record<string, string> = {
  choice: '选择题',
  match: '连线题',
  order: '排序题',
};

const QuestionReview: React.FC = () => {
  const [filter, setFilter] = useState<FilterStatus>('pending');
  const [statuses, setStatuses] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>(() => {
    const init: Record<string, 'pending' | 'approved' | 'rejected'> = {};
    mockQuestions.forEach((q) => { init[q.id] = q.status; });
    return init;
  });

  const handleApprove = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: 'approved' }));
    toast.success('题目已通过审核！');
    console.log('[QuestionReview] approved:', id);
  };

  const handleReject = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: 'rejected' }));
    toast.error('题目已驳回。');
    console.log('[QuestionReview] rejected:', id);
  };

  const filtered = mockQuestions.filter((q) => filter === 'all' || statuses[q.id] === filter);

  const filterTabs: { key: FilterStatus; label: string; count: number }[] = [
    { key: 'all', label: '全部', count: mockQuestions.length },
    { key: 'pending', label: '待审核', count: Object.values(statuses).filter((s) => s === 'pending').length },
    { key: 'approved', label: '已通过', count: Object.values(statuses).filter((s) => s === 'approved').length },
    { key: 'rejected', label: '已驳回', count: Object.values(statuses).filter((s) => s === 'rejected').length },
  ];

  return (
    <div data-cmp="QuestionReview" className="mobile-page">
      <PageHeader title="题目审核" subtitle="审核老师上传的测试题目" emoji="📝" />

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

        {/* Question list */}
        <div className="flex flex-col gap-4 mb-4">
          {filtered.map((question) => {
            const status = statuses[question.id];
            const diff = difficultyLabel[question.difficulty] ?? { label: question.difficulty, bg: '#EAF6FB', color: '#5A8EA0' };
            return (
              <div
                key={question.id}
                className="rounded-3xl p-4 card-hover"
                style={{
                  background: '#fff',
                  border: '1.5px solid rgba(126,200,227,0.3)',
                  boxShadow: '0 4px 16px rgba(126,200,227,0.12)',
                }}
              >
                {/* Question text */}
                <div className="flex items-start gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)', color: '#fff' }}
                  >
                    Q
                  </div>
                  <p className="font-bold text-sm leading-relaxed flex-1" style={{ color: '#1A3A4A' }}>
                    {question.text}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <CategoryBadge category={question.category} />
                  <StatusBadge status={status} />
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: diff.bg, color: diff.color }}
                  >
                    {diff.label}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: '#EAF6FB', color: '#5A8EA0' }}
                  >
                    {typeLabel[question.type] ?? question.type}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs mb-3" style={{ color: '#B8E2F2' }}>
                  <span className="font-semibold">👩‍🏫 {question.uploadedBy}</span>
                  <span className="font-semibold">📅 {question.uploadDate}</span>
                </div>

                {/* Action buttons */}
                <div className={status === 'pending' ? 'flex gap-2' : 'hidden'}>
                  <button
                    onClick={() => handleApprove(question.id)}
                    className="btn-bubble flex-1 py-3 font-black text-sm flex items-center justify-center gap-1 text-white"
                    style={{ background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' }}
                  >
                    <CheckIcon size={14} />
                    通过
                  </button>
                  <button
                    onClick={() => handleReject(question.id)}
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
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-12 gap-3">
              <div className="text-5xl bounce-gentle">📝</div>
              <div className="font-black text-base" style={{ color: '#5A8EA0' }}>暂无题目</div>
            </div>
          )}
        </div>
      </div>

      <AppNav role="admin" userName="管理员" userAvatar="🛡️" />
    </div>
  );
};

export default QuestionReview;
