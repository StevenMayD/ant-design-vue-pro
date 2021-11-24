import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress"; // 路由加载动画效果库
import "nprogress/nprogress.css"; // 加载nprogress的样式
import NotFound from "../views/404.vue";
// import { from } from "core-js/core/array";
// import RenderRouterView from '../components/RenderRouterView'

Vue.use(Router);

const routes = [
  // 先写登录注册的路由，为了方便扩展 写嵌套路由
  {
    path: "/user",
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
        component: { render: (h) => h("router-view") },
        children: [
          // 仪表盘分析页
          {
            path: "/dashboard/analysis",
            name: "analysis",
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
        component: { render: (h) => h("router-view") },
        children: [
          // 基础表单
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm"),
          },
          // 分步表单
          {
            path: "/form/step-form",
            name: "stepform",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/index"
              ), // 需要一个挂载点
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
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
                  ),
              },
              // 结果页
              {
                path: "/form/step-form/result",
                name: "info",
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

  // 通配符路由 ： 如果没有找到路由地址，会进入通配符， 一般走向404 给与用户一个反馈
  {
    path: "*",
    name: "404",
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
  next();
});

router.afterEach(() => {
  NProgress.done(); // progress效果结束
});

export default router;
