import path from 'path';
import {FileName, PathName} from './gulp/tasks/utils';

const NODE_ENV = process.env.NODE_ENV ? 'production' : 'development';
const isDevelopment = NODE_ENV === 'development';

module.exports = {
  entry: PathName.SOURCE + PathName.JS + '/' + FileName.ENTRY,
  mode: NODE_ENV,
  output: {
    path: path.resolve(__dirname, PathName.BUILD + PathName.JS),
    filename: 'bundle.js',
  },
  devtool: isDevelopment ? 'source-map' : 'eval',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-object-rest-spread'
          ]
        }
      }
    },
    ]
  },
};
