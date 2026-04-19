import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SolutionEditorPanel from '@/components/counterexample/SolutionEditorPanel';
import CounterExampleStatusPanel from '@/components/counterexample/CounterExampleStatusPanel';
import SubmissionInfoBar from '@/components/submissions/submission-detail/SubmissionInfoBar';
import { getSubmissionDetail } from '@/apis/submissions/submissions';
import type { Language } from '@/types/counterexample';
import type { SubmissionDetailResponse } from '@/apis/submissions/submissions.type';

const SUPPORTED_LANGUAGES: Record<string, Language> = {
  cpp: 'cpp',
  java: 'java',
  python: 'python',
};

const formatLanguage = (lang: string | undefined): Language => {
  const normalized = lang?.toLowerCase() || '';
  if (normalized.includes('c++') || normalized.includes('cpp')) return SUPPORTED_LANGUAGES.cpp;
  if (normalized.includes('java')) return SUPPORTED_LANGUAGES.java;
  if (normalized.includes('python')) return SUPPORTED_LANGUAGES.python;
  return SUPPORTED_LANGUAGES.cpp;
};

export default function SubmissionDetailPage() {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get('id');

  const [detail, setDetail] = useState<SubmissionDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // 코드 복사 핸들러
  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('코드가 복사되었습니다.');
    } catch {
      alert('복사에 실패했습니다.');
    }
  }, []);

  // 다른 문제 상세로 이동할 때 이전 데이터가 남아있지 않도록 비우기
  useEffect(() => {
    setDetail(null);
  }, [problemId]);

  useEffect(() => {
    // problemId가 없을 때 무한 로딩 방지
    if (!problemId) {
      setIsLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const targetId = Number(problemId);
        const data = await getSubmissionDetail(targetId);
        setDetail(data);
      } catch (error) {
        console.error('[SubmissionDetail] 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [problemId]);

  // 로딩 상태 우선 처리
  if (isLoading) return <LoadingView />;

  // 데이터가 없는 경우 처리
  if (!detail) return <EmptyView />;

  return (
    <div className="flex w-full flex-col space-y-6">
      <header className="flex-shrink-0">
        <SubmissionInfoBar data={detail} />
      </header>

      <main className="grid h-[750px] min-h-0 w-full grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="h-full min-h-0 lg:col-span-3">
          <SolutionEditorPanel
            readOnly
            language={formatLanguage(detail.language)}
            code={detail.sourceCode || ''}
            onCopy={() => handleCopy(detail.sourceCode || '')}
          />
        </div>

        <div className="h-full min-h-0 lg:col-span-1">
          <CounterExampleStatusPanel
            failedCount={detail.foundSubmissions ?? 0}
            cases={[]} // 상세 목록 배열이 API 응답에 추가되기 전까지는 빈 배열 전달
            isLoading={false}
            hasSearched={true}
          />
        </div>
      </main>
    </div>
  );
}

function LoadingView() {
  return (
    <div className="flex h-[400px] items-center justify-center font-medium text-slate-500">
      데이터 로딩 중...
    </div>
  );
}

function EmptyView() {
  return (
    <div className="flex h-[400px] items-center justify-center font-medium text-slate-500">
      정보를 찾을 수 없습니다.
    </div>
  );
}
