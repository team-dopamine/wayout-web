import FeatureCard from '@/components/main/FeatureCard';
import BackgroundBlobs from '@/components/main/BackgroundBlobs';
import HeroSection from '@/components/main/HeroSection';
import SearchBar from '@/components/main/SearchBar';

const FEATURES = [
  {
    icon: 'check_circle',
    iconWrapClassName: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    title: 'Submit Solution',
    description: 'Check if your logic holds against generated test cases.',
    href: '/counter-example',
  },
  {
    icon: 'library_books',
    iconWrapClassName: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    title: 'Browse Problems',
    description: 'Explore a database of problems with known tricky cases.',
    href: '#',
  },
  {
    icon: 'history',
    iconWrapClassName: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    title: 'Recent Attempts',
    description: "View the community's latest generated counter-examples.",
    href: '#',
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
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 pt-8 text-left md:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
