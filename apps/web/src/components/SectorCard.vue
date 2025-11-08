<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";
import AreaChart from "./AreaChart.vue";
</script>

<template>
  <div class="flex flex-row items-center p-2 bg-white rounded-xl shadow-md">
    <div class="px-6 text-2xl font-bold">01</div>
    <div class="flex-1 flex flex-col px-6 py-2 space-y-2 border-l border-gray-400">
      <div class="flex flex-row space-x-4 items-baseline">
        <div class="w-8 aspect-square">
          <BaseIcon name="cn" />
        </div>
        <h3 class="text-2xl font-medium">汽车零部件</h3>
        <span class="bg-gray-200/80 px-2 rounded">912044</span>
      </div>
      <div class="flex flex-row items-center space-x-4">
        <span class="px-4 py-0.5 bg-green-200 rounded-xl">申万二级</span>
        <div class="flex flex-row bg-gray-200/80 rounded-xl px-4 py-0.5 items-center">
          <div class="w-8 aspect-square">
            <BaseIcon name="cn" />
          </div>
          <span>行业排名：第 1 名</span>
        </div>
      </div>
    </div>
    <div class="w-[280px] h-[160px] overflow-hidden rounded-lg">
      <AreaChart />
    </div>
  </div>
</template>
