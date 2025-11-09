<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- 渐变背景 -->
  <div class="fixed -z-10 w-dvw h-dvh bg-linear-to-b from-white to-[#e4e9f2]"></div>
  <!-- 导航菜单 -->
  <header>
    <div class="container mx-auto flex flex-row justify-between items-center">
      <img src="@/assets/images/logo.svg" class="w-14 h-14" />

      <nav class="flex flex-row">
        <RouterLink
          to="/cn"
          class="px-6 py-4 text-center hover:bg-primary/10 transition-all duration-300 group ease-in rounded-xs"
        >
          <h4 class="text-lg/tight">A股</h4>
          <small>CN Stocks</small></RouterLink
        >
        <RouterLink
          to="/"
          class="px-6 py-4 text-center hover:bg-primary/10 transition-all duration-300 group ease-in rounded-xs"
        >
          <h4 class="text-lg/tight">港股</h4>
          <small>HK Stocks</small></RouterLink
        >
        <RouterLink
          to="/"
          class="px-6 py-4 text-center hover:bg-primary/10 transition-all duration-300 group ease-in rounded-xs"
        >
          <h4 class="text-lg/tight">美股</h4>
          <small>US Stocks</small></RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>
