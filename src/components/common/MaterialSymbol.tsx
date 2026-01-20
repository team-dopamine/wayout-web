/**material symbols 공톰 컴포넌트 */
type Props = {
  name: string;
  className?: string;
};

export default function MaterialSymbol({ name, className }: Props) {
  return (
    <span className={`material-symbols-outlined leading-none ${className ?? ''}`}>{name}</span>
  );
}
