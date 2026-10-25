import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { storyArtPlugin } from './storyArtPlugin';

export default defineConfig({
  plugins: [react(), tailwindcss(), storyArtPlugin()],
  server: {
    // Aynı Wi-Fi'deki telefonların bağlanabilmesi için tüm ağ arayüzlerinde dinle
    host: true,
    port: 5173,
    // shared/ klasörü client/ dışında olduğu için izin ver
    fs: { allow: ['..'] },
  },
  preview: { host: true, port: 5173 },
});
