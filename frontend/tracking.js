// Get logged-in user
const user = localStorage.getItem("currentUser");

if (!user) {
  window.location.href = "index.html";
}

const user = localStorage.getItem("currentUser");

// SAVE FUNCTION (button click)
async function saveTracking() {
  console.log("🚀 Button clicked");

  if (!user) {
    alert("Please login first");
    console.log("❌ No user found");
    return;
  }

  const inputs = document.querySelectorAll("input");
  const tracking = [];

  inputs.forEach(input => {
    tracking.push(input.type === "checkbox" ? input.checked : input.value);
  });

  console.log("📤 Sending:", { email: user, tracking });

  try {
    const res = await fetch("http://127.0.0.1:5000/saveTracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user,
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


// LOAD FUNCTION (when page opens)
async function loadTracking() {
  if (!user) return;

  try {
    const res = await fetch("https://prepsphere-0p2v.onrender.com/getTracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: user })
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

loadTracking();

document.getElementById("saveBtn").addEventListener("click", saveTracking);