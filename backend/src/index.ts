import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import apiRouter from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: [CORS_ORIGIN, "http://127.0.0.1:3000"],
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
