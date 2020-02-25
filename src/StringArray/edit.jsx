import React from 'react';
import { withStyles } from '@material-ui/styles';

import {
  colors,
  Grid,
  Card,
  Button,
  CardActions,
  CardHeader,
  TextField,
  Typography,
} from '@material-ui/core';

const styles = (theme) => ({
  error: {
    color: colors.red[600],
  },
});

class StringArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [], //props.value || [''],
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
  }

  getField = (v, i, required) => (
    <TextField
      fullWidth
      required={required}
      onChange={(e) => this.onChange(e.target.value, i)}
      type="text"
      value={v || ''}
      variant="outlined"
    />
  );

  render() {
    const {
      error,
      displayName,
      fieldName,
      required,
      helpText,
      onChange
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
          <Card>
            <CardHeader
              classes={{ subheader: error && classes.error }}
              title={displayName}
              subheader={helpText}
            />
            {
              value.map((v, i) => this.getField(v,i, required))
            }
            <CardActions>
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
                  Add another ${displayName}
                </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(StringArray);
