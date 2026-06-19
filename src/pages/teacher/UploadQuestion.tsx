import React, { useState } from 'react';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { StarSVG } from '../../components/SkyDecor';
import { CheckCircleIcon } from 'lucide-react';
import { toast } from 'sonner';

type Category = 'color' | 'size' | 'number' | 'shape';
type Difficulty = 'easy' | 'medium' | 'hard';
type QType = 'choice' | 'match' | 'order';

interface FormState {
  text: string;
  category: Category | '';
  difficulty: Difficulty | '';
  type: QType | '';
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
}

const defaultForm: FormState = {
  text: '', category: '', difficulty: '', type: '',
  optionA: '', optionB: '', optionC: '', optionD: '', answer: '',
};

const categories = [
  { value: 'color', label: '颜色', emoji: '🌈' },
  { value: 'size', label: '大小', emoji: '📏' },
  { value: 'number', label: '数字', emoji: '🔢' },
  { value: 'shape', label: '形状', emoji: '⭕' },
];

const difficulties = [
  { value: 'easy', label: '简单', color: '#3AAFCF' },
  { value: 'medium', label: '中等', color: '#7EC8E3' },
  { value: 'hard', label: '困难', color: '#1A8FB0' },
];

const qTypes = [
  { value: 'choice', label: '选择题' },
  { value: 'match', label: '连线题' },
  { value: 'order', label: '排序题' },
];

const UploadQuestion: React.FC = () => {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  const setField = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const isValid =
    form.text.trim() && form.category && form.difficulty && form.type;

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
    toast.success('题目上传成功，等待管理员审核！');
    console.log('[UploadQuestion] submitted:', form);
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
    <div data-cmp="UploadQuestion" className="mobile-page">
      <PageHeader title="上传题目" subtitle="添加新的测试题目，帮助孩子提高" emoji="✍️" />

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
            <h2 className="text-xl font-black" style={{ color: '#1A3A4A' }}>题目上传成功！</h2>
            <p className="text-sm font-semibold leading-relaxed" style={{ color: '#5A8EA0' }}>
              题目已提交给管理员审核，通过后将加入题库供学生使用。
            </p>
            <div className="flex gap-2 mt-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="star-twinkle" style={{ animationDelay: `${i * 0.25}s` }}>
                  <StarSVG size={20} color="#7EC8E3" />
                </div>
              ))}
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
            {/* Question text */}
            <div>
              <label style={labelStyle}>题目内容 *</label>
              <textarea
                placeholder="请输入题目文本，例如：下面哪个是圆形？"
                value={form.text}
                onChange={(e) => setField('text', e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {/* Category */}
            <div>
              <label style={labelStyle}>题目分类 *</label>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setField('category', cat.value as Category)}
                    className="btn-bubble flex-1 py-3 font-black text-xs transition-all duration-150"
                    style={{
                      background: form.category === cat.value ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' : '#EAF6FB',
                      color: form.category === cat.value ? '#fff' : '#5A8EA0',
                      border: `1.5px solid ${form.category === cat.value ? 'transparent' : 'rgba(126,200,227,0.35)'}`,
                      minWidth: '60px',
                    }}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label style={labelStyle}>难度 *</label>
              <div className="flex gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setField('difficulty', d.value as Difficulty)}
                    className="btn-bubble flex-1 py-3 font-black text-sm transition-all duration-150"
                    style={{
                      background: form.difficulty === d.value ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' : '#EAF6FB',
                      color: form.difficulty === d.value ? '#fff' : '#5A8EA0',
                      border: `1.5px solid ${form.difficulty === d.value ? 'transparent' : 'rgba(126,200,227,0.35)'}`,
                    }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <label style={labelStyle}>题目类型 *</label>
              <div className="flex gap-2">
                {qTypes.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setField('type', t.value as QType)}
                    className="btn-bubble flex-1 py-3 font-black text-xs transition-all duration-150"
                    style={{
                      background: form.type === t.value ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' : '#EAF6FB',
                      color: form.type === t.value ? '#fff' : '#5A8EA0',
                      border: `1.5px solid ${form.type === t.value ? 'transparent' : 'rgba(126,200,227,0.35)'}`,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Options (choice only) */}
            <div className={form.type === 'choice' ? '' : 'hidden'}>
              <label style={labelStyle}>选项内容（选择题）</label>
              <div className="flex flex-col gap-2">
                {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                  const key = `option${letter}` as keyof FormState;
                  return (
                    <div key={letter} className="flex items-center gap-2">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                        style={{ background: '#C5E9F5', color: '#3AAFCF' }}
                      >
                        {letter}
                      </span>
                      <input
                        type="text"
                        placeholder={`选项 ${letter}`}
                        value={form[key] as string}
                        onChange={(e) => setField(key, e.target.value)}
                        style={{ ...inputStyle, padding: '10px 14px' }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-3">
                <label style={labelStyle}>正确答案</label>
                <div className="flex gap-2">
                  {['A', 'B', 'C', 'D'].map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => setField('answer', letter)}
                      className="btn-bubble flex-1 py-2 font-black text-sm"
                      style={{
                        background: form.answer === letter ? 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' : '#EAF6FB',
                        color: form.answer === letter ? '#fff' : '#5A8EA0',
                        border: `1.5px solid ${form.answer === letter ? 'transparent' : 'rgba(126,200,227,0.35)'}`,
                      }}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
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
              提交审核 ✍️
            </button>
          </div>
        </div>
      </div>

      <AppNav role="teacher" userName="王老师" userAvatar="👩‍🏫" />
    </div>
  );
};

export default UploadQuestion;
