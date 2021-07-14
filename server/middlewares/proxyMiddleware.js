const { createProxyMiddleware } = require('http-proxy-middleware');

const path = '/api';
const options = {
  target: 'http://v4dev.inspheris.net/',
  changeOrigin: true,
};
const proxyMiddleware = createProxyMiddleware(path, options);

module.exports = proxyMiddleware;
