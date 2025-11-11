<script setup lang="ts">
import AUCCard from "@/components/AUCCard.vue";

const tempData = [
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
  { code: 600021, name: "上海电力", top: "第一梯队", sector: "电力", sector_ranking: 93, probability: 0.524 },
];
</script>

<template>
  <section class="">
    <TransitionGroup tag="div" class="grid grid-cols-2 gap-4" :css="false" appear>
      <AUCCard
        v-for="(stock, index) in tempData"
        :key="index"
        :data-index="index"
        :index="index + 1"
        :stock="stock"
      />
    </TransitionGroup>
  </section>
</template>
