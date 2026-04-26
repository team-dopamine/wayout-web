import { useEffect, useMemo, useState, useCallback } from 'react';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ContributionsSection, {
  type TabKey,
  type Contribution,
} from '@/components/profile/ContributionsSection';
import { withdraw } from '@/apis/auth/withdraw';
import { updateMyNickname, getMyProfile, getMySubmissions } from '@/apis/members/members';
import { getMySolutionsApi } from '@/apis/solutions/solutions';
import { MAX_LENGTH, validateNickname } from '@/constants/nickname';
import { toContribution, toSubmission } from '@/utils/profile';

const CONTRIBUTION_PAGE_SIZE = 100;

const filterMap: Record<TabKey, (rows: Contribution[]) => Contribution[]> = {
  all: (rows) => rows,
  correct: (rows) => rows.filter((row) => row.type === 'Correct Code'),
  incorrect: (rows) => rows.filter((row) => row.type === 'Incorrect Code'),
};

export default function MyProfilePage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContributionLoading, setIsContributionLoading] = useState(true);

  const [solutions, setSolutions] = useState<Contribution[]>([]);
  const [submissions, setSubmissions] = useState<Contribution[]>([]);

  // 프로필 정보 조회
  useEffect(() => {
    let isCancelled = false;

    const fetchMyProfile = async () => {
      try {
        const data = await getMyProfile();

        if (isCancelled) return;

        setNickname(data.nickname);
        setEmail(data.email);
      } catch (error) {
        if (isCancelled) return;

        console.error(error);
        alert('프로필 정보를 불러오지 못했어요.');
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };
    fetchMyProfile();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 기여 & 제출 조회
  useEffect(() => {
    const fetchContributions = async () => {
    let isCancelled = false;

    const fetchMySolutions = async () => {
      try {
        setIsContributionLoading(true);
        const [solRes, subRes] = await Promise.all([
          getMySolutionsApi({ page: 0, size: 100, sort: ['createdAt,DESC'] }),
          getMySubmissions({ page: 0, size: 100, sort: ['createdAt,DESC'] }),
        ]);

        setSolutions(solRes.content.map(toContribution));
        setSubmissions(subRes.content.map(toSubmission));
        const data = await getMySolutionsApi({
          page: 0,
          size: CONTRIBUTION_PAGE_SIZE,
          sort: ['createdAt,DESC'],
        });

        if (isCancelled) return;

        setContributions(data.content.map(toContribution));
      } catch (error) {
        if (isCancelled) return;

        console.error(error);
        alert('내역을 불러오지 못했어요.');
      } finally {
        if (!isCancelled) {
          setIsContributionLoading(false);
        }
      }
    };
    fetchContributions();
    fetchMySolutions();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 탭 선택에 따른 데이터 필터링 로직
  const displayContributions = useMemo(() => {
    switch (activeTab) {
      case 'all':
        return solutions;
      case 'correct':
        return submissions;

      default:
        return [];
    }
  }, [activeTab, solutions, submissions]);

  const handleSaveNickname = useCallback(async () => {
    const trimmedNickname = nickname.trim();
    if (!validateNickname(trimmedNickname)) {
      alert(`닉네임은 최대 ${MAX_LENGTH}자, 영문, 숫자만 사용할 수 있습니다.`);
      return;
    }
    try {
      setIsSaving(true);
      await updateMyNickname({ nickname: trimmedNickname });
      setNickname(trimmedNickname);
      alert('닉네임이 변경됐어요!');
    } catch (error) {
      alert('닉네임 변경에 실패했어요.');
    } finally {
      setIsSaving(false);
    }
  }, [nickname]);

  const handleWithdraw = useCallback(async () => {
    if (!window.confirm('정말로 탈퇴하시겠습니까?')) return;
    try {
      setIsWithdrawing(true);
      await withdraw();
      window.location.replace('/');
    } catch (error) {
      alert('탈퇴에 실패했어요.');
    } finally {
      setIsWithdrawing(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">프로필을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#0f172a] dark:text-slate-100">
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">내 프로필</h1>

        <section>
          <h2 className="text-xl font-bold">프로필 편집</h2>
          <hr className="my-6 border-slate-200 dark:border-slate-800" />
          <ProfileSettings
            nickname={nickname}
            email={email}
            setNickname={setNickname}
            onSave={handleSaveNickname}
            isSaving={isSaving}
          />
        </section>

        <section>
          <h2 className="text-xl font-bold">코드 기여 내역</h2>
          <hr className="my-6 border-slate-200 dark:border-slate-800" />
          <ContributionsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            contributions={displayContributions}
            isLoading={isContributionLoading}
          />

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleWithdraw}
              disabled={isWithdrawing}
              className="rounded-lg border border-red-500 bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-red-600 disabled:opacity-60"
            >
              {isWithdrawing ? '탈퇴 처리 중...' : '탈퇴하기'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
