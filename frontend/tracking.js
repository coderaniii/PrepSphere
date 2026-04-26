// 🔐 Get token
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// ===== SAVE =====
async function saveTracking() {
  console.log("🚀 Button clicked");

  const inputs = document.querySelectorAll("input");
  const tracking = [];

  inputs.forEach(input => {
    tracking.push(input.type === "checkbox" ? input.checked : input.value);
  });

  console.log("📤 Sending:", { tracking });

  try {
    const res = await fetch("https://prepsphere-0p2v.onrender.com/saveTracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token,
        tracking: tracking
      })
    });

    const data = await res.json();
    console.log("✅ Response:", data);

    if (data.success) {
      alert("Progress saved successfully!");
    } else {
      alert("Error saving progress");
    }

  } catch (err) {
    console.error("❌ Fetch error:", err);
  }
}

// ===== LOAD =====
async function loadTracking() {
  if (!token) return;

  try {
    const res = await fetch("https://prepsphere-0p2v.onrender.com/getTracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });

    const data = await res.json();
    console.log("📥 Loaded:", data);

    if (data.tracking) {
      const inputs = document.querySelectorAll("input");

      inputs.forEach((input, i) => {
        const val = data.tracking[i];

        if (val !== undefined) {
          if (input.type === "checkbox") input.checked = val;
          else input.value = val;
        }
      });
    }

  } catch (err) {
    console.error("❌ Load error:", err);
  }
}

// ===== INIT =====
loadTracking();

// ===== BUTTON =====
document.getElementById("saveBtn").addEventListener("click", saveTracking);