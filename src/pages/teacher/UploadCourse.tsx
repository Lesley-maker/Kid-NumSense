import React, { useState } from 'react';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { StarSVG } from '../../components/SkyDecor';
import { UploadCloudIcon, CheckCircleIcon } from 'lucide-react';
import { toast } from 'sonner';

type Category = 'color' | 'size' | 'number' | 'shape';
type CourseLevel = '1' | '2' | '3';

interface FormState {
  title: string;
  category: Category | '';
  level: CourseLevel | '';
  description: string;
  emoji: string;
}

const defaultForm: FormState = { title: '', category: '', level: '', description: '', emoji: '' };

const categories = [
  { value: 'color', label: '颜色认知', emoji: '🌈' },
  { value: 'size', label: '大小认知', emoji: '📏' },
  { value: 'number', label: '数字认知', emoji: '🔢' },
  { value: 'shape', label: '形状认知', emoji: '⭕' },
];

const UploadCourse: React.FC = () => {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  const setField = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const isValid = form.title.trim() && form.category && form.level && form.description.trim();

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
    toast.success('课程上传成功，等待管理员审核！');
    console.log('[UploadCourse] submitted:', form);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setSubmitted(false);
  };

  const inputStyle = {
    background: '#fff',
    border: '1.5px solid rgba(126,200,227,0.4)',
    borderRadius: '16px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#1A3A4A',
    width: '100%',
    outline: 'none',
  };

  const labelStyle = { color: '#5A8EA0', fontSize: '13px', fontWeight: 700, marginBottom: '6px', display: 'block' as const };

  return (
    <div data-cmp="UploadCourse" className="mobile-page">
      <PageHeader title="上传课程" subtitle="分享你的课程内容，帮助更多小朋友" emoji="📤" />

      <div className="px-4 max-w-md mx-auto">

        {/* Success state */}
        <div className={submitted ? '' : 'hidden'}>
          <div
            className="rounded-3xl p-8 flex flex-col items-center gap-4 text-center"
            style={{
              background: '#fff',
              border: '1.5px solid rgba(126,200,227,0.4)',
              boxShadow: '0 8px 28px rgba(126,200,227,0.2)',
            }}
          >
            <div className="bounce-gentle">
              <CheckCircleIcon size={64} color="#7EC8E3" />
            </div>
            <h2 className="text-xl font-black" style={{ color: '#1A3A4A' }}>上传成功！</h2>
            <p className="text-sm font-semibold leading-relaxed" style={{ color: '#5A8EA0' }}>
              课程《{form.title}》已提交，管理员审核通过后将发布给学生。
            </p>
            <div className="flex gap-2 w-full mt-2">
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="star-twinkle" style={{ animationDelay: `${i * 0.25}s` }}>
                    <StarSVG size={20} color="#7EC8E3" />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleReset}
              className="btn-bubble w-full py-4 font-black text-white text-base"
              style={{ background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' }}
            >
              继续上传
            </button>
          </div>
        </div>

        {/* Form */}
        <div className={submitted ? 'hidden' : ''}>
          <div
            className="rounded-3xl p-5 flex flex-col gap-5"
            style={{
              background: '#fff',
              border: '1.5px solid rgba(126,200,227,0.35)',
              boxShadow: '0 6px 22px rgba(126,200,227,0.15)',
            }}
          >
            {/* Title */}
            <div>
              <label style={labelStyle}>课程标题 *</label>
              <input
                type="text"
                placeholder="例如：认识红绿蓝三种颜色"
                value={form.title}
                onChange={(e) => setField('title', e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Emoji */}
            <div>
              <label style={labelStyle}>封面 Emoji</label>
              <input
                type="text"
                placeholder="例如：🌈"
                value={form.emoji}
                onChange={(e) => setField('emoji', e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Category */}
            <div>
              <label style={labelStyle}>课程分类 *</label>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setField('category', cat.value as Category)}
                    className="btn-bubble flex-1 py-3 font-black text-sm transition-all duration-150"
                    style={{
                      background: form.category === cat.value ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' : '#EAF6FB',
                      color: form.category === cat.value ? '#fff' : '#5A8EA0',
                      border: `1.5px solid ${form.category === cat.value ? 'transparent' : 'rgba(126,200,227,0.35)'}`,
                      minWidth: '70px',
                    }}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <label style={labelStyle}>难度等级 *</label>
              <div className="flex gap-2">
                {(['1', '2', '3'] as CourseLevel[]).map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setField('level', lv)}
                    className="btn-bubble flex-1 py-3 font-black text-sm transition-all duration-150"
                    style={{
                      background: form.level === lv ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' : '#EAF6FB',
                      color: form.level === lv ? '#fff' : '#5A8EA0',
                      border: `1.5px solid ${form.level === lv ? 'transparent' : 'rgba(126,200,227,0.35)'}`,
                    }}
                  >
                    Lv.{lv}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>课程描述 *</label>
              <textarea
                placeholder="简单介绍这门课程的内容和适合的年龄段..."
                value={form.description}
                onChange={(e) => setField('description', e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {/* Upload area placeholder */}
            <div
              className="rounded-2xl p-6 flex flex-col items-center gap-2 cursor-pointer"
              style={{
                background: '#EAF6FB',
                border: '2px dashed rgba(126,200,227,0.6)',
              }}
            >
              <UploadCloudIcon size={32} color="#7EC8E3" />
              <span className="text-sm font-black" style={{ color: '#5A8EA0' }}>点击上传课程文件</span>
              <span className="text-xs font-semibold" style={{ color: '#B8E2F2' }}>支持 PDF、MP4、PPT 格式</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className="btn-bubble w-full py-4 font-black text-base"
              style={{
                background: isValid ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' : '#C5E9F5',
                color: isValid ? '#fff' : '#8CC4D8',
                cursor: isValid ? 'pointer' : 'not-allowed',
              }}
            >
              提交审核 📤
            </button>
          </div>
        </div>
      </div>

      <AppNav role="teacher" userName="王老师" userAvatar="👩‍🏫" />
    </div>
  );
};

export default UploadCourse;
