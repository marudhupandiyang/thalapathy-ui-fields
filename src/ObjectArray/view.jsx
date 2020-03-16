import React from 'react';

function ObjectArrayPreivew ({ data }) {
  return (
    <ul style={{ listStylePosition: 'inside' }}>
      {Object.keys(data || {}).map((l, i) => (<li key={i}><b>{l}</b>: {data[l]}</li>))}
    </ul>
  );
}

export default ObjectArrayPreivew;
