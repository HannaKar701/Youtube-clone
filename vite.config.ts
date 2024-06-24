import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/Youtube-clone/',
    server: {
        port: 3005,
    },
});
