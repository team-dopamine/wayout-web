import './App.css';
import { Outlet } from 'react-router-dom';
import DarkModeToggle from './components/common/DarkModeToggle';

function App() {
  return (
    <div className="App">
      <Outlet />
      <DarkModeToggle />
    </div>
  );
}

export default App;
