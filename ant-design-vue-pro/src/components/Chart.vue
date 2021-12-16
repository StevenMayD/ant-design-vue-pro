<!-- 图标组件 -->
<template>
  <!-- 知识点：ref 
   在JavaScript中需要通过document.querySelector("#demo")来获取dom节点，然后再获取这个节点的值。
  在Vue中，我们不用获取dom节点，元素绑定ref之后，直接通过this.$refs即可调用，这样可以减少获取dom节点的消耗。
  ref被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs对象上。
  如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向该子组件实例
   -->
  <div ref="chartDom"></div>
</template>

<script>
// import echarts from "echarts";
// 还非得这样引入：因为echarts 5.0版本接口更新后，echarts引入方式import echarts from ‘echarts’变了
import * as echarts from "echarts"; // 这样会将echarts包全部引入 比较大

// 按需引入echarts包，只使用柱状图 就只引入柱状图包
// import * as echarts from "echarts/lib/echarts"; // 引入必须的核心包（引擎）
// import "echarts/lib/chart/bar"; // 引入柱状图
// import "echarts/lib/component/title"; // 配置title的相关代码

/*  引入监听dom尺寸变化的第三方库：
    addListener: 添加事件监听，用于在监听到dom尺寸变化后 重新渲染chart图表
    removeListener: 用于在组件销毁时，移除之前添加的事件监听
  （加载图表后，发现图表宽度没有跟随页面自适应。通过在浏览器中给Chart.vue文件的echarts.init初始化断点发现，
   在chart渲染完成后，父级的整体页面(可能由于一些异步操作)还没有完成最终的渲染）
*/
import { addListener, removeListener } from "resize-detector"; // 前提要安装：npm install resize-detector
// 防抖动函数: 由于resize变化极短的时间里持续变化，resize()方法会调用很多次 （去抖：如果在间隔时间内，发生新的keydown事件，则不触发Ajax通信，并且重新开始计时。）
import debounce from "lodash/debounce"; // 引入lodash中具体的方法，而不是整个lodash，这样包会小一点
// import { debounce } from "lodash"; // 这样会将整个loadsh打包进来

export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    /* 监听图表数据option：图表数据变化后，应该要能改变图表
       但通常option的结构不会变化，只是数据上有值的变化，这时watch就监听不到了，解决办法：重置图表数据变量
       也可以使用深度监听
    */
    option(val) {
      this.myChart.setOption(val);
    },

    // 深度监听option （深度监听有个弊端：消耗性能）
    // option: {
    //   handler(val) {
    //     this.myChart.setOption(val);
    //   },
    //   deep: true,
    // },
  },
  /* 在mounted生命周期中使用 进行图表绘制
  created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  */
  created() {
    // 将resize进行debounce防抖处理
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    // 渲染图表
    this.renderChart();
    // 监听chartDom的尺寸变化
    addListener(this.$refs.chartDom, this.resize);
  },
  // 组件销毁方法
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize); // 移除监听事件
    this.myChart.dispose(); // 封装三方库时注意：在组件销毁时，要销毁组件中创建的实例对象，防止内存泄漏
    this.myChart = null; // 指针nil化
  },
  // 组件方法列表
  methods: {
    resize() {
      console.log("resize");
      this.myChart.resize();
    },
    // 将图表渲染 抽象到一个方法里，图表数据有外界传入
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.chartDom);
      // 绘制图表
      this.myChart.setOption(this.option);
    },
  },
};
</script>

<style scoped></style>
