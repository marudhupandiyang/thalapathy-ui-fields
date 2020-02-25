import React from 'react';

import {
  Grid,
  TextField,
} from '@material-ui/core';

function IntegerEdit ({
  value,
  error,
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
          error={error}
          fullWidth
          required={required}
          label={displayName}
          helperText={helpText}
          onChange={(e) => onChange(e.target.value)}
          name={fieldName}
          type="number"
          value={value || ''}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

export default IntegerEdit;
