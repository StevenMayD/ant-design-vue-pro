<template>
  <!-- 根据不同的配置 动态改变样式 -->
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- 
        v-if当导航设置为左边显示是 才显示侧边菜单
        :theme 侧边栏主题色
      -->
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
      >
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <!-- Icon需要去引入和注册 Vue.use(Icon); -->
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer />
  </div>
</template>

<script>
// 布局组件文件夹 layout

import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingDrawer"; // 抽屉组件
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  // 使用计算属性将路由上的配置同步给BasicLayout
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
  // import引入后 还需要注册才能使用
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
  },
};
</script>

<!-- 
  scoped：使CSS只作用于当前组件中的元素，
  不会影响到子组件（非根结点）的样式
-->
<style scoped>
/* #components-layout-demo-side .logo {
  height: 64px;
  background: #ffffff;
  margin: 16px;
} */
.trigger {
  padding: 0px 20px;
  line-height: 64px;
  font-size: 20px; /* 字体大小 */
}
/* 悬停hover样式 */
.trigger:hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
  color: #000000;
}
/* 定制样式 
  >>> 为深度选择器
*/
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
.nav-theme-light >>> .logo {
  color: #000000;
}
</style>
