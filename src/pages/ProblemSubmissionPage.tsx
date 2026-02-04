/** 각 문제에 대한 사용자 제출 현황을 표시하는 임시 페이지 컴포넌트 */

export default function ProblemSubmissionsPage() {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="px-4 py-6 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">제출 현황</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          해당 문제에 대한 제출 목록은 추후 API 연동 후 표시됩니다
        </p>

        <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">
          임시 화면
        </div>
      </div>
    </section>
  );
}
