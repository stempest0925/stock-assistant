<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

import SectorCard from "@/components/SectorCard.vue";

interface ISectorData {
  name: string;
  score: string;
  score_detail: object;
  score_value: number;
  stock_detail: object[];
}
const sectorData = ref<ISectorData[]>();

onMounted(async () => {
  const data: ISectorData[] = await fetch("/json/data/%E7%94%B3%E4%B8%87%E4%BA%8C%E7%BA%A7.json").then(
    (response) => response.json(),
  );
  sectorData.value = data.splice(0, 20);
});

const onBeforeEnter = (el: Element) => {
  const _el = el as HTMLElement; // 解决Element基类无法访问style
  _el.style.opacity = "0";
  _el.style.transform = "translateY(30px)";
};
const onEnter = (el: Element, done: () => void) => {
  const _el = el as HTMLElement; // 解决Element基类无法访问dataset
  const delay = Number(_el.dataset.index) * 0.3;
  gsap.to(el, { opacity: 1, translateY: 0, delay, duration: 0.6, onComplete: done });
};
</script>

<template>
  <div class="flex flex-row justify-between items-center py-6">
    <h2 class="text-2xl font-bold tracking-widest">行业列表</h2>
    <div class="px-2">
      <!-- 搜索框，延迟搜索 -->
      <div class="flex flex-row space-x-2 bg-white rounded">
        <!-- icon -->
        <input type="text" placeholder="股票名称 / 代码 / 关键字" class="outline-none p-3"  />
      </div>
      <!-- 其他，比如排序 -->
    </div>
  </div>
  <!-- 行业列表 -->
  <TransitionGroup
    tag="div"
    class="space-y-2"
    :css="false"
    appear
    @before-enter="onBeforeEnter"
    @enter="onEnter"
  >
    <SectorCard
      v-for="(sector, index) in sectorData"
      :key="index"
      :data-index="index"
      :index="index + 1"
      :name="sector.name"
      :score="sector.score_value"
    />
  </TransitionGroup>
</template>
