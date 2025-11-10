<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const route = useRoute();
const needKeepRoute = computed(() => (route.meta.needKeep ? [route.name as string] : []));
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
        <RouterLink to="/" class="p-4 bg-white">行业板块</RouterLink>
        <RouterLink to="/cn/auc" class="p-4 bg-white">AUC板块{{ $route.meta.needKeep }}</RouterLink>
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
