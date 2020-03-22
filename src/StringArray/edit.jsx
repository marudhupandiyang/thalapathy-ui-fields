import React from 'react';
import { withStyles } from '@material-ui/styles';

import {
  colors,
  Grid,
  Card,
  Paper,
  Button,
  TextField,
  Typography,
  Container,
  IconButton,
  Box,
  MenuItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  valuesContainer: {
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  valueField: {
    paddingBottom: theme.spacing(2),
  },
  error: {
    color: colors.red[600],
  },
  deleteButton: {
    paddingLeft: theme.spacing(2),
  },
});

class StringArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [''],
    };

    if (!this.state.value.length) {
      this.state.value = [''];
    }
  }

  onChange = (v, i) => {
    const newValue = [
      ...this.state.value,
    ];
    newValue[i] = v;

    this.setState({
      value: newValue,
    }, () => {
      this.props.onChange(this.state.value);
    });
  };

  onRemove = (i) => {
    const newValue = [
      ...this.state.value,
    ];

    newValue.splice(i, 1);
    this.setState({
      value: newValue,
    }, () => {
      this.props.onChange(this.state.value);
    });
  }

  getField = (v, i) => (
     <Box display="flex" flexDirection="row" key={i}>
      <TextField
        fullWidth
        select={!!this.props.options}
        className={this.props.classes.valueField}
        required={this.props.required}
        onChange={(e) => this.onChange(e.target.value, i)}
        type="text"
        value={v || ''}
        variant="outlined"
      >
        {
          this.props.options && this.props.options.map(val => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))
        }
      </TextField>
      <IconButton className={this.props.classes.deleteButton} aria-label="delete" onClick={(e) => this.onRemove(i)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  render() {
    const {
      error,
      displayName,
      fieldName,
      required,
      helpText,
      onChange,
      classes
    } = this.props;

    const {
      value,
    } = this.state;

    return (
      <Paper variant="outlined" square className={classes.root}>
        <Typography variant={'h6'}>{displayName}</Typography>
        {helpText && <Typography fontWeight="light" className={error && classes.error} variant={'p'}>{helpText}</Typography>}
        <div className={classes.valuesContainer}>
          {
            value.map((v, i) => this.getField(v,i))
          }
        </div>
         <Button
            color="secondary"
            size="small"
            variant="contained"
            onClick={() => {
              this.setState({
                value: [...value, ''],
              });
            }}
          >
            Add another {displayName}
          </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(StringArray);
