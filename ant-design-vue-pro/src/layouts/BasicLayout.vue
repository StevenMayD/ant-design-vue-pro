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
        width="256px"
      >
        <div class="logo">
          <span>Ant Design</span>
          <p class="logo-content">Pro</p>
          <div class="logo-footer">
            <span class="logo-footer-year">2021年</span>
            <span class="logo-footer-month">11月</span>
            <span class="logo-footer-day">25号</span>
          </div>
        </div>
        <!-- 这里进行给组件 传参 -->
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <Header />
          <!-- Icon需要去引入和注册 Vue.use(Icon); -->
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
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
/* 关于 height、line-height、font-siz 三者关系
1、当line-height<font-size时，多行的话，行距为负值，两行重叠
2、当height=line-height>=font-siz时，文本作为一行，垂直居中 (准确说是 height = line-height+padding+border时，才垂直居中，注意不含margin)
3、当height=line-height=2*font-siz时, 文本作为一行，垂直居中，且高度正好占据整个区域空间的一半
4、当height=2*line-height=2*font-siz时, 文本作为一行，正好占据一半区域空间，且垂直居顶部（即垂直方向上移）
5、如果不设置height，则line-height决定元素的height
*/
.logo {
  padding: 5px 5px 5px 5px; /* 填充距：本元素内部内容距离本元素边界的距离 ; 上 左 下 右 */
  margin: 0px 10px 0px 10px; /* 边距：本元素与父级元素的距离，也就是不是属于本元素的区域 */
  border: 1px; /* 边框宽度  border的设置必须3个属性都设置才生效 */
  border-color: dodgerblue; /* 边框颜色 */
  border-style: solid; /* 边框风格 */
  height: 64px; /* 元素整体高度 */
  line-height: 26px; /* 文本行高 (可用于垂直方向排版) 这里确定了border后，可用于展示内容的高度 = height - border - padding = 64-1*2-5*2 = 52，因为内容有两行，所以设置行高为26，使得内容可以垂直居中显示 */
  font-size: 17px; /* 文本字体大小 */
  text-align: center; /* 文本内容 水平方向排版 */
  overflow: hidden; /* 规定当内容溢出元素框时发生的事情: scroll可以通过滚动显示溢出的内容，hidden则直接隐藏不显示溢出内容 */
  color: #ffffff; /* 文本内容颜色 */
  background-color: #f00000; /* 区域背景色 */
}
/* <p>Pro</p>的p标签本来要和前一个元素<span>Ant Design</span>分行
   通过给p添加浮动属性，使p的内容在父级元素中浮动，与父级元素中第一个子元素同一水平级
 */
.logo-content {
  float: right; /* 浮动属性：定义元素在哪个方向浮动, 浮动的元素是一个块级元素 */
}
.logo-footer {
  display: flex; /* 定义弹性容器 */
}
.logo-footer-year {
  flex: 2; /* 弹性子内容占2份 */
}
.logo-footer-month {
  flex: 1; /* 弹性子内容占1份 */
}
.logo-footer-day {
  flex: 1; /* 弹性子内容占1份 */
}
/* >>> 为深度选择器 */
.nav-theme-dark >>> .logo {
  color: #ffffff;
  background-color: #f00000;
}
.nav-theme-light >>> .logo {
  color: #000000;
  background-color: #ffffff;
}
</style>
