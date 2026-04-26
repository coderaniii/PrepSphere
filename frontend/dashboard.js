

function navigate(page) {
  window.location.href = page;
}
const user = localStorage.getItem("currentUser");
if (user) {
  document.getElementById("welcomeUser").innerText = "Welcome, " + user;
}
function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userMode");
  window.location.href = "index.html";
}