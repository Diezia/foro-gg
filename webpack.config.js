const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        // Conditions:
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
    ],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
  }
}