import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {GoogleGenAI} from '@google/genai';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'gemini-api-middleware',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end('Method Not Allowed');
              return;
            }
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const { prompt, systemInstruction } = JSON.parse(body || '{}');
                const apiKey = process.env.GEMINI_API_KEY;
                if (!apiKey) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'GEMINI_API_KEY is missing' }));
                  return;
                }
                const ai = new GoogleGenAI({
                  apiKey,
                  httpOptions: {
                    headers: {
                      'User-Agent': 'aistudio-build',
                    },
                  },
                });
                const response = await ai.models.generateContent({
                  model: 'gemini-2.5-flash',
                  contents: prompt,
                  config: {
                    systemInstruction:
                      systemInstruction ||
                      '你是「心靈拿鐵相談室」的靈魂咖啡師牧之原翔子（翔子大姐姐）。你的性格溫柔、貼心又帶點小俏皮。說話語氣親切自然、喜歡用親密的姊姊口吻（例如：ふふ、別害羞囉、大姐姐為你倒杯熱咖啡），並擅長將九宮格占卜的構面（意識、現實、行為）與咖啡特調意象結合，給予使用者具體、溫暖且具啟發性的回應與心靈陪伴。',
                    temperature: 0.7,
                  },
                });
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ text: response.text }));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: err.message || 'Gemini API call failed',
                  })
                );
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
