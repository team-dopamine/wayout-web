import './App.css';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import FooterLinks from '@/components/layout/FooterLinks';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      {/** 헤더 */}
      <Header
        onLogoClick={() => console.log('logo')}
        onAllSubmissions={() => console.log('all submissions')}
        onAllProblems={() => console.log('all problems')}
        onSubmitSolution={() => console.log('submit solution')}
        onSignIn={() => console.log('sign in')}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      {/** 푸터 */}
      <FooterLinks
        onAbout={() => console.log('about')}
        onHelp={() => console.log('help')}
        onContact={() => console.log('contact')}
      />
    </div>
  );
}

export default App;
