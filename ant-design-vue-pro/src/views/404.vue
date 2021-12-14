<template>
  <!-- 使用自定义font图标 -->
  <div style="text-align: center">
    <IconFont type="icon-icon-404" style="font-size: 100px"></IconFont>
    svg字符串：
    <img :src="logo" alt="" />
    svg组件：
    <Logo2 />
  </div>
</template>

<script>
// 方式一：svg字符串，导入进来的logo 实际上是url的字符串
import logo from "@/assets/logo.svg";
// 方式二：svg组件，将svg当做组件式使用方式
import Logo2 from "@/assets/logo2.svg";

export default {
  components: {
    Logo2,
  },
  data() {
    return {
      logo,
    };
  },
};
</script>

<style></style>
