<script setup lang="ts">
import { onMounted, useTemplateRef, onUnmounted } from "vue";
import Highcharts from "highcharts/highstock";
import { type Options } from "highcharts";
import generateChartOptions from "@/constants/chart";

const chartContainerRef = useTemplateRef("chartContainer");
let chart: Highcharts.Chart | null = null;

onMounted(async () => {
  // Load the dataset
  const data = await fetch("https://www.highcharts.com/samples/data/new-intraday.json").then((response) =>
    response.json(),
  );

  // 还差缩放没解决
  const options: Options = generateChartOptions(data, { color: "#F7525F" });
  chart = Highcharts.stockChart(chartContainerRef.value, options);
});

onUnmounted(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});
</script>

<template>
  <div ref="chartContainer" class="w-full h-[160px]"></div>
</template>
