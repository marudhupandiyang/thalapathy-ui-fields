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
  valueRightField: {
    paddingLeft: theme.spacing(2),
  },
  deleteButton: {
    paddingLeft: theme.spacing(2),
  },
  error: {
    color: colors.red[600],
  },
});

class ObjectArray extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
    };

    if (!this.state.value.length) {
      this.state.value.push({});
    }
  }

  onChange = (value, i) => {
    const newValue = [...this.state.value];

    if (i < newValue.length) {
      newValue[i] = value;
    } else {
      newValue.push(value);
    }

    this.setState({
      value: newValue,
    }, () => this.props.onChange(this.state.value));
  };

  onRemove = (i) => {
    const newValue = [...this.state.value];

    newValue.splice(i, 1);

    this.setState({
      value: newValue,
    }, () => this.props.onChange(this.state.value));
  }

  getField = (value, i) => (
     <Box display="flex" flexDirection="row" key={i}>
      <TextField
        fullWidth
        className={this.props.classes.valueField}
        required={this.props.required}
        onChange={(e) => this.onChange({ ...value, key: e.target.value }, i)}
        type="text"
        value={value.key || ''}
        variant="outlined"
      />

      <TextField
        fullWidth
        className={this.props.classes.valueRightField}
        required={this.props.required}
        onChange={(e) => this.onChange({ ...value, value: e.target.value }, i)}
        type="text"
        value={value.value || ''}
        variant="outlined"
      />
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
            value.map((val, i) => this.getField(val, i))
          }
        </div>
         <Button
            color="secondary"
            size="small"
            variant="contained"
            onClick={() => {
              this.onChange({}, value.length);
            }}
          >
            Add another {displayName}
          </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(ObjectArray);
