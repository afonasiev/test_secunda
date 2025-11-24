<script setup lang="ts">
import { useCssModule } from "vue";
import type { ToDo, Note } from "@/stores/notes/types";
import { useHistoryStore } from "@/stores/history";
import { useNotesStore } from "@/stores/notes";

const { editData = null, editProp = false } = defineProps<{
  editData?: Note | null | undefined;
  editProp?: boolean;
}>();
const historyStore = useHistoryStore();
const notesStore = useNotesStore();
const style = useCssModule();
const title = ref("");
const todo = ref("");
const list = ref<ToDo[]>([]);
const modal = ref(false);

const strTrim = (str: string) => str.replace(/\s/g, "");
const supplementList = () => {
  if (strTrim(todo.value).length === 0) return;
  const lastElement = list.value[list.value.length - 1];
  const lastId = lastElement !== undefined ? lastElement.id : 0;
  const index = list.value.length > 0 ? lastId + 1 : 0;
  const item = {
    id: index,
    name: todo.value,
    check: false,
  };
  list.value.push(item);
  todo.value = "";
};
const deleteItemList = (id: number) => {
  list.value = list.value.filter((item) => item.id !== id);
};
const formSubmit = async () => {
  if (list.value.length > 0 && title.value.length > 0) {
    if (editProp) {
      // await updateNoteSubmit();
      modal.value = !modal.value;
    } else {
      await newNoteSubmit();
    }
  }
};
const newNoteSubmit = async () => {
  const lastElement = notesStore.notes[notesStore.notes.length - 1];
  const lastId = lastElement !== undefined ? lastElement.id : 0;
  const index = notesStore.notes.length > 0 ? lastId + 1 : 0;
  const item: Note = {
    id: index,
    title: title.value,
    list: historyStore.list,
  };
  notesStore.newNote(item);
  resetForm();
  await navigateTo("/");
};
const updateNoteSubmit = async () => {
  const id = editData.id;
  const item: Note = {
    id: id,
    title: title.value,
    list: historyStore.list,
  };
  notesStore.updateNote(item);
  resetForm();
  await navigateTo("/");
};
const resetForm = () => {
  title.value = "";
  todo.value = "";
  list.value = [];
  historyStore.resetData();
};
const handleKeyUp = (event: KeyboardEvent) => {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const ctrlKey = isMac ? event.metaKey : event.ctrlKey;
  // const ctrlKey = event.ctrlKey;
  const shiftKey = event.shiftKey;
  const zKey = event.key.toLowerCase() === "z";

  if (ctrlKey && !shiftKey && zKey) {
    if (historyStore.history.length) {
      event.preventDefault();
      historyStore.undo();
    }
  } else if (ctrlKey && shiftKey && zKey) {
    if (historyStore.future.length) {
      event.preventDefault();
      historyStore.redo();
    }
  }
};

const classTitle = computed(() =>
  strTrim(title.value).length > 0 ? style.top : "",
);
const classNote = computed(() =>
  strTrim(todo.value).length > 0 ? style.top : "",
);

watch(
  () => list.value,
  (value) => {
    historyStore.setData(value);
  },
  { deep: true },
);

onMounted(() => {
  document.addEventListener("keydown", handleKeyUp);

  if (editData) {
    title.value = editData.title;
    list.value = editData.list;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyUp);
});
</script>

<template>
  <form :class="$style.form" @submit.prevent="formSubmit">
    <label :class="[$style.label, classTitle]">
      <input type="text" v-model.trim="title" :class="$style.input" required />
      <span :class="$style.placeholder">Введите название заметки</span>
    </label>
    <label :class="[$style.label, classNote]">
      <input
        type="text"
        v-model.trim="todo"
        :class="$style.input"
        @keydown.enter.prevent="supplementList"
      />
      <span :class="$style.placeholder">Введите название задачи</span>
      <ui-button :class="$style.button" @click.stop="supplementList">
        <shared-icon icon="enter" />
      </ui-button>
    </label>
    <!--    <ui-table v-if="list.length > 0">-->
    <!--      <tr v-for="(item, index) in list" :key="index">-->
    <ui-table v-if="historyStore.list.length > 0">
      <tr v-for="(item, index) in historyStore.list" :key="index">
        <td>{{ item.id }}</td>
        <td>
          <!--          {{ item.check }}-->
          <label :class="$style.checkbox">
            <input type="checkbox" :checked="item.check" v-model="item.check" />
            <span :class="$style.pseudo"></span>
          </label>
        </td>
        <td>{{ item.name }}</td>
        <td>
          <ui-button color="red" @click.stop="deleteItemList(item.id)">
            delete
          </ui-button>
        </td>
      </tr>
    </ui-table>
    <div :class="$style.actions" v-if="historyStore.list.length > 0">
      <ui-button type="submit">Сохранить</ui-button>
    </div>
  </form>
  <shared-modal-edit
    v-if="editProp"
    v-model="modal"
    @accept="updateNoteSubmit"
  />
</template>

<style module lang="scss">
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.label {
  width: 100%;
  position: relative;
  padding: 8px 0;
  display: flex;
}
.placeholder {
  font-size: 16px;
  line-height: 1;
  color: #c4c4c4;
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 16px;
  will-change: transform;
  transition: all ease-out 0.5s;
}
.input {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: #fff;
  border: none;
  font-size: 16px;
  padding: 0 76px 0 16px;
  &:focus {
    & + .placeholder {
      transform: translate3d(-16px, -36px, 0px);
      color: var(--color-text);
    }
  }
}
.button {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 48px;
  margin: auto 0;
  border-radius: 8px;
  opacity: 0;
  will-change: opacity;
  transition: all ease-out 0.5s;
}
.top {
  .placeholder {
    transform: translate3d(-16px, -36px, 0px);
    color: var(--color-text);
  }
  .button {
    opacity: 1;
  }
}
.pseudo {
  display: flex;
  width: 24px;
  height: 24px;
  background-color: rgb(200, 230, 201);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  &::after {
    content: "";
    background-image: url(data:image/svg+xml;base64,ICA8c3ZnCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICB3aWR0aD0iNDhweCIKICAgIGhlaWdodD0iNDhweCIKICA+CiAgICA8cGF0aAogICAgICBmaWxsPSIjNGNhZjUwIgogICAgICBkPSJNMzQuNTg1IDE0LjU4NkwyMS4wMTQgMjguMTcyIDE1LjQxMyAyMi41ODQgMTIuNTg3IDI1LjQxNiAyMS4wMTkgMzMuODI4IDM3LjQxNSAxNy40MTR6IgogICAgLz4KICA8L3N2Zz4K);
    background-position: center;
    background-size: cover;
    display: block;
    width: 32px;
    height: 24px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -4px;
    right: 0;
    margin: auto;
    opacity: 0;
    transition: all ease-out 0.5s;
  }
}
.checkbox {
  display: flex;
  justify-content: center;
  input {
    display: none;
    &:checked {
      background-color: blue;
      border-color: darkblue;
      & + .pseudo {
        color: red;
        &::after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
