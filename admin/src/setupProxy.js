const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "http://localhost:4000",
  pathRewrite: {
    "^/api": "",
  },
};

module.exports = function (app) {
  app.use("/api", createProxyMiddleware(proxy));
};
