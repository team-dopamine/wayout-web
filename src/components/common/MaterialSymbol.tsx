/** material icons 공통 컴포넌트 */
type Props = {
  name: string;
  className?: string;
};

export default function MaterialSymbol({ name, className }: Props) {
  return <span className={`material-icons leading-none ${className ?? ''}`}>{name}</span>;
}
