import React, { useState } from 'react';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { ProgressBar, StarBadge, StarSVG } from '../../components/SkyDecor';
import { mockStudents } from '../../data/mockData';
import { SearchIcon } from 'lucide-react';

const TeacherMonitor: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterDone, setFilterDone] = useState<'all' | 'done' | 'notdone'>('all');

  const filtered = mockStudents.filter((s) => {
    const matchSearch = s.name.includes(search) || s.grade.includes(search);
    const matchDone =
      filterDone === 'all' ? true : filterDone === 'done' ? s.preTestDone : !s.preTestDone;
    return matchSearch && matchDone;
  });

  return (
    <div data-cmp="TeacherMonitor" className="mobile-page">
      <PageHeader title="学生监控" subtitle="实时掌握每位学生的学习进展" emoji="🔍" />

      <div className="px-4 max-w-md mx-auto">
        {/* Search bar */}
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-4"
          style={{
            background: '#fff',
            border: '1.5px solid rgba(126,200,227,0.35)',
            boxShadow: '0 3px 10px rgba(126,200,227,0.1)',
          }}
        >
          <SearchIcon size={16} color="#7EC8E3" />
          <input
            type="text"
            placeholder="搜索学生姓名或年级..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm font-semibold placeholder:text-opacity-50"
            style={{ color: '#1A3A4A' }}
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {[
            { key: 'all', label: '全部' },
            { key: 'done', label: '已完成前测' },
            { key: 'notdone', label: '未完成前测' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterDone(f.key as 'all' | 'done' | 'notdone')}
              className="btn-bubble flex-1 py-2 text-xs font-black transition-all duration-200"
              style={{
                background: filterDone === f.key ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' : '#fff',
                color: filterDone === f.key ? '#fff' : '#5A8EA0',
                border: `1.5px solid ${filterDone === f.key ? 'transparent' : 'rgba(126,200,227,0.3)'}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Summary pill */}
        <div
          className="rounded-2xl px-4 py-2 mb-4 flex items-center gap-2"
          style={{ background: '#EAF6FB', border: '1.5px solid rgba(126,200,227,0.3)' }}
        >
          <StarSVG size={13} color="#7EC8E3" />
          <span className="text-xs font-bold" style={{ color: '#5A8EA0' }}>
            共 <strong style={{ color: '#3AAFCF' }}>{filtered.length}</strong> 位学生 ·
            前测完成率 <strong style={{ color: '#3AAFCF' }}>
              {Math.round((filtered.filter((s) => s.preTestDone).length / Math.max(filtered.length, 1)) * 100)}%
            </strong>
          </span>
        </div>

        {/* Student list */}
        <div className="flex flex-col gap-3 mb-4">
          {filtered.map((student) => {
            const progressValues = Object.values(student.progress) as number[];
            const avgProgress = progressValues.length
              ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length)
              : 0;
            const stars = Math.ceil(student.preTestScore / 25);
            return (
              <div
                key={student.id}
                className="rounded-3xl px-5 py-4 card-hover"
                style={{
                  background: '#fff',
                  border: '1.5px solid rgba(126,200,227,0.3)',
                  boxShadow: '0 4px 14px rgba(126,200,227,0.12)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)' }}
                  >
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>{student.name}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{ background: '#EAF6FB', color: '#5A8EA0' }}
                      >
                        {student.grade}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{
                          background: student.preTestDone ? '#DDFBF1' : '#FFF3E0',
                          color: student.preTestDone ? '#2A8A6A' : '#A06020',
                        }}
                      >
                        {student.preTestDone ? '✓ 已前测' : '✗ 未前测'}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mt-0.5 truncate" style={{ color: '#5A8EA0' }}>
                      {student.recentActivity}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold w-10 flex-shrink-0" style={{ color: '#5A8EA0' }}>整体</span>
                  <div className="flex-1">
                    <ProgressBar value={avgProgress} />
                  </div>
                  <span className="text-xs font-black w-8 text-right" style={{ color: '#3AAFCF' }}>{avgProgress}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold" style={{ color: '#5A8EA0' }}>前测得分：</span>
                    <span className="text-xs font-black" style={{ color: '#3AAFCF' }}>{student.preTestScore}分</span>
                  </div>
                  <StarBadge count={stars} size="sm" />
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-12 gap-3">
              <div className="text-5xl bounce-gentle">🔍</div>
              <div className="font-black text-base" style={{ color: '#5A8EA0' }}>没有找到学生</div>
            </div>
          )}
        </div>
      </div>

      <AppNav role="teacher" userName="王老师" userAvatar="👩‍🏫" />
    </div>
  );
};

export default TeacherMonitor;
