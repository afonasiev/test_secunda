<script setup lang="ts"></script>

<template>
  <nav :class="$style.navigation">
    <NuxtLink to="/" :class="$style.link">Главная</NuxtLink>
    <NuxtLink to="/note/create" :class="$style.link">Новая заметка</NuxtLink>
  </nav>
</template>

<style module lang="scss">
.navigation {
  display: flex;
  gap: 8px;
}
.link {
  color: var(--color-text);
  text-decoration: none;
  &:hover {
    //color: #222830;
  }
  &:global(.router-link-active) {
    //color: #222830;
    text-decoration: underline;
  }
}
</style>
