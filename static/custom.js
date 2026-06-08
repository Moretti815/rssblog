var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4d63ba711285f7c696d0505f5e30ba96";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

// 通知栏关闭功能
function closeNotice() {
  var noticeBar = document.getElementById("notice-bar");
  if (noticeBar) {
    noticeBar.classList.add("hidden");
  }
}

// 30秒后自动关闭通知栏
window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    closeNotice();
  }, 30000);
});

// 主题切换功能
function getPreferredTheme() {
  if (localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  var currentTheme = getPreferredTheme();
  var newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

document.addEventListener("DOMContentLoaded", function () {
  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  setTheme(getPreferredTheme());
});
