var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4d63ba711285f7c696d0505f5e30ba96";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

// 通知栏关闭功能
function closeNotice() {
  var noticeBar = document.getElementById('notice-bar');
  if (noticeBar) {
    noticeBar.classList.add('hidden');
  }
}

// 30秒后自动关闭通知栏
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    closeNotice();
  }, 30000);
  initTheme();
});

// 主题切换功能
function initTheme() {
  var savedTheme = localStorage.getItem('rssblog-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleTheme() {
  var currentTheme = document.documentElement.getAttribute('data-theme');
  var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('rssblog-theme', newTheme);
}
