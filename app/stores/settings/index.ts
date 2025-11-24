import { defineStore } from "pinia";
import type { settingsState, themes } from "@/stores/settings/types";
import { ref, watch } from "vue";

const SETTINGS_LOCAL_STORAGE_KEY = "theme";

const getDefaultTheme = (): themes => {
  const local = localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY);
  if (local) {
    return <themes>local;
  } else {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
};

export const useSettingsStore = defineStore("useSettings", () => {
  const theme = ref<themes>("default");

  watch(theme, (newValue: themes, oldValue: themes) => {
    classListFunc(newValue);
  });

  const classListFunc = (_theme: themes) => {
    if (document.body.classList.contains("dark"))
      document.body.classList.remove("dark");
    if (document.body.classList.contains("light"))
      document.body.classList.remove("light");
    document.body.classList.add(_theme);
  };
  const changeTheme = () => {
    setupTheme(theme.value === "dark" ? "light" : "dark");
  };
  const setupTheme = (_theme: themes) => {
    theme.value = _theme;
    localStorage.setItem(SETTINGS_LOCAL_STORAGE_KEY, _theme);
  };
  const defaultTheme = () => {
    setupTheme(getDefaultTheme());
  };
  return { theme, changeTheme, defaultTheme };
});
