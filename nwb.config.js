const webpack = require("webpack");

module.exports = {
  type: 'web-app',
  webpack: {
    extra: {
      plugins: [
        new webpack.EnvironmentPlugin({
          GOOGLE_MAPS_API_KEY: "AIzaSyCn7RP2W_4U327TI4pfwf2P086GEicPCZU"
        })
      ]
    }
  }
}
