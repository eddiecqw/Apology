import confetti from 'canvas-confetti';

// 取得頁面與元素
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const startBtn = document.getElementById('startBtn');
const windowContainer = document.getElementById('window-container');
const finalQuestion = document.getElementById('finalQuestion');

const btnYes = document.getElementById('btnYes');
const btnReluctant = document.getElementById('btnReluctant');

// 道歉語錄字典
const messages = [
  "我真的錯了！", "拜託原諒我🥺", "再也不敢惹寶寶生氣了", 
  "我跪主機板", "寶寶最漂亮了", "理理我嘛...", "我是一隻大笨豬", 
  "給個機會好不好", "帶妳去吃好吃的"
];

// 【第一步】點擊 Start 絲滑切換頁面
startBtn.addEventListener('click', () => {
  // 第一頁往上滑出
  page1.classList.remove('active');
  page1.classList.add('prev-page');
  
  // 第二頁從下方滑入
  page2.classList.remove('next-page');
  page2.classList.add('active');

  // 等待過場動畫(0.8s)結束後，開始彈窗地獄
  setTimeout(startWindowSpam, 800);
});

// 【第二步】生成彈窗
function startWindowSpam() {
  // 1. 手動建立帶有「加載進度條」的主視窗
  const mainWindow = document.createElement('div');
  mainWindow.className = 'os-window';
  mainWindow.style.left = '50%';
  mainWindow.style.top = '50%';
  mainWindow.style.transform = 'translate(-50%, -50%)';
  
  mainWindow.innerHTML = `
    <div class="os-header">
      <span>⚠️ 系統修復程式.exe</span>
      <span style="cursor:pointer">✕</span>
    </div>
    <div class="os-body">
      <p id="statusText">檢測到女友正在生氣，正在嘗試修復關係...</p>
      <div class="progress-container">
        <div class="progress-bar" id="repairProgress"></div>
      </div>
    </div>
  `;
  windowContainer.appendChild(mainWindow);

  // 2. 啟動 2 秒鐘的加載動畫 
  // (用 setTimeout 延遲 50ms 是為了確保畫面渲染後再觸發 CSS 的 transition 動畫)
  setTimeout(() => {
    document.getElementById('repairProgress').style.width = '100%';
  }, 50);

  // 3. 等待 2 秒鐘 (加載結束後)
  setTimeout(() => {
    // 戲劇效果：進度條跑完後，顯示修復失敗！
    document.getElementById('statusText').innerText = "❌ 警告！修復失敗！系統即將崩潰！";
    document.getElementById('statusText').style.color = "#ff4757";
    document.getElementById('statusText').style.fontWeight = "bold";
    document.getElementById('repairProgress').style.background = "#ff4757"; // 進度條變紅色

    // 停頓 0.8 秒讓她看清楚字，然後開始瘋狂彈窗地獄
    setTimeout(() => {
      let popupCount = 0;
      
      const spamInterval = setInterval(() => {
        if (popupCount > 35) {
          clearInterval(spamInterval);
          // 滿屏彈窗結束後，顯示最終選擇題
          setTimeout(() => {
            finalQuestion.classList.remove('hidden');
          }, 1500);
          return;
        }

        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        const maxLeft = window.innerWidth - 300; 
        const maxTop = window.innerHeight - 150;
        const randomLeft = Math.random() * maxLeft;
        const randomTop = Math.random() * maxTop;

        createOSWindow("求原諒通知", randomMsg, randomLeft, randomTop, false);
        popupCount++;
      }, 150);
    }, 800);

  }, 2050); // 2050 毫秒 = 2秒動畫 + 50ms緩衝
}

// 建立虛擬 Windows 視窗的共用函數
function createOSWindow(title, text, left, top, isCenter) {
  const win = document.createElement('div');
  win.className = 'os-window';
  
  if (isCenter) {
    win.style.left = '50%';
    win.style.top = '50%';
    win.style.transform = 'translate(-50%, -50%)'; // 第一個視窗置中
  } else {
    win.style.left = left + 'px';
    win.style.top = top + 'px';
  }

  win.innerHTML = `
    <div class="os-header">
      <span>${title}</span>
      <span style="cursor:pointer">✕</span>
    </div>
    <div class="os-body">${text}</div>
  `;
  windowContainer.appendChild(win);
}

// 【第三步】大結局切換與撒花
function goToFinale(isReluctant) {
  // 第二頁往上滑出
  page2.classList.remove('active');
  page2.classList.add('prev-page');
  
  // 第三頁滑入
  page3.classList.remove('next-page');
  page3.classList.add('active');

  if (isReluctant) {
    setTimeout(() => alert("雖然很不情願，但我就當妳原諒我啦！嘿嘿！"), 500);
  }

  // 延遲一點點發射撒花，讓過場動畫跑完
  setTimeout(fireConfetti, 800);
}

function fireConfetti() {
  const duration = 4 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ffb8b8', '#ff6b81'] });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ffb8b8', '#ff6b81'] });
    if (Date.now() < end) requestAnimationFrame(frame);
  }());
}

// 綁定最終選擇按鈕
btnYes.addEventListener('click', () => goToFinale(false));
btnReluctant.addEventListener('click', () => goToFinale(true));