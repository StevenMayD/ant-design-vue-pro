<template>
  <!-- 分析页使用chart图表组件 -->
  <Chart :option="chartOption" style="height: 400px" />
</template>

<script>
// import random from "lodash/random";
import Chart from "../../components/Chart";
// 接口请求库
import axios from "axios"; // 先安装 npm install --save axios

export default {
  data() {
    return {
      chartOption: {},
    };
  },
  mounted() {
    // 正式方法：接口请求 获取页面图表数据
    this.getChartData();

    // 数据轮询：页面加载完成后 修改图表数据，用于测试图表重渲染
    this.interval = setInterval(() => {
      // 3秒重新请求一次数据
      this.getChartData();

      // 测试方法：让chartOption的series数组的第一个元素的data数据的元素，都按照100内随机变化
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //   () => random(100)
      // );
      // this.chartOption = { ...this.chartOption }; // 重置图表数据变量
    }, 3000);
  },
  methods: {
    // 接口请求图表数据
    getChartData() {
      // 接口 参数 返回
      axios
        .get("/api/dashboard/chart", { params: { ID: 12345 } })
        .then((response) => {
          this.chartOption = {
            title: {
              text: "ECharts 入门示例",
            },
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: response.data,
              },
            ],
          };
        });
    },
  },
  beforeDestroy() {
    // 组件销毁时记得清除 属性对象
    clearInterval(this.interval);
  },
  components: {
    Chart,
  },
};
</script>

<style></style>
