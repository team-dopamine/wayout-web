/**푸터*/
type Props = {
  onAbout?: () => void;
  onHelp?: () => void;
  onContact?: () => void;
};

export default function Footer({ onAbout, onHelp, onContact }: Props) {
  return (
    <footer className="w-full border-t border-slate-200 bg-white dark:bg-slate-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <span className="text-sm text-slate-500">© 2026 WAyout. All rights reserved.</span>

        <div className="flex gap-6 text-sm text-slate-500">
          <button type="button" onClick={onAbout}>
            About
          </button>
          <button type="button" onClick={onHelp}>
            Help
          </button>
          <button type="button" onClick={onContact}>
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
