import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SolutionEditorPanel from '@/components/counterexample/SolutionEditorPanel';
import CounterExampleStatusPanel from '@/components/counterexample/CounterExampleStatusPanel';
import SubmissionInfoBar from '@/components/submissions/submission-detail/SubmissionInfoBar';
import { getSubmissionDetail } from '@/apis/submissions/submissions';
import type { Language, FailedCase } from '@/types/counterexample';
import type { SubmissionDetailResponse } from '@/apis/submissions/submissions.type';

const DEFAULT_LANGUAGE: Language = 'cpp';

const formatLanguage = (lang: string | undefined): Language => {
  const normalized = lang?.toLowerCase() || '';
  if (normalized.includes('c++') || normalized.includes('cpp')) return 'cpp';
  if (normalized.includes('java')) return 'java';
  if (normalized.includes('python')) return 'python';
  return DEFAULT_LANGUAGE;
};

export default function SubmissionDetailPage() {
  const [searchParams] = useSearchParams();
  const submissionIdParam = searchParams.get('id');

  const [detail, setDetail] = useState<SubmissionDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('코드가 복사되었습니다.');
    } catch {
      alert('복사에 실패했습니다.');
    }
  }, []);

  useEffect(() => {
    const submissionId = Number(submissionIdParam);

    if (!submissionIdParam || !Number.isInteger(submissionId) || submissionId <= 0) {
      setDetail(null);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchDetail = async () => {
      setIsLoading(true);
      setDetail(null);

      try {
        const data = await getSubmissionDetail(submissionId);
        if (!isCancelled) {
          setDetail(data);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('[SubmissionDetail] 로딩 실패:', error);
          setDetail(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchDetail();

    return () => {
      isCancelled = true;
    };
  }, [submissionIdParam]);

  if (isLoading) return <LoadingView />;
  if (!detail) return <EmptyView />;

  const failedCases: FailedCase[] = (detail.counterExamples ?? []).map((ce, index) => ({
    id: index + 1,
    input: ce.input,
    expected: ce.expectedOutput,
    output: ce.actualOutput,
  }));

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
            failedCount={detail.counterExampleCount ?? 0}
            cases={failedCases}
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
