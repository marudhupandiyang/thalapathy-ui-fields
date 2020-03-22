import React from 'react';

import {
  Grid,
  TextField,
  MenuItem,
} from '@material-ui/core';

function IntegerEdit ({
  value,
  error,
  displayName,
  fieldName,
  required,
  helpText,
  onChange,
  options,
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
          select={!!options}
          required={required}
          label={displayName}
          helperText={helpText}
          onChange={(e) => onChange(e.target.value)}
          name={fieldName}
          type="number"
          value={value || ''}
          variant="outlined"
        >
          {
            options && options.map(val => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))
          }
        </TextField>
      </Grid>
    </Grid>
  );
}

export default IntegerEdit;
