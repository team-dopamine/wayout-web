import './App.css';
import { Outlet } from 'react-router-dom';
import DarkModeToggle from './components/common/DarkModeToggle';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { startGoogleOAuth } from '@/apis/auth/googleOAuth';
import { useAuthBootstrap } from '@/hooks/useAuthBootstrap';
import postSignOutApi from './apis/auth/postSignOutApi';

function App() {
  const { isAuthed, isAuthInitialized } = useAuthBootstrap();

  const handleLogout = async () => {
    try {
      await postSignOutApi();
      window.location.replace('/');
    } catch (error) {
      alert('로그아웃에 실패했습니다.');
    }
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
