import React from 'react';

function ArrayPreivew ({ value }) {
  return (
    <ul>
      {(value || []).map((l, i) => (<li key={i}>{l}</li>))}
    </ul>
  );
}

export default ArrayPreivew;
