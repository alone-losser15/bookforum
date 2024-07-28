// webpack.config.js
const path = require('path');

module.exports = {
  entry: './public/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
