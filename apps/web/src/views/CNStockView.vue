<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const route = useRoute();
const needKeepRoute = computed(() => (route.meta.needKeep ? [route.name as string] : []));
console.log(route.name, route.fullPath, route.path);
const tempRoute = [
  { name: "申万二级", route: "/cn?type=sw2" },
  { name: "申万行业", route: "/cn?type=sw" },
  { name: "证监会行业", route: "/cn?type=zj" },
  { name: "指数成分", route: "/cn?type=zs" },
  { name: "次新股", route: "/cn?type=cx" },
  { name: "大盘指数", route: "/cn?type=dp" },
  { name: "地域板块", route: "/cn?type=dy" },
  { name: "分类", route: "/cn?type=fl" },
  { name: "风险警示", route: "/cn?type=fx" },
  { name: "概念板块", route: "/cn?type=gn" },
  { name: "热门概念", route: "/cn?type=rm" },
  { name: "AUC指数", route: "/cn/auc" },
];
</script>

<template>
  <main class="container mx-auto">
    <section class="text-center w-1/2 mx-auto pt-12 mb-12">
      <h1 class="text-6xl/loose font-black">A股数据量化排名</h1>
      <p class="text-lg/relaxed text-primary/80">根据A股上市5200+股票独特指标量化筛选，仅供参考。</p>
    </section>
    <section class="flex flex-row justify-center mb-12">
      <nav class="p-2 bg-white rounded-lg flex flex-row space-x-2">
        <RouterLink
          v-for="item in tempRoute"
          :key="item.route"
          :to="item.route"
          class="sub-navigation p-4 rounded-lg font-bold"
          :active-class="$route.fullPath === item.route ? 'active' : ''"
          >{{ item.name }}</RouterLink
        >
      </nav>
    </section>
    <RouterView v-slot="{ Component }">
      <KeepAlive :include="needKeepRoute">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
</template>
<style lang="css" scoped></style>
