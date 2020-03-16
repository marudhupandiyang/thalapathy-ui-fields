import React from 'react';

function ObjectArrayPreivew ({ data }) {
  return (
    <ul style={{ listStylePosition: 'inside' }}>
      {(data || []).map((l, i) => (<li key={i}><b>{l.key}</b>: {l.value}</li>))}
    </ul>
  );
}

export default ObjectArrayPreivew;
