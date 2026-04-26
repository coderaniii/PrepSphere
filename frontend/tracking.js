document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");

  if (!user || !token) {
    window.location.href = "index.html";
    return;
  }

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
        body: JSON.stringify({ token, tracking })
      });

      const data = await res.json();
      console.log("SAVE:", data);

      if (data.success) {
        alert("Progress saved!");
      } else {
        alert("Save failed");
      }

    } catch (err) {
      console.error(err);
    }
  }

  async function loadTracking() {
    try {
      const res = await fetch("https://prepsphere-0p2v.onrender.com/getTracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });

      const data = await res.json();
      console.log("LOAD:", data);

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

  const btn = document.getElementById("saveBtn");
  if (btn) {
    btn.addEventListener("click", saveTracking);
  }
});