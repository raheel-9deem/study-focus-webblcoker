let isBlocked = false;
let isFocusActive = false;

function checkAndBlockSite() {
  const hostname = window.location.hostname;

  chrome.runtime.sendMessage(
    { type: 'CHECK_BLOCKED', hostname: hostname },
    (response) => {
      if (response && response.isBlocked && response.isActive) {
        blockPage();
      }
    }
  );
}

function blockPage() {
  if (isBlocked) return;
  isBlocked = true;

  document.documentElement.innerHTML = '';

  const style = document.createElement('style');
  style.textContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }

    .block-container {
      text-align: center;
      color: white;
      padding: 40px;
      max-width: 600px;
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .lock-icon {
      font-size: 80px;
      margin-bottom: 30px;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 20px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    p {
      font-size: 20px;
      line-height: 1.6;
      margin-bottom: 15px;
      opacity: 0.9;
    }

    .cta {
      font-size: 22px;
      font-weight: 600;
      margin-top: 30px;
      color: #22c55e;
      text-shadow: 0 2px 10px rgba(34, 197, 94, 0.3);
    }

    .glow {
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: glow 3s ease-in-out infinite;
    }

    @keyframes glow {
      0%, 100% {
        transform: scale(1);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.8;
      }
    }
  `;

  document.head.appendChild(style);

  const container = document.createElement('div');
  container.className = 'block-container';
  container.innerHTML = `
    <div class="glow"></div>
    <div class="lock-icon">🔒</div>
    <h1>Stay Focused</h1>
    <p>This website is blocked during your focus session.</p>
    <p>Go back and complete your study goal.</p>
    <div class="cta">You've got this! 💪</div>
  `;

  document.body.appendChild(container);

  document.title = '🔒 Site Blocked - Study Focus';
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'FOCUS_STARTED') {
    isFocusActive = true;
    checkAndBlockSite();
  } else if (message.type === 'FOCUS_STOPPED') {
    isFocusActive = false;
    isBlocked = false;
  }
});

checkAndBlockSite();
