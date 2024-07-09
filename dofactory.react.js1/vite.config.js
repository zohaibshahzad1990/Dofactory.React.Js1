import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5191,       // Assigned port number (default is 5173)
        strictPort: true  // Because server CORS policy only accepts above port
    },
})
