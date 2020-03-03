import React from 'react';

function StringArrayPreivew ({ data }) {
  return (
    <ul style={{ listStylePosition: 'inside' }}>
      {(data || []).map((l, i) => (<li key={i}>{l}</li>))}
    </ul>
  );
}

export default StringArrayPreivew;
