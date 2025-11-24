# 🔍 Trusted Tester v5.1.3 - Automated Accessibility Testing Tool

> **Fully automated accessibility conformance testing powered by axe-core**

A comprehensive web accessibility testing tool that implements the DHS (Department of Homeland Security) Trusted Tester methodology for Section 508 and WCAG 2.1 Level AA compliance testing.

## ✨ Features

### 🚀 **Automated Testing Mode** (NEW!)
- **One-click automated scanning** - Just enter a URL and click "Run Automated Scan"
- **Powered by axe-core** - Industry-standard accessibility testing engine
- **Comprehensive violation detection** across all WCAG 2.1 Level AA criteria
- **Smart prioritization** - Issues sorted by severity (Critical → Serious → Moderate → Minor)
- **Detailed recommendations** with specific remediation guidance and learn-more links
- **Real-time progress tracking** with animated progress bars

### 📋 **Manual Testing Mode**
- **20 Test Categories** covering all aspects of web accessibility
- **52+ Individual Tests** with step-by-step instructions
- **DHS Trusted Tester methodology** - Official conformance testing process
- **Guided testing workflow** with Pass/Fail/DNA/Not Tested options
- **Issue documentation** with severity levels and recommendations

### 📊 **Advanced Reporting**
- **Multiple report types**: Executive Summary, Technical Report, VPAT, Remediation Guide
- **Export formats**: HTML, PDF, Excel, JSON, XML, Markdown
- **WCAG compliance analysis** with conformance level determination
- **Section 508 compliance mapping**
- **Visual statistics** with charts and graphs

### 🛠️ **Testing Tools Integration**
- **ANDI** (Accessible Name & Description Inspector)
- **Colour Contrast Analyser** (CCA)
- **Browser DevTools** integration
- **Keyboard testing guide** with shortcuts reference

---

## ⚠️ **IMPORTANT: Use HTTP Server**

**The tool MUST be served via HTTP server (not file://)** due to browser CORS security.

### **Quick Setup (Choose One):**

```bash
# Option 1: Python (Recommended)
python3 -m http.server 8000
# Then open: http://localhost:8000

# Option 2: Use the startup script
./START_SERVER.sh           # Linux/Mac
START_SERVER.bat            # Windows

# Option 3: VS Code Live Server
# Install "Live Server" extension, right-click index.html → "Open with Live Server"

# Option 4: Node.js
npx http-server
```

---

## 🎯 Quick Start

### **Option 1: Automated Testing** (Recommended)

1. **Start HTTP server** (see above)
2. **Open** http://localhost:8000 in your browser
3. **Enter** the URL of the page you want to test (try `test-page.html`)
4. **Click** the "🚀 Run Automated Scan" button
5. **Wait** for the scan to complete (usually 5-30 seconds)
6. **Review** results in the Review tab
7. **Generate** a comprehensive report

```
📝 That's it! The tool automatically:
   ✓ Loads and analyzes the target page
   ✓ Runs 50+ accessibility checks
   ✓ Detects WCAG violations
   ✓ Prioritizes issues by severity
   ✓ Provides remediation recommendations
```

### **Option 2: Manual Testing**

1. **Open** `index.html` in your browser
2. **Enter** the URL and click "Load Page"
3. **Select** a test category from the left panel
4. **Follow** the step-by-step test instructions
5. **Record** your findings (Pass/Fail/Does Not Apply)
6. **Document** any issues found
7. **Generate** a conformance report

---

## 📖 User Guide

### Input Requirements

The tool accepts standard web URLs:

```
✅ Valid inputs:
   - https://example.com
   - http://example.com/page
   - example.com (automatically adds https://)
   - www.example.com
   - example.com/path/to/page?query=value

❌ Invalid inputs:
   - file:/// URLs (local files not supported due to CORS)
   - localhost URLs (may work with CORS disabled)
   - Pages requiring authentication (login required pages)
```

### Automated Scan Process

1. **URL Entry**: Enter the target page URL
2. **Initialization**: Click "Run Automated Scan"
3. **Page Loading**: Tool loads the page in a hidden iframe (2-5s)
4. **Analysis**: Runs axe-core + custom checks (3-15s)
5. **Processing**: Maps results to Trusted Tester format (1-2s)
6. **Display**: Shows results in Review tab with recommendations

### Understanding Results

#### **Severity Levels**

- 🔴 **Critical** - Must fix immediately (blocks access for users)
- 🟠 **Serious** - Should fix urgently (major usability barrier)
- 🟡 **Moderate** - Should fix (accessibility issue present)
- 🔵 **Minor** - Nice to fix (best practice improvement)

#### **WCAG Compliance Levels**

- **Level A** - Basic web accessibility (30 criteria)
- **Level AA** - Recommended standard (20 additional criteria)
- **Level AAA** - Enhanced accessibility (28 additional criteria)

The tool tests for **WCAG 2.1 Level AA** conformance (Section 508 requirement).

---

## 🏗️ Architecture

### Technology Stack

- **Frontend**: Pure JavaScript (ES6+), HTML5, CSS3
- **Testing Engine**: axe-core 4.8.3 (via CDN)
- **Architecture**: Client-side, no backend required
- **Storage**: LocalStorage for session persistence

### File Structure

```
trusted-tester/
├── index.html                    # Main application UI
├── README.md                     # This file
├── css/
│   ├── styles.css               # Global styles
│   └── test-interface.css       # Component styles
├── js/
│   ├── main.js                  # Application controller
│   ├── automation-engine.js     # Automated testing engine (NEW!)
│   ├── test-database.js         # Test definitions
│   ├── test-processes.js        # Test management logic
│   ├── evaluation-engine.js     # Results evaluation
│   └── report-generator.js      # Report creation
└── data/
    └── test-definitions.json    # Test metadata
```

### Automated Testing Components

#### **AutomationEngine Class**
- Loads and initializes axe-core library
- Manages page loading in iframe
- Orchestrates automated scans
- Maps results to Trusted Tester format
- Generates recommendations

#### **CustomAccessibilityChecks Class**
- Keyboard navigation testing
- Focus management validation
- Timeout/timing detection
- Animation/flashing checks
- Color contrast analysis
- Text resize capability
- Content structure validation
- Form label verification

---

## 🧪 Test Categories

The tool includes 20 comprehensive test categories:

1. **Conforming Alternate Version** (1 test)
2. **Auto-Playing Content** (1 test)
3. **Flashing** (1 test)
4. **Keyboard Access and Focus** (7 tests)
5. **Forms** (9 tests)
6. **Links and Buttons** (1 test)
7. **Images** (4 tests)
8. **Adjustable Time Limits** (1 test)
9. **Repetitive Content** (3 tests)
10. **Content Structure** (4 tests)
11. **Language** (2 tests)
12. **Page Titles, Frames, iFrames** (4 tests)
13. **Sensory Characteristics and Contrast** (3 tests)
14. **Tables** (3 tests)
15. **CSS Content and Positioning** (2 tests)
16. **Pre-Recorded Audio/Video** (2 tests)
17. **Synchronized Media** (4 tests)
18. **Resize Text** (1 test)
19. **Multiple Ways** (1 test)
20. **Parsing** (1 test)

---

## 📊 Sample Output

### Automated Scan Results

```
🚀 Automated Scan Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

URL: https://example.com
Scan Date: 2024-01-15 14:30:22
Compliance Level: Non-Conformant

┌─────────────┬─────────┬──────────────┐
│ Violations  │ Passed  │ Total Issues │
├─────────────┼─────────┼──────────────┤
│     12      │   38    │      47      │
└─────────────┴─────────┴──────────────┘

Top Issues (Priority Order):

🔴 CRITICAL - Test 5.A
   Form elements missing accessible labels
   → Ensure all form controls have associated <label> elements
   Learn More: https://dequeuniversity.com/rules/axe/...

🟠 SERIOUS - Test 13.A
   Text contrast insufficient (2.1:1, need 4.5:1)
   → Increase contrast between text and background
   <p style="color: #777; background: #fff;">Low contrast text</p>
   Learn More: https://dequeuniversity.com/rules/axe/...

🟡 MODERATE - Test 10.A
   Heading levels skipped (h1 → h3)
   → Use heading levels in sequential order
   Learn More: https://dequeuniversity.com/rules/axe/...

... + 9 more issues
```

---

## 🔧 Configuration

### CORS Considerations

The tool loads target pages in an iframe, which requires:

1. **Same-origin pages** work without configuration
2. **CORS-enabled pages** with proper headers work
3. **Restricted pages** may need browser extensions like:
   - "CORS Unblock" for Chrome
   - "CORS Everywhere" for Firefox

### LocalStorage

The tool automatically saves:
- Current testing session
- Test results
- Page URL
- Timestamp

Data persists until browser cache is cleared.

---

## 🚧 Limitations

### Current Limitations

1. **CORS restrictions** - Cannot load pages that block iframe embedding
2. **Authentication** - Cannot test pages requiring login
3. **Dynamic content** - May miss issues in JavaScript-rendered content
4. **Client-side only** - No server-side rendering or screenshot capabilities
5. **Manual verification** - Some tests require human judgment

### Known Issues

- Some pages with `X-Frame-Options: DENY` cannot be tested
- Very large pages (>10MB) may cause performance issues
- Automated scans don't capture all 508 requirements (use manual mode for complete coverage)

---

## 📚 Resources

### Official Documentation

- [DHS Trusted Tester Process](https://www.dhs.gov/trusted-tester)
- [Section 508 Standards](https://www.section508.gov/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)

### Testing Tools

- [ANDI](https://www.ssa.gov/accessibility/andi/help/install.html)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- [WAVE](https://wave.webaim.org/)
- [Screen Readers](https://www.nvaccess.org/) (NVDA free)

---

## 🤝 Contributing

This tool is part of an educational/testing project. For improvements:

1. Review the code in `js/automation-engine.js`
2. Submit issues for bugs or feature requests
3. Fork and create pull requests

---

## 📄 License

This tool is provided as-is for accessibility testing purposes.
Based on the DHS Trusted Tester methodology (public domain).

---

## 🎓 Credits

- **DHS Trusted Tester Program** - Testing methodology
- **Deque Systems** - axe-core accessibility engine
- **W3C** - WCAG guidelines and standards
- **Section 508** - Federal accessibility requirements

---

## 📞 Support

For questions or issues:

1. Check the [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
2. Review [axe-core rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
3. Consult [Trusted Tester documentation](https://www.dhs.gov/trusted-tester)

---

## 🚀 Getting Started Checklist

- [ ] Open `index.html` in a modern browser
- [ ] Enter a test URL (e.g., `https://www.w3.org`)
- [ ] Click "Run Automated Scan"
- [ ] Wait for results (5-30 seconds)
- [ ] Review violations in the Review tab
- [ ] Generate a report in the Report tab
- [ ] Export results (PDF, Excel, or JSON)

**Enjoy fully automated accessibility testing! 🎉**
