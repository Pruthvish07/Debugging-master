import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const DB_FILE = path.join(process.cwd(), "leaderboard.json");

  // Endpoint to get leaderboard
  app.get("/api/leaderboard", (req, res) => {
    try {
      if (!fs.existsSync(DB_FILE)) {
        return res.json([]);
      }
      const data = fs.readFileSync(DB_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (e) {
      res.json([]);
    }
  });

  // Endpoint to submit score
  app.post("/api/leaderboard", (req, res) => {
    try {
      const { name, score, totalTime } = req.body;
      if (!name) return res.status(400).json({ error: "Missing name" });

      let current = [];
      if (fs.existsSync(DB_FILE)) {
        try {
          const data = fs.readFileSync(DB_FILE, "utf-8");
          current = JSON.parse(data);
        } catch {
          current = [];
        }
      }

      current.push({ name, score, totalTime: Number(totalTime), date: new Date().toISOString() });
      
      // Sort: highest score first, then lowest time
      current.sort((a: any, b: any) => b.score - a.score || a.totalTime - b.totalTime);
      
      const top10 = current.slice(0, 10);
      fs.writeFileSync(DB_FILE, JSON.stringify(top10));
      res.json(top10);
    } catch (e) {
      res.status(500).json({ error: "Failed to save score" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
