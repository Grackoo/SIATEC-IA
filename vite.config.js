import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Añadimos la propiedad 'base' y la configuramos como './' (ruta relativa).
  // Esto fuerza a Vite a generar rutas relativas para todos los assets (JS, CSS),
  // asegurando que se carguen correctamente sin importar si la aplicación
  // se aloja en la raíz o en un subdirectorio (como en GitHub Pages).
  base: './',
  plugins: [react()],
})