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
    const lowest = Math.min(...Object.values(list.sizes));
    let idx = Object.values(data).indexOf(lowest);
    let name = data[Object.values(data)[idx]];
    if (!name) {
      name = 'name';
    }
    return (
      <img
        className={classes.img}
        src={`${data.path}/${data[name]}`}
        alt={data.altName || data.name}
      />
    );
  }

  return 'Not Selected Yet';
}

export default ImagePreview;
