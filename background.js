let focusState = {
  isActive: false,
  endTime: null,
  duration: 0
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    blockedWebsites: ['facebook.com', 'youtube.com', 'instagram.com', 'twitter.com', 'reddit.com'],
    focusState: focusState
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'START_FOCUS') {
    startFocusSession(message.duration);
    sendResponse({ success: true });
  } else if (message.type === 'STOP_FOCUS') {
    stopFocusSession();
    sendResponse({ success: true });
  } else if (message.type === 'GET_FOCUS_STATE') {
    sendResponse({ focusState });
  } else if (message.type === 'CHECK_BLOCKED') {
    chrome.storage.local.get(['blockedWebsites'], (result) => {
      const blockedSites = result.blockedWebsites || [];
      const isBlocked = blockedSites.some(site => {
        const hostname = message.hostname.toLowerCase();
        const blockedSite = site.toLowerCase();
        return hostname === blockedSite || hostname.endsWith('.' + blockedSite);
      });
      sendResponse({ isBlocked, isActive: focusState.isActive });
    });
    return true;
  }
  return true;
});

function startFocusSession(durationMinutes) {
  const duration = durationMinutes * 60 * 1000;
  const endTime = Date.now() + duration;

  focusState = {
    isActive: true,
    endTime: endTime,
    duration: duration
  };

  chrome.storage.local.set({ focusState });

  chrome.alarms.create('focusTimer', {
    when: endTime
  });

  chrome.alarms.create('focusUpdate', {
    periodInMinutes: 1 / 60
  });

  notifyContentScripts({ type: 'FOCUS_STARTED' });
}

function stopFocusSession() {
  focusState = {
    isActive: false,
    endTime: null,
    duration: 0
  };

  chrome.storage.local.set({ focusState });
  chrome.alarms.clear('focusTimer');
  chrome.alarms.clear('focusUpdate');

  notifyContentScripts({ type: 'FOCUS_STOPPED' });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'focusTimer') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: 'Study Focus',
      message: 'Focus session completed! Great job.',
      priority: 2
    });

    stopFocusSession();
  } else if (alarm.name === 'focusUpdate') {
    if (focusState.isActive && Date.now() >= focusState.endTime) {
      chrome.alarms.clear('focusUpdate');
    }
  }
});

function notifyContentScripts(message) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, message).catch(() => {});
    });
  });
}

chrome.storage.local.get(['focusState'], (result) => {
  if (result.focusState) {
    focusState = result.focusState;

    if (focusState.isActive && focusState.endTime) {
      if (Date.now() >= focusState.endTime) {
        stopFocusSession();
      } else {
        chrome.alarms.create('focusTimer', {
          when: focusState.endTime
        });
        chrome.alarms.create('focusUpdate', {
          periodInMinutes: 1 / 60
        });
      }
    }
  }
});
