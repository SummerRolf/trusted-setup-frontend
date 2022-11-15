const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  webpack: {
    plugins: {
      add: [
        new NodePolyfillPlugin({
          excludeAliases: ['console'],
        })
      ],
    },
    configure: {
        ignoreWarnings: [/Failed to parse source map/],
    }
  },
};