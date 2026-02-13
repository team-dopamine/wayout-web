/**404페이지 내 장식용 텍스트 컴포넌트 */
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function FloatingCode({ className, children }: Props) {
  return (
    <div
      className={[
        'pointer-events-none absolute font-mono text-xs opacity-30',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}
