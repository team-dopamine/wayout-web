/**404 에러 페이지 내 메인 섹션 컴포넌트 */
import type { ReactNode } from 'react';
import NotFoundIllustration from './NotFoundIllustration';
import MaterialSymbol from '@/components/common/MaterialSymbol';

type Props = {
  title: ReactNode;
  description: string;
  onGoHome: () => void;
};

export default function NotFoundHero({ title, description, onGoHome }: Props) {
  return (
    <section className="w-full max-w-xl text-center">
      <div className="space-y-12">
        <div className="space-y-6">
          <NotFoundIllustration />

          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            <p className="mx-auto max-w-md text-lg text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center pt-2">
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-10 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <MaterialSymbol name="home" className="mr-2 text-[22px]" />
            메인페이지로 이동
          </button>
        </div>
      </div>
    </section>
  );
}
