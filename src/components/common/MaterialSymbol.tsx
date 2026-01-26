/** Google Material Symbols 아이콘을 렌더링하는 공통 컴포넌트 */

type Props = {
  name: string;
  className?: string;
};

export default function MaterialSymbol({ name, className }: Props) {
  return (
    <span className={`material-symbols-outlined leading-none ${className ?? ''}`}>{name}</span>
  );
}
