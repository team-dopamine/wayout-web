/** 온보딩 페이지 상단 브랜드 영역(아이콘/타이틀/서브텍스트)을 렌더링한다 */

import MaterialSymbol from '@/components/common/MaterialSymbol';

export default function BrandHeader() {
  return (
    <div className="mb-10 flex flex-col items-center">
      <div className="flex items-center gap-2">
        <MaterialSymbol name="code_off" className="text-4xl text-blue-500" />
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          WayOut
        </span>
      </div>
    </div>
  );
}
