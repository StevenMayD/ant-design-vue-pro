/* eslint-disable vue/valid-template-root */
<template>
  <div>
    <!-- <a-button type="primary" @click="showDrawer">Open</a-button> -->
    <a-drawer
      title="设置"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width="300px"
    >
      <template v-slot:handle>
        <div class="setting-drawer-handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>整体风格定制</h2>
        <!-- 
          v-model="navTheme", 使用v-model进行变量双向绑定，即可实现主题切换
          但我们需要实现的是改变设置后的设置是固定的，要让别人访问该路由时，也是一样的主题色配置，
          而不只是自己运行的时候有主题色，这就要将设置配置路由route的query中
          从路由中取值（取不到就默认'dark'）
          而使用@change 单选框组group选项发生变化时，会调用@change
         -->
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="(e) => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark"> 黑色 </a-radio>
          <a-radio value="light"> 白色 </a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="(e) => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left"> 左侧 </a-radio>
          <a-radio value="top"> 顶部 </a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: "dark",
      navLayout: "left",
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    // 控制抽屉是否显示
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      // 路由上添加query包括：原先的query和当前type的query
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    },
  },
};
</script>

<!-- 将scope样式 抽离到独立的index.less文件中 -->
<style lang="less" src="./index.less"></style>
