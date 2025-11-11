<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from "vue";
import Highcharts from "highcharts/highstock";
import { generateStockChartOptions } from "@/helpers/chart";
import { STOCK_COLORS } from "@/constants/colors";

const chartContainerRef = useTemplateRef<HTMLDivElement>("chartContainer");
let chart: Highcharts.Chart | null = null;

onMounted(async () => {
  // Load the dataset
  // 这里后面要改成，显示后再加载数据，而不是挂载就加载数据
  const data = await fetch("https://www.highcharts.com/samples/data/new-intraday.json").then((response) =>
    response.json(),
  );

  // 这里临时弄个颜色，区分一下效果
  const options = generateStockChartOptions(data);
  if (chartContainerRef.value) {
    chart = Highcharts.stockChart(chartContainerRef.value, options);
  }
});

onUnmounted(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});
</script>

<template>
  <div ref="chartContainer" class="w-full h-full"></div>
</template>
