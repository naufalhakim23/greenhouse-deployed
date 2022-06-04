import MainDashboard from './Pages/Index';
import { Routes, Route } from 'react-router-dom';
import GraphPage from './Pages/GraphPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/graph-view" element={<GraphPage />} />
      </Routes>
    </div>
  );
}

export default App;
