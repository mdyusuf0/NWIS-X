import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWell, getWellEvents, getWellTwins, assessRisk } from '../api';
import StatusBadge from '../components/StatusBadge';

export default function WellDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [well, setWell] = useState(null);
  const [events, setEvents] = useState([]);
  const [twins, setTwins] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    getWell(id).then(setWell).catch(console.error);
    getWellEvents(id).then(setEvents).catch(console.error);
    getWellTwins(id).then(setTwins).catch(console.error);
  }, [id]);

  if (!well) return <div className="card">Loading well details...</div>;

  return (
    <div>
      <div className="card flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.5rem' }}>{well.name}</h2>
          <p style={{ color: '#666' }}>{well.field} | {well.coordinates} | Depth: {well.total_depth}m</p>
          <p style={{ color: '#666' }}>Mud System: {well.mud_system}</p>
        </div>
        <StatusBadge status={well.status} size="large" />
      </div>

      <div style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
        {['overview', 'events', 'twins', 'risk'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid var(--teal)' : '3px solid transparent',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: activeTab === tab ? 'var(--teal)' : '#666',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card">
        {activeTab === 'overview' && (
          <div>
            <h3>Formation Tops</h3>
            <div className="table-container" style={{ marginTop: '1rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Formation</th>
                    <th>Top Depth (m)</th>
                    <th>Base Depth (m)</th>
                    <th>Lithology</th>
                  </tr>
                </thead>
                <tbody>
                  {(well.formations || []).map((f, i) => (
                    <tr key={i}>
                      <td>{f.name}</td>
                      <td>{f.top_depth}</td>
                      <td>{f.base_depth}</td>
                      <td>{f.lithology}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h3>Drilling Events</h3>
            <div className="table-container" style={{ marginTop: '1rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Depth (m)</th>
                    <th>Severity</th>
                    <th>Duration</th>
                    <th>Mitigation</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e, i) => (
                    <tr key={i}>
                      <td>{e.type}</td>
                      <td>{e.depth}</td>
                      <td><StatusBadge status={e.severity} /></td>
                      <td>{e.duration_hrs} hrs</td>
                      <td>{e.mitigation}</td>
                    </tr>
                  ))}
                  {events.length === 0 && <tr><td colSpan="5">No events recorded.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'twins' && (
          <div>
            <h3>Offset Twins</h3>
            <div className="grid-row" style={{ marginTop: '1rem' }}>
              {twins.map((t, i) => (
                <div key={i} className="card" style={{ border: '1px solid #eee' }}>
                  <h4>{t.name}</h4>
                  <p>Distance: {t.distance_km} km</p>
                  <div style={{ margin: '1rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>Similarity</span>
                      <span>{(t.similarity_score * 100).toFixed(0)}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${t.similarity_score * 100}%`, height: '100%', background: 'var(--teal)' }}></div>
                    </div>
                  </div>
                  <p>Formation Match: {(t.formation_match * 100).toFixed(0)}%</p>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>{t.explanation}</p>
                </div>
              ))}
              {twins.length === 0 && <p>No twin wells found.</p>}
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div>
            <h3>Risk Assessment</h3>
            <p style={{ marginBottom: '1rem' }}>Run a new risk assessment for this well.</p>
            <button className="btn btn-primary" onClick={() => navigate('/risk', { state: { wellId: id } })}>
              Go to Risk Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
