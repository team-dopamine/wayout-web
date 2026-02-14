import { useMemo, useState } from 'react';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ContributionsSection, {
  type TabKey,
  type Contribution,
} from '@/components/profile/ContributionsSection';
import { mockContributions } from '@/components/profile/profile.mock';
import { patchMyNickname } from '@/apis/members';
import { withdraw } from '@/apis/auth/withdraw';
import { patchMyNickname } from '@/apis/members';

const filterMap: Record<TabKey, (rows: Contribution[]) => Contribution[]> = {
  all: (rows) => rows,
  correct: (rows) => rows.filter((c) => c.type === 'Correct Code'),
  incorrect: (rows) => rows.filter((c) => c.type === 'Incorrect Code'),
};

export default function MyProfilePage() {
  const [nickname, setNickname] = useState('초기 닉네임');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const filteredContributions = useMemo(() => filterMap[activeTab](mockContributions), [activeTab]);

  const handleSaveNickname = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) return;

    try {
      setIsSaving(true);
      await patchMyNickname({ nickname: trimmed });
      alert('닉네임이 변경됐어요!');
    } catch (e) {
      alert('닉네임 변경에 실패했어요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleWithdraw = async () => {
    const confirmed = window.confirm('정말로 탈퇴하시겠습니까?\n탈퇴시 모든 정보가 삭제됩니다.');

    if (!confirmed) return;

    try {
      setIsWithdrawing(true);
      await withdraw();

      alert('탈퇴가 완료되었습니다.');
      window.location.replace('/');
    } catch (e) {
      console.error(e);
      alert('탈퇴에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleSaveNickname = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) return;

    try {
      setIsSaving(true);
      await patchMyNickname({ nickname: trimmed });
      alert('닉네임이 변경됐어요!');
    } catch (e) {
      alert('닉네임 변경에 실패했어요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#0f172a] dark:text-slate-100">
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">내 프로필</h1>

        <section>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">프로필 편집</h2>
          <hr className="my-6 border-slate-200 dark:border-slate-800" />

          <ProfileSettings
            nickname={nickname}
            setNickname={setNickname}
            onSave={handleSaveNickname}
            isSaving={isSaving}
          />
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">기여한 코드</h2>
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
