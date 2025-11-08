<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from "vue";
import Highcharts from "highcharts/highstock";
import generateChartOptions from "@/helpers/chart";
import { stockColors } from "@/constants/colors";

const chartContainerRef = useTemplateRef<HTMLDivElement>("chartContainer");
let chart: Highcharts.Chart | null = null;

onMounted(async () => {
  // Load the dataset
  const data = await fetch("https://www.highcharts.com/samples/data/new-intraday.json").then((response) =>
    response.json(),
  );

  // 还差缩放没解决
  const options = generateChartOptions(data, { color: stockColors.fall });
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
