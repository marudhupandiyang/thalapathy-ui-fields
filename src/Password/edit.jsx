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
  const originalPassword = React.useRef();
  const currentPassword = React.useRef();
  const [isEditing, setIsEditing] = React.useState(false);

  if (!originalPassword.current) {
    originalPassword.current = { value };
  }

  if (!currentPassword.current) {
    currentPassword.current = '';
  }

  const passwordModified = value !== originalPassword.current.value;
  let passwordSet = value ? 'Password is Set' : 'Password is Not Set';
  let newPassword = '';
  if (passwordModified) {
    try {
      newPassword = JSON.parse(value).newValue;
      passwordSet = newPassword ? 'New password set' : 'New Password is empty';
    } catch (ex) {}
  }

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
        {
          !isEditing &&
          <TextField
            type="text"
            fullWidth
            disabled
            error={error}
            name={fieldName}
            variant="outlined"
            required={required}
            label={displayName}
            key="password-view"
            value={passwordSet}
            helperText={helpText}
          />
        }
        {
          isEditing &&
          <TextField
            fullWidth
            autoFocus
            error={error}
            type="password"
            autoComplete="off"
            name={fieldName}
            variant="outlined"
            label={displayName}
            required={required}
            key="password-edit"
            value={currentPassword.current}
            onChange={(e) => {
              currentPassword.current = e.target.value;
              onChange(JSON.stringify({ newValue: e.target.value }));
            }}
            helperText="Enter a new password. Setting no password will make you unable to login."
          />
        }
      </Grid>
      <Grid
        md={2}
        container
        spacing={0}
        alignItems="center"
      >
        <Button
          size="small"
          className={classes.deleteIcon}
          onClick={() => {
            currentPassword.current = '';
            setIsEditing(!isEditing);
          }}
          title={isEditing ? 'Clear' : 'Edit'}
        >
          {isEditing ? <ClearIcon /> : <EditIcon />}
        </Button>
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
