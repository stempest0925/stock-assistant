<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex flex-row bg-white shadow-2xl">
    <div class="flex flex-row container mx-auto justify-between">
      <div class="logo">AI取代大脑V1</div>
      <nav class="text-xl space-x-2">
        <RouterLink to="/cn" class="px-6 py-4 inline-block">A股</RouterLink>
        <RouterLink to="/hk" class="px-6 py-4 inline-block">港股</RouterLink>
        <RouterLink to="/us" class="px-6 py-4 inline-block">美股</RouterLink>
      </nav>
      <div class="user"></div>
    </div>
  </header>

  <RouterView />
</template>
