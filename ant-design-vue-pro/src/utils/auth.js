/*  37 | 如何使用路由管理用户权限
    auth.js 用于放置做权限校验的函数
*/

// 获取当前用户权限
export function getCurrentAuthority() {
  return ["admin"];
}

// 权限校验：如果当前用户权限属于 待验证的权限authority范围 则范围true
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some((item) => authority.includes(item));
}

// 登录状态校验：当前用户权限不为guest 则认为已登录
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] != "guest";
}
