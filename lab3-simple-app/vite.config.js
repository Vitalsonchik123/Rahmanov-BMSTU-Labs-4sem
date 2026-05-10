import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: './public',   // папка для собранных файлов
        emptyOutDir: true,    // очищать папку перед сборкой
    },
});
