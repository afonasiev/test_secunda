<script setup lang="ts">
import type { ToDo } from "@/stores/notes/types";

type componentType = "li" | "p" | "span";
interface Props {
  item: ToDo;
  type?: componentType;
}
const { item, type = "li" } = defineProps<Props>();
const { check, name } = item;
</script>

<template>
  <component :is="type" :class="$style.element">
    <shared-icon :icon="check ? 'checked' : 'unchecked'" />{{ name }}
  </component>
</template>

<style module>
.element {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  svg {
    width: 30px;
    height: 30px;
  }
}
</style>
