// 指令式权限控制

import { check } from "../utils/auth";

// 这里将指令写成可以自己去注册，引用的指令
function install(Vue, options = {}) {
  // 创建指令：指令名称来自外界options.name (如果不存在，就使用auth)
  Vue.directive(options.name || "auth", {
    // 在指令insert的周期里面做权限校验
    inserted(el, binding) {
      if (!check(binding.value)) {
        // 如果校验不通过，直接将元素从dom上移除
        el.parentNode && el.parentNode.removeChild(el);
      }
    },
  });
}

// 将install方法抛出 供外界使用
export default { install };
