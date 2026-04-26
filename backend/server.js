console.log("🚀 SERVER FILE LOADED");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "users.json";

// Read users
function getUsers() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

// SIGNUP
app.post("/signup", (req, res) => {
  const users = getUsers();
  const { email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.json({ success: false });
  }

  users.push({ email, password });
  saveUsers(users);

  res.json({ success: true });
});

// LOGIN
app.post("/login", (req, res) => {
  const users = getUsers();
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// SAVE TRACKING
app.post("/saveTracking", (req, res) => {
  console.log("🔥 SAVE HIT", req.body);

  const users = getUsers();
  const { email, tracking } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.json({ success: false });
  }

  user.tracking = tracking;
  saveUsers(users);

  res.json({ success: true });
});

// GET TRACKING (THIS WAS MISSING / NOT ACTIVE)
app.post("/getTracking", (req, res) => {
  console.log("📥 GET HIT", req.body);

  const users = getUsers();
  const { email } = req.body;

  const user = users.find(u => u.email === email);

  if (!user || !user.tracking) {
    return res.json({ success: true, tracking: [] });
  }

  res.json({ success: true, tracking: user.tracking });
});

// START SERVER
app.listen(5000, () => console.log("Server running on port 5000"));