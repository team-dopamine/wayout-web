import './App.css';
import { Outlet } from 'react-router-dom';
import DarkModeToggle from './components/common/DarkModeToggle';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { startGoogleOAuth } from './apis/auth/googleOAuth';
import { useAuthBootstrap } from '@/hooks/useAuthBootstrap';
import { session } from './apis/auth/session';

function App() {
  const { isAuthed, isAuthInitialized } = useAuthBootstrap();

  // TODO: 추후 로그아웃 연동 시 수정
  const handleLogout = () => {
    session.clearAccessToken();
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen flex-col">
      {isAuthInitialized &&
        (isAuthed ? (
          <Header isAuthed={true} onLogout={handleLogout} />
        ) : (
          <Header isAuthed={false} onSignIn={startGoogleOAuth} />
        ))}

      <main className="flex-1">
        <Outlet />
      </main>

      <DarkModeToggle />

      <Footer
        onAbout={() => console.log('about')}
        onHelp={() => console.log('help')}
        onContact={() => console.log('contact')}
      />
    </div>
  );
}

export default App;
