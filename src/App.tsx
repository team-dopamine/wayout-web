import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DarkModeToggle from './components/common/DarkModeToggle';
import { startGoogleOAuth } from './apis/auth/googleOAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import api from './apis/api';
import { ensureAuthBootstrapped } from './apis/auth/setupAuthInterceptors';
import { getAccessToken, clearAccessToken } from '@/apis/auth/tokenStore';

function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await ensureAuthBootstrapped(api);
      } catch (e) {
        clearAccessToken();
      } finally {
        if (cancelled) return;
        setIsAuthed(Boolean(getAccessToken()));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header isAuthed={isAuthed} onSignIn={startGoogleOAuth} />

      <main className="flex-1">
        <Outlet />
      </main>

      <div>
        <DarkModeToggle />
      </div>

      <Footer
        onAbout={() => console.log('about')}
        onHelp={() => console.log('help')}
        onContact={() => console.log('contact')}
      />
    </div>
  );
}

export default App;
