/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const feMock = require('./mock.config');

module.exports = {
  publicPath: '/',
  devServer: {
    before(app) {
      feMock(app);
    },
    // proxy: {
    //   '/system': {
    //     target: 'http://192.168.10.102:8081',
    //     changeOrgin: true,
    //   },
    // },
  },
  chainWebpack: (config) => {
    // config.resolve.extensions.merge(['.js', '.jsx', '.ts', '.tsx', '.vue', '.json']);
    // config.resolve.alias.set('@', path.join(__dirname, 'src'));
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // path.resolve(__dirname, 'src/common/styles/mixins/index.scss'),
      ],
    },
  },
};
