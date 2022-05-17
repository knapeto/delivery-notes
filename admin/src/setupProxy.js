const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "http://localhost:3000",
  pathRewrite: {
    "^/api": "",
  },
};

module.exports = function (app) {
  app.use("/api", createProxyMiddleware(proxy));
};
