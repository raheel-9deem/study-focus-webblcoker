let timerInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  loadBlockedWebsites();
  updateFocusState();

  document.getElementById('startBtn').addEventListener('click', startFocus);
  document.getElementById('stopBtn').addEventListener('click', stopFocus);
  document.getElementById('addBtn').addEventListener('click', addWebsite);
  document.getElementById('websiteInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addWebsite();
  });

  setInterval(updateFocusState, 1000);
});

function startFocus() {
  const durationInput = document.getElementById('durationInput');
  const duration = parseInt(durationInput.value);

  if (!duration || duration < 5) {
    alert('Please enter a duration of at least 5 minutes.');
    return;
  }

  chrome.runtime.sendMessage(
    { type: 'START_FOCUS', duration: duration },
    () => {
      updateFocusState();
    }
  );
}

function stopFocus() {
  if (confirm('Are you sure you want to stop the focus session?')) {
    chrome.runtime.sendMessage({ type: 'STOP_FOCUS' }, () => {
      updateFocusState();
    });
  }
}

function updateFocusState() {
  chrome.runtime.sendMessage({ type: 'GET_FOCUS_STATE' }, (response) => {
    const { focusState } = response;
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    const timer = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const durationInput = document.getElementById('durationInput');

    if (focusState.isActive && focusState.endTime) {
      const remaining = Math.max(0, focusState.endTime - Date.now());
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      statusIndicator.classList.add('active');
      statusText.textContent = 'Focused';
      timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      startBtn.disabled = true;
      stopBtn.disabled = false;
      durationInput.disabled = true;

      if (remaining === 0) {
        stopFocus();
      }
    } else {
      statusIndicator.classList.remove('active');
      statusText.textContent = 'Idle';
      timer.textContent = '00:00';

      startBtn.disabled = false;
      stopBtn.disabled = true;
      durationInput.disabled = false;
    }
  });
}

function loadBlockedWebsites() {
  chrome.storage.local.get(['blockedWebsites'], (result) => {
    const websites = result.blockedWebsites || [];
    displayWebsites(websites);
  });
}

function displayWebsites(websites) {
  const list = document.getElementById('websiteList');
  list.innerHTML = '';

  if (websites.length === 0) {
    list.innerHTML = '<div class="empty-state">No blocked websites yet. Add one above!</div>';
    return;
  }

  websites.forEach(website => {
    const li = document.createElement('li');
    li.className = 'website-item';
    li.innerHTML = `
      <span class="website-name">${website}</span>
      <button class="remove-btn" data-website="${website}">×</button>
    `;

    li.querySelector('.remove-btn').addEventListener('click', () => {
      removeWebsite(website);
    });

    list.appendChild(li);
  });
}

function addWebsite() {
  const input = document.getElementById('websiteInput');
  let website = input.value.trim().toLowerCase();

  if (!website) return;

  website = website.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');

  if (!website.includes('.')) {
    alert('Please enter a valid website (e.g., facebook.com)');
    return;
  }

  chrome.storage.local.get(['blockedWebsites'], (result) => {
    const websites = result.blockedWebsites || [];

    if (websites.includes(website)) {
      alert('This website is already in the blocked list.');
      return;
    }

    websites.push(website);
    chrome.storage.local.set({ blockedWebsites: websites }, () => {
      displayWebsites(websites);
      input.value = '';
    });
  });
}

function removeWebsite(website) {
  chrome.storage.local.get(['blockedWebsites'], (result) => {
    const websites = result.blockedWebsites || [];
    const filtered = websites.filter(w => w !== website);

    chrome.storage.local.set({ blockedWebsites: filtered }, () => {
      displayWebsites(filtered);
    });
  });
}
