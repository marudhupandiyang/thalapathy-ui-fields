const path = require('path');

module.exports = {
  name: 'JSONB',
  preview: path.resolve(__dirname, './view.jsx'),
  edit: path.resolve(__dirname, './edit.jsx'),
  validate: ({ value, required }) => {
    try {
      JSON.stringify(value);
      return true;
    } catch (ex) {
      return ex.message || ex;
    }
  }
};
