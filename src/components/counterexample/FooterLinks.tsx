/**반례 찾기 - 푸터*/
type Props = {
  onAbout?: () => void;
  onHelp?: () => void;
  onContact?: () => void;
};

export default function FooterLinks({ onAbout, onHelp, onContact }: Props) {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          © 2026 WayOut. All rights reserved.
        </span>

        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <button type="button" className="transition-colors hover:text-blue-500" onClick={onAbout}>
            About
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button type="button" className="transition-colors hover:text-blue-500" onClick={onHelp}>
            Help
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            type="button"
            className="transition-colors hover:text-blue-500"
            onClick={onContact}
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
