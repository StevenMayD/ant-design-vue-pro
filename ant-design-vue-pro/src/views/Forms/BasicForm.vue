<template>
  <!-- 在组件中 将form实例传递进组件 -->
  <a-form :layout="formLayout" :form="form">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal"> Horizontal </a-radio-button>
        <a-radio-button value="vertical"> Vertical </a-radio-button>
        <a-radio-button value="inline"> Inline </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <!-- 方式一：通过双向绑定进行校验： 监听变量fieldA -->
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validateStatus="fieldAStatus"
      :help="fieldAHelp"
    >
      <a-input v-model="fieldA" placeholder="input placeholder" />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- 方式二：通过ant-design组件自有的方式v-decorator 进行校验: 将fieldB变量的规则校验托管给form组件去处理
        第一个参数: '' 字段名称
        第二个参数: {} 配置一些我们的规则(包括：传递初始值, 必填与否, 最小字符，违反规则的提示)
      -->
      <a-input
        v-decorator="[
          'fieldB',
          {
            initialValue: fieldB,
            rules: [{ required: true, min: 6, message: '必须要大于5个字符啊' }],
          },
        ]"
        placeholder="input placeholder"
      />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    /* 新建一个form实例this.form
      $form的使用，是因为main.js中注册了.use(form)，这样就在组件内部帮助我们把$form挂载到了vue的原型里，我们就可以直接访问到了
      这里createForm里传递一个this，用来在组件内部 当数据改变时，会调用这个this，然后去更新当前组件
    */
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      fieldA: "",
      fieldB: "请输入内容呀", // form表单 初始值赋值（仅用于首次加载）
      fieldAStatus: "",
      fieldAHelp: "", // 初始提示
    };
  },
  mounted() {
    setTimeout(() => {
      // 动态变动form表单上的选项值：通过form表单的setFieldsValue 可对form表单上的选项赋值
      this.form.setFieldsValue({ fieldB: "快点！输入内容啊" });
    }, 3000);
  },
  watch: {
    // 方式一：通过双向绑定进行校验： 监听变量fieldA
    fieldA(val) {
      if (val.length <= 5) {
        this.fieldAStatus = "error";
        this.fieldAHelp = "必须大于5个字符";
      } else {
        this.fieldAStatus = "";
        this.fieldAHelp = "";
      }
    },
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      // 方式二：通过ant-design表单组件自带的方式v-decorator进行校验
      this.form.validateFields((err, values) => {
        if (!err) {
          // 如果没有错误信息 表示校验通过
          console.log(values);
          // this.fieldA = values.fieldA; // 单独同步：将form表单校验通过的值 赋给组件内的属性变量，用于同步给其他组件使用
          Object.assign(this, values); // 统一同步：将form表单的校验值 全部通过给当前组件this的所有属性变量
        }
      });
      // 方式一：通过双向绑定进行校验
      if (this.fieldA.length <= 5) {
        this.fieldAStatus = "error";
        this.fieldAHelp = "必须大于5个字符";
      } else {
        console.log({
          fieldA: this.fieldA,
          fieldB: this.fieldB,
        });
      }
    },
  },
};
</script>
