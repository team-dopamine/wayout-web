import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProblemInfoCard from '@/components/common/ProblemInfoCard';

type TabKey = 'find' | 'status' | 'contribute';

export default function ProblemShellLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { problemId } = useParams();

  const activeTab: TabKey = location.pathname.startsWith('/solution-submit')
    ? 'contribute'
    : location.pathname.startsWith('/submissions')
      ? 'status'
      : 'find';

  const handleTabChange = (key: TabKey) => {
    if (!problemId) {
      alert('문제 정보를 찾을 수 없습니다.');
      return;
    }

    if (key === 'find') navigate(`/problems/${problemId}`);
    if (key === 'status') navigate(`/submissions/${problemId}`);
    if (key === 'contribute') navigate(`/solution-submit/${problemId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <ProblemInfoCard
          problemId={problemId ?? 'P-0000'}
          title="문제 제목(임시)" // TODO: 추후 문제 정보 조회해서 추가
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <Outlet />
      </main>
    </div>
  );
}
