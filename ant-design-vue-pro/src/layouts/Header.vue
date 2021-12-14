<template>
  <div>
    <div class="header">
      <!-- 语言切换 -->
      <a-dropdown>
        <a-icon type="global"></a-icon>
        <a-menu
          slot="overlay"
          @click="localeChange"
          :selectedKeys="[$route.query.locale || 'zhCN']"
        >
          <a-menu-item key="zhCN"> 中文 </a-menu-item>
          <a-menu-item key="enUS"> English </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    localeChange({ key }) {
      this.$router.push({ query: { ...this.$route.query, locale: key } });
      this.$i18n.locale = key; // 同时将url赋值到i18n实例上去
    },
  },
};
</script>

<style scoped>
.header {
  float: right; /* 浮动到右边 */
  margin-right: 30px;
}
</style>
