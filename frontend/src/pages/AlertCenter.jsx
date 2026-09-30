import React, { useEffect, useState } from 'react';
import { getAlerts, updateAlertStatus } from '../api';
import StatusBadge from '../components/StatusBadge';
import RiskGauge from '../components/RiskGauge';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Info } from 'lucide-react';

export default function AlertCenter() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const fetchAlerts = () => {
    getAlerts().then(setAlerts).catch(console.error);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAlertStatus(id, status);
      fetchAlerts();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredAlerts = alerts.filter(a => filter === 'all' || a.status.toLowerCase() === filter.toLowerCase());

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <h2>Alert Center</h2>
        <select 
          value={filter} 
          onChange={e => setFilter(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="all">All Alerts</option>
          <option value="active">Active</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      <div className="grid-row">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className="card">
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
              <div className="flex items-center gap-1">
                {alert.hazard_type.toLowerCase().includes('kick') ? <AlertTriangle color="var(--red)" /> : <Info color="var(--amber)" />}
                <h3 style={{ margin: 0 }}>{alert.hazard_type}</h3>
              </div>
              <StatusBadge status={alert.status} />
            </div>
            <p><strong>Well:</strong> {alert.well_name}</p>
            <div className="flex justify-between" style={{ margin: '1rem 0' }}>
              <RiskGauge value={alert.probability} label="Probability" size={80} />
              <div style={{ textAlign: 'right' }}>
                <p>Depth Ahead: <strong>{alert.depth_ahead_m}m</strong></p>
                <p>Time Ahead: <strong>{alert.time_ahead_hrs}h</strong></p>
              </div>
            </div>
            <div className="flex gap-1" style={{ marginTop: '1rem' }}>
              {alert.status === 'active' && (
                <>
                  <button className="btn btn-warning" style={{ flex: 1 }} onClick={() => handleStatusUpdate(alert.id, 'acknowledged')}>Acknowledge</button>
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => handleStatusUpdate(alert.id, 'dismissed')}>Dismiss</button>
                </>
              )}
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate(`/alerts/${alert.id}`)}>View Dossier</button>
            </div>
          </div>
        ))}
        {filteredAlerts.length === 0 && <p>No alerts found for this filter.</p>}
      </div>
    </div>
  );
}
