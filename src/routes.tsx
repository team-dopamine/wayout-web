import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import MainPage from '@/pages/MainPage';
import CounterExamplePage from '@/pages/CounterExamplePage';
import SolutionSubmitPage from '@/pages/SolutionSubmitPage';
import SubmissionsPage from '@/pages/SubmissionsPage';
import ProblemsPage from '@/pages/ProblemsPage';
import OnboardingNicknamePage from './pages/OnboardingNicknamePage';
import AuthOAuthRedirectPage from './pages/AuthOAuthRedirectPage';
import MyProfilePage from './pages/MyProfilePage';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/counter-example', element: <CounterExamplePage /> },
      { path: '/solution-submit', element: <SolutionSubmitPage /> },
      { path: '/submissions', element: <SubmissionsPage /> },
      { path: '/problems', element: <ProblemsPage /> },
      { path: '/onboarding', element: <OnboardingNicknamePage /> },
      /** 백엔드 OAuth 로그인 이후 리다이렉트 처리 */
      { path: '/auth/oauth', element: <AuthOAuthRedirectPage /> },
      { path: '/profile', element: <MyProfilePage /> },
    ],
  },
]);
