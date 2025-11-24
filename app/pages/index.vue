<script setup lang="ts">
import { useNotesStore } from "@/stores/notes";
import { storeToRefs } from "pinia";

const modal = ref(false);
const idNote = ref<number>();
const store = useNotesStore();
const { initNotes, removeNote } = store;
const { notesHomeData } = storeToRefs(store);

const addedNote = async () => {
  await navigateTo("/note/create");
};
onMounted(() => {
  initNotes();
});
const openModal = (id: number) => {
  idNote.value = id;
  modal.value = !modal.value;
};
</script>

<template>
  <ui-container>
    <div :class="$style.top">
      <h1>Список заметок</h1>
      <ui-button @click="addedNote"><shared-icon icon="added" /></ui-button>
    </div>
    <shared-note
      v-for="(note, index) in notesHomeData"
      :key="index"
      v-bind="note"
      @remove-note="openModal"
    />
  </ui-container>
  <shared-modal-delete v-model="modal" @accept="removeNote(idNote)" />
</template>

<style module>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
</style>
