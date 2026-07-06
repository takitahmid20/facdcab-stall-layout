import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'sslcommerz-callback-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.method === 'POST' &&
            req.url.startsWith('/api/callback')
          ) {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk.toString();
            });
            req.on('end', () => {
              const params = new URLSearchParams(body);
              const url = new URL(req.url, `http://${req.headers.host}`);
              const status = url.searchParams.get('status') || 'success';
              
              // Redirect back to our client-side dev server using a GET request
              const redirectUrl = `/?payment_status=${status}&tran_id=${params.get('tran_id') || ''}&amount=${params.get('amount') || ''}&bank_tran_id=${params.get('bank_tran_id') || ''}`;
              
              res.writeHead(302, { Location: redirectUrl });
              res.end();
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    historyApiFallback: true,
    proxy: {
      '/api/initiate': {
        target: 'https://sandbox.sslcommerz.com',
        changeOrigin: true,
        rewrite: (path) => '/gwprocess/v4/api.php',
        secure: false,
      }
    }
  }
})
