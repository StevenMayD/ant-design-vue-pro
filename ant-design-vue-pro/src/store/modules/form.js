import router from "../../router"; // 分步 所以需要路由
import request from "../../utils/request"; // 需要向后端发请求

const state = {
  step: {
    payAccount: "默认账号", // 付款账号
    receiveAccount: {
      type: "alipay",
      number: "",
    },
  },
};

const actions = {
  // 异步请求
  async submitStepForm({ commit }, { payload }) {
    // 提交给后台
    await request({
      url: "/api/form",
      method: "POST",
      data: payload,
    });
    commit("saveStepFormData", payload); // 提交操作
    router.push("/form/step-form/result"); // 跳至结果页的路由，因为这是分步表单
  },
};

const mutations = {
  saveStepFormData(state, { payload }) {
    // 更改step的信息
    state.step = {
      ...state.step,
      ...payload,
    };
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
