const express = require("express");
const path = require("path");
const mongoose = require("./db");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    mongo:
      mongoose.connection.readyState === 1
        ? "connected"
        : `state_${mongoose.connection.readyState}`,
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = Number.parseInt(process.env.PORT || "8080", 10);
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
