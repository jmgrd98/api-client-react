import path from "path"
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react"
import replace from '@rollup/plugin-replace';

export default defineConfig({
  plugins: [
    react(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY)
      }
    })
  ],
  resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      }
});
