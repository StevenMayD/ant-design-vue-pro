<template>
  <!-- 分析页使用chart图表组件 -->
  <Chart :option="chartOption" style="height: 400px" />
</template>

<script>
import random from "lodash/random";
import Chart from "../../components/Chart";

export default {
  data() {
    return {
      chartOption: {
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
            data: [5, 20, 36, 10, 10, 20],
          },
          {
            name: "存量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  mounted() {
    // 页面加载完成后 修改图表数据，用于测试图表重渲染
    this.interval = setInterval(() => {
      // 让chartOption的series数组的第一个元素的data数据的元素，都按照100内随机变化
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
      // 重置图表数据变量
      this.chartOption = { ...this.chartOption };
    }, 3000);
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
