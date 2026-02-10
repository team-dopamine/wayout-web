/**404에러 페이지 내 일러스트 영역 컴포넌트 */
import FloatingCode from './FloatingCode';
import MaterialSymbol from '@/components/common/MaterialSymbol';

export default function NotFoundIllustration() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative mb-6">
        <div className="select-none text-[12rem] font-black leading-none text-slate-100 dark:text-slate-800">
          404
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800">
            <MaterialSymbol name="bug_report" className="mb-2 text-7xl text-blue-500" />
            <div className="flex space-x-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            </div>
          </div>
        </div>

        <FloatingCode className="left-[-3rem] top-0 text-blue-500">while(true) {'{'}</FloatingCode>
        <FloatingCode className="bottom-4 right-[-4rem] text-purple-500">return NULL;</FloatingCode>
        <FloatingCode className="right-0 top-[-2rem] text-orange-500">
          // Segment fault
        </FloatingCode>
        <FloatingCode className="bottom-0 left-[-5rem] text-green-500">
          if (node == undefined)
        </FloatingCode>
      </div>
    </div>
  );
}
