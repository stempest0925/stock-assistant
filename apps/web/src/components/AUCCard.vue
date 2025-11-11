<script setup lang="ts">
import { defineProps } from "vue";
import AUCChart from "./AUCChart.vue";

const props = defineProps<{
  stock: {
    code: number;
    name: string;
    top: string;
    sector: string;
    sector_ranking: number;
    probability: number;
  };
}>();
</script>

<template>
  <div class="bg-white flex flex-col rounded-2xl p-2">
    <div class="flex flex-row">
      <div class="flex-1 flex flex-col p-4">
        <div class="flex flex-row items-baseline space-x-2 mb-2">
          <h3 class="text-xl font-bold tracking-wider text-shadow-lg">{{ props.stock.name }}</h3>
          <span>{{ props.stock.code }}</span>
        </div>
        <span class="text-sm">所属行业：{{ props.stock.sector }}</span>
        <span class="text-sm">行业排名：第 {{ props.stock.sector_ranking }} 位</span>
      </div>
      <div class="p-2 flex flex-col justify-between items-end">
        <div class="bg-gray-200/70 rounded-xl px-4 py-1 text-sm mb-2">{{ props.stock.top }}</div>
        <h2 class="text-4xl italic opacity-40">{{ (props.stock.probability * 100).toFixed(1) }}%</h2>
      </div>
    </div>
    <!-- 图表区域 -->
    <div class="w-full h-64">
      <AUCChart />
    </div>
  </div>
</template>
