import { defineConfig, UserConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  if (mode === 'library') {
    return {
      plugins: [
        react(),
        dts({ include: ['library'], tsconfigPath: 'tsconfig.library.json' }),
      ],
      build: {
        outDir: 'lib',
        copyPublicDir: false,
        lib: {
          entry: resolve(__dirname, 'library/main.ts'),
          formats: ['es'],
        },
        rollupOptions: {
          external: ['react', 'react/jsx-runtime'],
          output: {
            entryFileNames: '[name].js',
          },
        },
      },
    };
  }

  return {
    plugins: [react()],
  };
});
