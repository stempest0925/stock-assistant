<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from "vue";
import { createChart, AreaSeries, type Time } from "lightweight-charts";

/**
 * lightweight-charts
 * 已弃用，需求功能不符
 * 主要是数据驱动时间轴，不能固定时间轴，做分时数据想要限定x轴范围，需要自己模拟空白数据，在后面数据更新时替换
 * 文档少功能少，不适合自定义，很多功能需要手动实现，适合开箱即用少量修改，如日K，好在性能优秀，默认样式好看
 */

const containerRef = useTemplateRef("container");
let chart: ReturnType<typeof createChart> | null = null;

const data = [
  { time: (new Date("2025-11-07T09:00:00+08:00").getTime() / 1000) as Time, value: 100 },
  { time: (new Date("2025-11-07T10:00:00+08:00").getTime() / 1000) as Time, value: 105 },
  { time: (new Date("2025-11-07T11:30:00+08:00").getTime() / 1000) as Time, value: 107 },
  { time: (new Date("2025-11-07T13:00:00+08:00").getTime() / 1000) as Time, value: 103 },
  { time: (new Date("2025-11-07T14:00:00+08:00").getTime() / 1000) as Time, value: 108 },
  { time: (new Date("2025-11-07T14:30:00+08:00").getTime() / 1000) as Time, value: null },
  { time: (new Date("2025-11-07T15:00:00+08:00").getTime() / 1000) as Time, value: null },
];

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
      timeVisible: true,
      secondsVisible: false,

      // 这里的format只针对已有数据，如果我想要锁定9.00 - 15.00的区间，就得模拟空的假数据
      tickMarkFormatter: (time) => {
        const date = new Date(time * 1000);
        return date.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Shanghai",
        });
      },
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

    // 这里的限定范围，看不出有什么用
    const start = (new Date("2025-11-07T09:00:00+08:00").getTime() / 1000) as Time;
    const end = (new Date("2025-11-07T15:00:00+08:00").getTime() / 1000) as Time;
    chart.timeScale().setVisibleRange({ from: start, to: end });

    // chart.timeScale().applyOptions({
    //   tickMarkFormatter: (time: number) => {
    //     const date = new Date(time * 1000);
    //     const h = date.getHours();
    //     const m = date.getMinutes().toString().padStart(2, "0");
    //     console.log(h, m);
    //     if (h === 9 && m === "00") return "9:00";
    //     if (h === 15 && m === "00") return "15:00";
    //     return "";
    //   },
    // });
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
