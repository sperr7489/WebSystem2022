const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api", // 프록시를 사용할 경로
    createProxyMiddleware({
      target: "http: /localhost:3030", // API 요청을 보낼 주체의 URI (프록시로 이용할 서버의주소)
      changeOrigin: true,
    })
  );
};
