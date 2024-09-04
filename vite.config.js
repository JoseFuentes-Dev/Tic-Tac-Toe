import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/Tic-Tac-Toe/',  // Ajusta esto según el nombre del repositorio
})
