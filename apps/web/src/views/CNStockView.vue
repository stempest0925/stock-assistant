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
  const data = await fetch("/json/data/%E7%94%B3%E4%B8%87%E4%BA%8C%E7%BA%A7.json").then((response) =>
    response.json(),
  );
  sectorData.value = data;
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
  <main class="container mx-auto">
    <section class="text-center w-1/2 mx-auto pt-16 mb-24">
      <h1 class="text-6xl/loose font-black">Eva Design Assets</h1>
      <p class="text-lg/relaxed text-primary/80 mb-12">
        Design Assets easily adaptable to your brand. Available for Sketch and Figma component libraries,
        based on Eva Design System.
      </p>
      <button
        class="px-6 py-4 bg-blue-600 text-white text-lg rounded-lg font-bold hover:bg-blue-500 transition-all duration-200 cursor-pointer group shadow-blue-800 hover:shadow-[2px_2px_0]"
      >
        <!-- group-hover:-translate-0.5 可以弄两个标签，悬浮视差 -->
        <span
          class="inline-block duration-150 ease-in text-shadow-white/30 group-hover:text-shadow-[2px_2px_0]"
          >VIEW CHINA STOCKS</span
        >
      </button>
    </section>
    <section class="my-12">
      <nav class="grid grid-cols-2 overflow-hidden rounded-lg">
        <a href="#" class="p-4 bg-white">行业板块</a>
        <a href="#" class="p-4 bg-white">AUC板块</a>
      </nav>
    </section>
    <!-- 行业列表 -->
    <TransitionGroup
      tag="div"
      class="space-y-6"
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
  </main>
</template>
<style lang="css" scoped></style>
