require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

// CORS: allow your React frontend origin
// Paste your allowed origin(s) in `server/.env` via CLIENT_ORIGIN
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;

async function start() {
  await connectDb(process.env.MONGODB_URI);
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});

