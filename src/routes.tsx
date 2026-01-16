import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import MainPage from '@/pages/MainPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [{ path: '/', element: <MainPage /> }],
  },
]);
