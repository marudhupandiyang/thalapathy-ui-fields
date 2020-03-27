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
      try {
        const newVal = JSON.parse(value);
        if (required && Object.keys(newVal).length === 0) {
          return false;
        }

        return true;
      } catch (ex) {
        return ex.message;
      }
    }
  },
};
