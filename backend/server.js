const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// ===== MongoDB Connect =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

// ===== User Schema =====
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  tracking: Array
});

const User = mongoose.model("User", userSchema);

// ===== Signup =====
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, msg: "User already exists" });
    }

    await User.create({ email, password, tracking: [] });

    res.json({ success: true });
  } catch (err) {
    console.log("❌ Signup Error:", err);
    res.status(500).json({ success: false });
  }
});

// ===== Login =====
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📥 Login request:", req.body);

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ success: false });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });

  } catch (err) {
    console.log("❌ Login Error:", err);
    res.status(500).json({ success: false });
  }
});

// ===== Middleware =====
function auth(req, res, next) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ success: false, msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: "Invalid token" });
  }
}

// ===== Save Tracking =====
app.post("/saveTracking", auth, async (req, res) => {
  try {
    const { tracking } = req.body;

    await User.updateOne(
      { email: req.user.email },
      { tracking }
    );

    res.json({ success: true });

  } catch (err) {
    console.log("❌ Save Tracking Error:", err);
    res.status(500).json({ success: false });
  }
});

// ===== Get Tracking =====
app.post("/getTracking", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    res.json({ tracking: user?.tracking || [] });

  } catch (err) {
    console.log("❌ Get Tracking Error:", err);
    res.status(500).json({ success: false });
  }
});

// ===== Server (FIXED FOR RENDER) =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});