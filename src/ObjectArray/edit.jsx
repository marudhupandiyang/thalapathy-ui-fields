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

class ObjectArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      values: []
    };

    if (props.value) {
      Object.keys(props.value).forEach(key => {
        this.state.keys.push(key);
        this.state.values.push(props.value[key]);
      })
    } else {
      this.state.keys = [''];
      this.state.values = [''];
    }
  }

  propsChange = () => {
    const newObj = {};
    this.state.keys.forEach((k, i) => {
      newObj[k] = this.state.values[i];
    });
    this.props.onChange(newObj);
  }

  onChange = (key, value, i) => {
    const newValues = [...this.state.values];
    const newKeys = [...this.state.keys];

    if (i < newValues.length) {
      newValues[i] = value;
      newKeys[i] = key;
    } else {
      newValues.push(value);
      newKeys.push(key);
    }

    this.setState({
      keys: newKeys,
      values: newValues,
    }, this.propsChange);
  };

  onRemove = (i) => {
    const newValues = [...this.state.values];
    const newKeys = [...this.state.keys];

    newValues.splice(i, 1);
    newKeys.splice(i, 1);

    this.setState({
      keys: newKeys,
      values: newValues,
    }, this.propsChange);
  }

  getField = (key, value, i) => (
     <Box display="flex" flexDirection="row" key={i}>
      <TextField
        fullWidth
        className={this.props.classes.valueField}
        required={this.props.required}
        onChange={(e) => this.onChange(e.target.value, value, i)}
        type="text"
        value={key || ''}
        variant="outlined"
      />

      <TextField
        fullWidth
        className={this.props.classes.valueRightField}
        required={this.props.required}
        onChange={(e) => this.onChange(key, e.target.value, i)}
        type="text"
        value={value || ''}
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
      keys,
      values,
    } = this.state;

    return (
      <Paper variant="outlined" square className={classes.root}>
        <Typography variant={'h6'}>{displayName}</Typography>
        {helpText && <Typography fontWeight="light" className={error && classes.error} variant={'p'}>{helpText}</Typography>}
        <div className={classes.valuesContainer}>
          {
            keys.map((key, i) => this.getField(key, values[i], i))
          }
        </div>
         <Button
            color="secondary"
            size="small"
            variant="contained"
            onClick={() => {
              this.onChange('', '', keys.length);
            }}
          >
            Add another {displayName}
          </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(ObjectArray);
