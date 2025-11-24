<template>
  <table :class="$style.table">
    <thead>
      <tr>
        <th>id</th>
        <th>Check</th>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<style module lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  thead {
    th {
      text-transform: uppercase;
      border-bottom: 2px solid var(--border-color);
      &:first-child {
        text-align: center;
        width: 32px;
      }
      &:nth-child(2) {
        text-align: center;
        width: 100px;
      }
      &:nth-child(3) {
        text-align: left;
      }
      &:nth-child(4) {
        width: 105px;
      }
    }
  }
  tbody {
    td {
      padding: 8px 0;
      &:first-child {
        text-align: center;
      }
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(3) {
        text-align: left;
      }
    }
    tr {
      &:nth-child(even) {
        td {
          background-color: var(--color-table);
        }
      }
    }
  }
}
</style>
<script setup lang="ts"></script>
