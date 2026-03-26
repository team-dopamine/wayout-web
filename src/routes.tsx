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
import ProblemSubmissionPage from '@/pages/ProblemSubmissionPage';
import SubmissionsPage from '@/pages/SubmissionsPage';
import SubmissionDetailPage from '@/pages/SubmissionDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <MainPage /> }, // 메인 홈
      { path: 'problems', element: <ProblemsPage /> }, // 문제 목록 탐색
      { path: 'submissions', element: <SubmissionsPage /> }, // 전체 제출 현황 목록
      // 공통 헤더로 제공되는 페이지
      {
        element: <ProblemShellLayout />,
        children: [
          { path: 'problems/:problemPlatform/:problemNo', element: <CounterExamplePage /> }, // 반례 찾기 페이지
          { path: 'contribute/:problemPlatform/:problemNo', element: <SolutionSubmitPage /> }, // 정답/솔루션 기여 페이지
          { path: 'submissions/:problemPlatform/:problemNo', element: <ProblemSubmissionPage /> }, // 특정 문제의 제출 현황 목록 페이지
          { path: 'submission/:problemPlatform/:problemNo', element: <SubmissionDetailPage /> }, // 특정 문제의 제출 기록 페이지
        ],
      },
      // 인증 및 사용자 계정 관련
      { path: 'auth/oauth', element: <AuthOAuthRedirectPage /> }, // 소셜 로그인 리다이렉트 처리
      { path: 'onboarding', element: <OnboardingNicknamePage /> }, // 가입 후 닉네임 설정 등 온보딩
      { path: 'profile', element: <MyProfilePage /> }, // 내 정보 관리
      // 에러 처리
      { path: '*', element: <NotFoundPage /> }, // 정의되지 않은 모든 경로는 404 페이지로
    ],
  },
]);
