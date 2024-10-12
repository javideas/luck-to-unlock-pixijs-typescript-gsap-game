import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Assuming your source files are in the 'src' directory
  build: {
    outDir: '../dist', // Output directory for the build
  },
});
