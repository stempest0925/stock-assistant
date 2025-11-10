<script setup lang="ts">
import { defineProps, computed } from "vue";
import gsap from "gsap";
import { SCORE_RANGE_COLORS } from "@/constants/colors";

import BaseIcon from "./BaseIcon.vue";
import AreaChart from "./AreaChart.vue";

const props = defineProps({ index: Number, name: String, score: Number });

const ranking = computed(() => props.index?.toString().padStart(2, "0"));
const splitName = computed(() => props.name?.split("-").pop());
const score = computed(() => Number((props.score! * 100).toFixed(0)));
const scoreColor = computed(() => {
  // props 等响应对象是Proxy类型，TS无法收窄类型，需要手动断言。
  if (!props.score) return SCORE_RANGE_COLORS[0].value;
  return SCORE_RANGE_COLORS.find((item) => score.value >= item.min && score.value <= item.max)?.value;
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
        const cardY = cardIndex - targetIndex > 0 ? 6 : -6;

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
    <i class="px-8 text-3xl font-black text-shadow-lg">{{ ranking }}</i>
    <div class="flex-1 flex flex-row px-8 py-2 items-center border-l border-gray-400">
      <div class="w-16 h-16 mr-6 text-center rounded-lg" :style="{ backgroundColor: scoreColor }">
        <b class="text-white leading-16 text-xl">
          {{ score }}
        </b>
      </div>
      <div class="flex flex-col space-y-2">
        <div class="flex flex-row space-x-4 items-baseline">
          <!-- <div class="w-8 aspect-square">
          <BaseIcon name="cn" />
        </div> -->
          <h3 class="text-2xl font-bold tracking-wider text-shadow-lg">{{ splitName }}</h3>
          <span class="bg-gray-200/70 px-2 rounded">912044</span>
        </div>
        <div class="flex flex-row items-center space-x-4">
          <!-- <span class="px-4 py-0.5 bg-gray-200/70 rounded-xl">评分：{{ score }}</span> -->
          <div class="flex flex-row bg-gray-200/70 rounded-xl px-4 py-0.5 items-center">
            <!-- <div class="w-8 aspect-square">
            <BaseIcon name="cn" />
          </div>   -->
            <span>行业排名：第 {{ props.index }} 名</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-[280px] h-[140px] overflow-hidden rounded-lg">
      <AreaChart />
    </div>
  </div>
</template>
