import React from 'react';
import uuid from 'uuid/v1';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Grid,
  TextField,
  colors,
  Card,
  CardHeader,
  CardActions,
  Typography,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Button,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import BackupIcon from '@material-ui/icons/Backup';

const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  uploadIcon: {
    fontSize: theme.spacing(10),
    marginRight: theme.spacing(3),
  },
  image: {
    width: 130,
  },
  previewImage: {
    maxWidth: 130,
    padding: 0,
    borderRadius: 3,
    marginRight: theme.spacing(2),
  },
  info: {
    marginTop: theme.spacing(1),
  },
  list: {
    maxHeight: 320
  },
  listItem: {
    alignItems: 'flex-start',
  },
  listItemLeftContainerTop: {
    display: 'flex',
  },
  actions: {
    marginTop: theme.spacing(2),
    // display: 'flex',
    // justifyContent: 'flex-start',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  deleteIcon: {
    'svg&:hover': {
      color: colors.grey[600],
    }
  }
}));

function StringEdit ({
  value,
  displayName,
  fieldName,
  required,
  helpText,
  onChange
}) {
  const classes = useStyles();
  const [files, setFiles] = React.useState([]);
  const [altNames, setAltNames] = React.useState([]);
  const fileAsDatURI = React.useRef();
  const fileLimit = 1;

  const handleDrop = React.useCallback((acceptedFiles) => {
    fileAsDatURI.current = fileAsDatURI.current || {};
    const reader = new FileReader();
    reader.addEventListener("load",  () => {
      fileAsDatURI.current[acceptedFiles[0].name] = reader.result;
      setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
      setAltNames([...altNames, '']);
      onChangeProps();
    }, false);

    reader.readAsDataURL(acceptedFiles[0]);

  }, []);

  const onChangeProps = () => {
    const newData = [];
    files.forEach((file, i) => {
      const d = {
        fileContent: fileAsDatURI[file.name],
        name: file.name,
        alt: altNames[i],
      };
      newData.push(d);
    });
    onChange(newData);
  };

  const handleRemoveAll = () => {
    setFiles([]);
    onChangeProps();
  };

  const handleRemove = (i) => {
    const newList = [...files];
    newList.splice(i, 1);
    setFiles(newList);
    onChangeProps(newList);
  };

  const onAltChange = (i, val) => {
    const newAltNames = [...altNames];
    newAltNames[i] = val;
    setAltNames(newAltNames);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/jpeg, image/png, image/gif',
    maxSize: '1000000',
    multiple: fileLimit > 1 ? true : false,
    preventDropOnDocument: true,
    onDropRejected: () => {

    },
  });

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
            title={displayName}
            subheader={helpText}
          />
            <input {...getInputProps()} />

            {
              !!(files.length < fileLimit) &&
              <div
                className={clsx({
                  [classes.dropZone]: true,
                  [classes.dragActive]: isDragActive
                })}
                {...getRootProps()}
              >
                <div>
                  <BackupIcon className={classes.uploadIcon} />
                </div>
                <div>
                <Typography
                  gutterBottom
                  variant="h3"
                >
                  Select files
                </Typography>
                <Typography
                  className={classes.info}
                  color="textSecondary"
                  variant="body1"
                >
                  Drop files here or click
                  {' '}
                  <Link underline="always">browse</Link>
                  {' '}
                  thorough your machine
                </Typography>
              </div>
            </div>
          }
          <CardActions>
            {
              files.length > 0 && (
              <div>
                <PerfectScrollbar options={{ suppressScrollX: true }}>
                  <List className={classes.list}>
                    {files.map((file, i) => (
                      <ListItem
                        className={classes.listItem}
                        divider={i < files.length - 1}
                        key={`${file.name}${i}`}
                      >
                        <ListItemIcon>
                          <img className={classes.previewImage} src={fileAsDatURI.current[file.name]} />
                        </ListItemIcon>
                        <div>
                          <div className={classes.listItemLeftContainerTop}>
                            <ListItemText
                              primary={file.name}
                              primaryTypographyProps={{ variant: 'h5' }}
                            />
                            <Button
                              className={classes.deleteIcon}
                              onClick={() => handleRemove(i)}
                              size="small"
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                          <TextField
                            fullWidth
                            label="Alt Text"
                            onChange={e => onAltChange(i, e.target.value)}
                            type="text"
                            value={altNames[i] || ""}
                            variant="outlined"
                          />
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </PerfectScrollbar>
                <div className={classes.actions}>
                  <Button
                    onClick={handleRemoveAll}
                    size="small"
                  >
                    Remove all
                  </Button>
                  {
                    files.length < fileLimit &&
                    <Button
                      color="secondary"
                      size="small"
                      variant="contained"
                    >
                      Upload files
                    </Button>
                  }
                </div>
              </div>
              )
            }
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default StringEdit;
