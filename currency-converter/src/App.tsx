import { Outlet } from 'react-router-dom';
import '../src/styles/index.css'

function App() {
  return (
  <div className="home-page">
      <header className="bar-page">
        Przelicznik walut
      
      </header>
      <main>
        <Outlet />
      </main>
  </div>)
}

export default App
