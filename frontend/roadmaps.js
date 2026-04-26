const user = localStorage.getItem("currentUser");

if (!user) {
  window.location.href = "index.html";
}

function openRoadmap(type) {
  window.location.href = "roadmap-detail.html?role=" + type;
}