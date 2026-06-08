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
  }, 30000); // 30秒 = 30000毫秒
  
  // 初始化主题
  initTheme();
});

// 主题切换功能
function toggleTheme() {
  var body = document.body;
  
  if (body.classList.contains("dark-mode")) {
    // 切换到浅色模式
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  } else {
    // 切换到深色模式
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  }
}

// 初始化主题
function initTheme() {
  var savedTheme = localStorage.getItem("theme");
  var body = document.body;
  
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
  } else if (savedTheme === "light") {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
  } else {
    // 跟随系统设置
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      body.classList.add("dark-mode");
    }
  }
}
