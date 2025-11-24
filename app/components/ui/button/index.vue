<script setup lang="ts">
import type { Colors } from "@/components/ui/button/types";

const style = useCssModule();

const { color = "green" } = defineProps<{ color?: Colors }>();

const colorComp = computed(() => (color === "red" ? style.red : ""));
</script>

<template>
  <button type="button" :class="[$style.button, colorComp]"><slot /></button>
</template>

<style module lang="scss">
.button {
  position: relative;
  display: inline-block;
  padding: 8px 24px;
  text-align: center;
  font-size: 16px;
  letter-spacing: 1px;
  text-decoration: none;
  color: var(--color-border);
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 var(--color-border);
  svg {
    width: 24px;
    height: auto;
    path {
      transition: ease-out 0.5s;
      fill: var(--color-border);
      stroke: var(--color-border);
    }
  }
  &:hover {
    color: white;
    svg {
      path {
        fill: #fff;
        stroke: #fff;
      }
    }
    box-shadow: inset 0 -100px 0 0 var(--color-border);
  }
  &:active {
    transform: scale(0.9);
  }
}
.red {
  --color-border: var(--border-color2);
}
</style>
