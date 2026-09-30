import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getWells, assessRisk, getHazardCorridor } from '../api';
import RiskGauge from '../components/RiskGauge';
import StatusBadge from '../components/StatusBadge';
import HazardCorridor from '../components/HazardCorridor';

export default function RiskAssessment() {
  const location = useLocation();
  const initialWellId = location.state?.wellId || '';

  const [wells, setWells] = useState([]);
  const [selectedWell, setSelectedWell] = useState(initialWellId);
  const [depth, setDepth] = useState(3000);
  const [lookahead, setLookahead] = useState(500);
  const [rop, setRop] = useState(25);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [corridorData, setCorridorData] = useState([]);

  useEffect(() => {
    getWells().then(setWells).catch(console.error);
  }, []);

  const handleRun = async () => {
    if (!selectedWell) return alert('Please select a well');
    setLoading(true);
    try {
      const res = await assessRisk(selectedWell, { current_depth: depth, lookahead_m: lookahead, rop_m_hr: rop });
      setResult(res);
      const corridor = await getHazardCorridor(selectedWell);
      setCorridorData(corridor);
    } catch (e) {
      console.error(e);
      alert('Error running assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Risk Assessment</h2>
      
      <div className="grid-row" style={{ marginTop: '1.5rem' }}>
        <div className="card">
          <h3>Parameters</h3>
          <div className="input-group" style={{ marginTop: '1rem' }}>
            <label>Target Well</label>
            <select value={selectedWell} onChange={e => setSelectedWell(e.target.value)}>
              <option value="">-- Select Well --</option>
              {wells.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Current Depth (m)</label>
            <input type="number" value={depth} onChange={e => setDepth(Number(e.target.value))} />
          </div>
          <div className="input-group">
            <label>Lookahead Distance (m)</label>
            <input type="number" value={lookahead} onChange={e => setLookahead(Number(e.target.value))} />
          </div>
          <div className="input-group">
            <label>Rate of Penetration (m/hr)</label>
            <input type="number" value={rop} onChange={e => setRop(Number(e.target.value))} />
          </div>
          <button className="btn btn-primary" onClick={handleRun} disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Running...' : 'Run Assessment'}
          </button>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3>Results</h3>
          {result ? (
            <div style={{ marginTop: '1rem' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <h4>Classification:</h4>
                <StatusBadge status={result.classification} size="large" />
              </div>
              
              <div className="flex justify-between" style={{ gap: '1rem', marginBottom: '2rem' }}>
                <RiskGauge value={result.hazards?.stuck_pipe || 0} label="Stuck Pipe" size={120} />
                <RiskGauge value={result.hazards?.lost_circulation || 0} label="Lost Circ." size={120} />
                <RiskGauge value={result.hazards?.gas_kick || 0} label="Gas Kick" size={120} />
              </div>

              <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
                <strong>Dossier Summary:</strong>
                <p style={{ marginTop: '0.5rem' }}>{result.dossier_summary}</p>
              </div>

              {corridorData.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                  <h4>Depth Corridor</h4>
                  <HazardCorridor data={corridorData} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex-center" style={{ height: '200px', color: '#888' }}>
              {loading ? 'Analyzing geological data and running agent swarm...' : 'Run an assessment to view results.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
