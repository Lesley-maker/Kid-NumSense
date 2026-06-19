import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppNav from '../../components/AppNav';
import PageHeader from '../../components/PageHeader';
import { StarSVG } from '../../components/SkyDecor';
import { preTestQuestions } from '../../data/mockData';
import { ChevronRightIcon, RefreshCwIcon } from 'lucide-react';

type TestState = 'intro' | 'testing' | 'done';

const PreTest: React.FC = () => {
  const [testState, setTestState] = useState<TestState>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = preTestQuestions[currentQ];
  const totalQ = preTestQuestions.length;
  const progressPct = (currentQ / totalQ) * 100;

  const correctCount = answers.filter((ans, i) => ans === preTestQuestions[i]?.answer).length;
  const score = Math.round((correctCount / totalQ) * 100);

  const handleOptionSelect = (idx: number) => setSelectedOption(idx);

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);
    if (currentQ + 1 >= totalQ) {
      setTestState('done');
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleRestart = () => {
    setTestState('intro');
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  const starCount = Math.ceil(score / 20);

  return (
    <div data-cmp="PreTest" className="mobile-page">
      <PageHeader title="前测小挑战" subtitle="做一做，看看你的数感怎么样！" emoji="📝" />

      <div className="px-4 max-w-md mx-auto">

        {/* ── INTRO ───────────────────────────────────── */}
        <div className={testState === 'intro' ? '' : 'hidden'}>
          <div
            className="rounded-3xl p-6 flex flex-col items-center gap-4 text-center"
            style={{
              background: '#fff',
              border: '1.5px solid rgba(126,200,227,0.4)',
              boxShadow: '0 6px 24px rgba(126,200,227,0.2)',
            }}
          >
            <div className="bounce-gentle mt-2">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
                style={{ background: 'linear-gradient(135deg, #C5E9F5, #7EC8E3)' }}
              >
                🌟
              </div>
            </div>
            <h2 className="text-xl font-black" style={{ color: '#1A3A4A' }}>准备好了吗？</h2>
            <p className="text-sm font-semibold leading-relaxed" style={{ color: '#5A8EA0' }}>
              接下来有 <strong style={{ color: '#3AAFCF' }}>{totalQ}</strong> 道小题目<br />
              测测你对颜色、大小、数字和形状的认识<br />
              认真作答，看看能得几颗星星！
            </p>

            {/* Star row */}
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="star-twinkle" style={{ animationDelay: `${i * 0.3}s` }}>
                  <StarSVG size={20} color="#7EC8E3" />
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-3 w-full">
              {[
                { label: '题目数', value: `${totalQ}题` },
                { label: '难度', value: '简单' },
                { label: '时间', value: '约5分钟' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex-1 rounded-2xl py-3 px-2 flex flex-col items-center gap-1"
                  style={{ background: '#EAF6FB' }}
                >
                  <span className="text-base font-black" style={{ color: '#3AAFCF' }}>{item.value}</span>
                  <span className="text-xs font-bold" style={{ color: '#5A8EA0' }}>{item.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setTestState('testing')}
              className="btn-bubble w-full py-4 text-white font-black text-base"
              style={{ background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)' }}
            >
              开始前测 🚀
            </button>
          </div>
        </div>

        {/* ── TESTING ─────────────────────────────────── */}
        <div className={testState === 'testing' ? '' : 'hidden'}>
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold" style={{ color: '#5A8EA0' }}>
                第 {currentQ + 1} / {totalQ} 题
              </span>
              <span className="text-base">{question?.emoji}</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: '#C5E9F5' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #7EC8E3, #3AAFCF)' }}
              />
            </div>
          </div>

          {/* Question card */}
          <div
            className="rounded-3xl p-6 mb-4 text-center"
            style={{
              background: 'linear-gradient(135deg, #7EC8E3 0%, #3AAFCF 100%)',
              boxShadow: '0 6px 20px rgba(126,200,227,0.35)',
            }}
          >
            <div className="text-5xl mb-3 bounce-gentle">{question?.emoji}</div>
            <h2 className="text-lg font-black text-white leading-snug">{question?.text}</h2>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-5">
            {(question?.options ?? []).map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className="rounded-2xl px-5 py-4 text-left font-black text-sm transition-all duration-200 card-hover"
                  style={{
                    background: isSelected ? '#7EC8E3' : '#fff',
                    border: `2px solid ${isSelected ? '#3AAFCF' : 'rgba(126,200,227,0.3)'}`,
                    color: isSelected ? '#fff' : '#1A3A4A',
                    boxShadow: isSelected ? '0 4px 16px rgba(126,200,227,0.4)' : 'none',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black mr-3"
                    style={{
                      background: isSelected ? 'rgba(255,255,255,0.25)' : '#C5E9F5',
                      color: isSelected ? '#fff' : '#3AAFCF',
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="btn-bubble w-full py-4 text-white font-black text-base"
            style={{
              background: selectedOption === null
                ? '#C5E9F5'
                : 'linear-gradient(135deg, #7EC8E3, #3AAFCF)',
              color: selectedOption === null ? '#8CC4D8' : '#fff',
              cursor: selectedOption === null ? 'not-allowed' : 'pointer',
            }}
          >
            {currentQ + 1 >= totalQ ? '完成前测 🎉' : '下一题'}
            {selectedOption !== null && <ChevronRightIcon size={18} style={{ display: 'inline', marginLeft: 4 }} />}
          </button>
        </div>

        {/* ── DONE ────────────────────────────────────── */}
        <div className={testState === 'done' ? '' : 'hidden'}>
          <div
            className="rounded-3xl p-6 flex flex-col items-center gap-4 text-center"
            style={{
              background: '#fff',
              border: '1.5px solid rgba(126,200,227,0.4)',
              boxShadow: '0 8px 28px rgba(126,200,227,0.25)',
            }}
          >
            <div className="text-5xl bounce-gentle mt-2">🎉</div>
            <h2 className="text-xl font-black" style={{ color: '#1A3A4A' }}>太棒了！前测完成！</h2>

            {/* Score circle */}
            <div
              className="w-28 h-28 rounded-full flex flex-col items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)', boxShadow: '0 8px 24px rgba(126,200,227,0.45)' }}
            >
              <span className="text-3xl font-black text-white">{score}</span>
              <span className="text-sm font-bold text-white opacity-85">分</span>
            </div>

            <p className="text-sm font-semibold" style={{ color: '#5A8EA0' }}>
              答对了 <strong style={{ color: '#3AAFCF' }}>{correctCount}</strong> / {totalQ} 题，继续努力哦！
            </p>

            {/* Stars */}
            <div className="flex gap-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className={i < starCount ? 'star-twinkle' : ''} style={{ animationDelay: `${i * 0.2}s` }}>
                  <StarSVG size={24} color={i < starCount ? '#7EC8E3' : '#C5E9F5'} />
                </div>
              ))}
            </div>

            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={handleRestart}
                className="btn-bubble flex-1 py-3 font-black text-sm flex items-center justify-center gap-1"
                style={{ background: '#EAF6FB', color: '#5A8EA0', border: '1.5px solid rgba(126,200,227,0.35)' }}
              >
                <RefreshCwIcon size={15} /> 重测
              </button>
              <Link
                to="/student/pretest-analysis"
                className="btn-bubble flex-1 py-3 font-black text-sm text-white text-center"
                style={{ background: 'linear-gradient(135deg, #7EC8E3, #3AAFCF)', textDecoration: 'none' }}
              >
                查看分析 →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AppNav role="student" userName="小明" userAvatar="🐻" />
    </div>
  );
};

export default PreTest;
