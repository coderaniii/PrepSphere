const user = localStorage.getItem("currentUser");

if (!user) {
  window.location.href = "index.html";
}

function openCourse(course) {
  if (course === "dsa") window.location.href = "dsa.html";
  if (course === "os") window.location.href = "os.html";
  if (course === "dbms") window.location.href = "dbms.html";
  if (course === "cn") window.location.href = "cn.html";
  if (course === "system") window.location.href = "system.html";
  if (course === "aiml") window.location.href = "aiml.html";
}