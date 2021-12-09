module.exports = {
  // 选项...
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 css-loader
        javascriptEnabled: true, //允许链式调用的换行
      },
    },
  },
  // 配置代理mock接口
  devServer: {
    // 代理
    proxy: {
      // 当遇到该接口时
      "/api": {
        target: "http://localhost:3000",
        // 通过bypass做一些mock数据的拦截
        bypass: function (req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            // 请求环境判断 为mock请求时 就做如下处理：
            // 当api请求时，可以拿到url的链接
            // 将请求地址 /api/dashboard/chart， 解析拼接成 dashboard_chart 文件名
            const name = req.path.split("/api/")[1].split("/").join("_");
            const mock = require(`./mock/${name}`); // 将mock下文件require进来
            const result = mock(req.method);
            // 清缓存（由于请求后，变量mock存有缓存数据，当本地mock模拟数据修改后，再次请求无法生效）
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        },
      },
    },
  },
};
