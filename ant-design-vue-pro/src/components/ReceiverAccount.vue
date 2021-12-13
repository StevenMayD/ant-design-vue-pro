<!-- 封装自动校验的表单项 使用select 要先注册Vue.use(Select) -->
<template>
  <a-input-group compact>
    <!-- 因为需要获取下拉选择项 所以使用v-model -->
    <a-select v-model="type" style="width: 130px" @change="handleTypeChange">
      <a-select-option value="alipay"> 支付宝 </a-select-option>
      <a-select-option value="bank"> 银行账户 </a-select-option>
    </a-select>
    <!-- 使用动态计算宽度；获取input输入内容 所以使用v-model -->
    <a-input
      style="width: calc(100% - 130px)"
      v-model="number"
      @change="handleNumberChange"
    />
  </a-input-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || "",
    };
  },
  // 监听value变化 同步给type和number
  watch: {
    value(val) {
      Object.assign(this, val);
    },
  },
  methods: {
    // change事件：当值变化时 要使用$emit形式 把value传递出去
    handleTypeChange(val) {
      // select组件 通过var可以取值
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumberChange(e) {
      // input组件 通过e.target.value取其值
      this.$emit("change", { ...this.value, number: e.target.value });
    },
  },
};
</script>

<style></style>
