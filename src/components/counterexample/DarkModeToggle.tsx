/**다크모드 토글 */
type Props = {
  isDark: boolean;
  onToggle: () => void;
};

export default function DarkModeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 rounded-full border border-slate-200 bg-white p-3 text-slate-600 shadow-lg transition-colors hover:text-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-blue-500"
      aria-label="toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
