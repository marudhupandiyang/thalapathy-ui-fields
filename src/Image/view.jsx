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

function ImagePreview ({ data, list }) {
  const classes = useStyles();
  if (data && data.name) {
    const lowest = Math.min(...Object.values(data));
    const idx = Object.values(data).indexOf(lowest);
    return (
      <img
        className={classes.img}
        src={`${data.path}/${data.img[Object.keys(data)[idx]]}`}
        alt={data.altName || data.name}
      />
    );
  }

  return 'Not Selected Yet';
}

export default ImagePreview;
