import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudShape, StarSVG } from '../components/SkyDecor';
import { GraduationCapIcon, BookOpenIcon, ShieldIcon } from 'lucide-react';

interface PortalCard {
  role: string;
  path: string;
  label: string;
  desc: string;
  emoji: string;
  icon: React.ReactNode;
}

const portals: PortalCard[] = [
  { role: 'student', path: '/student', label: '学生端', desc: '开始学习数感吧！', emoji: '🐣', icon: <GraduationCapIcon size={28} /> },
  { role: 'teacher', path: '/teacher', label: '教师端', desc: '管理课程与学生', emoji: '🦉', icon: <BookOpenIcon size={28} /> },
  { role: 'admin', path: '/admin', label: '管理员端', desc: '审核与数据监测', emoji: '🦁', icon: <ShieldIcon size={28} /> },
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState<string | null>(null);

  return (
    <div
      data-cmp="Index"
      className="min-h-[100dvh] relative flex flex-col items-center justify-between overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #7EC8E3 0%, #C5E9F5 55%, #EAF6FB 100%)' }}
    >
      {/* ── Sky background decorations ─────────────────── */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <div className="cloud-float absolute -top-6 -left-8 opacity-60">
          <CloudShape size="lg" color="rgba(255,255,255,0.7)" />
        </div>
        <div className="cloud-float-delay absolute top-4 right-0 opacity-50">
          <CloudShape size="md" color="rgba(255,255,255,0.6)" />
        </div>
        <div className="cloud-float-delay2 absolute top-1/3 -left-4 opacity-40">
          <CloudShape size="sm" color="rgba(255,255,255,0.5)" />
        </div>
        <div className="cloud-float absolute bottom-32 right-8 opacity-35">
          <CloudShape size="md" color="rgba(255,255,255,0.5)" />
        </div>
        <div className="cloud-float-delay2 absolute bottom-16 -left-4 opacity-30">
          <CloudShape size="lg" color="rgba(255,255,255,0.4)" />
        </div>

        {/* Stars scattered */}
        <div className="star-twinkle absolute top-16 left-8">
          <StarSVG size={18} color="rgba(255,255,255,0.9)" />
        </div>
        <div className="star-twinkle-delay absolute top-10 right-16">
          <StarSVG size={14} color="rgba(255,255,255,0.8)" />
        </div>
        <div className="star-twinkle-delay2 absolute top-28 right-8">
          <StarSVG size={10} color="rgba(255,255,255,0.7)" />
        </div>
        <div className="star-twinkle-delay3 absolute top-36 left-20">
          <StarSVG size={8} color="rgba(255,255,255,0.6)" />
        </div>
        <div className="star-twinkle absolute bottom-48 left-12">
          <StarSVG size={12} color="rgba(255,255,255,0.7)" />
        </div>
        <div className="star-twinkle-delay absolute bottom-60 right-10">
          <StarSVG size={16} color="rgba(255,255,255,0.8)" />
        </div>
        <div className="star-twinkle-delay2 absolute top-1/2 left-4">
          <StarSVG size={9} color="rgba(255,255,255,0.5)" />
        </div>
        <div className="star-twinkle-delay3 absolute top-1/2 right-6">
          <StarSVG size={11} color="rgba(255,255,255,0.6)" />
        </div>
      </div>

      {/* ── Hero header ────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center pt-20 px-6 text-center">
        <div className="bounce-gentle mb-2">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-custom"
            style={{ background: 'rgba(255,255,255,0.9)' }}
          >
            <span className="text-5xl">🌈</span>
          </div>
        </div>
        <h1 className="text-3xl font-black text-white mt-4 drop-shadow-md leading-tight">
          知域
        </h1>
        <p className="text-base font-bold mt-2" style={{ color: 'rgba(255,255,255,0.88)' }}>
          让每个孩子都有无限可能
        </p>

        {/* Star row */}
        <div className="flex gap-2 mt-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="star-twinkle" style={{ animationDelay: `${i * 0.35}s` }}>
              <StarSVG size={16} color="rgba(255,255,255,0.85)" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Portal cards ───────────────────────────────── */}
      <div className="relative z-10 w-full max-w-sm px-5 flex flex-col gap-4 pb-16">
        <p className="text-center text-sm font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>
          选择你的身份进入
        </p>
        {portals.map((p) => (
          <button
            key={p.role}
            className={`card-hover w-full rounded-3xl px-6 py-5 flex items-center gap-4 text-left ${pressed === p.role ? 'scale-95' : ''}`}
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: '2px solid rgba(126,200,227,0.4)',
              boxShadow: '0 6px 24px rgba(126,200,227,0.25)',
            }}
            onMouseDown={() => setPressed(p.role)}
            onMouseUp={() => { setPressed(null); navigate(p.path); }}
            onTouchStart={() => setPressed(p.role)}
            onTouchEnd={() => { setPressed(null); navigate(p.path); }}
          >
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 bounce-gentle"
              style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)' }}
            >
              {p.emoji}
            </div>
            {/* Text */}
            <div className="flex-1">
              <div className="text-lg font-black" style={{ color: '#1A3A4A' }}>{p.label}</div>
              <div className="text-sm font-bold" style={{ color: '#5A8EA0' }}>{p.desc}</div>
            </div>
            {/* Arrow */}
            <div style={{ color: '#7EC8E3' }}>{p.icon}</div>
          </button>
        ))}
      </div>

      {/* ── Footer ─────────────────────────────────────── */}
      <div className="relative z-10 pb-8 text-center">
        <p className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>
          数感认知训练平台 v1.0
        </p>
      </div>
    </div>
  );
};

export default Index;
