const user = localStorage.getItem("currentUser");
const token = localStorage.getItem("token");

if (!user || !token) {
  window.location.href = "index.html";
}

// SAVE FUNCTION
async function saveTracking() {
  console.log("🚀 Button clicked");

  const inputs = document.querySelectorAll("input");
  const tracking = [];

  inputs.forEach(input => {
    tracking.push(input.type === "checkbox" ? input.checked : input.value);
  });

  try {
    const res = await fetch("https://prepsphere-0p2v.onrender.com/saveTracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,            // ✅ VERY IMPORTANT
        tracking
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Progress saved!");
    } else {
      alert("Save failed");
    }

  } catch (err) {
    console.error(err);
  }
}

// LOAD FUNCTION
async function loadTracking() {
  try {
    const res = await fetch("https://prepsphere-0p2v.onrender.com/getTracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token   // ✅ VERY IMPORTANT
      })
    });

    const data = await res.json();

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
    console.error(err);
  }
}

loadTracking();

document.getElementById("saveBtn").addEventListener("click", saveTracking);