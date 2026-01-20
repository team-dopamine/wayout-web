import { useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  const onClick = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      type="button"
      aria-label="다크 모드 토글"
      onClick={onClick}
      className="hover:text-primary fixed bottom-20 right-6 z-50 h-12 w-12 rounded-full border border-gray-200 bg-white text-gray-600 shadow-lg transition-colors focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
