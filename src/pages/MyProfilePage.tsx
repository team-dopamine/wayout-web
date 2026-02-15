import { useEffect, useMemo, useState, useCallback } from 'react';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ContributionsSection, {
  type TabKey,
  type Contribution,
} from '@/components/profile/ContributionsSection';
import { mockContributions } from '@/components/profile/profile.mock';
import { withdraw } from '@/apis/auth/withdraw';
import { updateMyNickname, getMyProfile } from '@/apis/members/members';
import { MAX_LENGTH, validateNickname } from '@/constants/nickname';

const filterMap: Record<TabKey, (rows: Contribution[]) => Contribution[]> = {
  all: (rows) => rows,
  correct: (rows) => rows.filter((c) => c.type === 'Correct Code'),
  incorrect: (rows) => rows.filter((c) => c.type === 'Incorrect Code'),
};

export default function MyProfilePage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const data = await getMyProfile();
        setNickname(data.nickname);
        setEmail(data.email);
      } catch (error) {
        console.error(error);
        alert('프로필 정보를 불러오지 못했어요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyProfile();
  }, []);

  const filteredContributions = useMemo(() => filterMap[activeTab](mockContributions), [activeTab]);

  const handleSaveNickname = useCallback(async () => {
    const trimmed = nickname.trim();

    if (!validateNickname(trimmed)) {
      alert(`닉네임은 최대 ${MAX_LENGTH}자, 영문, 숫자만 사용할 수 있습니다.`);
      return;
    }

    try {
      setIsSaving(true);
      await updateMyNickname({ nickname: trimmed });
      alert('닉네임이 변경됐어요!');
    } catch (error) {
      console.error(error);
      alert('닉네임 변경에 실패했어요.');
    } finally {
      setIsSaving(false);
    }
  }, [nickname]);

  const handleWithdraw = useCallback(async () => {
    const confirmed = window.confirm('정말로 탈퇴하시겠습니까?\n탈퇴 시 모든 정보가 삭제됩니다.');
    if (!confirmed) return;

    try {
      setIsWithdrawing(true);
      await withdraw();
      window.location.replace('/');
    } catch (error) {
      console.error(error);
      alert('탈퇴에 실패했어요. 잠시 후 다시 시도해주세요.');
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
          <h2 className="text-xl font-bold">기여한 코드</h2>
          <hr className="my-6 border-slate-200 dark:border-slate-800" />

          <ContributionsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            contributions={filteredContributions}
          />

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleWithdraw}
              disabled={isWithdrawing}
              className="rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isWithdrawing ? '탈퇴 처리 중...' : '탈퇴하기'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
