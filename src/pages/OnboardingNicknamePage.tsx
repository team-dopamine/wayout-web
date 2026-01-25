/** 온보딩 페이지 */

import BackgroundBlobs from '@/components/onboarding/BackgroundBlobs';
import BrandHeader from '@/components/onboarding/BrandHeader';
import NicknameCard from '@/components/onboarding/NicknameCard';

export default function OnboardingNicknamePage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-700 transition-colors dark:bg-slate-900 dark:text-slate-200">
      <div className="relative isolate mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center p-4">
        <BackgroundBlobs />

        <div className="relative z-10 w-full">
          <BrandHeader />
          <NicknameCard />
        </div>
      </div>
    </main>
  );
}
