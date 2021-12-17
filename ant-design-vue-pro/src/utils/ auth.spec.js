// 针对权限的单元测试

import { check, currentAuth } from "./auth";

describe("auth test", () => {
  it("empty auth", () => {
    // 权限为空时
    currentAuth.splice(0, currentAuth.length); // 清空数组currentAuth
    // 断言此时 权限值admin user的校验为false 才对
    expect(check(["user"])).toEqual(false);
    expect(check(["admin"])).toEqual(false);
  });
  it("user auth", () => {
    // 权限为用户
    currentAuth.splice(0, currentAuth.length);
    currentAuth.push("user");
    expect(check(["user"])).toEqual(true);
    expect(check(["admin"])).toEqual(false);
  });
  it("admin auth", () => {
    // 权限为管理员
    currentAuth.splice(0, currentAuth.length);
    currentAuth.push("admin");
    expect(check(["user"])).toEqual(true);
    expect(check(["admin"])).toEqual(true);
    expect(check(["user", "admin"])).toEqual(true);
  });
});
