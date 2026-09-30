import React, { useEffect, useState } from 'react';
import { getDashboardStats, getAlerts } from '../api';
import StatusBadge from '../components/StatusBadge';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  
  useEffect(() => {
    getDashboardStats().then(setStats).catch(console.error);
    getAlerts().then(setAlerts).catch(console.error);
  }, []);

  if (!stats) return <div className="card">Loading dashboard...</div>;

  const hasActiveAlerts = stats.active_alerts > 0;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Dashboard Overview</h2>
      
      <div className="grid-row">
        <div className="card">
          <h3>Total Wells</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total_wells || 0}</p>
        </div>
        <div className={`card ${hasActiveAlerts ? 'pulse' : ''}`}>
          <h3>Active Alerts</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: hasActiveAlerts ? 'var(--amber)' : 'inherit' }}>
            {stats.active_alerts || 0}
          </p>
        </div>
        <div className="card">
          <h3>Average Risk Level</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{(stats.avg_risk * 100).toFixed(1) || 0}%</p>
        </div>
        <div className="card">
          <h3>Recent Events</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.recent_events || 0}</p>
        </div>
      </div>

      <div className="grid-row">
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <h3>Recent Alerts</h3>
            <Link to="/alerts" className="btn btn-primary" style={{ textDecoration: 'none' }}>View All</Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Well Name</th>
                  <th>Hazard Type</th>
                  <th>Probability</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {alerts.slice(0, 5).map(alert => (
                  <tr key={alert.id}>
                    <td>{alert.well_name}</td>
                    <td>{alert.hazard_type}</td>
                    <td>{(alert.probability * 100).toFixed(0)}%</td>
                    <td><StatusBadge status={alert.status} /></td>
                  </tr>
                ))}
                {alerts.length === 0 && (
                  <tr><td colSpan="4" style={{ textAlign: 'center' }}>No active alerts</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div className="flex gap-2" style={{ marginTop: '1rem' }}>
          <Link to="/risk" className="btn btn-primary" style={{ textDecoration: 'none' }}>Run Risk Assessment</Link>
          <Link to="/wells" className="btn btn-secondary" style={{ textDecoration: 'none' }}>Explore Wells</Link>
        </div>
      </div>
    </div>
  );
}
