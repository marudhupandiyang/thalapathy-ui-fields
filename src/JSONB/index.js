const path = require('path');

module.exports = {
  name: 'JSONB',
  preview: path.resolve(__dirname, './view.jsx'),
  edit: path.resolve(__dirname, './edit.jsx'),
  validate: ({ value, required }) => {
    if (!value && !required) {
      return true;
    }

    if (value) {
      if (typeof value === 'object') {
        return true;
      } else if (typeof value === 'string') {
        try {
          const newVal = JSON.parse(value);
          if (required && Object.keys(newVal).length === 0) {
            return false;
          }

          return true;
        } catch (ex) {
          return ex.message;
        }
      } else {
        return 'Unknown value';
      }
    }
  },
};
