import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getMySolutionDetailApi } from '@/apis/solutions/solutions';
import type { MySolutionDetailResponse } from '@/apis/solutions/solutions.type';
import SolutionEditorPanel from '@/components/counterexample/SolutionEditorPanel';
import type { Language } from '@/types/counterexample';

const DEFAULT_LANGUAGE: Language = 'cpp';

const formatLanguage = (lang: string | undefined): Language => {
  const normalized = lang?.toLowerCase() || '';
  if (normalized.includes('c++') || normalized.includes('cpp')) return 'cpp';
  if (normalized.includes('java')) return 'java';
  if (normalized.includes('python')) return 'python';
  return DEFAULT_LANGUAGE;
};

function getEditorHeightByCode(sourceCode: string) {
  const lineCount = Math.max(1, sourceCode.split('\n').length);
  const headerHeight = 56;
  const bodyHeight = lineCount * 24 + 24;

  return Math.min(1200, Math.max(360, headerHeight + bodyHeight));
}

export default function MyContributionDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const contributionIdParam = searchParams.get('id');
  const locationStateRef = useRef<Record<string, unknown>>({});

  const [detail, setDetail] = useState<MySolutionDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    locationStateRef.current =
      location.state && typeof location.state === 'object'
        ? (location.state as Record<string, unknown>)
        : {};
  }, [location.state]);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('코드가 복사되었습니다.');
    } catch {
      alert('복사에 실패했습니다.');
    }
  }, []);

  useEffect(() => {
    const contributionId = Number(contributionIdParam);
    if (!contributionIdParam || !Number.isInteger(contributionId) || contributionId <= 0) {
      setDetail(null);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchDetail = async () => {
      setIsLoading(true);
      setDetail(null);

      try {
        const data = await getMySolutionDetailApi(contributionId);

        if (!isCancelled) {
          setDetail(data);
          const locationState = locationStateRef.current;
          const shouldUpdateHeaderState =
            locationState.problemTitle !== data.title ||
            locationState.language !== data.language ||
            locationState.isOpen !== data.isOpen ||
            locationState.contributionDate !== data.contributionDate ||
            locationState.contributionId !== data.id ||
            locationState.problemId !== data.problemId;

          if (shouldUpdateHeaderState) {
            navigate(location.pathname + location.search, {
              replace: true,
              state: {
                ...locationState,
                problemTitle: data.title,
                language: data.language,
                isOpen: data.isOpen,
                contributionDate: data.contributionDate,
                contributionId: data.id,
                problemId: data.problemId,
              },
            });
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('로딩 실패:', error);
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
  }, [contributionIdParam, location.pathname, location.search, navigate]);

  if (isLoading) return <LoadingView />;
  if (!detail) return <EmptyView />;

  const editorHeight = getEditorHeightByCode(detail.sourceCode || '');

  return (
    <div className="flex w-full flex-col space-y-6">
      <main className="min-h-0 w-full" style={{ height: `${editorHeight}px` }}>
        <div className="h-full min-h-0">
          <SolutionEditorPanel
            readOnly
            language={formatLanguage(detail.language)}
            code={detail.sourceCode || ''}
            onCopy={() => handleCopy(detail.sourceCode || '')}
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
