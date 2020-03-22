import React from 'react';

import {
  Grid,
  TextField,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

class AssociationbelongsTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      results: [],
      isLoading: false,
    };
  }

  search = async (e) => {
    try {
      this.setState({ isLoading: true });
      const res = await this.props.search(e.target.value);
      this.setState({
        results: res,
      });
    } catch (ex) {
    }
    this.setState({ isLoading: false });
  };

  render() {
    const {
      value,
      error,
      displayName,
      fieldName,
      required,
      helpText,
      onChange,
      search,
    } = this.props;

    const {
      searchValue,
      results,
      isLoading,
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
          <Autocomplete
            options={results || []}
            value={value || ''}
            onChange={(e, value) => {
              onChange({
                id: value.id,
                name: value.name,
              });
            }}
            loading={isLoading}
            getOptionLabel={option => `${option.id}`}
            onInputChange={this.search}
            noOptionsText="No Results found..!"
            renderInput={params => (
              <TextField
                {...params}
                fullWidth
                error={error}
                required={required}
                label={displayName}
                helperText={helpText}
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
    );
  }
}

export default AssociationbelongsTo;
