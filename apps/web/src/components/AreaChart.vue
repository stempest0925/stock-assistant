<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from "vue";
import { createChart, AreaSeries, type UTCTimestamp } from "lightweight-charts";

let chart: ReturnType<typeof createChart> | null = null;
const containerRef = useTemplateRef("container");

function generateTimeSlots() {
  const date = new Date();
  date.setHours(9, 0, 0, 0);
  const start = Math.floor(date.getTime() / 1000);
  date.setHours(13, 0, 0, 0);
  const end = Math.floor(date.getTime() / 1000);

  const interval = 60 * 10; // 每10分钟
  const times = [];
  for (let t = start; t <= end; t += interval) {
    times.push(t);
  }
  return times;
}
function padDataToFullRange(data) {
  const start = new Date();
  start.setHours(9, 0, 0, 0);
  const end = new Date();
  end.setHours(15, 0, 0, 0);

  const startSec = Math.floor(start.getTime() / 1000);
  const endSec = Math.floor(end.getTime() / 1000);
  const step = 10 * 60; // 10分钟

  const all = [];
  for (let t = startSec; t <= endSec; t += step) {
    const found = data.find((d) => d.time === t);
    all.push(found || { time: t, value: NaN });
  }
  return all;
}

const data = padDataToFullRange(generateTimeSlots());
console.log(data);

onMounted(() => {
  chart = createChart(containerRef.value!, {
    width: containerRef.value!.clientWidth,
    height: containerRef.value!.clientHeight,
    // 去除xy轴线
    grid: { horzLines: { visible: false }, vertLines: { visible: false } },
    handleScale: false, // 禁止缩放
    handleScroll: false, // 禁止滚动
    leftPriceScale: { visible: false }, // 去除左价格标签
    rightPriceScale: { visible: false }, // 去除右价格标签
    // 去除十字光标xy轴虚线和tooltip
    crosshair: {
      mode: 0,
      horzLine: { visible: false, labelVisible: false },
      vertLine: { visible: false, labelVisible: false },
    },
    timeScale: {
      borderVisible: false, // 去除底部边框
    },
  });

  const areaChart = chart.addSeries(AreaSeries, {
    lineColor: "#2962FF",
    topColor: "#2962FF",
    bottomColor: "rgba(41, 98, 255, 0.28)",
    priceLineVisible: false, // 去除价格参考虚线
    crosshairMarkerVisible: false, // 去除十字光标原点
  });

  if (data && data.length > 0) {
    areaChart.setData(data);

    chart.timeScale().setVisibleRange({
      from: data[0].time,
      to: data[data.length - 1].time,
    });
    chart.timeScale().applyOptions({
      tickMarkFormatter: (time: number) => {
        const date = new Date(time * 1000);
        const h = date.getHours();
        const m = date.getMinutes().toString().padStart(2, "0");
        console.log(h, m);
        if (h === 9 && m === "00") return "9:00";
        if (h === 15 && m === "00") return "15:00";
        return "";
      },
    });
    // chart.timeScale().fitContent();
  }
});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }
});
</script>

<template>
  <div ref="container" class="w-full h-[160px]"></div>
</template>

<style lang="css">
#tv-attr-logo {
  display: none;
}
</style>
