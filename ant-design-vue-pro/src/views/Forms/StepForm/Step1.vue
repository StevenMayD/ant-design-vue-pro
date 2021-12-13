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
              rules: [{ required: true, message: '请输入付款账号!' }],
            },
          ]"
          placeholder="请输入付款账号"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <!-- rules中配置 自定义校验validator: 每次值改变 都会进入validator里的逻辑校验 -->
        <ReceiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号!',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  },
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// 引入组件：收款账号 使用自定义组件
// import ReceiverAccount from "../../../components/ReceiverAccount"; // 嵌套太深 写起来太麻烦
// 直接使用@（@本身是webpack的一个配置，给路径起一个别名，这个别名是cli生成的，默认到了src目录下面）
import ReceiverAccount from "@/components/ReceiverAccount";

export default {
  // 注册组件
  components: { ReceiverAccount },
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
