import { defineStore } from "pinia";
import type { ToDo } from "@/stores/notes/types";

export const useHistoryStore = defineStore("historyStore", {
  state: (): {
    list: ToDo[];
    history: any[];
    future: any[];
  } => ({
    list: [],
    history: [],
    future: [],
  }),
  actions: {
    resetData() {
      this.history = [];
      this.future = [];
      this.list = [];
    },
    setData(newList: ToDo[]) {
      this.history.push(JSON.parse(JSON.stringify(this.list)));
      this.future = [];
      this.list = newList;
    },
    undo() {
      if (!this.history.length) return;
      this.future.push(JSON.parse(JSON.stringify(this.list)));
      this.list = this.history.pop();
    },
    redo() {
      if (!this.future.length) return;
      this.history.push(JSON.parse(JSON.stringify(this.list)));
      this.list = this.future.pop();
    },
  },
  getters: {
    getList: (state) => state.list,
  },
});
