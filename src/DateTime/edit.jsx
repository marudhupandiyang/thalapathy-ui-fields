import React from 'react';

import {
  Grid,
  TextField,
} from '@material-ui/core';

function StringEdit ({
  value,
  error,
  displayName,
  fieldName,
  required,
  helpText
}) {
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
          error={error}
          fullWidth
          required={required}
          label={displayName}
          helperText={helpText}
          name={fieldName}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          value={value || ''}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

export default StringEdit;
