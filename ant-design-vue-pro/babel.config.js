module.exports = {
  // 配置jsx 使得在js文件中可以定制化内容
  presets: ["@vue/cli-plugin-babel/preset", "@vue/babel-preset-jsx"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true },
      // "style": "css" 使用css;`style: true` 会加载 less 文件
    ],
  ],
};
