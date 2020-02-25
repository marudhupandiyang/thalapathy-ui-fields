import React from 'react';

function ArrayPreivew ({ data }) {
  return (
    <ul>
      {(data || []).map((l, i) => (<li key={i}>{l}</li>))}
    </ul>
  );
}

export default ArrayPreivew;
