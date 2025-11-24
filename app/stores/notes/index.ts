import { defineStore } from "pinia";
import { notesData } from "./examples/test_data";
import type { Note, Notes } from "./types";

const TEST_DATA = notesData;
const deepCloneObj = (obj: any) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const cloneArr = [];
    for (const item of obj) {
      cloneArr.push(deepCloneObj(item));
    }
    return cloneArr;
  }

  const cloneObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepCloneObj(obj[key]);
    }
  }
  return cloneObj;
};
export const useNotesStore = defineStore("notesStore", {
  state: () => ({
    notes: <Notes>[],
  }),
  actions: {
    initNotes() {
      const oldData = localStorage.getItem("notesStore");
      if (oldData !== null) {
        this.notes = JSON.parse(oldData)?.notes;
      } else {
        this.notes = TEST_DATA;
      }
    },
    newNote(note: Note) {
      this.notes.unshift(note);
    },
    getNote(id: number) {
      return this.notes.filter((note: Note) => note.id === id)[0];
    },
    updateNote(note: Note) {
      for (let i = 0; i < this.notes.length; i++) {
        const el = this.notes[i];
        if (note.id === el?.id) {
          this.notes[i].title = note.title;
          this.notes[i].list = deepCloneObj(note.list);
          break;
        }
      }
    },
    removeNote(id: number) {
      this.notes = this.notes.filter((note: Note) => note.id !== id);
    },
  },
  getters: {
    notesHomeData: (state) => {
      return state.notes.map((note: Note) => {
        if (note.list.length > 2) {
          return {
            ...note,
            list: note.list.slice(0, 2),
          };
        }
        return note;
      });
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
});
