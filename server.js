// ==========================
//  SERVER SETUP
// ==========================
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ==========================
//  CREATE UPLOADS FOLDER
// ==========================
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ==========================
//  MULTER SETUP
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ==========================
//  DATABASE CONNECTION
// ==========================
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Online123_news-channel",
  database: "campus_connect",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection error:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
  connection.release();
});


// ==========================
//  POSTS ENDPOINTS
// ==========================

// GET all posts
app.get('/api/posts', (req, res) => {
  db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});
app.use('/uploads', express.static('uploads'));


// CREATE a new post
app.post('/api/posts', upload.single('image'), (req, res) => {
  const { title, description, category } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !description || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO posts (title, description, category, image) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, description, category, image], (err) => {
    if (err) {
      console.error('Error inserting post:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Return JSON (no redirect)
    res.json({ success: true, message: 'Post created successfully' });
  });
});

// ==========================
//  STUDENT REGISTRATION
// ==========================
app.post("/register", (req, res) => {
  const { matric_no, fullname, email, password } = req.body;

  if (!matric_no || !fullname || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  const sql = "INSERT INTO students (matric_no, fullname, email, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [matric_no, fullname, email, password], (err, result) => {
    if (err) {
      console.error("Registration error:", err);
      return res.json({ success: false, message: "Matric number or email may already exist." });
    }
    return res.json({ success: true });
  });
});

// ==========================
//  LOGIN (STUDENTS & ADMINS)
// ==========================
app.post("/login", (req, res) => {
  const { role, username, password } = req.body;

  if (role === "admin") {
    const sql = "SELECT * FROM admins WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
      if (err) return res.json({ success: false, message: "Database error" });
      if (results.length > 0) return res.json({ success: true, role: "admin" });
      return res.json({ success: false, message: "Invalid admin credentials" });
    });
    return;
  }

  if (role === "student") {
    const sql = "SELECT * FROM students WHERE matric_no = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
      if (err) return res.json({ success: false, message: "Database error" });
      if (results.length > 0) return res.json({ success: true, role: "student" });
      return res.json({ success: false, message: "Invalid student credentials" });
    });
    return;
  }

  res.json({ success: false, message: "Invalid role" });
});

// ==========================
//  START SERVER
// ==========================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
