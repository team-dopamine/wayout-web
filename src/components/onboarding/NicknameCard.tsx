/** 닉네임 입력 폼 포함 카드 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NicknameForm from './NicknameForm';

export default function NicknameCard() {
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsCompleted(true);

    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Set Your Nickname
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            This is how you'll appear on leaderboards and submissions.
          </p>
        </div>

        <NicknameForm onSuccess={handleSuccess} />
      </div>

      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700">
        <div
          className={`h-full bg-blue-500 transition-all duration-700 ease-out ${
            isCompleted ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </section>
  );
}
