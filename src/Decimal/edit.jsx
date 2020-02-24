import React from 'react';

import {
  Grid,
  TextField,
} from '@material-ui/core';

function DecimalEdit ({
  value,
  displayName,
  fieldName,
  required,
  helpText,
  onChange
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
          fullWidth
          required={required}
          label={displayName}
          helperText={helpText}
          onChange={(e) => onChange(e.target.value)}
          name={fieldName}
          type="number"
          step="0.01"
          value={value || ''}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

export default DecimalEdit;
