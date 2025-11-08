<script setup lang="ts">
import gsap from "gsap";

import SectorCard from "@/components/SectorCard.vue";

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
      <SectorCard v-for="sector in 10" :key="sector" :data-index="sector" />
    </TransitionGroup>
  </main>
</template>
<style lang="css" scoped></style>
