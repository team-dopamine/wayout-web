export default function HeroSection() {
  return (
    <div className="space-y-4">
      {/* 상단 아이콘 박스 */}
      <div className="mb-4 inline-flex items-center justify-center rounded-full bg-blue-50 p-4 dark:bg-blue-900/30">
        <span className="material-symbols-outlined text-5xl text-blue-600 dark:text-blue-400 md:text-6xl">
          bug_report
        </span>
      </div>

      {/* 메인 타이틀: 그라데이션 텍스트 포함 */}
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl">
        Break the <span className="gradient-text">Algorithm</span>
      </h1>

      {/* 설명 문구 */}
      <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400 md:text-xl">
        Generate counter-examples for competitive programming problems. Submit your solution, find
        the edge case, and debug smarter.
      </p>
    </div>
  );
}
