// 分步表单的mock数据
function form(method) {
  let res = null;
  switch (method) {
    case "POST":
      res = { message: "OK" };
      break;
    default:
      res = null;
  }
  return res;
}

/* 因为是mock文件，在node环境下运行，要使用comeon.js， es6的模块化规范（不能用js中import default形式了）
  另外，还需要当接口请求过来后，将接口代理到mock文件中；
  vue cli提供了一个vue.config.js，用于更改一些配置，如less，devServer
  vue cli官方文档有关于devServer的简单配置；复杂的配置还可以参考webpack见官方文档：https://webpack.docschina.org/configuration/dev-server/#devserverport
*/
module.exports = form;
