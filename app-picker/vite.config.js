import { defineConfig } from 'vite'

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../../dist',
        rollupOptions: {
            input: {
                main: 'src/index.js',
            },
            output: {
                entryFileNames: 'app-picker.js',
            }
        }
    },
    server: {
        port: 1337,
    }
});
