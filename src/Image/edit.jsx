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
import HttpIcon from '@material-ui/icons/Http';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  urlUpload: {
    margin: theme.spacing(2),
  },
  fileUploadPreviewImage: {
    width: 'auto',
    height: '300px',
    display: 'block',
    margin: theme.spacing(2)
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
      uploadType: 'file',
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

  onUrlChange = (imageUrl) => {
    if (this.img)
    this.setState({ fileValue: { uploadUrl: imageUrl }, isLoading: true, isInvalid: false });
    const a = new Image();
    this.img = a;
    this.img.onload = (e) => {
      if (a !== this.img) {
        return;
      }

      var canvas = document.createElement('canvas');
      canvas.width = this.img.naturalWidth; // or 'width' if you want a special/scaled size
      canvas.height = this.img.naturalHeight; // or 'height' if you want a special/scaled size

      canvas.getContext('2d').drawImage(this.img, 0, 0);

      let name = (new URL(imageUrl)).pathname;
      name = name.substr(name.lastIndexOf('/') + 1);
      this.setState({
        isLoading: false,
        tempValues: [
          ...this.state.tempValues,
          {
            name,
            altName: name,
            dataUri: canvas.toDataURL('image/png'),
            uploadUrl: imageUrl,
          },
        ]
      }, () => {
        this.changePropValue();
        this.img = undefined;
      });
    };

    this.img.onerror = (e) => {
      if (a !== this.img) {
        return;
      }

      this.setState({
        isLoading: false,
        isInvalid: true,
        fileValue: {
          uploadUrl: imageUrl,
        },
      }, () => {
        this.img = undefined;
      });
    }
    this.img.crossOrigin = 'anonymous';
    this.img.src = imageUrl;
  }

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
      fileValue,
      tempValues,
      uploadType,
      isLoading,
    } = this.state;

    const usedLength = tempValues.length + value.length;
    const hasReachedLimit = usedLength >= this.fileLimit;

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
              className={{ subheader: error && classes.error }}
              title={displayName}
              subheader={helpText}
              action={
                !hasReachedLimit && <IconButton onClick={() => {
                  this.setState({
                    uploadType: uploadType === 'file' ? 'url' : 'file',
                  });
                }}>
                  {uploadType === 'url' ?  <FileCopyIcon />: <HttpIcon />}
                </IconButton>
              }
            />
            {
              !hasReachedLimit && (uploadType === 'url') &&
                <>
                  <TextField
                    className={classes.urlUpload}
                    fullWidth
                    label="File Url"
                    loading={isLoading}
                    onChange={e => this.onUrlChange(e.target.value)}
                    type="url"
                    value={(fileValue && fileValue.uploadUrl) || ""}
                    variant="outlined"
                  />
                </>
              }
            {
              !hasReachedLimit && (uploadType === 'file') &&
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
                              src={file.dataUri || `${file.path}/${file.name}`}
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
