import React from 'react';

function AsoociationhasMany ({ data }) {
  return (
    <ul>
      {(data || []).map((l, i) => (<li key={i}>{l}</li>))}
    </ul>
  );
}

export default AsoociationhasMany;
