import Vue from "vue";
import Vuex from "vuex";
import form from "./modules/form"; // 引入针对分步表单的处理

Vue.use(Vuex);

// 抛出给外界一个 Store实例变量
export default new Vuex.Store({
  state: {},
  modules: {
    form,
  },
});
