<script setup lang="ts"></script>

<template>
  <header :class="$style.header">
    <ui-container :class="$style.container">
      <shared-nav />
      <features-switcher-themes />
    </ui-container>
  </header>
</template>

<style module>
.header {
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  height: 64px;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
