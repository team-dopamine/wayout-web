import './App.css';
import { Outlet } from 'react-router-dom';
import DarkModeToggle from './components/common/DarkModeToggle';
import { startGoogleOAuth } from './apis/auth/googleOAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      {/** 헤더 */}
      <Header onSignIn={startGoogleOAuth} />

      <main className="flex-1">
        <Outlet />
      </main>

      {/** 다크 모드 토글 */}
      <div>
        <DarkModeToggle />
      </div>

      {/** 푸터 */}
      <Footer
        onAbout={() => console.log('about')}
        onHelp={() => console.log('help')}
        onContact={() => console.log('contact')}
      />
    </div>
  );
}

export default App;
