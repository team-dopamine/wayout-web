/** 코드 에디터 상단 색상 점 컴포넌트 */

type Props = {
  filename: string;
};

export default function EditorChrome({ filename }: Props) {
  return (
    <div className="flex items-center space-x-2 border-b border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-950">
      <div className="h-3 w-3 rounded-full bg-red-400" />
      <div className="h-3 w-3 rounded-full bg-yellow-400" />
      <div className="h-3 w-3 rounded-full bg-green-400" />
      <span className="ml-2 font-mono text-xs text-slate-400">{filename}</span>
    </div>
  );
}
