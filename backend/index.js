const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();

const SECRET = "super_secret_key";
const db = new sqlite3.Database("./cocktails.db");

app.use(cors());
app.use(express.json());

// Create tables if not exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT DEFAULT 'user'
)`);

db.run(`CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  authorId INTEGER,
  FOREIGN KEY(authorId) REFERENCES users(id)
)`);

// Middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token manquant" });
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide" });
    req.user = user;
    next();
  });
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Accès refusé : admin uniquement" });
  }
  next();
}

// Auth routes
app.post("/api/register", async (req, res) => {
  const { email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, hashed, role || "user"], function (err) {
    if (err) return res.status(400).json({ error: "Email déjà utilisé" });
    res.json({ success: true });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) return res.status(400).json({ error: "Utilisateur introuvable" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Mot de passe incorrect" });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: "2h" });
    res.json({ token });
  });
});

// Recipes API
app.get("/api/recipes", (req, res) => {
  db.all("SELECT * FROM recipes", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/api/recipes", auth, (req, res) => {
  const { title, description } = req.body;
  db.run(
    "INSERT INTO recipes (title, description, authorId) VALUES (?, ?, ?)",
    [title, description, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: "Erreur ajout recette" });
      res.json({ id: this.lastID, title, description });
    }
  );
});

app.delete("/api/recipes/:id", auth, isAdmin, (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM recipes WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: "Erreur suppression" });
    res.json({ success: true });
  });
});

app.listen(3001, () => console.log("Backend sur http://localhost:3001"));
