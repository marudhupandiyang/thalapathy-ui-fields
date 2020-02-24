import React from 'react';

import {
  Grid,
  TextField,
} from '@material-ui/core';

function StringEdit ({
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
          multiline
          rows="4"
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
