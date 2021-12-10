<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <!-- type="password" 密文类型 -->
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入密码！！' }],
            },
          ]"
          type="password"
          placeholder="请输入付款密码"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button style="margin-left: 20px" @click="onPrev">上一步</a-button>
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
      // 先将form，router， store, step从this中取出
      const { form, $store, step } = this;
      form.validateFields((err, values) => {
        if (!err) {
          // 第二步的提交 是真的提交给后台 通过store的dispatch
          $store.dispatch({
            type: "form/submitStepForm",
            payload: { ...step, ...values }, // 将第一步的信息携带过去
          });
        }
      });
    },
    onPrev() {
      // 点击上一步 仅跳转上一步路由
      this.$router.push("/form/step-form/info");
    },
  },
};
</script>

<style></style>
