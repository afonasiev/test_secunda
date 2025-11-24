<script setup lang="ts">
const backHome = async () => {
  await navigateTo("/");
};
</script>

<template>
  <ui-container>
    <div :class="$style.top">
      <h1>Создание заметки</h1>
      <ui-button @click="backHome"><shared-icon icon="back" /></ui-button>
    </div>
    <shared-form />
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
