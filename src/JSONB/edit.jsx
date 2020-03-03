import React from 'react';

import {
  Grid,
  TextField,
} from '@material-ui/core';

class JSONEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    try {
      this.state.value = props.value ? JSON.stringify(props.value) : '';
    } catch (ex) {}
  }

  onChange = (value) => {
    this.setState({
      value,
    }, () => {
      let value = ''
      try {
        value = JSON.parse(this.state.value);
      } catch (ex) {}
      this.props.onChange(value);
    });
  }

  render () {
    const {
      error,
      displayName,
      fieldName,
      required,
      helpText,
      onChange,
    } = this.props;

    const {
      value,
    } = this.state;

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
            rows="4"
            fullWidth
            multiline
            type="text"
            value={value}
            error={error}
            name={fieldName}
            variant="outlined"
            required={required}
            label={displayName}
            helperText={helpText}
            onChange={(e) => this.onChange(e.target.value)}
          />
        </Grid>
      </Grid>
    );
  }
}

JSONEdit.defaultProps = {
  helpText: 'Use only doublequotes(") to surround key and values',
};
export default JSONEdit;
