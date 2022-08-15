import { merge } from 'webpack-merge';
import common from './webpack.common';
import CopyPlugin from 'copy-webpack-plugin';

export default merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '../icons', context: 'icons/icons-dev' }],
    }),
  ],
});
