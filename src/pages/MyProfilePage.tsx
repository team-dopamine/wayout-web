import { useMemo, useState } from 'react';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ContributionsSection, {
  type TabKey,
  type Contribution,
} from '@/components/profile/ContributionsSection';
import { mockContributions } from '@/components/profile/profile.mock';

const filterMap: Record<TabKey, (rows: Contribution[]) => Contribution[]> = {
  all: (rows) => rows,
  correct: (rows) => rows.filter((c) => c.type === 'Correct Code'),
  incorrect: (rows) => rows.filter((c) => c.type === 'Incorrect Code'),
};

export default function MyProfilePage() {
  const [nickname, setNickname] = useState('초기 닉네임');
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const filteredContributions = useMemo(() => filterMap[activeTab](mockContributions), [activeTab]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#0f172a] dark:text-slate-100">
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">내 프로필</h1>

        <section>
          <h2 className="text-xl font-bold">프로필 편집</h2>
          <hr className="my-6 border-slate-200 dark:border-slate-800" />

          <ProfileSettings
            nickname={nickname}
            setNickname={setNickname}
            onSave={() => console.log('Save nickname:', nickname)}
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
        </section>
      </main>
    </div>
  );
}
