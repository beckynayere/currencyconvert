// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// working file
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': '/src'
//     }
//   }
// });
// frontend/currency/currency-converter/vite.config.js

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': '/src' // For clean imports like '@/components/Button'
//     }
//   },
//   server: {
//     proxy: {
//       // During development, redirect API calls to avoid CORS
//       '/api': {
//         target: 'http://localhost:8000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   },
//   define: {
//     // Explicitly expose only the Vite env vars you need
//     'import.meta.env.VITE_API_URL': JSON.stringify(
//       process.env.VITE_API_URL || 'http://localhost:8000'
//     ),
//     // Prevent process.env pollution
//     'process.env': {}
//   }
// });



// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ command, mode }) => {
//   const env = loadEnv(mode, '', ['VITE_']);

//   return {
//     plugins: [react()],
//     define: {
//       'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
//       'import.meta.env.MODE': JSON.stringify(mode),
//       'import.meta.env.PROD': JSON.stringify(command === 'build'),
//       'import.meta.env.DEV': JSON.stringify(command === 'serve')
//     },
//     resolve: {
//       alias: {
//         '@': '/src'
//       }
//     },
//     server: {
//       proxy: env.VITE_API_URL ? {
//         '/api': {
//           target: env.VITE_API_URL,
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, '')
//         }
//       } : undefined
//     },
//     build: {
//       target: 'esnext',
//       minify: 'terser', // or 'esbuild'
//       sourcemap: true,
//       rollupOptions: {
//         output: {
//           manualChunks: undefined
//         }
//       }
//     }
//   };
// });


import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  // Load env variables from .env files (VITE_ prefixed only)
  const env = loadEnv(mode, process.cwd(), ['VITE_']);

  // Production/development check
  const isProduction = command === 'build';

  return {
    plugins: [
      react({
        // React-specific settings
        jsxRuntime: 'automatic',
        babel: {
          plugins: ['babel-plugin-macros']
        }
      })
    ],

    // Environment variables exposed to client
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'import.meta.env.MODE': JSON.stringify(mode),
      'import.meta.env.PROD': JSON.stringify(isProduction),
      'import.meta.env.DEV': JSON.stringify(!isProduction)
    },

    // Path aliases
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@assets': '/src/assets'
      }
    },

    // Development server config
    server: {
      port: 3000,
      open: true, // Auto-open browser
      proxy: env.VITE_API_URL ? {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      } : undefined
    },

    // Production build config
    build: {
      target: 'esnext',
      minify: isProduction ? 'terser' : false,
      sourcemap: true,
      chunkSizeWarningLimit: 1600,
      terserOptions: {
        compress: {
          drop_console: isProduction, // Remove console.log in production
          drop_debugger: true
        },
        format: {
          comments: false
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`
        }
      }
    },

    // Preview config (what runs after 'vite preview')
    preview: {
      port: 3000,
      strictPort: true
    }
  };
});