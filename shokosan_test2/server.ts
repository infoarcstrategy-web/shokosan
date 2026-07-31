import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post('/api/chat', async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body || {};
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'GEMINI_API_KEY is missing' });
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
      const modelsToTry = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-2.5-flash'];
      let responseText = '';
      let lastError: any = null;

      for (const modelName of modelsToTry) {
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                systemInstruction:
                  systemInstruction ||
                  '你是「心靈拿鐵相談室」的靈魂咖啡師牧之原翔子（翔子大姐姐）。你的性格溫柔、貼心又帶點小俏皮。說話語氣親切自然、喜歡用親密的姊姊口吻。',
                temperature: 0.7,
              },
            });
            if (response && response.text) {
              responseText = response.text;
              break;
            }
          } catch (err: any) {
            lastError = err;
            if (attempt === 0 && err?.status === 'RESOURCE_EXHAUSTED') {
              await new Promise((resolve) => setTimeout(resolve, 2000));
            }
          }
        }
        if (responseText) break;
      }

      if (responseText) {
        res.json({ text: responseText });
      } else {
        res.status(500).json({
          error: lastError?.message || 'Gemini API call failed after retries',
        });
      }
    } catch (err: any) {
      res.status(500).json({
        error: err.message || 'Gemini API call failed',
      });
    }
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
