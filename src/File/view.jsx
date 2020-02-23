import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function FilePreview ({ data }) {
  const classes = useStyles();
  if (data && data.filename) {
    return (
      <img
        className={classes.root}
        src={data.filename}
        alt={data.alt}
      />
    );
  }

  return 'Not Selected Yet';
}

export default FilePreview;
