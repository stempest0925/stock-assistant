<script setup lang="ts">
import { defineProps, computed } from "vue";
import gsap from "gsap";

import BaseIcon from "./BaseIcon.vue";
import AreaChart from "./AreaChart.vue";

const props = defineProps({ index: Number, name: String, score: Number });

const ranking = computed(() => {
  return props.index?.toString().padStart(2, "0");
});
const splitName = computed(() => {
  return props.name?.split("-").pop();
});

const onMouseEnter = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const parent = target.parentElement;
  const targetIndex = Number(target.dataset.index);

  if (parent) {
    const cards = parent.querySelectorAll(".sector-card");

    cards.forEach((card) => {
      if (card === target) {
        gsap.to(card, { y: 0, scale: 1.05, duration: 0.6, ease: "expo.out" });
      } else {
        const cardIndex = Number((card as HTMLElement).dataset.index);
        const cardY = (cardIndex - targetIndex) * -16; // 通过运算得出Y距离，形成视差

        gsap.to(card, { y: cardY, scale: 0.98, duration: 0.6, ease: "expo.out" });
      }
    });
  }
};
const onMouseLeave = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const parent = target.parentElement;

  if (parent) {
    const cards = parent.querySelectorAll(".sector-card");
    cards.forEach((card) => {
      gsap.to(card, { y: 0, scale: 1, duration: 0.6, ease: "expo.out" });
    });
  }
};
</script>

<template>
  <div
    class="sector-card flex flex-row items-center p-2 bg-white rounded-2xl"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <i class="px-6 text-2xl font-black text-shadow-lg">{{ ranking }}</i>
    <div class="flex-1 flex flex-col px-6 py-2 space-y-2 border-l border-gray-400">
      <div class="flex flex-row space-x-4 items-baseline">
        <!-- <div class="w-8 aspect-square">
          <BaseIcon name="cn" />
        </div> -->
        <h3 class="text-2xl font-bold tracking-wider text-shadow-lg">{{ splitName }}</h3>
        <span class="bg-gray-200/70 px-2 rounded">912044</span>
      </div>
      <div class="flex flex-row items-center space-x-4">
        <span class="px-4 py-0.5 bg-gray-200/70 rounded-xl">评分：{{ (props.score! * 100).toFixed(0) }}</span>
        <div class="flex flex-row bg-gray-200/70 rounded-xl px-4 py-0.5 items-center">
          <!-- <div class="w-8 aspect-square">
            <BaseIcon name="cn" />
          </div>   -->
          <span>行业排名：第 {{ props.index }} 名</span>
        </div>
      </div>
    </div>
    <div class="w-[280px] h-[140px] overflow-hidden rounded-lg">
      <AreaChart />
    </div>
  </div>
</template>
