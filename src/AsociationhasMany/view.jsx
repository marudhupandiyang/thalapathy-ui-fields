import React from 'react';

function AsociationhasMany ({ data }) {
  return (
    <ul>
      {(data || []).map((l, i) => (<li key={i}>{l}</li>))}
    </ul>
  );
}

export default AsociationhasMany;
