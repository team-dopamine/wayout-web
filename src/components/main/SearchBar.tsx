export default function SearchBar() {
  return (
    <div className="group relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-25 blur transition duration-200 group-hover:opacity-50" />
      <div className="relative flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="pl-4 text-slate-400 dark:text-slate-500">
          <span className="material-symbols-outlined">search</span>
        </div>
        <input
          className="w-full border-none bg-transparent px-4 py-4 text-lg text-slate-900 placeholder-slate-400 outline-none focus:ring-0 dark:text-white dark:placeholder-slate-500"
          placeholder="Search by problem number or name (e.g., 1001, A+B)"
          type="text"
        />
        <div className="hidden pr-2 sm:block">
          <button
            type="button"
            className="rounded-md bg-slate-100 p-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
