type FeatureCardProps = {
  icon: string;
  iconWrapClassName: string;
  title: string;
  description: string;
  href: string;
};

export default function FeatureCard({
  icon,
  iconWrapClassName,
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <a
      className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-400"
      href={href}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={`rounded-lg p-2.5 ${iconWrapClassName}`}>
          <span className="material-icons block text-2xl">{icon}</span>
        </div>

        <span className="material-icons text-slate-300 transition-colors group-hover:text-blue-500">
          arrow_forward
        </span>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
    </a>
  );
}
