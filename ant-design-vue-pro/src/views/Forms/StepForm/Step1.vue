<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入付款账号！！' }],
            },
          ]"
          placeholder="请输入付款账号"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  // 布局设置
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 4 },
      },
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    },
  },
  methods: {
    handleSubmit() {
      // 先将form，router， store从this中取出
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          // 当前分步的提交：这里不是提交给后台，而是提交给vuex的store，存储到store中的step中，完成分步表单中的一步
          $store.commit({
            type: "form/saveStepFormData",
            payload: values,
          });
          // 提交完成后 跳转到第二步
          $router.push("/form/step-form/confirm");
        }
      });
    },
  },
};
</script>

<style></style>
