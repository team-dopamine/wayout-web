import FeatureCard from '@/components/main/FeatureCard';
import BackgroundBlobs from '@/components/main/BackgroundBlobs';
import HeroSection from '@/components/main/HeroSection';
import SearchBar from '@/components/main/SearchBar';
import type { FeatureCardProps } from '@/components/main/FeatureCard';

const FEATURES: FeatureCardProps[] = [
  {
    icon: 'library_books',
    iconWrapClassName: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    title: '문제 둘러보기',
    description: '문제들을 한눈에 살펴보세요.',
    to: '/problems',
  },
  {
    icon: 'history',
    iconWrapClassName: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    title: '최근 시도',
    description: '최근 생성한 반례들을 확인해 보세요.',
    to: '/submissions',
  },
];

export default function MainPage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 transition-colors duration-500 dark:bg-slate-950 sm:px-6 lg:px-8">
      {/* 배경 효과 */}
      <BackgroundBlobs />

      <div className="relative z-10 w-full max-w-3xl space-y-10 text-center">
        {/* 제목 및 설명 섹션 */}
        <HeroSection />

        {/* 검색바 */}
        <SearchBar />

        {/* 하단 카드 섹션 */}
        <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-6 pt-8 text-left sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.to} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
