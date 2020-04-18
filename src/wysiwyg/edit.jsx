import React from 'react';

import {
  Grid,
  TextField,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class WYSIWYGEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    const contentBlock = htmlToDraft(props.value || '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state.editorState = editorState;
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    const {
      value,
      error,
      displayName,
      fieldName,
      required,
      helpText,
      onChange,
      options,
    } = this.props;

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
            required
            editorState={editorState}
            wrapperStyle={{ marginTop: '0.5rem', overflow: 'auto', height: '300px', border: '1px solid #00000015', borderRadius: '4px' }}
            editorStyle={{ padding: '0.5rem 1rem', height: 'calc(100% - 75px)' }}
            onEditorStateChange={this.onEditorStateChange}
            value={value || ''}
            toolbar={{
              options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'image'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
              },
               blockType: {
                inDropdown: true,
                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
              },
              fontSize: {
                options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
              },
              list: {
                 inDropdown: true,
                options: ['unordered', 'ordered', 'indent', 'outdent'],
              },
              textAlign: {
                inDropdown: true,
                options: ['left', 'center', 'right', 'justify'],
              },
              colorPicker: {
                colors: [],
              },
              image: {
                urlEnabled: true,
                urlEnabled: false,
                alignmentEnabled: true,
                previewImage: true,
                defaultSize: {
                  height: 'auto',
                  width: 'auto',
                },
              },
              link: {
                inDropdown: true,
                showOpenOptionOnHover: true,
                defaultTargetOption: '_self',
                options: ['link', 'unlink'],
              },
              fontFamily: {
                options: options.fontFamily || ['sans-serif'],
              },
            }}
            onBlur={() => {
              onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
            }}
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

export default WYSIWYGEditor;
