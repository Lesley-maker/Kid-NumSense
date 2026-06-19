import React from 'react';
import { CloudShape } from './SkyDecor';
import { StarSVG } from './SkyDecor';
interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  emoji?: string;
  variant?: 'blue' | 'pink' | 'green' | 'purple';
  children?: React.ReactNode;
}
const PageHeader: React.FC<PageHeaderProps> = ({
  title = '主页',
  subtitle = '',
  emoji = '',
  variant = 'blue',
  children
}) => {
  // All variants use blue/white two-tone
  const headerBg = 'linear-gradient(160deg, #7EC8E3 0%, #5BBDD4 100%)';
  return <div data-cmp="PageHeader" className="relative overflow-hidden rounded-b-3xl mb-5 px-5 pt-12 pb-6" style={{
    background: headerBg
  }}>
      {/* Cloud decorations */}
      <div className="cloud-float absolute -top-2 -left-4 opacity-40">
        <CloudShape size="lg" color="rgba(255,255,255,0.6)" />
      </div>
      <div className="cloud-float-delay absolute -top-1 right-0 opacity-30">
        <CloudShape size="md" color="rgba(255,255,255,0.5)" />
      </div>
      <div className="cloud-float-delay2 absolute bottom-0 left-1/3 opacity-20">
        <CloudShape size="sm" color="rgba(255,255,255,0.7)" />
      </div>

      {/* Star accents */}
      <div className="star-twinkle absolute top-4 right-6 opacity-90">
        <StarSVG size={20} color="rgba(255,255,255,0.9)" />
      </div>
      <div className="star-twinkle-delay absolute top-8 right-14 opacity-70">
        <StarSVG size={13} color="rgba(255,255,255,0.7)" />
      </div>
      <div className="star-twinkle-delay2 absolute top-3 left-1/2 opacity-60">
        <StarSVG size={10} color="rgba(255,255,255,0.6)" />
      </div>
      <div className="star-twinkle-delay3 absolute top-14 right-8 opacity-50">
        <StarSVG size={8} color="rgba(255,255,255,0.5)" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {emoji && <div className="text-4xl mb-2 bounce-gentle w-fit">{emoji}</div>}
        <h1 className="text-2xl font-black text-white leading-tight drop-shadow-sm">
          {title}
        </h1>
        {subtitle && <p className="text-sm font-bold mt-1" style={{
        color: 'rgba(255,255,255,0.85)'
      }}>
            {subtitle}
          </p>}
        {children && <div className="mt-3" data-px-slot>{children}<div style={{
          "position": "fixed",
          "height": "1px",
          "width": "1px"
        }} data-px-slot="PageHeader-slot-0" /><div style={{
          "position": "fixed",
          "height": "1px",
          "width": "1px"
        }} data-px-slot="PageHeader-slot-0" /></div>}
      </div>
    </div>;
};
export default PageHeader;