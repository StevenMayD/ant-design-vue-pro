<template>
  <div id="app">
    <!-- 使用国际化组件 将所有页面内容包裹 -->
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>

    <!-- <a-button>属于ant design的组件 -->
    <!-- <a-button>按钮</a-button> -->
    <!-- <div id="nav">
      <router-link to="/dashboard/analysis">analysis</router-link> |
      <router-link to="/form">form</router-link>
    </div> -->
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN"; // 导入中文包
import enUS from "ant-design-vue/lib/locale-provider/en_US"; // 导入英文包
import moment from "moment"; // moment包的语言切换 切换组件库的语言
import "moment/locale/zh-cn"; // 只引入moment的中文包，打包时只会打中文包

export default {
  data() {
    return {
      // 提供一个响应式变量
      locale: zhCN, // 切换语言为中文
    };
  },
  // 配置可切换语言：通过路由挂载语言配置项
  // 监听路由上的query
  watch: {
    "$route.query.locale": function (val) {
      // 动态改变locale (实现了改变多数组件的语言)
      this.locale = val === "enUS" ? enUS : zhCN;
      // 但还有如日历、选择框组件的语言需要改变moment组件自己的语言
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    },
  },
};
</script>
