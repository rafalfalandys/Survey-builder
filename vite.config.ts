import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs({
      transformMixedEsModules: true,
      defaultIsModuleExports: false,
      include: [/.variables.js/],
    }),
  ],
  resolve: {
    alias: [
      {
        find: "react-intl",
        replacement: path.resolve(__dirname, "node_modules/react-intl/dist/react-intl.js"),
      },
    ],
  },
});
