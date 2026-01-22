/**제출용 버튼 컴포넌트 */
type Props = {
  leftLabel?: string;
  rightLabel: string;

  onLeftClick?: () => void;
  onRightClick?: () => void;

  rightIconName?: string;
  disabledRight?: boolean;
};

export default function FormActionButtons({
  leftLabel = 'Clear Form',
  rightLabel,
  onLeftClick,
  onRightClick,
  rightIconName,
  disabledRight,
}: Props) {
  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onLeftClick}
        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
      >
        {leftLabel}
      </button>

      <button
        type="button"
        onClick={onRightClick}
        disabled={disabledRight}
        className="inline-flex items-center rounded-md bg-blue-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {rightIconName ? (
          <span className="material-icons mr-2 text-sm">{rightIconName}</span>
        ) : null}
        {rightLabel}
      </button>
    </div>
  );
}
