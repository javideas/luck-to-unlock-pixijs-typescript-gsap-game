import { defineConfig } from 'vite';

export default defineConfig({
    base: process.env.NODE_ENV === 'github' ? '/luck-to-unlock-pixijs-typescript-gsap-game/' : '/',
    build: {
        outDir: 'dist',
    },
});