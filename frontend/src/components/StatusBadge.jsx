import React from 'react';

export default function StatusBadge({ status, size = 'normal' }) {
  const s = (status || '').toLowerCase();
  
  let bg = '#ccc';
  let color = '#fff';

  if (s === 'active' || s === 'alert' || s === 'high') bg = 'var(--red)';
  else if (s === 'acknowledged' || s === 'watch' || s === 'medium') bg = 'var(--amber)';
  else if (s === 'safe' || s === 'low') bg = 'var(--green)';
  else if (s === 'dismissed') bg = '#9e9e9e';

  const padding = size === 'large' ? '0.5rem 1rem' : '0.25rem 0.5rem';
  const fontSize = size === 'large' ? '1rem' : '0.75rem';

  return (
    <span style={{
      background: bg,
      color: color,
      padding: padding,
      borderRadius: '12px',
      fontSize: fontSize,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      display: 'inline-block'
    }}>
      {status}
    </span>
  );
}
