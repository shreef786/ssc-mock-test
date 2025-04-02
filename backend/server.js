require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});const express = require("express");
const vocabularyRoutes = require("./routes/vocabularyRoutes");

const app = express();
app.use(express.json());

app.use("/api/vocabulary", vocabularyRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));


db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL Database");
});

// Routes
app.get("/api/test", (req, res) => {
  res.send("Mock Test Backend Running Successfully");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
