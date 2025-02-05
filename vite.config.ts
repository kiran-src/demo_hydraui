import { defineConfig } from '@angular-devkit/build-angular/src/tools/turbo';

export default defineConfig({
  optimizeDeps: {
    include: ['@stomp/stompjs', 'sockjs-client'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  resolve: {
    alias: {
      'global': 'globalThis',
      'process': 'process/browser',
      'buffer': 'buffer',
      'util': 'util'
    }
  },
  define: {
    'global': 'globalThis',
    'process.env': {},
    'process.version': '"v16.0.0"'
  }
});