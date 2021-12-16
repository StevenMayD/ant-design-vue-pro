const webpack = require("webpack");
const path = require("path");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"), // 将src下的样式文件都进行打包加载 在线编译
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ), // 存放了antd组件库的所有变量
  themeVariables: ["@primary-color"], // 主题色
  // indexFileName: "index.html", // 不用它动态生成 我们自己管理
  generateOnce: false,
};
// 此变量用于配置我们的webpack
const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
  // 选项...
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A", // 全局生效的主题颜色配置
        },
        // 这里的选项会传递给 css-loader
        javascriptEnabled: true, //允许链式调用的换行
      },
    },
  },
  configureWebpack: {
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    // 图标的按需加载(组件中使用到的图标无法一一配置 故不使用了)
    // resolve: {
    //   alias: {
    //     "@ant-design/icons/lib/dist$": path.resolve(
    //       __dirname,
    //       "./src/icons.js"
    //     ),
    //   },
    // },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
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
