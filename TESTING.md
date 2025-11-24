# Testing Guide - Trusted Tester Automated Accessibility Tool

## Pre-Testing Checklist

### ✅ Files Verified
- [x] index.html - Main application
- [x] js/automation-engine.js - Automated testing engine
- [x] js/main.js - Application controller
- [x] js/test-database.js - Complete with 59 test definitions
- [x] js/test-processes.js - Error handling implemented
- [x] test-page.html - Sample page with accessibility issues
- [x] README.md - Complete documentation

### ✅ Issues Fixed
- [x] Missing test definitions (29 tests added)
- [x] generateSummary() null parameter handling
- [x] Tab navigation class mismatch (.tab → .nav-tab)
- [x] Error handling for undefined tests

## Test Plan

### Test 1: Application Initialization
**Expected Result:** No console errors, all components initialize

**Steps:**
1. Open `index.html` in browser
2. Check browser console

**Success Criteria:**
- ✓ "Trusted Tester v5 initialized successfully"
- ✓ "Automation engine ready"
- ✓ "Automated testing enabled ✓" notification
- ✓ No red error messages
- ✓ No "Test X.Y not found in database" warnings

---

### Test 2: UI Elements
**Expected Result:** All UI elements render correctly

**Steps:**
1. Verify header displays "Trusted Tester v5.1.3"
2. Check navigation tabs (Testing, Review, Report, Reference)
3. Verify URL input field and buttons visible
4. Check test categories in left sidebar

**Success Criteria:**
- ✓ Header with badges visible
- ✓ 4 navigation tabs functional
- ✓ URL input with 2 buttons ("Load Page" and "🚀 Run Automated Scan")
- ✓ "Run Automated Scan" button is disabled initially
- ✓ 20 test categories listed in sidebar

---

### Test 3: Test Database Integrity
**Expected Result:** All 59 tests loadable without errors

**Steps:**
1. Open browser console
2. Run: `console.log('Total tests:', Object.keys(TestDatabase.tests).length)`
3. Expand each category in the sidebar

**Success Criteria:**
- ✓ Should show "Total tests: 59"
- ✓ All categories expand without errors
- ✓ Each test has a title when clicked
- ✓ No "undefined" test names

---

### Test 4: Load Page Function
**Expected Result:** URL validation and page loading works

**Test Cases:**

**4a. Invalid URL**
```
Input: "not a url"
Expected: Error message "Invalid URL format"
```

**4b. Valid URL without protocol**
```
Input: "example.com"
Expected: Success, normalized to "https://example.com"
```

**4c. Valid URL with protocol**
```
Input: "https://www.w3.org"
Expected: Success, "Run Automated Scan" button enabled
```

**4d. Local test page**
```
Input: "test-page.html"
Expected: Success, scan button enabled
```

---

### Test 5: Automated Scan - Sample Page
**Expected Result:** Scan completes and detects intentional issues

**Steps:**
1. Enter URL: `test-page.html`
2. Click "Load Page"
3. Click "🚀 Run Automated Scan"
4. Wait for completion
5. Check Review tab

**Expected Violations:**
- ✗ Missing form labels (2-3 inputs without labels)
- ✗ Low contrast text (.low-contrast element)
- ✗ Missing alt text on image
- ✗ Heading hierarchy issue (h1 → h3, skips h2)
- ✗ Unclear link purpose ("Click here")
- ✗ Non-keyboard accessible div (onclick without keyboard handler)

**Success Criteria:**
- ✓ Scan completes in 5-30 seconds
- ✓ Progress bar shows "Loading page..." then "Scan complete!"
- ✓ Auto-switches to Review tab
- ✓ Shows "X violations found" notification
- ✓ Displays violation count > 0
- ✓ Shows prioritized recommendations
- ✓ Each violation has description, recommendation, and "Learn More" link

---

### Test 6: Results Display
**Expected Result:** Results formatted correctly in Review tab

**Steps:**
1. After scan completes, view Review tab
2. Verify result cards display

**Success Criteria:**
- ✓ URL displayed correctly
- ✓ Scan timestamp shown
- ✓ Three stat cards: Violations, Passed, Total Issues
- ✓ Top 10 violations listed
- ✓ Each violation shows:
  - Priority badge (CRITICAL/SERIOUS/MODERATE/MINOR)
  - Test ID
  - Issue description
  - Recommendation
  - Code element (if applicable)
  - "Learn More →" link

---

### Test 7: Priority Ordering
**Expected Result:** Issues sorted by severity

**Steps:**
1. Review the violations list
2. Check order of priorities

**Success Criteria:**
- ✓ CRITICAL issues appear first (red)
- ✓ SERIOUS issues next (orange)
- ✓ MODERATE issues after (yellow)
- ✓ MINOR issues last (blue)

---

### Test 8: WCAG Compliance Analysis
**Expected Result:** Compliance level calculated

**Steps:**
1. Check "Compliance Level" in scan meta
2. Should show current conformance status

**Success Criteria:**
- ✓ Shows "WCAG 2.1 Level AA" if passing all checks
- ✓ Shows "Non-Conformant" if violations exist
- ✓ Level determined by number of failures

---

### Test 9: Tab Navigation
**Expected Result:** All tabs switch correctly

**Steps:**
1. Click "Testing" tab
2. Click "Review" tab
3. Click "Report" tab
4. Click "Reference" tab

**Success Criteria:**
- ✓ Each tab highlights when active
- ✓ Content changes for each tab
- ✓ No JavaScript errors
- ✓ Review tab loads results if available

---

### Test 10: Empty State Handling
**Expected Result:** Graceful handling of no results

**Steps:**
1. Refresh page
2. Go to Review tab before running scan

**Success Criteria:**
- ✓ Shows "No Test Results Yet" message
- ✓ Displays "Run an automated scan" instructions
- ✓ "Start Testing" button present
- ✓ No errors in console

---

### Test 11: Multiple Scans
**Expected Result:** Can run multiple scans in sequence

**Steps:**
1. Scan `test-page.html`
2. Wait for completion
3. Enter new URL: `index.html`
4. Load page
5. Scan again

**Success Criteria:**
- ✓ First scan completes successfully
- ✓ Second scan overwrites first results
- ✓ New results display correctly
- ✓ No memory leaks or errors

---

### Test 12: Progress Indicators
**Expected Result:** Progress UI updates correctly

**Steps:**
1. Start automated scan
2. Watch progress indicator

**Success Criteria:**
- ✓ "Starting automated scan..." notification
- ✓ Progress bar appears
- ✓ "Loading page..." text shows
- ✓ Button changes to "Scanning..."
- ✓ Button disabled during scan
- ✓ Progress updates to "Scan complete!"
- ✓ Button resets to "🚀 Run Automated Scan"
- ✓ Progress hides after 2 seconds

---

### Test 13: Error Handling
**Expected Result:** Errors handled gracefully

**Test Cases:**

**13a. CORS Error**
```
Input: "https://example.com" (likely blocked)
Expected: "Scan failed: Cannot access page content (CORS restriction)"
```

**13b. Network Error**
```
Input: "https://nonexistent-domain-12345.com"
Expected: "Scan failed: Failed to load page"
```

**13c. Invalid Page**
```
Input: "invalid-file.html"
Expected: Error message displayed
```

**Success Criteria:**
- ✓ User-friendly error messages
- ✓ Button re-enabled after error
- ✓ Can retry scan
- ✓ No app crash

---

### Test 14: Browser Compatibility
**Expected Result:** Works in modern browsers

**Browsers to Test:**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari

**Success Criteria:**
- ✓ UI renders correctly
- ✓ axe-core loads successfully
- ✓ Scans complete
- ✓ Results display properly

---

### Test 15: Performance
**Expected Result:** Acceptable performance

**Metrics:**
- App load time: < 3 seconds
- Scan time (small page): 5-30 seconds
- UI responsiveness: No lag

**Success Criteria:**
- ✓ Fast initial load
- ✓ Responsive during scan
- ✓ Results render quickly

---

## Manual Test Execution Record

### Environment
- Date: __________
- Browser: __________
- Browser Version: __________
- OS: __________

### Test Results

| Test # | Test Name | Status | Notes |
|--------|-----------|--------|-------|
| 1 | Initialization | ⬜ Pass ⬜ Fail | |
| 2 | UI Elements | ⬜ Pass ⬜ Fail | |
| 3 | Test Database | ⬜ Pass ⬜ Fail | |
| 4 | Load Page | ⬜ Pass ⬜ Fail | |
| 5 | Automated Scan | ⬜ Pass ⬜ Fail | |
| 6 | Results Display | ⬜ Pass ⬜ Fail | |
| 7 | Priority Order | ⬜ Pass ⬜ Fail | |
| 8 | WCAG Analysis | ⬜ Pass ⬜ Fail | |
| 9 | Tab Navigation | ⬜ Pass ⬜ Fail | |
| 10 | Empty State | ⬜ Pass ⬜ Fail | |
| 11 | Multiple Scans | ⬜ Pass ⬜ Fail | |
| 12 | Progress UI | ⬜ Pass ⬜ Fail | |
| 13 | Error Handling | ⬜ Pass ⬜ Fail | |
| 14 | Browser Compat | ⬜ Pass ⬜ Fail | |
| 15 | Performance | ⬜ Pass ⬜ Fail | |

### Overall Status
- Total Tests: 15
- Passed: ___
- Failed: ___
- Pass Rate: ___%

### Critical Issues Found
(List any blocking issues)

### Recommendations
(Improvements or enhancements)

---

## Automated Test Script

For quick verification, run this in browser console after loading `index.html`:

```javascript
// Quick test script
(async function quickTest() {
    console.log('🧪 Running Quick Tests...\n');

    // Test 1: Check initialization
    console.log('✓ Test 1: Components initialized:',
        !!(testProcessor && evaluationEngine && automationEngine));

    // Test 2: Check test database
    const testCount = Object.keys(TestDatabase.tests).length;
    console.log('✓ Test 2: Test database loaded:', testCount, 'tests');
    console.assert(testCount === 59, '❌ Expected 59 tests, got ' + testCount);

    // Test 3: Check categories
    console.log('✓ Test 3: Categories loaded:', TestDatabase.categories.length);
    console.assert(TestDatabase.categories.length === 20, '❌ Expected 20 categories');

    // Test 4: Check automation engine
    console.log('✓ Test 4: Automation engine ready:', automationEngine.axeLoaded);

    // Test 5: Check UI elements
    const scanBtn = document.getElementById('run-automated-scan');
    console.log('✓ Test 5: Scan button exists:', !!scanBtn);

    console.log('\n✅ Quick test complete! Check assertions above.');
})();
```

---

## Known Limitations

1. **CORS Restrictions**: Cannot test pages that block iframe embedding
2. **Authentication**: Cannot test pages requiring login
3. **Dynamic Content**: May not detect issues in JavaScript-rendered content
4. **Manual Verification**: Some tests still require human judgment

---

## Support

If tests fail:
1. Check browser console for detailed errors
2. Verify all files are present
3. Try clearing browser cache (Ctrl+Shift+R)
4. Test with `test-page.html` first
5. Check README.md for troubleshooting

---

**Test Document Version:** 1.0
**Last Updated:** 2024-01-15
**Tester:** _____________
**Signature:** _____________
