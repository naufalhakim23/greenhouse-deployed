import MainDashboard from './Pages/Index';
import { Routes, Route } from 'react-router-dom';
import GraphPage from './Pages/GraphPage';
import { Authentication } from './Pages/Login';
import Settings from './Pages/Settings';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/graph-view" element={<GraphPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Authentication/>} />
      </Routes>
    </div>
  );
}

export default App;
