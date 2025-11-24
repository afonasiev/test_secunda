// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  plugins: ["~/plugins/pinia/index.ts"],

  css: ["~/assets/css/main.scss"],
  ssr: false,
  app: {
    baseURL: process.env.BASE_URL || "/",
  },
});
