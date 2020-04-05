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

    let name = 'name';

    try {
      if (list.sizes) {
        const lowest = Math.min(...Object.values(list.sizes));
        let idx = Object.values(data).indexOf(lowest);
        if (idx >= 0) {
          name = data[Object.values(data)[idx]];
        }
      }
    } catch (ex) {
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
