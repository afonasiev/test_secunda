<script setup lang="ts"></script>

<template>
  <widgets-header />
  <main :class="$style.main">
    <slot />
  </main>
  <widgets-footer />
</template>

<style module>
.main {
  width: 100%;
  padding-top: 44px;
  height: auto;
  min-height: calc(100vh - 64px * 2);
}
</style>
