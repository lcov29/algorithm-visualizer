const { merge } = require('webpack-merge');
const commonConfig = require('./build-utils/webpack.common');

module.exports = ({ mode = 'prod' }) => {
  const environmentConfig = require(`./build-utils/webpack.${mode}`);
  return merge(commonConfig, environmentConfig);
};
