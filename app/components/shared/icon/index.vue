<script setup lang="ts">
// import type { Props } from "@/components/ui/icon/types";
import type { Props } from "@/components/shared/icon/types";
import { computed, defineAsyncComponent } from "vue";

const { icon } = defineProps<Props>();

const dynamicComponent = computed(() => {
  const _icon = icon;
  return defineAsyncComponent(
    () => import(`@/components/shared/icon/svg/${_icon}.vue`),
  );
});
</script>

<template>
  <Suspense>
    <template #default>
      <component :is="dynamicComponent" />
    </template>
  </Suspense>
</template>
