<template>
  <div style="width: 256px">
    <!-- 这里设置主题色由参数决定，需要将静态 theme="dark" 改为动态  :theme="theme" 
    default-selected-keys: 初始选中的菜单项key数组，之后可随用户进行选择
    无需inlineCollapsed 控制菜单收起
    open-keys.sync : 用于对openKeys进行双向绑定
    -->
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <!-- 给与menu-item点击事件@click： 将菜单切换与路由变换挂钩，并保留路由上的query参数 -->
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.mata.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/* 由于是递归菜单 需要一个subMenu
   这里官方推荐使用函数式组件，将下述代码判断，来做单独的文件SubMenu，用于做递归
   另外 使用a-menu, sub-menu组件，还是需要在main.js中注册 Menu的
*/
// recommend use functional component
// <template functional>
//   <a-sub-menu :key="props.menuInfo.key">
//     <span slot="title">
//       <a-icon type="mail" /><span>{{ props.menuInfo.title }}</span>
//     </span>
//     <template v-for="item in props.menuInfo.children">
//       <a-menu-item v-if="!item.children" :key="item.key">
//         <a-icon type="pie-chart" />
//         <span>{{ item.title }}</span>
//       </a-menu-item>
//       <sub-menu v-else :key="item.key" :menu-info="item" />
//     </template>
//   </a-sub-menu>
// </template>
// export default {
//   props: ['menuInfo'],
// };

// 耦合在SiderMenu中的写法
// import { Menu } from "ant-design-vue";

// // 写入到单位件SubMenu中了
// const SubMenu = {
//   template: `
//       <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
//         <span slot="title">
//           <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
//         </span>
//         <template v-for="item in menuInfo.children">
//           <a-menu-item v-if="!item.children" :key="item.key">
//             <a-icon type="pie-chart" />
//             <span>{{ item.title }}</span>
//           </a-menu-item>
//           <sub-menu v-else :key="item.key" :menu-info="item" />
//         </template>
//       </a-sub-menu>
//     `,
//   name: "SubMenu",
//   // must add isSubMenu: true
//   isSubMenu: true,
//   props: {
//     ...Menu.SubMenu.props,
//     // Cannot overlap with properties within Menu.SubMenu.props
//     menuInfo: {
//       type: Object,
//       default: () => ({}),
//     },
//   },
// };

// 非耦合，写在独立文件SubMenu中的写法
import SubMenu from "./SubMenu";

export default {
  // 通过emits: 向外界传参
  // 通过属性props: 接收外界传参
  props: {
    theme: {
      type: String,
      default: "dark", // 默认值
    },
  },
  components: {
    "sub-menu": SubMenu,
  },
  // 监控$route.path，当它变化时，需同步修改selectedKeys和openKeys
  watch: {
    "$route.path": function (val) {
      (this.selectedKeys = this.selectedKeysMap[val]),
        (this.openKeys = this.collapsed ? [] : this.openKeysMap[val]);
    },
  },
  // 将路由的数据 通过递归的方法 渲染到菜单组件上
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    // 通过this.$router.options.routes可以获取路由信息
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$router.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$router.path],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      // 按照定好的规则(有name字段 且 hideInMenu字段为true时下加载) 循环递归解析路由结构
      routes.forEach((item) => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      return menuData;
    },
  },
};
</script>
