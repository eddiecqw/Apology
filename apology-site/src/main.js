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
  // 先在中間生成一個主視窗
  createOSWindow("系統警告", "檢測到女友正在生氣，正在嘗試修復關係...", 50, 50, true);

  let popupCount = 0;
  
  // 每 150 毫秒生成一個新視窗
  const spamInterval = setInterval(() => {
    // 當彈窗數量達到 35 個時停止
    if (popupCount > 35) {
      clearInterval(spamInterval);
      
      // 停止後等 1.5 秒，彈出最終確認框 (覆蓋全螢幕中心)
      setTimeout(() => {
        finalQuestion.classList.remove('hidden');
      }, 1500);
      return;
    }

    // 隨機文字與隨機座標
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    // 讓視窗不會超出螢幕邊緣 (預留 300px 寬度)
    const maxLeft = window.innerWidth - 300; 
    const maxTop = window.innerHeight - 150;
    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;

    createOSWindow("求原諒通知", randomMsg, randomLeft, randomTop, false);
    popupCount++;
  }, 150); 
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