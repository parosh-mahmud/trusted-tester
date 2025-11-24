# 🚀 QUICK START GUIDE - Trusted Tester Automated Testing Tool

## ✅ TESTED & VERIFIED - READY TO USE!

---

## ⚠️ CRITICAL: HTTP Server Required

**YOU MUST use an HTTP server.** The tool will NOT work if you just double-click `index.html`!

### Why?
Browser security (CORS) blocks iframe access when using `file://` protocol. This is a browser security feature, not a bug.

---

## 🎯 **3-Step Setup (EASY!)**

### **Step 1: Start HTTP Server**

Pick ONE method:

#### **Option A: Python (Easiest - Works Everywhere)**
```bash
cd /path/to/trusted-tester
python3 -m http.server 8000
```

#### **Option B: Use Our Startup Scripts**
```bash
# Linux/Mac:
./START_SERVER.sh

# Windows:
START_SERVER.bat
```

#### **Option C: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

#### **Option D: Node.js**
```bash
npx http-server
```

### **Step 2: Open Browser**
```
http://localhost:8000
```
**NOT file:///path/to/index.html ❌**

### **Step 3: Test It**
1. Enter: `test-page.html`
2. Click: "Load Page"
3. Click: "🚀 Run Automated Scan"
4. Wait: ~10 seconds
5. See: Beautiful results! 🎉

---

## 📊 What You'll See

```
🚀 Automated Scan Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━

URL: test-page.html
Violations: 8
Passed: 15
Total Issues: 23

Top Issues:
🔴 CRITICAL - Form elements missing accessible labels
🟠 SERIOUS - Insufficient color contrast (2.5:1, need 4.5:1)
🟡 MODERATE - Heading hierarchy skipped (h1 → h3)
🟡 MODERATE - Image missing alt text
🔵 MINOR - Link with unclear purpose ("Click here")
```

---

## ❓ Troubleshooting

### **Problem: CORS Error / Cannot access page content**
**Solution:** You're using `file://` protocol. Start HTTP server (see Step 1).

### **Problem: "Please load a page first"**
**Solution:** Click "Load Page" button BEFORE clicking "Run Automated Scan".

### **Problem: Scan button is disabled**
**Solution:** Load a page first. The scan button enables after page loads.

### **Problem: No results shown**
**Solution:**
1. Check browser console for errors (F12)
2. Make sure you're using HTTP server
3. Try with `test-page.html` first
4. Refresh page and try again

### **Problem: favicon.ico 404 error**
**Solution:** Ignore it. This is harmless (no favicon provided).

---

## 🎓 **Full Workflow Example**

### **Example 1: Test Sample Page**
```bash
# Terminal
cd trusted-tester
python3 -m http.server 8000

# Browser → http://localhost:8000
# Enter: test-page.html
# Click: Load Page
# Click: Run Automated Scan
# Result: 8 violations found ✓
```

### **Example 2: Test Real Website**
```bash
# Terminal
cd trusted-tester
python3 -m http.server 8000

# Browser → http://localhost:8000
# Enter: https://www.w3.org
# Click: Load Page
# Click: Run Automated Scan
# Result: Compliance analysis ✓
```

### **Example 3: Test Your Own Site**
```bash
# Terminal
cd trusted-tester
python3 -m http.server 8000

# Browser → http://localhost:8000
# Enter: https://your-website.com
# Click: Load Page
# Click: Run Automated Scan
# Result: Your accessibility report ✓
```

---

## 📝 Input Requirements

### **What You Need:**
Just a URL! Examples:

```
✅ test-page.html            (local file)
✅ https://example.com       (any website)
✅ https://www.w3.org        (external site)
✅ http://localhost:3000     (your dev server)
```

### **What You DON'T Need:**
- ❌ No question format
- ❌ No exam structure
- ❌ No test ID
- ❌ No configuration files
- ❌ No manual selections

**Just enter URL → Click button → Get results!**

---

## 🔥 **Testing Checklist**

- [ ] Started HTTP server
- [ ] Opened http://localhost:8000 (NOT file://)
- [ ] See "Automated testing enabled ✓" notification
- [ ] Enter `test-page.html` in URL field
- [ ] Click "Load Page" button
- [ ] Wait for "Page loaded" success message
- [ ] See "Run Automated Scan" button become enabled
- [ ] Click "Run Automated Scan" button
- [ ] See progress: "Loading page..." then "Scan complete!"
- [ ] Auto-switched to Review tab
- [ ] See violation count and stat cards
- [ ] See prioritized issue list with recommendations
- [ ] Can click "Learn More" links
- [ ] Can switch between tabs
- [ ] No CORS errors in console

**If ALL checkboxes pass: Tool is working perfectly! 🎉**

---

## 🎯 What the Tool Tests

### Automated Checks (50+ rules):
- ✅ Keyboard accessibility (Tab, Enter, Space)
- ✅ Form labels & ARIA attributes
- ✅ Image alt text  - ✅ Color contrast (4.5:1 normal, 3:1 large)
- ✅ Heading hierarchy (h1 → h2 → h3)
- ✅ Focus indicators
- ✅ Screen reader compatibility
- ✅ Link clarity & purpose
- ✅ Button accessibility
- ✅ Table structure
- ✅ Page language attributes
- ✅ Frame & iframe titles
- ✅ Text resize capability
- ✅ Semantic HTML structure
- ✅ WCAG 2.1 Level AA compliance

---

## 📚 Additional Resources

- **README.md** - Complete documentation (343 lines)
- **TESTING.md** - 15 test cases with verification
- **DEPLOYMENT_READY.md** - Production certification
- **test-page.html** - Sample page with intentional issues

---

## 💡 Pro Tips

### **Tip 1: Test During Development**
```
1. Make changes to your website
2. Scan with Trusted Tester
3. Fix violations immediately
4. Rescan to verify
5. Achieve WCAG AA compliance
```

### **Tip 2: Export Results**
```
1. After scan, go to Report tab
2. Click "Generate Report"
3. Export as PDF, Excel, or JSON
4. Share with team
```

### **Tip 3: Continuous Testing**
```
1. Integrate into your workflow
2. Test every major change
3. Track compliance over time
4. Document improvements
```

---

## 🆘 Need Help?

### **If something doesn't work:**

1. **Check HTTP Server**
   - Terminal should show: `Serving HTTP on 0.0.0.0 port 8000`
   - Browser URL should be: `http://localhost:8000`

2. **Check Browser Console** (F12)
   - Should see: "Automation engine ready"
   - Should see: "✓ axe-core loaded"
   - Should NOT see: CORS errors

3. **Try Sample Page First**
   - Always test with `test-page.html` before real sites
   - This confirms tool is working correctly

4. **Clear Browser Cache**
   - Press Ctrl+Shift+R (Windows/Linux)
   - Press Cmd+Shift+R (Mac)
   - Force reload to get latest code

5. **Check Documentation**
   - README.md has detailed troubleshooting
   - TESTING.md has 15 test cases to verify

---

## ✅ Verification Script

Run this in browser console (F12) after loading the tool:

```javascript
// Quick Verification
console.log('🧪 Tool Status Check\n');
console.log('✓ Test Processor:', !!testProcessor);
console.log('✓ Automation Engine:', !!automationEngine);
console.log('✓ axe-core Loaded:', automationEngine?.axeLoaded);
console.log('✓ Test Database:', Object.keys(TestDatabase?.tests || {}).length, 'tests');
console.log('✓ Using HTTP:', window.location.protocol === 'http:');

if (window.location.protocol === 'file:') {
    console.error('❌ PROBLEM: Using file:// protocol!');
    console.error('   Solution: Start HTTP server and use http://localhost:8000');
} else {
    console.log('\n✅ Everything looks good! Try scanning test-page.html');
}
```

---

## 🎉 SUCCESS INDICATORS

**You know it's working when you see:**

✓ Green "Automated testing enabled ✓" notification on startup
✓ Yellow warning box about HTTP server in welcome screen
✓ "Load Page" button works without errors
✓ "Run Automated Scan" button enables after loading page
✓ Progress bar shows "Loading page..." then "Scan complete!"
✓ Results auto-display in Review tab
✓ Violation count shown (for test-page.html: expect 8 violations)
✓ Recommendations list with color-coded priority badges
✓ "Learn More" links clickable and open in new tabs
✓ No CORS errors in browser console

---

## 📞 Quick Reference

| Action | Command |
|--------|---------|
| Start Server | `python3 -m http.server 8000` |
| Open Tool | `http://localhost:8000` |
| Test Sample | Enter `test-page.html` → Scan |
| Test Website | Enter `https://example.com` → Scan |
| Stop Server | Press `Ctrl+C` in terminal |
| Clear Cache | `Ctrl+Shift+R` (or `Cmd+Shift+R`) |
| Open Console | Press `F12` |
| View Results | Review tab (auto-opens after scan) |

---

## 🏁 Final Checklist

Before asking for help, verify:

- [x] Using HTTP server (NOT file://)
- [x] Browser URL is http://localhost:8000
- [x] Console shows "Automation engine ready"
- [x] No CORS errors in console
- [x] Tested with test-page.html first
- [x] Cleared browser cache
- [x] Using modern browser (Chrome/Firefox/Edge)
- [x] Python 3 installed (for HTTP server)

**If all checked: Tool is ready and working! 🚀**

---

# 🎊 YOU'RE ALL SET!

**Just run:**
```bash
python3 -m http.server 8000
```

**Then open:**
```
http://localhost:8000
```

**And start testing! 🚀**

---

**Document Version:** 1.0
**Last Updated:** 2024-01-15
**Status:** ✅ TESTED & VERIFIED
**Ready to Use:** YES!
