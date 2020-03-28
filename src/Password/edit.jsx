import React from 'react';
import { withStyles } from '@material-ui/styles';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';

import {
  Grid,
  colors,
  Button,
  TextField,
} from '@material-ui/core';

const styles = (theme) => ({
  deleteIcon: {
    'svg&:hover': {
      color: colors.grey[600],
    }
  },
  resetIcon: {
    'svg&:hover': {
      color: colors.blue[600],
    }
  }
});

function PasswordEdit ({
  value,
  error,
  displayName,
  fieldName,
  required,
  helpText,
  onChange,
  classes,
}) {
  const inputEl = React.useRef();
  const originalPassword = React.useRef();
  const [isEditing, setIsEditing] = React.useState(false);

  if (!originalPassword.current) {
    originalPassword.current = { value };
  }
  const passwordModified = value !== originalPassword.current.value;

  return (
    <Grid
      key={fieldName}
      container
      spacing={6}
    >
      <Grid
        item
        md={10}
        container
      >
        <TextField
          error={error}
          fullWidth
          ref={inputEl}
          disabled={!isEditing}
          required={required}
          label={displayName}
          helperText={`${helpText || ''}`}
          name={fieldName}
          onChange={isEditing && ((e) => onChange(e.target.value))}
          type="password"
          value={value || ''}
          variant="outlined"
        />
      </Grid>
      <Grid
        md={2}
        container
        spacing={0}
        alignItems="center"
      >
      {
        !passwordModified &&
          <Button
            className={classes.deleteIcon}
            onClick={() => {
              setIsEditing(!isEditing);
              if (!isEditing) {
                inputEl.current.focus();
              }
            }}
            size="small"
            title={isEditing ? 'Clear' : 'Edit'}
          >
            {isEditing ? <ClearIcon /> : <EditIcon />}
          </Button>
      }
      {
        passwordModified &&
        <Button
          className={classes.resetIcon}
          onClick={() => {
            setIsEditing(false);
            onChange(originalPassword.current.value);
          }}
          size="small"
          title="Reset to original value"
        >
          <RefreshIcon />
        </Button>
      }
    </Grid>
    </Grid>
  );
}

export default withStyles(styles)(PasswordEdit);
