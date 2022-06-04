import MainDashboard from './Pages/Index';
import { Routes, Route } from 'react-router-dom';
import GraphPage from './Pages/GraphPage';
import { Authentication } from './Pages/Login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/graph-view" element={<GraphPage />} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/login" element={<Authentication/>} />
      </Routes>
    </div>
  );
}

export default App;
