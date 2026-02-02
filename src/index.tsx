import ReactDOM from 'react-dom/client';
import 'pretendard/dist/web/static/pretendard.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <RouterProvider router={router} />
  </>,
);

reportWebVitals();
