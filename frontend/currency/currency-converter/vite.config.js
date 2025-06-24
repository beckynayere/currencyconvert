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

// woked in deployment 
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
//       minify: 'terser',
//       terserOptions: {
//         compress: {
//           defaults: true,
//           drop_console: command === 'build' // Remove console logs in production
//         },
//         format: {
//           comments: false 
//         }
//       },
//       sourcemap: true,
//       rollupOptions: {
//         output: {
//           manualChunks: undefined
//         }
//       }
//     }
//   };
// });



// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ command, mode }) => {

//   const env = loadEnv(mode, '', ['VITE_']);
  
 
//   const apiUrl = env.VITE_API_URL || 'https://currencyconvert-brwe.onrender.com';

  
//   return {
//     plugins: [react()],
    
   
//     define: {
//       'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl), 
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
//       proxy: {
//         '/api': {
//           target: apiUrl, 
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//           secure: false 
//         }
//       }
//     },
    
//     // 7. Production build settings
//     build: {
//       target: 'esnext',
//       minify: 'terser',
//       terserOptions: {
//         compress: {
//           drop_console: true, 
//           pure_funcs: ['console.debug', 'console.warn'] 
//         },
//         format: {
//           comments: false
//         }
//       },
//       sourcemap: true,
//       rollupOptions: {
//         output: {
//           manualChunks: undefined,
//           entryFileNames: 'assets/[name].[hash].js',
//           assetFileNames: 'assets/[name].[hash][extname]'
//         }
//       }
//     }
//   };
// });


// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ mode }) => {  // Removed unused 'command' parameter
//   // Safely load environment variables without process.cwd()
//   const env = loadEnv(mode, '', ['VITE_']);
  
//   // Use production API URL in all environments
//   const apiUrl = env.VITE_API_URL || 'https://currencyconvert-brwe.onrender.com';

//   return {
//     plugins: [react()],
//     define: {
//       'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
//       'import.meta.env.MODE': JSON.stringify(mode)
//     },
//     server: {
//       proxy: {
//         '/api': {
//           target: apiUrl,
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//           secure: false
//         }
//       }
//     },
//     build: {
//       target: 'esnext',
//       minify: 'terser',
//       terserOptions: {
//         compress: {
//           drop_console: true
//         }
//       }
//     }
//   };
// });


import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {  // Removed unused 'command' parameter
  // Safely load environment variables without process.cwd()
  const env = loadEnv(mode, '', ['VITE_']);
  
  // Use production API URL in all environments
  const apiUrl = env.VITE_API_URL || 'https://currencyconvert-brwe.onrender.com';

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
      'import.meta.env.MODE': JSON.stringify(mode)
    },
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false
        }
      }
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  };
});