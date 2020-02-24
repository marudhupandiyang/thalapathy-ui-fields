import React from 'react';

import {
  Grid,
  TextField,
} from '@material-ui/core';

function JSONEdit ({
  value = '',
  displayName,
  fieldName,
  required,
  helpText,
  onChange
}) {
  let newValue = value || '';
  if (!(typeof newValue === 'string' || newValue instanceof String)) {
    newValue = JSON.stringify(newValue);
  }

  return (
    <Grid
      key={fieldName}
      container
      spacing={6}
    >
      <Grid
        item
        md={12}
      >
        <TextField
          fullWidth
          multiline
          required={required}
          label={displayName}
          helperText={helpText}
          name={fieldName}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          rows="4"
          value={newValue}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

export default JSONEdit;
