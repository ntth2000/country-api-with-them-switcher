module.exports = {
  module: {
    rules: [
      { "import/no-webpack-loader-syntax": "off" },
      {
        test: /\bmapbox-gl-csp-worker.js\b/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["my-custom-babel-preset"],
            ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
          },
        },
      },
    ],
  },
};
