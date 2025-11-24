<script setup lang="ts">
import { useNotesStore } from "@/stores/notes";

definePageMeta({
  validate(route) {
    return typeof route.params.id === "string" && /^\d+$/.test(route.params.id);
  },
});

const route = useRoute();
const id = Number(route.params.id);
const { getNote } = useNotesStore();

const backHome = async () => {
  await navigateTo("/");
};
</script>

<template>
  <ui-container>
    <div :class="$style.top">
      <h1>Редактирование заметки</h1>
      <ui-button @click="backHome"><shared-icon icon="back" /></ui-button>
    </div>
    <shared-form :edit-data="getNote(id)" edit-prop />
  </ui-container>
</template>

<style module lang="scss">
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
</style>
