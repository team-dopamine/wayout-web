import './App.css';
import { Outlet } from 'react-router-dom';
import DarkModeToggle from './components/common/DarkModeToggle';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { startGoogleOAuth } from './apis/auth/googleOAuth';
import { useAuthBootstrap } from '@/hooks/useAuthBootstrap';

function App() {
  const { isAuthed, isAuthInitialized } = useAuthBootstrap();

  return (
    <div className="flex min-h-screen flex-col">
      {isAuthInitialized && <Header isAuthed={isAuthed} onSignIn={startGoogleOAuth} />}

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
