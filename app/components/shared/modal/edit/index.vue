<script setup lang="ts">
const modal = defineModel<boolean>();
const emits = defineEmits(["accept"]);
</script>

<template>
  <ui-modal
    v-model="modal"
    @accept="emits('accept')"
    title="Редактирование"
    text="Сохранить внесенные изменения?"
  />
</template>

<style module lang="scss"></style>
