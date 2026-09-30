import React, { useEffect, useState } from 'react';
import { getWells } from '../api';
import StatusBadge from '../components/StatusBadge';
import { useNavigate } from 'react-router-dom';

export default function WellExplorer() {
  const [wells, setWells] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getWells().then(setWells).catch(console.error);
  }, []);

  const filteredWells = wells.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <h2>Well Explorer</h2>
        <input 
          type="text" 
          placeholder="Search wells..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }}
        />
      </div>

      <div className="grid-row">
        {filteredWells.map(well => (
          <div 
            key={well.id} 
            className="card" 
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onClick={() => navigate(`/wells/${well.id}`)}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{well.name}</h3>
              <StatusBadge status={well.status} />
            </div>
            <p><strong>Field:</strong> {well.field}</p>
            <p><strong>Total Depth:</strong> {well.total_depth}m</p>
            <p><strong>Events:</strong> {well.event_count || 0}</p>
          </div>
        ))}
        {filteredWells.length === 0 && <p>No wells found.</p>}
      </div>
    </div>
  );
}
