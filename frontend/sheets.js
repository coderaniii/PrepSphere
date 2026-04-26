const user = localStorage.getItem("currentUser");

if (!user) {
  window.location.href = "index.html";
}

function openSheet(type) {
  if (type === "striver") {
    window.open("https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", "_blank");
  }

  if (type === "neetcode") {
    window.open("https://neetcode.io/practice", "_blank");
  }

  if (type === "blind") {
    window.open("https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions", "_blank");
  }

  if (type === "babbar") {
    if (type === "babbar") {
  window.open("https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/", "_blank");
}
  }
}