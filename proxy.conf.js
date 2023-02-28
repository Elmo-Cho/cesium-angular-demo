/**
 * For more configuration, please refer to https://angular.io/guide/build#proxying-to-a-backend-server
 *
 * 更多配置描述请参考 https://angular.cn/guide/build#proxying-to-a-backend-server
 *
 * Note: The proxy is only valid for real requests, Mock does not actually generate requests, so the priority of Mock will be higher than the proxy
 */
module.exports = {
  /**
   * The following means that all requests are directed to the backend `https://localhost:9000/`
   */
  // '/': {
  //   target: 'https://localhost:9000/',
  //   secure: false, // Ignore invalid SSL certificates
  //   changeOrigin: true
  // }
  '/api': {
      target: 'http://localhost:8080/process-manage',
      secure: false, // Ignore invalid SSL certificates
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
  },
  '/minio': {
    target: 'http://47.108.251.192:19001/',
    secure: false, // Ignore invalid SSL certificates
    changeOrigin: true,
    pathRewrite: {
      '^/minio': ''
    }
}
};
