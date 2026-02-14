import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import MainPage from '@/pages/MainPage';
import CounterExamplePage from '@/pages/CounterExamplePage';
import SolutionSubmitPage from '@/pages/SolutionSubmitPage';
import ProblemsPage from '@/pages/ProblemsPage';
import OnboardingNicknamePage from '@/pages/OnboardingNicknamePage';
import AuthOAuthRedirectPage from '@/pages/AuthOAuthRedirectPage';
import MyProfilePage from '@/pages/MyProfilePage';

import ProblemShellLayout from '@/components/layout/ProblemShellLayout';
import ProblemSubmissionsPage from '@/pages/ProblemSubmissionPage';

import SubmissionsPage from '@/pages/SubmissionsPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <MainPage /> },

      {
        element: <ProblemShellLayout />,
        children: [
          { path: '/counter-example', element: <CounterExamplePage /> },
          { path: '/solution-submit', element: <SolutionSubmitPage /> },

          // TODO: 추후 API 연동 후 링크 변경
          { path: '/submissions/id', element: <ProblemSubmissionsPage /> },
        ],
      },

      { path: '/submissions', element: <SubmissionsPage /> },

      { path: '/problems', element: <ProblemsPage /> },
      { path: '/onboarding', element: <OnboardingNicknamePage /> },
      { path: '/auth/oauth', element: <AuthOAuthRedirectPage /> },
      { path: '/profile', element: <MyProfilePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
