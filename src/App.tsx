import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DarkModeToggle from './components/common/DarkModeToggle';
import { startGoogleOAuth } from './apis/auth/googleOAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import api from './apis/api';
import { ensureAuthBootstrapped } from './apis/auth/setupAuthInterceptors';
import { getAccessToken } from '@/apis/auth/tokenStore';

function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      await ensureAuthBootstrapped(api);
      setIsAuthed(Boolean(getAccessToken()));
    })();
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
