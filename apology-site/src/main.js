import confetti from 'canvas-confetti';

const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const startBtn = document.getElementById('startBtn');
const windowContainer = document.getElementById('window-container');
const finalQuestion = document.getElementById('finalQuestion');

const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo'); // 獲取「否」按鈕

// 語錄替換為老婆
const messages = [
  "我真的錯了！", "拜託原諒我🥺", "再也不敢惹老婆生氣了", 
  "我跪主機板", "老婆最漂亮了", "理理我嘛...", "我是一隻大笨豬", 
  "給個機會好不好", "帶妳去吃好吃的","我是超級無敵霹靂大傻瓜","我是大混蛋","我和老婆天下第一好"
];

startBtn.addEventListener('click', () => {
  page1.classList.remove('active');
  page1.classList.add('prev-page');
  page2.classList.remove('next-page');
  page2.classList.add('active');
  setTimeout(startWindowSpam, 800);
});

function startWindowSpam() {
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
      <p id="statusText">檢測到老婆正在生氣，正在嘗試修復關係...</p>
      <div class="progress-container">
        <div class="progress-bar" id="repairProgress"></div>
      </div>
    </div>
  `;
  windowContainer.appendChild(mainWindow);

  setTimeout(() => {
    document.getElementById('repairProgress').style.width = '100%';
  }, 50);

  setTimeout(() => {
    document.getElementById('statusText').innerText = "❌ 警告！修復失敗！系統即將崩潰！";
    document.getElementById('statusText').style.color = "#ff4757";
    document.getElementById('statusText').style.fontWeight = "bold";
    document.getElementById('repairProgress').style.background = "#ff4757"; 

    setTimeout(() => {
      let popupCount = 0;
      const spamInterval = setInterval(() => {
        if (popupCount > 35) {
          clearInterval(spamInterval);
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

        createOSWindow("求原諒通知", randomMsg, randomLeft, randomTop);
        popupCount++;
      }, 150);
    }, 800);

  }, 2050);
}

// 修改了 createOSWindow 函數，加入 z-index 確保新彈窗在最上層
function createOSWindow(title, text, left, top, isCenter = false, zIndex = 1) {
  const win = document.createElement('div');
  win.className = 'os-window';
  win.style.zIndex = zIndex; 
  
  if (isCenter) {
    win.style.left = '50%';
    win.style.top = '50%';
    // 加一點點隨機偏移，這樣如果彈出多個置中視窗，才會看起來有堆疊感
    const offsetX = Math.random() * 40 - 20; 
    const offsetY = Math.random() * 40 - 20;
    win.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
  } else {
    win.style.left = left + 'px';
    win.style.top = top + 'px';
  }

  // 給右上角的 ✕ 加上點擊關閉功能
  win.innerHTML = `
    <div class="os-header">
      <span>${title}</span>
      <span style="cursor:pointer" onclick="this.parentElement.parentElement.remove()">✕</span>
    </div>
    <div class="os-body">${text}</div>
  `;
  windowContainer.appendChild(win);
}

function goToFinale(isReluctant) {
  page2.classList.remove('active');
  page2.classList.add('prev-page');
  page3.classList.remove('next-page');
  page3.classList.add('active');

  if (isReluctant) {
    setTimeout(() => alert("雖然很不情願，但我就當老婆原諒我啦！嘿嘿！"), 500);
  }

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

// ======================================
// 【核心修改】「否」按鈕的強迫機制
// ======================================
let noClickCount = 0;
let highestZIndex = 10000; // 確保攔截視窗顯示在所有東西的最上層

btnYes.addEventListener('click', () => goToFinale(false));

btnNo.addEventListener('click', () => {
  noClickCount++;
  highestZIndex++;
  
  if (noClickCount === 1) {
    createOSWindow("系統攔截", "❌ 拒絕無效！請老婆再好好想想！😭", 0, 0, true, highestZIndex);
  } 
  else if (noClickCount === 2) {
    createOSWindow("嚴重警告", "⚠️ 檢測到老婆心太軟，『否』選項即將受損！", 0, 0, true, highestZIndex);
  } 
  else if (noClickCount === 3) {
    // 點擊第三次時，按鈕文字變身！
    createOSWindow("系統更新", "🔄 由於老婆過於善良，『否』按鈕已被系統強制替換！", 0, 0, true, highestZIndex);
    btnNo.innerText = "是，但是很不情願 😒";
    btnNo.classList.remove('shaky-btn'); // 停止發抖
  } 
  else if (noClickCount >= 4) {
    // 點擊第四次（這時按鈕已經是「很不情願」了），進入大結局
    goToFinale(true);
  }
});