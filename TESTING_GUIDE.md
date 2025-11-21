# Testing Guide - Study Focus Extension

## Manual Testing Checklist

### Installation Testing

- [ ] Extension loads without errors in `chrome://extensions/`
- [ ] All files are present and readable
- [ ] Icon appears correctly in toolbar
- [ ] Popup opens when icon is clicked
- [ ] No console errors on installation

### Focus Timer Testing

#### Basic Timer Functionality
- [ ] Can input duration (numbers only)
- [ ] Minimum duration enforced (5 minutes)
- [ ] Timer starts when "Start Focus" clicked
- [ ] Status changes to "Focused" with green indicator
- [ ] Timer countdown displays correctly (MM:SS format)
- [ ] "Start Focus" button disables when active
- [ ] "Stop Focus" button enables when active
- [ ] Duration input disables when active

#### Timer Persistence
- [ ] Timer continues when popup is closed
- [ ] Timer state persists when popup reopens
- [ ] Countdown updates every second
- [ ] Timer completes at 00:00
- [ ] Status returns to "Idle" after completion

#### Timer Controls
- [ ] Stop button shows confirmation dialog
- [ ] Confirming stop ends session immediately
- [ ] Canceling stop keeps session running
- [ ] Status dot animates when focused
- [ ] Status dot stops animating when idle

### Notification Testing

- [ ] Desktop notification appears when timer completes
- [ ] Notification title is "Study Focus"
- [ ] Notification message is "Focus session completed! Great job."
- [ ] Notification icon displays correctly
- [ ] Notification clears automatically

**Note**: Ensure Chrome notification permissions are granted

### Website Blocking Testing

#### Pre-loaded Sites
Test each default blocked site:
- [ ] facebook.com
- [ ] youtube.com
- [ ] instagram.com
- [ ] twitter.com
- [ ] reddit.com

#### Block Page Display
- [ ] Block page appears instantly when focus is active
- [ ] Block page shows lock icon (🔒)
- [ ] Block page shows "Stay Focused" heading
- [ ] Block page shows motivational messages
- [ ] Block page has blue gradient background
- [ ] Page title changes to "🔒 Site Blocked - Study Focus"

#### Blocking Logic
- [ ] Sites are accessible when focus is inactive
- [ ] Sites are blocked immediately when focus starts
- [ ] Sites become accessible when focus stops
- [ ] Subdomains are blocked (e.g., m.facebook.com)
- [ ] www. prefix handled correctly
- [ ] Already-open blocked tabs get blocked when focus starts

#### Custom Website Management
- [ ] Can add new website to block list
- [ ] Website input validates format
- [ ] Duplicate websites rejected with alert
- [ ] Added website appears in list immediately
- [ ] Can remove website from list
- [ ] Website list updates after removal
- [ ] Empty state shows when no websites blocked
- [ ] Press Enter in input to add website

### UI/UX Testing

#### Visual Design
- [ ] Colors match design specification
- [ ] Fonts render correctly
- [ ] Spacing is consistent
- [ ] Shadows appear on cards
- [ ] Border radius consistent

#### Animations
- [ ] Logo pulses smoothly
- [ ] Status dot blinks when active
- [ ] Buttons lift on hover
- [ ] Inputs show focus state
- [ ] Block page fades in smoothly
- [ ] Block page glow animates

#### Responsiveness
- [ ] Popup width is 380px
- [ ] Website list scrolls when long
- [ ] All text is readable
- [ ] No text overflow
- [ ] Buttons are properly sized

#### Interactions
- [ ] Buttons show hover states
- [ ] Cursor changes to pointer on clickables
- [ ] Inputs show focus borders
- [ ] Remove buttons show hover color
- [ ] Disabled buttons appear dimmed
- [ ] All transitions are smooth (0.2s)

### Data Persistence Testing

#### Storage
- [ ] Blocked websites persist after closing popup
- [ ] Blocked websites persist after restarting Chrome
- [ ] Focus state persists when closing popup
- [ ] Focus state persists when restarting Chrome (if timer not expired)

#### State Management
- [ ] Adding website saves to storage
- [ ] Removing website updates storage
- [ ] Starting focus saves state
- [ ] Stopping focus updates state
- [ ] Timer expiration updates state

### Edge Cases

#### Timer Edge Cases
- [ ] Entering 0 or negative number shows alert
- [ ] Entering non-number shows validation error
- [ ] Entering exactly 5 minutes works
- [ ] Starting timer with very large number works
- [ ] Timer handles system time changes gracefully

#### Website Blocking Edge Cases
- [ ] Empty input ignored
- [ ] Input with http:// protocol stripped correctly
- [ ] Input with https:// protocol stripped correctly
- [ ] Input with www. prefix stripped correctly
- [ ] Input with trailing slash stripped correctly
- [ ] Input without TLD shows validation error
- [ ] Very long domain names handled
- [ ] Special characters in domain handled

#### Browser Edge Cases
- [ ] Extension works after Chrome restart
- [ ] Extension works after system restart
- [ ] Extension works in incognito (if allowed)
- [ ] Extension handles multiple Chrome windows
- [ ] Extension handles many open tabs
- [ ] Extension doesn't slow down browser

### Performance Testing

- [ ] Popup opens instantly (<100ms)
- [ ] Timer updates don't lag
- [ ] Adding websites is instant
- [ ] Block page loads immediately
- [ ] No memory leaks over time
- [ ] CPU usage is minimal when idle
- [ ] CPU usage is minimal when focused

### Security Testing

- [ ] No sensitive data logged to console
- [ ] Storage is local only (not synced)
- [ ] Content script doesn't interfere with page functionality
- [ ] Content script doesn't expose extension API
- [ ] Permissions are minimal and justified

## Browser Compatibility

### Tested Browsers
- [ ] Google Chrome (latest stable)
- [ ] Google Chrome (one version back)
- [ ] Microsoft Edge (Chromium)
- [ ] Brave Browser

**Note**: Manifest V3 is Chrome/Chromium only

## Common Issues & Solutions

### Timer Not Counting Down
**Symptom**: Timer shows 00:00 or doesn't update
**Solution**: Restart Chrome, check Alarms API permissions

### Websites Not Blocking
**Symptom**: Blocked site still accessible during focus
**Solution**: Refresh the page after starting focus

### Notifications Not Showing
**Symptom**: No notification on timer completion
**Solution**: Check Chrome notification settings, grant permission

### Extension Not Loading
**Symptom**: Error on installation
**Solution**: Verify all files present, check manifest.json syntax

### Popup Not Opening
**Symptom**: Clicking icon does nothing
**Solution**: Check console for errors, reinstall extension

## Test Scenarios

### Scenario 1: First Time User
1. Install extension
2. Open popup
3. See default blocked websites
4. Start 5-minute focus session
5. Try to visit facebook.com
6. See block page
7. Wait for timer to complete
8. Receive notification

### Scenario 2: Customization
1. Open popup
2. Add "tiktok.com" to blocked list
3. Add "twitter.com" (already exists - should reject)
4. Remove "reddit.com" from list
5. Start focus session
6. Verify tiktok.com is blocked
7. Verify reddit.com is accessible

### Scenario 3: Interruption
1. Start 10-minute focus session
2. Close popup
3. Wait 2 minutes
4. Reopen popup
5. Verify timer shows ~8 minutes remaining
6. Click Stop button
7. Confirm stop
8. Verify status returns to Idle

### Scenario 4: Multiple Sessions
1. Complete one 5-minute focus session
2. Receive notification
3. Wait 1 minute
4. Start another 10-minute session
5. Verify new timer starts from 10:00
6. Stop session early
7. Start new session immediately

## Automated Testing (Future)

Potential automated tests:
- Unit tests for timer logic
- Integration tests for Chrome APIs
- E2E tests with Puppeteer
- Storage mock tests
- Alarm callback tests

## Bug Report Template

When reporting issues, include:

**Description**: Clear description of the issue

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Behavior**: What should happen

**Actual Behavior**: What actually happens

**Screenshots**: If applicable

**Environment**:
- Chrome Version:
- OS:
- Extension Version:

**Console Errors**: Any errors from DevTools console

---

## Testing Completed ✓

**Tester Name**: _______________
**Date**: _______________
**Chrome Version**: _______________
**All Tests Passed**: ☐ Yes  ☐ No

**Notes**:
_________________________________________________
_________________________________________________
_________________________________________________
