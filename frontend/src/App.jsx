import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Droplets, AlertTriangle, Activity } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import WellExplorer from './pages/WellExplorer';
import WellDetail from './pages/WellDetail';
import AlertCenter from './pages/AlertCenter';
import DossierView from './pages/DossierView';
import RiskAssessment from './pages/RiskAssessment';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>NWIS-X</h1>
          <p>Drilling Intelligence</p>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/wells" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Droplets size={20} />
            <span>Well Explorer</span>
          </NavLink>
          <NavLink to="/alerts" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <AlertTriangle size={20} />
            <span>Alert Center</span>
          </NavLink>
          <NavLink to="/risk" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Activity size={20} />
            <span>Risk Assessment</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="team-badge">Team Next-Gen Coders</div>
        </div>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wells" element={<WellExplorer />} />
          <Route path="/wells/:id" element={<WellDetail />} />
          <Route path="/alerts" element={<AlertCenter />} />
          <Route path="/alerts/:id" element={<DossierView />} />
          <Route path="/risk" element={<RiskAssessment />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
