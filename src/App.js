import React from 'react';
import './index.css';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Mission from './components/Mission';
import Rocket from './components/Rocket';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<profile />} />
          <Route path="/Rocket" element={<Rocket />} />
          <Route path="/Mission" element={<Mission />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
