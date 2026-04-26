document.getElementById("enterBtn").addEventListener("click", function () {
  window.location.href = "dashboard.html";
});

function goToLogin() {
  window.location.href = "login.html";
}




function goToSignup() {
  window.location.href = "signup.html";
}

function enterGuest() {
  localStorage.setItem("userMode", "guest");
  window.location.href = "dashboard.html";
}