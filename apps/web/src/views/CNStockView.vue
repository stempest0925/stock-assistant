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
  <main class="container mx-auto pt-10">
    <!-- <img src="@/assets/images/banner.png" /> -->
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
