// Future: flip / expand logic
const user = localStorage.getItem("currentUser");

if (!user) {
  window.location.href = "index.html";
}