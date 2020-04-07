import React from 'react';

import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/monokai';


function JsonBPreivew ({ data }) {
  return (
    <Editor
      mode="view"
      ace={ace}
      theme="ace/theme/monokai"
      value={data}
      navigationBar={false}
      search={false}
    />
  );
}

export default JsonBPreivew;
