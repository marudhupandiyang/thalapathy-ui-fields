const path = require('path');

module.exports = {
  name: 'WYSIWYG',
  preview: path.resolve(__dirname, '../Text/view.jsx'),
  edit: path.resolve(__dirname, './edit.jsx'),
};
