<script setup lang="ts">
import type { Note } from "@/stores/notes/types";

const emits = defineEmits(["removeNote"]);
const { title, list, id } = defineProps<Note>();

const editNote = async (id: number) => {
  await navigateTo(`/note/edit/${id}`);
};
</script>

<template>
  <article :class="$style.note">
    <h2 :class="$style.heading">{{ title }}</h2>
    <ul :class="$style.list">
      <shared-todo-preview
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      />
    </ul>
    <div :class="$style.add">
      <ui-button @click="editNote(id)">
        <shared-icon icon="edit" />
      </ui-button>
      <ui-button @click="emits('removeNote', id)">
        <shared-icon icon="remove" />
      </ui-button>
    </div>
  </article>
</template>

<style module lang="scss">
.note {
  width: 100%;
  height: auto;
  padding: 16px;
  background-color: var(--color-background-item);
  border-radius: 8px;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    .add {
      opacity: 1;
    }
  }
}
.heading {
  color: inherit;
}
.list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.add {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.24);
  opacity: 0;
  will-change: opacity;
  transition: all ease-out 0.3s;
}
</style>
