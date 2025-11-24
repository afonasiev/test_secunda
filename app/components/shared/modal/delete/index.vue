<script setup lang="ts">
const modal = defineModel<boolean>();
const emits = defineEmits(["accept"]);
</script>

<template>
  <ui-modal
    v-model="modal"
    @accept="emits('accept')"
    title="Удаление записи"
    text="Вы уверены что хотите удалить?"
    btn-decline="green"
    btn-accept="red"
  />
</template>

<style module lang="scss"></style>
