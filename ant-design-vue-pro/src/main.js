import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 开始在入口文件里引入组件
// import Antd from 'ant-design-vue';
// 按需引入：Antd会引入整个包，通常我们只需要使用个别的组件包
// import Button from 'ant-design-vue/lib/button';

// 配置babel后可以这样统一简写引入 { Button, Input }
import { Button } from 'ant-design-vue';

/*
  webpack配置: css配置
  引入ant design的样式 
  直接使用报错，根据终端提示的社区解决方案：需要配置开启JavaScript，配置less-loader的自定义配置
  less-loader就是webpack配置
  由于项目的webpack是cli配置的，所以自定义配置也需要遵循cli的提供的接口形式
  根据cli配置参考 详见：https://cli.vuejs.org/zh/config/#-全局-cli-配置 
  需要在根目录下创建vue.config.js，并根据规范进行配置 css.loaderOptions
  另外新增了配置文件，需要重启项目，热更新无法生效 


  babel插件使用：按需加载
  按需引入可以减少包大小，但是新增一个组件就需要写引入，比较麻烦可以使用babel组件
  在babel.config.js中配置 需要引入的组件
  详见： https://www.antdv.com/docs/vue/introduce-cn/#按需加载
*/

// import "ant-design-vue/dist/antd.less";
// 同样可以按需引入 样式  （配置babel后 不需要写less的引入了）
// import "ant-design-vue/lib/button/style";

Vue.config.productionTip = false;

// 全局注册组件 以供全局使用
// Vue.use(Antd)
Vue.use(Button)

new Vue({ 
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");