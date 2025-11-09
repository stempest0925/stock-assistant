<script setup lang="ts">
import { defineProps } from "vue";

type Icons = "cn" | "hk" | "us";
defineProps<{ name: Icons }>();
</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<style lang="css" scoped>
/* IconFont */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
