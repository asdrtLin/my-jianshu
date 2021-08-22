
const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app) {
//   app.use(createProxyMiddleware('/api', { changeOrigin: true,target: 'http://www.bjlink32.com/data.php' })),
  app.use(createProxyMiddleware('/LSLjianshu/api', { 
      changeOrigin: true,
      target: 'http://www.bjlink32.com/LSLjianshu/api',
      pathRewrite: {
                '^/LSLjianshu/api': '' // 这样处理后，最终得到的接口路径为： http://localhost:8080/xxx
              }
    }));

};