const express = require("express");
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 3000;
const dbDir = path.join(__dirname, "db");
const dbPath = path.join(dbDir, "contacts.db");

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Unable to open database:", err);
    process.exit(1);
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Unable to create contacts table:", err);
      process.exit(1);
    }
  },
);

app.use(express.json());
app.use(express.static(path.join(__dirname, ".")));

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const submittedAt = new Date().toISOString();
  const query = `INSERT INTO contacts (name, email, message, submitted_at) VALUES (?, ?, ?, ?)`;

  db.run(query, [name, email, message, submittedAt], function (err) {
    if (err) {
      console.error("Database insert failed:", err);
      return res.status(500).json({ success: false, error: "Failed to save the message." });
    }

    return res.json({ success: true, id: this.lastID });
  });
});

app.listen(port, () => {
  console.log(`Portfolio backend running on http://localhost:${port}`);
});
