import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress"; // 路由加载动画效果库
import "nprogress/nprogress.css"; // 加载nprogress的样式
import NotFound from "../views/404.vue";
import Forbidden from "../views/403.vue";
import findLast from "lodash/findLast"; // Lodash 消除了处理数组的麻烦，从而简化了 JavaScript、 数字、对象、字符串等的操作
import { check, isLogin } from "../utils/auth";
import { notification } from "ant-design-vue";

// import { from } from "core-js/core/array";
// import RenderRouterView from '../components/RenderRouterView'

Vue.use(Router);

const routes = [
  // 先写登录注册的路由，为了方便扩展 写嵌套路由
  /* 将路由的数据 通过递归的方法 渲染到菜单组件上
    1、hideInMenu 标志位 用于过滤 不需要显示在菜单上的的数据
    2、可以通过约定 使有name字段的路由，可以渲染到菜单上
    3、hideChildrenInMenu，标志位 使不显示子路由的到菜单上
    4、meta字段 用于添加一些原信息
   */
  {
    path: "/user",
    hideInMenu: true, // 标志位 用于过滤 不需要显示在菜单上的的数据
    // 通过加载 http://localhost:8080/user/login  访问路由地址
    // component: RenderRouterView,  // 专门建一个组件RenderRouterView 来加载 route view
    // component: { render: h => h("router-view") }, // 通过render函数写法更简便，无需创建RenderRouterView组件(因为组件里的template和JSX本质上会被转义成render函数)
    // 同样改成异步加载形式
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login", // 当访问user 重定向到login
      },
      {
        path: "/user/login",
        name: "login", // 起个名称
        // 对应的组件：选择使用异步加载
        // 当访问路由时，并不会加载这里的组件，需要在外部配置一个component 提供一个route view的占位符, 当匹配到下面的组件时，将其挂载到route view的位置上
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register"),
      },
    ],
  },

  // 仪表盘和表单相关路由
  {
    path: "/",
    // 路由上配置权限信息: "user", "admin"的角色 可以访问
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      // dashboard仪表盘
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" }, // meta字段 用于添加一些原信息：图标，标题
        component: { render: (h) => h("router-view") },
        children: [
          // 仪表盘分析页
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              ),
          },
        ],
      },
      // 表单
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: (h) => h("router-view") },
        children: [
          // 基础表单
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm"),
          },
          // 分步表单
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分布表单" },
            hideChildrenInMenu: true,
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"), // 需要一个挂载点
            // 内部嵌套子路由
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              // 信息页
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"
                  ),
              },
              // 确认页
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
                  ),
              },
              // 结果页
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden,
  },
  // 通配符路由 ： 如果没有找到路由地址，会进入通配符， 一般走向404 给与用户一个反馈
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound,
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 三个参数 to:将要达到的路由；from:当前的路由地址；next:使执行走下去
router.beforeEach((to, from, next) => {
  // 仅当路由整体不相等时才显示进度（路由上参数变化 不引起进度动画）
  if (to.path !== from.path) {
    NProgress.start(); // progress效果开始
  }
  /* 获取 即将去的路由to的最近的一个配备了访问权限的路由的权限
    findLast 查找符合条件的最近的一个 ，属于lodash库的方法
    to.matched 路由自带的方法，得到路由to匹配到的所有路由信息
    record.meta.authority 能获取到该路由最邻近的路由权限信息
  */
  const record = findLast(to.matched, (record) => record.meta.authority);
  // 跳转路由前进行权限校验
  if (record && !check(record.meta.authority)) {
    // 没权限
    if (!isLogin() && to.path !== "/user/login") {
      // 已登录 跳转登录页
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      /* 消息提示框组件
      官网使用的是 this.$notification[type]形式， 由于this.$是需要将组件注入到vue main.js中，才能使用，这是这里我们需要手动 import { notification }
      */
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理咨询",
      });
      // 未登录 跳转403页（无权限访问页面）
      next({
        path: "/403",
      });
    }
    NProgress.done();
  }
  // 有权限则 直接跳转
  next();
});

router.afterEach(() => {
  NProgress.done(); // progress效果结束
});

export default router;
