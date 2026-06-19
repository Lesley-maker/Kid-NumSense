import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { ProgressBar, StarBadge, StarSVG } from '../../components/SkyDecor';

const radarData = [
  { subject: '颜色', score: 85, fullMark: 100 },
  { subject: '大小', score: 75, fullMark: 100 },
  { subject: '数字', score: 60, fullMark: 100 },
  { subject: '形状', score: 68, fullMark: 100 },
];

const barData = [
  { name: '颜色', score: 85 },
  { name: '大小', score: 75 },
  { name: '数字', score: 60 },
  { name: '形状', score: 68 },
];

const suggestions = [
  { emoji: '🔢', subject: '数字认知', level: '需要加强', hint: '从数字1-5开始，多练习数数游戏', progress: 60 },
  { emoji: '⭕', subject: '形状认知', level: '继续努力', hint: '多观察生活中的形状，找找圆形和方形', progress: 68 },
  { emoji: '📏', subject: '大小认知', level: '表现不错', hint: '继续完成大小认知课程，你做得很棒！', progress: 75 },
  { emoji: '🌈', subject: '颜色认知', level: '非常优秀', hint: '颜色认知出色！可以挑战进阶课程了', progress: 85 },
];

const PreTestAnalysis: React.FC = () => {
  return (
    <div data-cmp="PreTestAnalysis" className="mobile-page">
      <PageHeader title="前测分析报告" subtitle="看看你的数感能力全貌" emoji="📊" />

      <div className="px-4 max-w-md mx-auto">

        {/* Score summary card */}
        <div
          className="rounded-3xl p-5 mb-4 flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)',
            boxShadow: '0 8px 28px rgba(126,200,227,0.4)',
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex flex-col items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.6)' }}
          >
            <span className="text-3xl font-black text-white">72</span>
            <span className="text-xs font-bold text-white opacity-85">分</span>
          </div>
          <div>
            <div className="text-white font-black text-base mb-1">综合得分</div>
            <div className="text-xs font-bold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>测评日期：2024-02-20</div>
            <StarBadge count={3} size="sm" />
          </div>
        </div>

        {/* Progress bars */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: '#fff', border: '1.5px solid rgba(126,200,227,0.3)', boxShadow: '0 4px 16px rgba(126,200,227,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <StarSVG size={14} color="#7EC8E3" />
            <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>分项得分</span>
          </div>
          {barData.map((d) => (
            <div key={d.name} className="flex items-center gap-3 mb-3 last:mb-0">
              <span className="text-xs font-bold w-8 flex-shrink-0" style={{ color: '#5A8EA0' }}>{d.name}</span>
              <div className="flex-1">
                <ProgressBar value={d.score} />
              </div>
              <span className="text-xs font-black w-8 text-right" style={{ color: '#3AAFCF' }}>{d.score}</span>
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
              <Radar name="得分" dataKey="score" stroke="#7EC8E3" fill="#7EC8E3" fillOpacity={0.4} />
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
            <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>柱状得分</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} barSize={28}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 700, fill: '#5A8EA0' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#B8E2F2' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1.5px solid #C5E9F5', fontWeight: 700, fontSize: 12 }}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="#7EC8E3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Suggestions */}
        <div className="flex items-center gap-2 mb-3">
          <StarSVG size={14} color="#7EC8E3" />
          <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>学习建议</span>
        </div>
        <div className="flex flex-col gap-3 mb-4">
          {suggestions.map((s) => (
            <div
              key={s.subject}
              className="rounded-2xl p-4 flex items-start gap-3"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(126,200,227,0.3)',
                boxShadow: '0 4px 12px rgba(126,200,227,0.1)',
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)' }}
              >
                {s.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-black text-sm" style={{ color: '#1A3A4A' }}>{s.subject}</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: '#C5E9F5', color: '#1A6A8A' }}
                  >
                    {s.level}
                  </span>
                </div>
                <p className="text-xs font-semibold leading-relaxed" style={{ color: '#5A8EA0' }}>{s.hint}</p>
                <div className="mt-2">
                  <ProgressBar value={s.progress} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AppNav role="student" userName="小明" userAvatar="🐻" />
    </div>
  );
};

export default PreTestAnalysis;
