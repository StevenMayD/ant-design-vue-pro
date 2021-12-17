module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  // 只要以spec结尾的组件就走单元测试
  testMatch: ["**/*.spec.(js|jsx|tx|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"],
  // 添加测试报告
  collectCoverage: process.env.COVERAGE === "true", // 是否收集测试覆盖率
  collectCoverageFrom: ["src/**/*.{js,vue}", "!**/node_modules/**"], // 测试的基准文件类型：src目录下的js和vue文件 并且排除node_modules目录下的文件
};
