const webpack = require("webpack");

module.exports = {
  type: 'web-app',
  webpack: {
    extra: {
      plugins: [
        new webpack.EnvironmentPlugin({
          GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
        })
      ]
    }
  }
}
