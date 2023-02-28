module.exports = {
  resolve: {
    fallback: {
      fs: "empty",
      Buffer: false,
      http: require.resolve('stream-http'),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      url: require.resolve("url/"),
      assert: false,
      util: false,
      stream: false,
    }
  },
  module: {
    unknownContextCritical: false
  }
};
