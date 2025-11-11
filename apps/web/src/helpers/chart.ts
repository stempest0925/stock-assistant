import { color, type Options } from "highcharts";
import { STOCK_COLORS } from "@/constants/colors";

/**
 * 生成 Highcharts 配置项
 * 配置项优先级：Highcharts.setOptions方法(全局配置) > plotOptions.series(所有数据集配置) > options(根结点配置) > series(单个数据集配置)
 */

/**
 * 生成面积图配置
 */
type AreaChartOptions = { color: string };
export function generateAreaChartOptions(
  data: number[][],
  options: AreaChartOptions = { color: STOCK_COLORS.rise },
): Options {
  // 获取最新的时间
  const lastDate = new Date(data[data.length - 1][0]);
  const year = lastDate.getUTCFullYear();
  const month = lastDate.getUTCMonth();
  const day = lastDate.getUTCDate();

  return {
    // 语言设置，不设置报错
    lang: { decimalPoint: ".", thousandsSep: ",", locale: "zh-CN" },
    // 关闭可访问性
    accessibility: { enabled: false },
    // 去除版权信息，开发模式下有效
    credits: { enabled: false },
    // 去除分组选择
    rangeSelector: { enabled: false },
    // 去除菜单按钮
    exporting: { enabled: false },
    // 去除导航器
    navigator: { enabled: false },
    // 去除滚动条
    scrollbar: { enabled: false },
    chart: {
      // 去除图表绘制padding
      spacing: [0, 0, 0, 0],
      // 禁止拖动
      panning: { enabled: false },
      // 禁止滚轮缩放
      zooming: { mouseWheel: false },
    },
    xAxis: {
      type: "datetime",
      // 限定时间范围
      min: Date.UTC(year, month, day, 9, 0),
      max: Date.UTC(year, month, day, 15, 0),
      // 去除x轴label
      labels: { enabled: false },

      // x轴label格式
      // labels: { format: "{value:%H:%M}" }

      crosshair: {
        // 去除底部tooltip
        label: { enabled: false },
        // 准星线类型
        dashStyle: "Dash",
        // 准星线颜色
        color: options.color,
      },

      // 去除底部线
      lineWidth: 0,
      // 去除短刻度线
      tickLength: 0,
    },
    yAxis: {
      // 去除y轴label
      labels: { enabled: false },
      // 去除网格线
      gridLineWidth: 0,
    },
    tooltip: {
      useHTML: true,
      backgroundColor: "rgba(0,0,0,0.8)",
      // borderColor: options.color,
      borderWidth: 0,
      borderRadius: 4,
      shadow: false,
      padding: 6,
      formatter: function () {
        // 时间临时隐藏
        // const date = Highcharts.dateFormat("%H:%M", this.x);
        const price = this.y?.toFixed(2);

        // Highcharts 会校验属性，不支持data-*自定义属性，无法通过css attr获取颜色，因此不用伪类做point，改用div元素。
        return `
          <div class="chart-tooltip">
            <div class="point" style="background-color: ${options.color};"></div>
            <i>Apple Inc.</i>
            <h4>${price}</h4>
          </div>
        `;
      },
    },
    // 数据集配置
    series: [
      {
        name: "Price",
        // 类型
        type: "area",
        // 数据
        data: data,
        // 阈值
        threshold: null,

        // 数据点间隙，根据数据密度调整, 比如一分钟的数据，五分钟断开
        // gapSize: 5,

        // 空值连接，不会断线
        connectNulls: true,
        // 折线大小
        lineWidth: 1,
        // 折线颜色
        color: options.color,
        // 区域颜色
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, `var(--highcharts-color-0, ${options.color})`],
            [1, `color-mix( in srgb, var(--highcharts-color-0, ${options.color}) 25%, transparent )`],
          ],
        },
        marker: {
          // 悬浮点填充颜色
          fillColor: options.color,
          // 悬浮点边框色
          lineColor: "#fff",
        },
      },
    ],
  };
}

export function generateStockChartOptions(data: number[][]) {
  const colorTemplate = `{#ge point.open point.close}${STOCK_COLORS.rise}{else}${STOCK_COLORS.fall}{/ge}`;

  return {
    lang: { decimalPoint: ".", thousandsSep: ",", locale: "zh-CN" },
    accessibility: { enabled: false },
    credits: { enabled: false },
    rangeSelector: { enabled: false },
    exporting: { enabled: false },
    navigator: { enabled: false },
    scrollbar: { enabled: false },
    xAxis: {
      labels: { enabled: false },
      crosshair: { dashStyle: "Dash" },
      lineWidth: 0,
      tickLength: 0,
    },
    yAxis: {
      labels: { enabled: false },
      crosshair: { dashStyle: "Dash" },
      gridLineWidth: 0,
    },
    tooltip: {
      shared: false,
      split: false,
      useHTML: true,
      fixed: true,
      positioner() {
        return { x: 0, y: 0 };
      },
      format: `<div class="candlestick-chart-tooltip">
                <div class="price">
                  <h4>35.22</h4>
                  <span>{(subtract point.open point.close):.2f}</span>
                  <span>
                    0.12%
                  </span>
                </div>
                <ul class="info">
                  <li>开 <span style="color:${colorTemplate}";>{point.open}</span></li>
                  <li>收 <span style="color:${colorTemplate}";>{point.close}</span></li>
                  <li>高 <span style="color:${colorTemplate}";>{point.high}</span></li>
                  <li>低 <span style="color:${colorTemplate}";>{point.low}</span></li>
                </ul>
              </div>`,
    },
    series: [
      {
        name: "Price",
        type: "candlestick",
        data: data,
        color: STOCK_COLORS.fall,
        upColor: STOCK_COLORS.rise,
        lineColor: STOCK_COLORS.fall,
        upLineColor: STOCK_COLORS.rise,
      },
    ],
  };
}
