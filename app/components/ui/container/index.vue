<template>
  <div :class="$style.container"><slot /></div>
</template>

<style module>
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: 16px;
}
</style>
