<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from "vue";
import { createChart, AreaSeries, type Time } from "lightweight-charts";

const containerRef = useTemplateRef("container");
let chart: ReturnType<typeof createChart> | null = null;

const data: {time: Time, value: number}[] = [
  {
    time: 1762477200,
    value: 102.18398688689851,
  },
  {
    time: 1762477800,
    value: 101.05052503908783,
  },
  {
    time: 1762478400,
    value: 101.05381246638132,
  },
  {
    time: 1762479000,
    value: 98.42222284302085,
  },
  {
    time: 1762479600,
    value: 101.98038786568183,
  },
  {
    time: 1762480200,
    value: 97.77028011045716,
  },
  {
    time: 1762480800,
    value: 102.14130998837544,
  },
  {
    time: 1762481400,
    value: 99.42221075789989,
  },
  {
    time: 1762482000,
    value: 100.77818999096034,
  },
  {
    time: 1762482600,
    value: 98.32474287489597,
  },
  {
    time: 1762483200,
    value: 98.32193771370834,
  },
  {
    time: 1762483800,
    value: 97.67243923848066,
  },
  {
    time: 1762484400,
    value: 101.82376623067375,
  },
  {
    time: 1762485000,
    value: 102.40486811516551,
  },
  {
    time: 1762485600,
    value: 101.56731603316463,
  },
  {
    time: 1762486200,
    value: 100.25981226546226,
  },
  {
    time: 1762486800,
    value: 100.5333243455628,
  },
  {
    time: 1762487400,
    value: 99.15366963172329,
  },
  {
    time: 1762488000,
    value: 101.0356411218767,
  },
  {
    time: 1762488600,
    value: 101.25855632560128,
  },
  {
    time: 1762489200,
    value: 101.52867301180639,
  },
  {
    time: 1762489800,
    value: 101.02579279498951,
  },
  {
    time: 1762490400,
    value: 98.77443267849092,
  },
  {
    time: 1762491000,
    value: 101.65346868668485,
  },
  {
    time: 1762491600,
    value: 100.99152395309115,
  },
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
      fixLeftEdge: true,
      fixRightEdge: true,
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
    // chart.timeScale().setVisibleRange({
    //   from: (new Date().setHours(9, 0, 0, 0) / 1000) as Time, // 转换为时间戳
    //   to: (new Date().setHours(15, 0, 0, 0) / 1000) as Time,
    // });

    areaChart.setData(data);

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
