import React from 'react';

import {
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/monokai';


class ObjectEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    try {
      this.state.value = props.value;
    } catch (ex) {}
  }

  onChange = (value) => {
    this.setState({
      value,
    }, () => {
      let value = ''
      try {
        value = JSON.parse(this.state.value);
      } catch (ex) {
        value = this.state.value;
      }
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
          {
            displayName &&
            <Typography variant="label">
              {displayName}
            </Typography>
          }
          {
            helpText &&
            <Typography variant="p">
              {helpText}
            </Typography>
          }
          <Editor
            mode="code"
            ace={ace}
            theme="ace/theme/github"
            value={value}
            onChange={this.onChange}
            navigationBar={false}
            search={false}
          />
          {
            error &&
            <Typography variant="p" color="error">
              {error}
            </Typography>
          }
        </Grid>
      </Grid>
    );
  }
}

ObjectEdit.defaultProps = {
  helpText: '',
};
export default ObjectEdit;
