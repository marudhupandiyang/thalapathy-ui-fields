import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  img: {
    maxWidth: 200,
    padding: 0,
    borderRadius: 3,
  },
}));

function FilePreview ({ data }) {
  const classes = useStyles();
  if (data && data.name) {
    return (
      <img
        className={classes.img}
        src={data.thumbPath}
        alt={data.altName || data.name}
      />
    );
  }

  return 'Not Selected Yet';
}

export default FilePreview;
