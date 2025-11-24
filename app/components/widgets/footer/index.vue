<script setup lang="ts"></script>

<template>
  <footer :class="$style.footer">
    <p>
      &copy; 2025 Тестовая работа. TG:<NuxtLink
        to="https://t.me/slavk0"
        external
        no-rel
        target="_blank"
      >
        @slavk0
      </NuxtLink>
    </p>
  </footer>
</template>

<style module>
.footer {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  p {
    font-size: 8px;
    a {
      color: var(--color-text);
    }
  }
}
</style>
