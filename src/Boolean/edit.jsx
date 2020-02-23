import React from 'react';

import {
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';

function BooleanEdit ({
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
        <Typography variant="h6">{displayName}</Typography>
        { helpText && <Typography variant="body2">{helpText}</Typography>}
        <Switch
          checked={value}
          color="secondary"
          edge="start"
          name={fieldName}
          onChange={(e) => onChange(e.target.checked)}
        />
      </Grid>
    </Grid>
  );
}

export default BooleanEdit;
