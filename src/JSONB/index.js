const path = require('path');

module.exports = {
  name: 'JSONB',
  preview: path.resolve(__dirname, './view.jsx'),
  edit: path.resolve(__dirname, './edit.jsx'),
  validate: ({ value, required }) => {
    try {
      if (value.constructor.name === 'Object') {
        return true;
      }
      throw 'Invalid JSON value';
    } catch (ex) {
      return ex.message || ex;
    }
  }
};
