import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  //putting index.html in the root file means you don't need the next line
  root: "src",
});
