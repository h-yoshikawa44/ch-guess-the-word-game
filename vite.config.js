import { defineConfig } from "vite";

export default defineConfig({
  base:
    process.env.NODE_ENV === "production" ? "/ch-guess-the-word-game/" : "./",
  server: {
    open: true,
  },
});
