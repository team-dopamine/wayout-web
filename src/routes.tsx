import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import MainPage from '@/pages/MainPage';
import CounterExamplePage from '@/pages/CounterExamplePage';
import SolutionSubmitPage from '@/pages/SolutionSubmitPage';
import SubmissionsPage from '@/pages/SubmissionsPage';
import ProblemsPage from '@/pages/ProblemsPage';
import OnboardingNicknamePage from './pages/OnboardingNicknamePage';

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
    ],
  },
]);
