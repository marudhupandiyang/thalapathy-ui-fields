import React from 'react';

function JsonBPreivew ({ data }) {
  return <pre>{JSON.stringify(data || '', null, '  ')}</pre>;
}

export default JsonBPreivew;
