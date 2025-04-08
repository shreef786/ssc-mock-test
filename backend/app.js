const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const mockTestRoutes = require("./routes/mockTestRoutes");
const editorialRoutes = require("./routes/editorialRoutes");
const vocabularyRoutes = require("./routes/vocabularyRoutes");
const typingRoutes = require("./routes/typingRoutes");
const grammarRoutes = require("./routes/grammarRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/mock-tests", mockTestRoutes);
app.use("/api/editorial", editorialRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/typing", typingRoutes);
app.use("/api/grammar", grammarRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("SSC Mock Test Backend API is running.");
});

module.exports = app;
