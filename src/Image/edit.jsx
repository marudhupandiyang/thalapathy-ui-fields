import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropzone from 'react-dropzone'

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

const styles = (theme) => ({
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
  },
  error: {
    color: colors.red[600],
  },
});

const getExtension = (type) => {
  switch (type) {
    case "image/jpeg":
      return 'jpeg';

    case "image/gif":
      return 'gif';

    case "image/png":
    default:
      return 'png';
  }
};

class FileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempValues: [],
    };

    this.filesAsDataURI = {};
    this.fileLimit = 1;

    if (this.fileLimit === 1) {
      this.state.value = props.value ? [props.value] : [];
    } else {
      this.state.value = [];
    }
  }

  changePropValue = () => {
    const files = [];
    [...this.state.value, ...this.state.tempValues].forEach(file => {
      const newFile = {
        name: file.name || `${uuidv4()}.${getExtension(file.type)}`,
        altName: file.altName,
        dataUri: file.dataUri,
      };
      files.push(newFile);
    });
    this.props.onChange(this.fileLimit > 1 ? files : files[0]);
  };

  handleRemove = (file) => {
    if (!file) {
      this.setState({
        value: [],
        tempValues: [],
      }, () => {
        this.changePropValue();
      });
      return;
    }

    if (this.state.value.includes(file)) {
      const newValue = [...this.state.value];
      newValue.splice(this.state.value.indexOf(file), 1);
      this.setState({
        value: newValue,
      }, () => {
        this.changePropValue();
      });
    } else if (this.state.tempValues.includes(file)) {
      const newValue = [...this.state.tempValues];
      newValue.splice(this.state.tempValues.indexOf(file), 1);
      this.setState({
        tempValues: newValue,
      }, () => {
        this.changePropValue();
      });
    }
  };

  handleDrop = (acceptedFiles) => {
    const newTempValues = [];
    const totalCount = acceptedFiles.length;

    for (let i = 0; i < totalCount; i += 1) {
      const currentFile = acceptedFiles[i];
      const reader = new FileReader();
      reader.addEventListener("load",  () => {
        newTempValues.push({
          name: currentFile.name,
          dataUri: reader.result,
          altName: currentFile.name,
        });
        if (newTempValues.length === totalCount) {
          this.setState({
            tempValues: [
              ...this.state.tempValues,
              ...newTempValues,
            ],
          }, () => {
            this.changePropValue();
          });
        }
      }, false);
      reader.readAsDataURL(acceptedFiles[0]);
    }
  };

  onAltChange = (file, altStr) => {
    if (this.state.value.includes(file)) {
      const idx = this.state.value.indexOf(file);
      const newValues = [...this.state.value];
      newValues[idx].altName = altStr;
      this.setState({
        value: newValues,
      }, () => {
        this.changePropValue();
      });
    } else if (this.state.tempValues.includes(file)) {
      const idx = this.state.tempValues.indexOf(file);
      const newValues = [...this.state.tempValues];
      newValues[idx].altName = altStr;
      this.setState({
        tempValues: newValues,
      }, () => {
        this.changePropValue();
      });
    }
  };

  render() {
    const {
      error,
      displayName,
      fieldName,
      required,
      helpText,
      onChange,
      classes
    } = this.props;

    const {
      value,
      tempValues,
    } = this.state;

    const usedLength = tempValues.length + value.length;
    const hasReachedLimit = usedLength >= this.fileLimit;
    debugger;
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
              !hasReachedLimit &&
              <Dropzone
                onDrop={this.handleDrop}
                onDropRejected={files => {
                  const errMsg = 'Can\t select file. File should be an image and should be within 2MB';
                  window.showNotification && window.showNotification(errMsg);
                }}
                accept="image/jpeg, image/png, image/gif"
                maxSize={2097152}
                multiple={this.fileLimit > 1}
                preventDropOnDocument
              >
                {({ getRootProps, getInputProps, isDragActive}) => (
                  <div
                    className={clsx({
                      [classes.dropZone]: true,
                      [classes.dragActive]: isDragActive
                    })}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
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
                )}
              </Dropzone>
            }

            <CardActions>
              {
                usedLength > 0 && (
                <div>
                  <PerfectScrollbar options={{ suppressScrollX: true }}>
                    <List className={classes.list}>
                      {[...value, ...tempValues].map((file, i) => (
                        <ListItem
                          className={classes.listItem}
                          divider={i < usedLength - 1}
                          key={`${file.name}${i}`}
                        >
                          <ListItemIcon>
                            <img
                              className={classes.previewImage}
                              src={file.thumbnailUrl || file.dataUri}
                            />
                          </ListItemIcon>
                          <div>
                            <div className={classes.listItemLeftContainerTop}>
                              <ListItemText
                                primary={file.name}
                                primaryTypographyProps={{ variant: 'h5' }}
                              />
                              <Button
                                className={classes.deleteIcon}
                                onClick={() => this.handleRemove(file)}
                                size="small"
                              >
                                <DeleteIcon />
                              </Button>
                            </div>
                            <TextField
                              fullWidth
                              label="Alt Text"
                              onChange={e => this.onAltChange(file, e.target.value)}
                              type="text"
                              value={file.altName || ""}
                              variant="outlined"
                            />
                          </div>
                        </ListItem>
                      ))}
                    </List>
                  </PerfectScrollbar>
                  <div className={classes.actions}>
                    <Button
                      onClick={this.handleRemove}
                      size="small"
                    >
                      {usedLength > 1 ? 'Remove all' : 'Remove'}
                    </Button>
                    {
                      !hasReachedLimit &&
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
}

export default withStyles(styles)(FileEdit);
