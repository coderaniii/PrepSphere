const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// ===== MongoDB Connect =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ===== User Schema =====
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  tracking: Array
});

const User = mongoose.model("User", userSchema);

// ===== Signup =====
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.json({ success: false });

  await User.create({ email, password, tracking: [] });

  res.json({ success: true });
});

// ===== Login =====
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) return res.json({ success: false });

  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  res.json({ success: true, token });
});

// ===== Middleware =====
function auth(req, res, next) {
  const { token } = req.body;

  if (!token) return res.status(401).json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false });
  }
}

// ===== Save Tracking =====
app.post("/saveTracking", auth, async (req, res) => {
  const { tracking } = req.body;

  await User.updateOne(
    { email: req.user.email },
    { tracking }
  );

  res.json({ success: true });
});

// ===== Get Tracking =====
app.post("/getTracking", auth, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  res.json({ tracking: user.tracking || [] });
});

// ===== Server =====
app.listen(5000, () => console.log("Server running"));