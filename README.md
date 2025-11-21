# Study Focus – Distraction Blocker

A powerful, modern Chrome Extension that helps users eliminate distractions and increase productivity during study or work sessions.

## Features

### 🎯 Focus Timer
- Custom duration input (minimum 5 minutes)
- Real-time countdown display
- Background operation (continues when popup is closed)
- Desktop notifications when session completes
- Start/Stop controls with confirmation

### 🔒 Website Blocking System
- Block distracting websites during focus sessions
- Pre-loaded with common distractions (Facebook, YouTube, Instagram, Twitter, Reddit)
- Add custom websites to block list
- Beautiful full-screen block page with motivational message
- Instant blocking when focus mode is active

### 💎 Professional UI
- Clean, modern design
- Deep Blue (#1e3a8a) primary color
- Soft Green (#22c55e) accents
- Real-time status indicators
- Smooth animations and transitions

## Installation Instructions

### Step 1: Locate the Extension Files
All extension files are in the `chrome-extension` folder:
```
chrome-extension/
├── manifest.json
├── background.js
├── contentScript.js
├── popup.html
├── popup.css
├── popup.js
├── README.md
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Step 2: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or click the three-dot menu → "More tools" → "Extensions"

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to and select the `chrome-extension` folder
   - Click "Select Folder"

4. **Verify Installation**
   - The extension should now appear in your extensions list
   - You'll see "Study Focus – Distraction Blocker" with the brain icon
   - Pin it to your toolbar for easy access (click the puzzle icon → pin)

### Step 3: Start Using

1. **Click the Extension Icon** in your Chrome toolbar
2. **Enter Focus Duration** (minimum 5 minutes, default is 25)
3. **Click "Start Focus"** to begin your session
4. **Blocked websites** will show a motivational message during focus time
5. **Add/Remove websites** from the blocked list as needed

## How It Works

### Focus Timer
- Uses Chrome Alarms API for accurate background timing
- Timer persists even if you close the popup
- Desktop notification appears when session completes
- Real-time countdown updates every second

### Website Blocking
- Content script runs on all pages
- Checks if current site is in blocked list
- Only activates during focus sessions
- Matches domain and subdomains (e.g., blocks both facebook.com and m.facebook.com)

### Data Storage
- Uses Chrome Storage API for persistence
- Blocked websites list saved locally
- Focus state maintained across browser restarts

## Usage Tips

### Recommended Focus Durations
- **Pomodoro Technique**: 25 minutes
- **Deep Work Session**: 45-90 minutes
- **Quick Focus Sprint**: 15 minutes

### Adding Websites to Block List
1. Enter domain without protocol or www (e.g., `twitter.com`)
2. Click "Add" or press Enter
3. Website will be blocked immediately during focus sessions

### Productivity Best Practices
- Start with shorter sessions (25 minutes)
- Take breaks between focus sessions
- Keep your blocked list focused on your biggest distractions
- Use desktop notifications as natural break points

## Technical Details

### Technologies Used
- **Manifest V3** (latest Chrome Extension standard)
- **Chrome Storage API** for data persistence
- **Chrome Alarms API** for background timing
- **Chrome Notifications API** for desktop alerts
- **Content Scripts** for webpage blocking
- **Service Worker** for background operations

### File Structure

**manifest.json**
- Extension configuration
- Permissions declarations
- Background and content script definitions

**background.js**
- Service worker (runs in background)
- Manages focus timer state
- Handles alarms and notifications
- Coordinates with content scripts

**contentScript.js**
- Runs on all web pages
- Checks if site should be blocked
- Displays block page during focus sessions

**popup.html/css/js**
- User interface
- Timer display
- Website management
- Start/Stop controls

## Permissions Explained

- **storage**: Save blocked websites and focus state
- **alarms**: Run background timer
- **notifications**: Show completion alerts
- **tabs**: Communicate with open tabs
- **host_permissions**: Check URLs to block websites

## Troubleshooting

### Timer Not Working
- Ensure Chrome is running (extension works in background)
- Check that system notifications are enabled

### Website Not Blocking
- Verify website is in blocked list
- Ensure focus session is active (status shows "Focused")
- Try refreshing the page after starting focus

### Extension Not Loading
- Verify all files are in correct folder structure
- Check Chrome console for errors (`chrome://extensions/`)
- Ensure Developer Mode is enabled

## Future Enhancements

Potential features for future versions:
- Statistics and analytics
- Multiple block lists (presets)
- Scheduled focus sessions
- Break reminders
- Integration with task management tools
- Whitelist mode (block everything except allowed sites)

## Credits

Built with modern web technologies and Chrome Extension APIs.
Designed for students and professionals who value focus and productivity.

## License

Free to use and modify for personal and educational purposes.

---

**Stay focused and achieve your goals! 🎯**
