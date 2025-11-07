<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";
import AreaChart from "./AreaChart.vue";
</script>

<template>
  <div class="flex flex-row px-2 py-6 bg-white rounded-xl shadow-md">
    <div class="px-6 flex flex-row items-center font-bold text-2xl border-r border-gray-400">01</div>
    <div class="flex-1 flex flex-col pl-6 space-y-2">
      <div class="flex flex-row space-x-4 items-baseline">
        <div class="w-8 aspect-square">
          <BaseIcon name="cn" />
        </div>
        <h3 class="text-2xl font-medium">汽车零部件</h3>
        <div class="bg-gray-200/80 px-2 rounded">912044</div>
      </div>
      <div class="flex flex-row items-center space-x-4">
        <div class="px-4 py-0.5 bg-green-200 rounded-xl">申万二级</div>
        <div class="flex flex-row bg-gray-200/80 rounded-xl px-4 py-0.5 items-center">
          <div class="w-8 aspect-square">
            <BaseIcon name="cn" />
          </div>
          <p>行业排名：第 1 名</p>
        </div>
      </div>
    </div>
    <div class="-my-4 w-[280px]">
      <AreaChart />
    </div>
  </div>
</template>
