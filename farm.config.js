import { defineConfig } from '@farmfe/core';
import { reactCompiler } from '@farmfe/js-plugin-react-compiler';
import react from '@farmfe/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    cors: true,
    open: true,
  },
  plugins: [
    reactCompiler({
      runtime: 'automatic',
      development: process.env.NODE_ENV === 'development',
    }),
    react(),
    [
      '@farmfe/plugin-sass',
      {
        includePaths: ['src/styles'],
        outputStyle: 'compressed',
        sourceMap: true,
        // Добавляем обработку импортов
        importer: (url, prev, done) => {
          if (url.endsWith('.scss') || url.endsWith('.css')) {
            return { file: url };
          }
          done({ file: url });
        },
      },
    ],
  ],
  compilation: {
    input: {
      index: './src/index.html',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss', '.css'],
      alias: {
        '@': './src',
      },
    },
    minify: true,
    sourcemap: true,
    output: {
      path: 'build',
      filename: 'assets/[name].[hash].[ext]',
      assetsFilename: 'static/[resourceName].[ext]',
    },
    lazyCompilation: true,
    presetEnv: true,
  },
});
