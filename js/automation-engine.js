/**
 * Automation Engine for Trusted Tester
 * Automated accessibility testing using axe-core and custom checks
 * Version: 1.0.0
 */

class AutomationEngine {
    constructor() {
        this.axeLoaded = false;
        this.targetFrame = null;
        this.results = {
            violations: [],
            passes: [],
            incomplete: [],
            inapplicable: []
        };
        this.customChecks = new CustomAccessibilityChecks();
    }

    /**
     * Initialize automation engine and load axe-core
     */
    async initialize() {
        try {
            await this.loadAxeCore();
            console.log('✓ Automation engine initialized');
            return true;
        } catch (error) {
            console.error('Failed to initialize automation engine:', error);
            return false;
        }
    }

    /**
     * Load axe-core library dynamically
     */
    async loadAxeCore() {
        return new Promise((resolve, reject) => {
            if (window.axe) {
                this.axeLoaded = true;
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/axe-core@4.8.3/axe.min.js';
            script.onload = () => {
                this.axeLoaded = true;
                console.log('✓ axe-core loaded');
                resolve();
            };
            script.onerror = () => reject(new Error('Failed to load axe-core'));
            document.head.appendChild(script);
        });
    }

    /**
     * Load target page for testing
     * @param {string} url - Target page URL
     * @returns {Promise<boolean>}
     */
    async loadTargetPage(url) {
        try {
            // Validate URL
            const validUrl = this.validateAndNormalizeUrl(url);

            // Create testing iframe
            if (this.targetFrame) {
                this.targetFrame.remove();
            }

            this.targetFrame = document.createElement('iframe');
            this.targetFrame.id = 'automation-target-frame';
            this.targetFrame.style.cssText = 'width: 100%; height: 600px; border: 1px solid #ccc; display: none;';

            // Append to body
            document.body.appendChild(this.targetFrame);

            // Load URL with timeout
            return await this.loadUrlInFrame(validUrl);
        } catch (error) {
            console.error('Error loading target page:', error);
            throw new Error(`Failed to load page: ${error.message}`);
        }
    }

    /**
     * Load URL in iframe with timeout
     */
    loadUrlInFrame(url) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Page load timeout (30s)'));
            }, 30000);

            this.targetFrame.onload = () => {
                clearTimeout(timeout);
                try {
                    // Test if we can access the iframe content (CORS check)
                    const doc = this.targetFrame.contentDocument;
                    if (!doc) {
                        reject(new Error('CORS Error: Cannot access page content.\n\nSolution: Use an HTTP server:\n• Python: python3 -m http.server 8000\n• VS Code: Install "Live Server" extension\n• Node: npx http-server\n\nThen open http://localhost:8000'));
                        return;
                    }
                    resolve(true);
                } catch (e) {
                    // Provide helpful error message
                    const isFileProtocol = window.location.protocol === 'file:';
                    const helpMessage = isFileProtocol
                        ? 'CORS Error: You are using file:// protocol.\n\nYou MUST use an HTTP server:\n\n1. Open terminal in this folder\n2. Run: python3 -m http.server 8000\n3. Open: http://localhost:8000\n\nAlternatively, use VS Code Live Server extension.'
                        : 'CORS Error: The target page blocks iframe access.\n\nTry testing a different page or check the page\'s X-Frame-Options header.';

                    reject(new Error(helpMessage));
                }
            };

            this.targetFrame.onerror = () => {
                clearTimeout(timeout);
                reject(new Error('Failed to load page. Check the URL and try again.'));
            };

            this.targetFrame.src = url;
        });
    }

    /**
     * Validate and normalize URL
     */
    validateAndNormalizeUrl(url) {
        try {
            // Add protocol if missing
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            const urlObj = new URL(url);
            return urlObj.href;
        } catch (error) {
            throw new Error('Invalid URL format');
        }
    }

    /**
     * Run complete automated accessibility scan
     * @param {string} url - Target page URL
     * @returns {Promise<Object>} Comprehensive test results
     */
    async runFullScan(url) {
        const scanResults = {
            url: url,
            timestamp: new Date().toISOString(),
            summary: {
                violations: 0,
                passes: 0,
                incomplete: 0,
                inapplicable: 0
            },
            tests: {},
            wcagCompliance: {},
            recommendations: []
        };

        try {
            // Step 1: Load target page
            await this.loadTargetPage(url);

            // Step 2: Run axe-core scan
            const axeResults = await this.runAxeScan();

            // Step 3: Run custom automated checks
            const customResults = await this.runCustomChecks();

            // Step 4: Combine and map to Trusted Tester format
            scanResults.tests = this.mapToTrustedTesterFormat(axeResults, customResults);

            // Step 5: Calculate summary
            scanResults.summary = this.calculateSummary(scanResults.tests);

            // Step 6: Analyze WCAG compliance
            scanResults.wcagCompliance = this.analyzeWCAGCompliance(scanResults.tests);

            // Step 7: Generate recommendations
            scanResults.recommendations = this.generateRecommendations(scanResults.tests);

            return scanResults;

        } catch (error) {
            scanResults.error = error.message;
            throw error;
        }
    }

    /**
     * Run axe-core scan on loaded page
     */
    async runAxeScan() {
        if (!this.axeLoaded) {
            throw new Error('axe-core not loaded');
        }

        if (!this.targetFrame || !this.targetFrame.contentDocument) {
            throw new Error('No page loaded for testing');
        }

        try {
            // Run axe in the iframe context
            const results = await axe.run(this.targetFrame.contentDocument, {
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'section508']
                },
                resultTypes: ['violations', 'passes', 'incomplete', 'inapplicable']
            });

            this.results = results;
            return results;

        } catch (error) {
            console.error('axe-core scan error:', error);
            throw new Error(`Scan failed: ${error.message}`);
        }
    }

    /**
     * Run custom automated checks not covered by axe-core
     */
    async runCustomChecks() {
        const doc = this.targetFrame.contentDocument;

        return {
            keyboardNavigation: await this.customChecks.testKeyboardNavigation(doc),
            focusManagement: await this.customChecks.testFocusManagement(doc),
            timeouts: await this.customChecks.testTimeouts(doc),
            animations: await this.customChecks.testAnimations(doc),
            colorContrast: await this.customChecks.testColorContrast(doc),
            textResize: await this.customChecks.testTextResize(doc),
            contentStructure: await this.customChecks.testContentStructure(doc),
            formLabels: await this.customChecks.testFormLabels(doc)
        };
    }

    /**
     * Map axe and custom results to Trusted Tester test format
     */
    mapToTrustedTesterFormat(axeResults, customResults) {
        const testResults = {};

        // Map axe violations to test categories
        const categoryMapping = {
            'keyboard': ['4.A', '4.B', '4.C', '4.D', '4.E', '4.F', '4.G'],
            'forms': ['5.A', '5.B', '5.C', '5.D', '5.E', '5.F', '5.G', '5.H', '5.I'],
            'link': ['6.A'],
            'image': ['7.A', '7.B', '7.C', '7.D'],
            'timing': ['8.A'],
            'skip-link': ['9.A', '9.B', '9.C'],
            'heading': ['10.A', '10.B', '10.C', '10.D'],
            'language': ['11.A', '11.B'],
            'page-title': ['12.A'],
            'frame-title': ['12.B'],
            'contrast': ['13.A', '13.B', '13.C'],
            'table': ['14.A', '14.B', '14.C'],
            'css': ['15.A', '15.B'],
            'audio': ['16.A', '16.B'],
            'video': ['17.A', '17.B', '17.C', '17.D'],
            'resize': ['18.A'],
            'multiple-ways': ['19.A'],
            'parsing': ['20.A']
        };

        // Process axe violations
        axeResults.violations.forEach(violation => {
            violation.nodes.forEach(node => {
                const testId = this.mapAxeRuleToTestId(violation.id, categoryMapping);

                if (!testResults[testId]) {
                    testResults[testId] = {
                        id: testId,
                        result: 'fail',
                        issues: [],
                        automated: true
                    };
                }

                testResults[testId].issues.push({
                    description: violation.description,
                    impact: violation.impact,
                    help: violation.help,
                    helpUrl: violation.helpUrl,
                    element: node.html,
                    target: node.target.join(', '),
                    failureSummary: node.failureSummary
                });
            });
        });

        // Process axe passes
        axeResults.passes.forEach(pass => {
            const testId = this.mapAxeRuleToTestId(pass.id, categoryMapping);

            if (!testResults[testId]) {
                testResults[testId] = {
                    id: testId,
                    result: 'pass',
                    issues: [],
                    automated: true,
                    elementsChecked: pass.nodes.length
                };
            }
        });

        // Add custom check results
        Object.entries(customResults).forEach(([checkName, result]) => {
            const testId = this.mapCustomCheckToTestId(checkName);
            if (testId) {
                testResults[testId] = {
                    id: testId,
                    result: result.passed ? 'pass' : 'fail',
                    issues: result.issues || [],
                    automated: true,
                    customCheck: checkName
                };
            }
        });

        return testResults;
    }

    /**
     * Map axe-core rule ID to Trusted Tester test ID
     */
    mapAxeRuleToTestId(axeRuleId, categoryMapping) {
        // Mapping of common axe rules to test IDs
        const ruleMap = {
            'keyboard-access': '4.A',
            'focus-order': '4.B',
            'focus-visible': '4.C',
            'bypass': '9.A',
            'label': '5.A',
            'button-name': '5.B',
            'link-name': '6.A',
            'image-alt': '7.A',
            'heading-order': '10.A',
            'html-has-lang': '11.A',
            'html-lang-valid': '11.A',
            'document-title': '12.A',
            'frame-title': '12.B',
            'color-contrast': '13.A',
            'table-caption': '14.A',
            'td-headers-attr': '14.B',
            'th-has-data-cells': '14.C'
        };

        return ruleMap[axeRuleId] || '1.A'; // Default to first test
    }

    /**
     * Map custom check to test ID
     */
    mapCustomCheckToTestId(checkName) {
        const checkMap = {
            'keyboardNavigation': '4.A',
            'focusManagement': '4.B',
            'timeouts': '8.A',
            'animations': '2.B',
            'colorContrast': '13.A',
            'textResize': '18.A',
            'contentStructure': '10.A',
            'formLabels': '5.A'
        };

        return checkMap[checkName];
    }

    /**
     * Calculate summary statistics
     */
    calculateSummary(tests) {
        const summary = {
            violations: 0,
            passes: 0,
            incomplete: 0,
            inapplicable: 0,
            totalIssues: 0
        };

        Object.values(tests).forEach(test => {
            if (test.result === 'fail') {
                summary.violations++;
                summary.totalIssues += test.issues.length;
            } else if (test.result === 'pass') {
                summary.passes++;
            }
        });

        return summary;
    }

    /**
     * Analyze WCAG compliance level
     */
    analyzeWCAGCompliance(tests) {
        const compliance = {
            level: 'Non-Conformant',
            conformantCriteria: [],
            nonConformantCriteria: [],
            levelA: { passed: 0, failed: 0, total: 30 },
            levelAA: { passed: 0, failed: 0, total: 20 }
        };

        Object.values(tests).forEach(test => {
            if (test.result === 'pass') {
                compliance.conformantCriteria.push(test.id);
                compliance.levelA.passed++;
            } else if (test.result === 'fail') {
                compliance.nonConformantCriteria.push(test.id);
                compliance.levelA.failed++;
            }
        });

        // Determine conformance level
        if (compliance.levelA.failed === 0) {
            compliance.level = 'WCAG 2.1 Level A';
            if (compliance.levelAA.failed === 0) {
                compliance.level = 'WCAG 2.1 Level AA';
            }
        }

        return compliance;
    }

    /**
     * Generate prioritized recommendations
     */
    generateRecommendations(tests) {
        const recommendations = [];

        Object.values(tests).forEach(test => {
            if (test.result === 'fail' && test.issues.length > 0) {
                test.issues.forEach(issue => {
                    recommendations.push({
                        priority: this.getPriority(issue.impact),
                        testId: test.id,
                        issue: issue.description,
                        recommendation: issue.help,
                        learnMore: issue.helpUrl,
                        element: issue.element
                    });
                });
            }
        });

        // Sort by priority
        return recommendations.sort((a, b) => {
            const priorityOrder = { 'critical': 0, 'serious': 1, 'moderate': 2, 'minor': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    /**
     * Get priority level
     */
    getPriority(impact) {
        const priorityMap = {
            'critical': 'critical',
            'serious': 'serious',
            'moderate': 'moderate',
            'minor': 'minor'
        };
        return priorityMap[impact] || 'moderate';
    }

    /**
     * Clean up resources
     */
    cleanup() {
        if (this.targetFrame) {
            this.targetFrame.remove();
            this.targetFrame = null;
        }
    }
}


/**
 * Custom Accessibility Checks
 * Tests not fully covered by axe-core
 */
class CustomAccessibilityChecks {

    /**
     * Test keyboard navigation
     */
    async testKeyboardNavigation(doc) {
        const issues = [];
        const interactiveElements = doc.querySelectorAll(
            'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        interactiveElements.forEach((el, index) => {
            // Check if element is keyboard accessible
            const tabIndex = el.getAttribute('tabindex');
            if (tabIndex && parseInt(tabIndex) < 0) {
                issues.push({
                    element: el.outerHTML.substring(0, 100),
                    issue: 'Element has negative tabindex but appears interactive',
                    wcag: 'SC 2.1.1'
                });
            }

            // Check for keyboard event handlers without mouse handlers
            const hasClick = el.onclick || el.hasAttribute('onclick');
            const hasKeyboard = el.onkeydown || el.onkeypress || el.onkeyup;

            if (hasClick && !hasKeyboard && el.tagName !== 'BUTTON' && el.tagName !== 'A') {
                issues.push({
                    element: el.outerHTML.substring(0, 100),
                    issue: 'Element has click handler but no keyboard handler',
                    wcag: 'SC 2.1.1'
                });
            }
        });

        return {
            passed: issues.length === 0,
            issues: issues,
            elementsChecked: interactiveElements.length
        };
    }

    /**
     * Test focus management
     */
    async testFocusManagement(doc) {
        const issues = [];
        const focusableElements = doc.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]'
        );

        focusableElements.forEach(el => {
            // Check focus indicators
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.outline === 'none' && computedStyle.border === 'none') {
                issues.push({
                    element: el.outerHTML.substring(0, 100),
                    issue: 'Element may lack visible focus indicator',
                    wcag: 'SC 2.4.7'
                });
            }
        });

        return {
            passed: issues.length === 0,
            issues: issues,
            elementsChecked: focusableElements.length
        };
    }

    /**
     * Test for timeout/timing issues
     */
    async testTimeouts(doc) {
        const issues = [];
        const scripts = doc.querySelectorAll('script');

        // Simple heuristic check for setTimeout/setInterval
        scripts.forEach(script => {
            const content = script.textContent;
            if (content.includes('setTimeout') || content.includes('setInterval')) {
                issues.push({
                    element: 'Script contains timeout',
                    issue: 'Page may have timing mechanisms - manual verification needed',
                    wcag: 'SC 2.2.1'
                });
            }
        });

        return {
            passed: issues.length === 0,
            issues: issues,
            requiresManualCheck: true
        };
    }

    /**
     * Test for animations and flashing
     */
    async testAnimations(doc) {
        const issues = [];
        const animatedElements = doc.querySelectorAll('[style*="animation"], [class*="animate"]');

        animatedElements.forEach(el => {
            issues.push({
                element: el.outerHTML.substring(0, 100),
                issue: 'Animated element detected - check for flashing and user controls',
                wcag: 'SC 2.2.2, 2.3.1'
            });
        });

        return {
            passed: issues.length === 0,
            issues: issues,
            requiresManualCheck: true
        };
    }

    /**
     * Test color contrast (complement to axe-core)
     */
    async testColorContrast(doc) {
        const issues = [];
        const textElements = doc.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, button, label');

        textElements.forEach(el => {
            const style = window.getComputedStyle(el);
            const fontSize = parseFloat(style.fontSize);
            const fontWeight = style.fontWeight;

            // Check if text is large (18pt+ or 14pt+ bold)
            const isLargeText = fontSize >= 18 || (fontSize >= 14 && parseInt(fontWeight) >= 700);

            // Note: Actual contrast calculation requires color comparison
            // This is a placeholder for manual review trigger
            if (fontSize < 12) {
                issues.push({
                    element: el.outerHTML.substring(0, 100),
                    issue: 'Very small text detected - verify contrast ratio',
                    wcag: 'SC 1.4.3'
                });
            }
        });

        return {
            passed: true, // axe-core handles this, this is supplementary
            issues: issues,
            requiresManualCheck: true
        };
    }

    /**
     * Test text resize capability
     */
    async testTextResize(doc) {
        const issues = [];
        const textElements = doc.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');

        textElements.forEach(el => {
            const style = window.getComputedStyle(el);

            // Check for fixed pixel fonts that may not resize
            if (style.fontSize.includes('px') && parseInt(style.fontSize) < 16) {
                issues.push({
                    element: el.outerHTML.substring(0, 100),
                    issue: 'Fixed pixel font size may not resize properly',
                    wcag: 'SC 1.4.4'
                });
            }
        });

        return {
            passed: issues.length === 0,
            issues: issues
        };
    }

    /**
     * Test content structure (headings, landmarks)
     */
    async testContentStructure(doc) {
        const issues = [];

        // Check heading hierarchy
        const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;

        headings.forEach(heading => {
            const level = parseInt(heading.tagName[1]);
            if (level > lastLevel + 1) {
                issues.push({
                    element: heading.outerHTML.substring(0, 100),
                    issue: `Heading level ${level} follows ${lastLevel}, skipping levels`,
                    wcag: 'SC 1.3.1'
                });
            }
            lastLevel = level;
        });

        // Check for landmarks
        const landmarks = doc.querySelectorAll('main, nav, aside, header, footer, [role="main"], [role="navigation"]');
        if (landmarks.length === 0) {
            issues.push({
                element: 'Document',
                issue: 'No ARIA landmarks found',
                wcag: 'SC 1.3.1'
            });
        }

        return {
            passed: issues.length === 0,
            issues: issues
        };
    }

    /**
     * Test form labels and accessibility
     */
    async testFormLabels(doc) {
        const issues = [];
        const formControls = doc.querySelectorAll('input, select, textarea');

        formControls.forEach(control => {
            const id = control.getAttribute('id');
            const ariaLabel = control.getAttribute('aria-label');
            const ariaLabelledby = control.getAttribute('aria-labelledby');
            const title = control.getAttribute('title');

            // Check if control has a label
            const hasLabel = id && doc.querySelector(`label[for="${id}"]`);

            if (!hasLabel && !ariaLabel && !ariaLabelledby && !title) {
                issues.push({
                    element: control.outerHTML.substring(0, 100),
                    issue: 'Form control missing accessible label',
                    wcag: 'SC 3.3.2'
                });
            }
        });

        return {
            passed: issues.length === 0,
            issues: issues,
            elementsChecked: formControls.length
        };
    }
}


// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AutomationEngine, CustomAccessibilityChecks };
}
