import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import apiRouter from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS === "true";

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin === "http://127.0.0.1:3000"
      ) {
        return callback(null, true);
      }
      if (allowVercelPreviews) {
        try {
          const { hostname } = new URL(origin);
          if (hostname.endsWith(".vercel.app")) return callback(null, true);
        } catch {
          /* invalid origin */
        }
      }
      callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "1mb" }));

app.use("/api", apiRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Crafthouse Media API running on http://localhost:${PORT}`);
});
