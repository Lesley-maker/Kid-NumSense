import React from 'react';

// ── Sky decorations (stars + clouds) for mobile two-tone theme ──────────────

interface SkyDecorProps {
  variant?: 'blue' | 'pink' | 'mixed';
  density?: 'light' | 'normal';
}

const SkyDecor: React.FC<SkyDecorProps> = ({ variant = 'blue', density = 'normal' }) => {
  const cloudColor = '#C5E9F5';
  const cloudColorAlt = '#FFFFFF';
  return (
    <div data-cmp="SkyDecor" className="pointer-events-none select-none absolute inset-0 overflow-hidden">
      {/* Large cloud top-left */}
      <div className="cloud-float absolute -top-4 -left-6 opacity-80">
        <CloudShape size="lg" color={cloudColor} />
      </div>
      {/* Cloud top-right */}
      <div className="cloud-float-delay absolute top-2 right-0 opacity-70">
        <CloudShape size="md" color={cloudColorAlt} />
      </div>
      {/* Small cloud mid */}
      {density === 'normal' && (
        <div className="cloud-float-delay2 absolute top-24 left-1/2 -translate-x-1/2 opacity-50">
          <CloudShape size="sm" color={cloudColor} />
        </div>
      )}
      {/* Bottom cloud */}
      <div className="cloud-float absolute bottom-20 right-4 opacity-40">
        <CloudShape size="md" color={cloudColorAlt} />
      </div>

      {/* Stars scattered */}
      <StarDot top="10%" left="15%" size={18} delay={0} />
      <StarDot top="8%" right="22%" size={14} delay={0.5} />
      <StarDot top="22%" right="8%" size={10} delay={1.1} />
      <StarDot top="35%" left="5%" size={8} delay={0.8} />
      {density === 'normal' && (
        <>
          <StarDot top="50%" right="6%" size={12} delay={1.4} />
          <StarDot top="60%" left="10%" size={8} delay={0.3} />
          <StarDot top="75%" right="15%" size={10} delay={1.8} />
          <StarDot top="18%" left="45%" size={7} delay={0.7} />
        </>
      )}
    </div>
  );
};

// ── Individual twinkling star dot ────────────────────────────────────────────
interface StarDotProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size?: number;
  delay?: number;
}
const StarDot: React.FC<StarDotProps> = ({
  top, bottom, left, right, size = 12, delay = 0,
}) => {
  const cls = delay === 0 ? 'star-twinkle' : delay < 1 ? 'star-twinkle-delay' : delay < 1.5 ? 'star-twinkle-delay2' : 'star-twinkle-delay3';
  return (
    <div
      className={`absolute ${cls}`}
      style={{ top, bottom, left, right, width: size, height: size }}
    >
      <StarSVG size={size} />
    </div>
  );
};

// ── Pure SVG star (no emoji) ─────────────────────────────────────────────────
interface StarSVGProps { size?: number; color?: string; }
export const StarSVG: React.FC<StarSVGProps> = ({ size = 16, color = '#7EC8E3' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.4 8.26L21 9.27L16.5 13.64L17.77 20.23L12 17.08L6.23 20.23L7.5 13.64L3 9.27L9.6 8.26L12 2Z" />
  </svg>
);

// ── Cloud SVG shape ───────────────────────────────────────────────────────────
interface CloudShapeProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}
export const CloudShape: React.FC<CloudShapeProps> = ({ size = 'md', color = '#C5E9F5' }) => {
  const dims = { sm: 70, md: 110, lg: 160 };
  const w = dims[size];
  const h = w * 0.55;
  return (
    <svg width={w} height={h} viewBox="0 0 160 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="62" rx="72" ry="26" fill={color} />
      <ellipse cx="50" cy="48" rx="34" ry="30" fill={color} />
      <ellipse cx="100" cy="42" rx="38" ry="32" fill={color} />
      <ellipse cx="72" cy="34" rx="26" ry="22" fill={color} />
      <ellipse cx="118" cy="52" rx="22" ry="18" fill={color} />
    </svg>
  );
};

// ── Star badge (5-star rating) ────────────────────────────────────────────────
interface StarBadgeProps {
  count?: number;
  size?: 'sm' | 'md';
}
export const StarBadge: React.FC<StarBadgeProps> = ({ count = 3, size = 'md' }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < count);
  const sz = size === 'sm' ? 12 : 16;
  return (
    <div data-cmp="StarBadge" className="flex gap-0.5 items-center">
      {stars.map((filled, i) => (
        <span key={i} style={{ opacity: filled ? 1 : 0.2 }}>
          <StarSVG size={sz} color="#7EC8E3" />
        </span>
      ))}
    </div>
  );
};

// ── Progress bar ──────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value?: number;
  max?: number;
  color?: string;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({ value = 0, max = 100, color = '' }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div data-cmp="ProgressBar" className="progress-cute h-3 w-full rounded-full">
      <div
        className="progress-cute-bar h-full rounded-full"
        style={{ width: `${pct}%`, background: color || 'linear-gradient(90deg, #7EC8E3, #3AAFCF)' }}
      />
    </div>
  );
};

// ── Category badge ────────────────────────────────────────────────────────────
interface CategoryBadgeProps {
  category?: string;
}
export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category = 'color' }) => {
  const map: Record<string, { label: string }> = {
    color: { label: '颜色认知' },
    size: { label: '大小认知' },
    number: { label: '数字认知' },
    shape: { label: '形状认知' },
  };
  const info = map[category] ?? map['color'];
  return (
    <span
      data-cmp="CategoryBadge"
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
      style={{ background: '#C5E9F5', color: '#1A3A4A' }}
    >
      {info.label}
    </span>
  );
};

// ── Status badge ──────────────────────────────────────────────────────────────
interface StatusBadgeProps {
  status?: 'pending' | 'approved' | 'rejected';
}
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status = 'pending' }) => {
  const map = {
    pending: { label: '待审核', bg: '#D8F0FA', color: '#1A6A8A' },
    approved: { label: '已通过', bg: '#C5E9F5', color: '#0D5A70' },
    rejected: { label: '已拒绝', bg: '#FFDDE0', color: '#8B1A1A' },
  };
  const info = map[status];
  return (
    <span
      data-cmp="StatusBadge"
      className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold"
      style={{ background: info.bg, color: info.color }}
    >
      {info.label}
    </span>
  );
};

export default SkyDecor;
