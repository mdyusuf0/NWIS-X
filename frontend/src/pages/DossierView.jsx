import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlertDossier, updateAlertStatus } from '../api';
import RiskGauge from '../components/RiskGauge';
import StatusBadge from '../components/StatusBadge';

export default function DossierView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dossier, setDossier] = useState(null);

  useEffect(() => {
    getAlertDossier(id).then(setDossier).catch(console.error);
  }, [id]);

  const handleAction = async (status) => {
    await updateAlertStatus(id, status);
    navigate('/alerts');
  };

  if (!dossier) return <div className="card">Loading dossier...</div>;

  return (
    <div>
      <div className="card flex justify-between items-center" style={{ marginBottom: '1.5rem', background: 'var(--navy)', color: '#fff' }}>
        <div>
          <h2 style={{ color: 'var(--teal)' }}>{dossier.hazard_type} Alert</h2>
          <p>Well: {dossier.well_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <RiskGauge value={dossier.probability} label="Risk" size={100} />
        </div>
      </div>

      <div className="grid-row">
        <div className="card">
          <h3>Evidence</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
            {(dossier.evidence || []).map((ev, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>
                <strong>{ev.source_well}</strong> at {ev.depth}m: {ev.description} <span style={{ color: '#888', fontSize: '0.85rem' }}>({ev.date})</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="card">
          <h3>Counter-Evidence</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
            {(dossier.counter_evidence || []).map((ev, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>
                <strong>{ev.well}</strong>: {ev.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>Recommended Mitigations</h3>
        <ol style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
          {(dossier.mitigations || []).map((m, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>{m}</li>
          ))}
        </ol>
      </div>

      <div className="card">
        <h3>Reasoning Trail</h3>
        <div style={{ marginTop: '1rem' }}>
          {['Retriever', 'Geologist', 'Engineer', 'Skeptic', 'Auditor'].map(agent => (
            <details key={agent} style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
              <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>{agent} Output</summary>
              <p style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f9f9f9' }}>
                {dossier.reasoning && dossier.reasoning[agent.toLowerCase()] ? dossier.reasoning[agent.toLowerCase()] : 'No output available.'}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="card flex gap-2">
        <button className="btn btn-warning" onClick={() => handleAction('acknowledged')}>Acknowledge Alert</button>
        <button className="btn btn-secondary" onClick={() => handleAction('dismissed')}>Dismiss Alert</button>
      </div>
    </div>
  );
}
