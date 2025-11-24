/**
 * Trusted Tester v5 - Main Application Controller
 * Section 508 Conformance Testing Application
 */

// Global application state
var testProcessor = null;
var evaluationEngine = null;
var reportGenerator = null;
var automationEngine = null;
var currentPage = null;
var isAutomatedMode = false;

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
    setupEventListeners();
    loadInitialState();
});

/**
 * Initialize core application components
 */
function initializeApplication() {
    try {
        // Initialize test processor
        testProcessor = new TestProcessor();

        // Initialize evaluation engine
        evaluationEngine = new TrustedTesterEvaluationEngine();

        // Initialize report generator
        reportGenerator = new TrustedTesterReportGenerator();

        // Initialize automation engine
        automationEngine = new AutomationEngine();
        automationEngine.initialize().then(() => {
            console.log('Automation engine ready');
            showSuccess('Automated testing enabled ✓');
        }).catch(err => {
            console.error('Automation engine initialization failed:', err);
            showError('Automated testing unavailable');
        });

        // Load test categories into the UI
        testProcessor.initializeCategories();

        console.log('Trusted Tester v5 initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
        showError('Failed to initialize application. Please refresh the page.');
    }
}

/**
 * Set up all event listeners for the application
 */
function setupEventListeners() {
    // Tab navigation
    setupTabNavigation();

    // URL input and page loading
    setupPageLoading();

    // Test result buttons
    setupTestResultButtons();

    // Issue documentation
    setupIssueDocumentation();

    // Testing tools
    setupTestingTools();

    // Review tab
    setupReviewTab();

    // Report tab
    setupReportTab();

    // Reference tab
    setupReferenceTab();
}

/**
 * Tab Navigation
 */
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
}

function switchTab(tabName) {
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Update active content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const activeContent = document.getElementById(`${tabName}-tab`);
    if (activeContent) {
        activeContent.classList.add('active');
    }

    // Perform tab-specific actions
    switch(tabName) {
        case 'review':
            loadReviewData();
            break;
        case 'report':
            updateReportPreview();
            break;
        case 'reference':
            loadReferenceData();
            break;
    }
}

/**
 * Page Loading and URL Management
 */
function setupPageLoading() {
    const urlInput = document.getElementById('testUrl');

    if (urlInput) {
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loadPage();
            }
        });
    }
}

function loadPage() {
    const urlInput = document.getElementById('testUrl');
    const url = urlInput?.value.trim();

    if (!url) {
        showError('Please enter a valid URL');
        return;
    }

    // Validate URL format
    let validUrl = url;
    try {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            validUrl = 'https://' + url;
        }
        new URL(validUrl);
    } catch (error) {
        showError('Invalid URL format. Please enter a valid URL');
        return;
    }

    currentPage = validUrl;

    // Initialize evaluation for this page
    if (evaluationEngine) {
        evaluationEngine.initializeEvaluation({
            url: validUrl,
            title: document.title || 'Untested Page',
            timestamp: new Date().toISOString()
        });
    }

    // Update UI to show page is loaded
    const pageTitle = document.getElementById('current-page-title');
    if (pageTitle) {
        pageTitle.textContent = validUrl;
    }

    showSuccess(`Page loaded: ${validUrl}`);

    // Enable test controls
    enableTestControls();

    // Enable automated scan button
    const autoScanBtn = document.getElementById('run-automated-scan');
    if (autoScanBtn) {
        autoScanBtn.disabled = false;
    }
}

/**
 * Run automated accessibility scan
 */
async function runAutomatedScan() {
    if (!currentPage) {
        showError('Please load a page first');
        return;
    }

    if (!automationEngine) {
        showError('Automation engine not initialized');
        return;
    }

    try {
        // Show progress
        showInfo('Starting automated scan...');
        const scanBtn = document.getElementById('run-automated-scan');
        const scanProgress = document.getElementById('scan-progress');

        if (scanBtn) {
            scanBtn.disabled = true;
            scanBtn.textContent = 'Scanning...';
        }

        if (scanProgress) {
            scanProgress.style.display = 'block';
            scanProgress.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 10%"></div>
                </div>
                <p>Loading page...</p>
            `;
        }

        // Run the full scan
        const results = await automationEngine.runFullScan(currentPage);

        // Update progress
        if (scanProgress) {
            scanProgress.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 100%"></div>
                </div>
                <p>Scan complete!</p>
            `;
        }

        // Process results
        processAutomatedResults(results);

        // Show summary
        showSuccess(`Scan complete: ${results.summary.violations} violations found`);

        // Switch to review tab to show results
        setTimeout(() => {
            switchTab('review');
        }, 1000);

    } catch (error) {
        console.error('Automated scan error:', error);
        showError(`Scan failed: ${error.message}`);
    } finally {
        // Reset button
        const scanBtn = document.getElementById('run-automated-scan');
        if (scanBtn) {
            scanBtn.disabled = false;
            scanBtn.textContent = '🚀 Run Automated Scan';
        }

        // Hide progress after delay
        setTimeout(() => {
            const scanProgress = document.getElementById('scan-progress');
            if (scanProgress) {
                scanProgress.style.display = 'none';
            }
        }, 2000);
    }
}

/**
 * Process automated scan results and populate test results
 */
function processAutomatedResults(results) {
    if (!results || !results.tests) {
        console.error('Invalid scan results');
        return;
    }

    isAutomatedMode = true;

    // Record each test result
    Object.entries(results.tests).forEach(([testId, testResult]) => {
        const outcome = testResult.result === 'fail' ? 'FAIL' : 'PASS';
        const notes = testResult.automated ?
            `[AUTOMATED] ${testResult.issues.length} issues found` :
            testResult.notes || '';

        // Record in test processor
        if (testProcessor) {
            testProcessor.recordResult(testId, outcome.toLowerCase(), notes);
        }

        // Record in evaluation engine
        if (evaluationEngine) {
            evaluationEngine.recordTestResult(testId, {
                outcome: outcome,
                notes: notes,
                timestamp: new Date().toISOString(),
                automated: true
            });

            // Record issues for failed tests
            if (testResult.issues && testResult.issues.length > 0) {
                testResult.issues.forEach(issue => {
                    evaluationEngine.recordIssue({
                        testId: testId,
                        title: issue.description || issue.issue,
                        description: issue.help || issue.failureSummary || '',
                        severity: issue.impact || 'moderate',
                        recommendation: issue.helpUrl || '',
                        element: issue.element || issue.target || '',
                        timestamp: new Date().toISOString(),
                        pageUrl: currentPage,
                        automated: true
                    });
                });
            }
        }
    });

    // Update progress display
    if (testProcessor) {
        testProcessor.updateProgress();
    }

    // Store full results
    window.lastAutomatedScanResults = results;

    showSuccess('Automated results processed');
}

/**
 * Test Result Buttons
 */
function setupTestResultButtons() {
    const passBtn = document.getElementById('mark-pass');
    const failBtn = document.getElementById('mark-fail');
    const dnaBtn = document.getElementById('mark-dna');
    const notTestedBtn = document.getElementById('mark-not-tested');

    if (passBtn) passBtn.addEventListener('click', () => markTest('pass'));
    if (failBtn) failBtn.addEventListener('click', () => markTest('fail'));
    if (dnaBtn) dnaBtn.addEventListener('click', () => markTest('dna'));
    if (notTestedBtn) notTestedBtn.addEventListener('click', () => markTest('not-tested'));
}

function markTest(result) {
    if (!testProcessor.currentTest) {
        showError('Please select a test first');
        return;
    }

    const testId = testProcessor.currentTest.id;
    const notes = document.getElementById('test-notes')?.value || '';

    // Record result in test processor
    testProcessor.recordResult(testId, result, notes);

    // Record result in evaluation engine
    if (evaluationEngine) {
        evaluationEngine.recordTestResult(testId, {
            outcome: result.toUpperCase(),
            notes: notes,
            timestamp: new Date().toISOString()
        });
    }

    // Clear notes
    if (document.getElementById('test-notes')) {
        document.getElementById('test-notes').value = '';
    }

    // Hide issue form if not fail
    if (result !== 'fail') {
        const issueForm = document.getElementById('issue-form');
        if (issueForm) issueForm.style.display = 'none';
    }

    // Update progress
    testProcessor.updateProgress();

    // Show success message
    showSuccess(`Test marked as ${result}`);

    // Auto-advance to next test
    setTimeout(() => {
        testProcessor.advanceToNextTest();
    }, 500);
}

/**
 * Issue Documentation
 */
function setupIssueDocumentation() {
    const saveIssueBtn = document.getElementById('save-issue');

    if (saveIssueBtn) {
        saveIssueBtn.addEventListener('click', saveIssue);
    }

    // Show issue form when fail is clicked
    const failBtn = document.getElementById('mark-fail');
    if (failBtn) {
        failBtn.addEventListener('click', () => {
            const issueForm = document.getElementById('issue-form');
            if (issueForm) issueForm.style.display = 'block';
        });
    }
}

function saveIssue() {
    const issueTitle = document.getElementById('issue-title')?.value;
    const issueDescription = document.getElementById('issue-description')?.value;
    const issueSeverity = document.getElementById('issue-severity')?.value;
    const issueRecommendation = document.getElementById('issue-recommendation')?.value;

    if (!issueTitle || !issueDescription) {
        showError('Please fill in all required fields');
        return;
    }

    const issue = {
        testId: testProcessor.currentTest?.id,
        title: issueTitle,
        description: issueDescription,
        severity: issueSeverity,
        recommendation: issueRecommendation,
        timestamp: new Date().toISOString(),
        pageUrl: currentPage
    };

    // Save issue to evaluation engine
    if (evaluationEngine) {
        evaluationEngine.recordIssue(issue);
    }

    // Clear form
    document.getElementById('issue-title').value = '';
    document.getElementById('issue-description').value = '';
    document.getElementById('issue-recommendation').value = '';

    showSuccess('Issue documented successfully');

    // Hide issue form
    const issueForm = document.getElementById('issue-form');
    if (issueForm) issueForm.style.display = 'none';
}

/**
 * Testing Tools
 */
function setupTestingTools() {
    const andiBtn = document.getElementById('open-andi');
    const ccaBtn = document.getElementById('open-cca');
    const devToolsBtn = document.getElementById('open-devtools');

    if (andiBtn) andiBtn.addEventListener('click', openANDI);
    if (ccaBtn) ccaBtn.addEventListener('click', openCCA);
    if (devToolsBtn) devToolsBtn.addEventListener('click', openDevTools);
}

function openANDI() {
    const andiScript = "javascript:void((function(){andiScript=document.createElement('script');andiScript.setAttribute('src','https://www.ssa.gov/accessibility/andi/andi.js');document.body.appendChild(andiScript)})());";
    showInfo('ANDI bookmarklet: ' + andiScript);
    showInfo('Please add this as a bookmark and click it on the page you are testing');
}

function openCCA() {
    showInfo('Colour Contrast Analyser: Please use the CCA desktop application or browser extension');
    window.open('https://www.tpgi.com/color-contrast-checker/', '_blank');
}

function openDevTools() {
    showInfo('Press F12 or Ctrl+Shift+I (Cmd+Option+I on Mac) to open browser Developer Tools');
}

/**
 * Review Tab
 */
function setupReviewTab() {
    const generateSummaryBtn = document.querySelector('#review-tab button');

    if (generateSummaryBtn) {
        generateSummaryBtn.addEventListener('click', loadReviewData);
    }
}

function loadReviewData() {
    const resultsContainer = document.getElementById('resultsSummary');

    if (!resultsContainer) return;

    let html = '<div class="review-content">';

    // Show automated scan results if available
    if (window.lastAutomatedScanResults) {
        const results = window.lastAutomatedScanResults;

        html += `
            <div class="automated-results-summary">
                <h3>🚀 Automated Scan Results</h3>
                <div class="scan-meta">
                    <p><strong>URL:</strong> ${results.url}</p>
                    <p><strong>Scan Date:</strong> ${new Date(results.timestamp).toLocaleString()}</p>
                    <p><strong>Compliance Level:</strong> ${results.wcagCompliance?.level || 'Analyzing...'}</p>
                </div>

                <div class="results-stats">
                    <div class="stat-card stat-violations">
                        <h4>${results.summary.violations}</h4>
                        <p>Violations</p>
                    </div>
                    <div class="stat-card stat-passes">
                        <h4>${results.summary.passes}</h4>
                        <p>Passed</p>
                    </div>
                    <div class="stat-card stat-issues">
                        <h4>${results.summary.totalIssues}</h4>
                        <p>Total Issues</p>
                    </div>
                </div>

                <h4>Top Issues (Priority Order):</h4>
                <div class="recommendations-list">
        `;

        // Display top 10 recommendations
        results.recommendations.slice(0, 10).forEach((rec, index) => {
            html += `
                <div class="recommendation-item priority-${rec.priority}">
                    <div class="rec-header">
                        <span class="rec-priority">${rec.priority.toUpperCase()}</span>
                        <span class="rec-test-id">Test ${rec.testId}</span>
                    </div>
                    <p><strong>${rec.issue}</strong></p>
                    <p class="rec-recommendation">${rec.recommendation}</p>
                    ${rec.element ? `<code class="rec-element">${rec.element.substring(0, 100)}...</code>` : ''}
                    ${rec.learnMore ? `<a href="${rec.learnMore}" target="_blank">Learn More →</a>` : ''}
                </div>
            `;
        });

        if (results.recommendations.length > 10) {
            html += `<p class="more-results">+ ${results.recommendations.length - 10} more issues...</p>`;
        }

        html += '</div></div>';
    }

    // Show manual test results if available
    if (testProcessor) {
        const summary = testProcessor.generateSummary();

        if (summary && summary.results && summary.results.length > 0) {
            html += `
                <div class="manual-results-summary">
                    <h3>📋 Manual Test Results</h3>

                    <div class="summary-stats">
                        <p><strong>Total Tests:</strong> ${summary.totalTests}</p>
                        <p><strong>Passed:</strong> ${summary.passed}</p>
                        <p><strong>Failed:</strong> ${summary.failed}</p>
                        <p><strong>Does Not Apply:</strong> ${summary.dna}</p>
                        <p><strong>Not Tested:</strong> ${summary.notTested}</p>
                        <p><strong>Completion:</strong> ${summary.completion}%</p>
                    </div>

                    <table class="results-table">
                        <thead>
                            <tr>
                                <th>Test ID</th>
                                <th>Test Name</th>
                                <th>Result</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            summary.results.forEach(result => {
                html += `
                    <tr class="result-${result.status}">
                        <td>${result.testId}</td>
                        <td>${result.testName}</td>
                        <td><span class="badge badge-${result.status}">${result.status}</span></td>
                        <td>${result.notes || '-'}</td>
                    </tr>
                `;
            });

            html += `
                        </tbody>
                    </table>
                </div>
            `;
        }
    }

    // Show empty state if no results
    if (!window.lastAutomatedScanResults && (!testProcessor || !testProcessor.testResults || testProcessor.testResults.size === 0)) {
        html += `
            <div class="empty-state">
                <h3>No Test Results Yet</h3>
                <p>Run an automated scan or perform manual testing to see results here.</p>
                <button onclick="switchTab('testing')" class="btn-primary">Start Testing</button>
            </div>
        `;
    }

    html += '</div>';

    resultsContainer.innerHTML = html;
}

/**
 * Report Tab
 */
function setupReportTab() {
    const generateReportBtn = document.getElementById('generate-report');
    const exportPdfBtn = document.getElementById('export-pdf');
    const exportExcelBtn = document.getElementById('export-excel');
    const exportJsonBtn = document.getElementById('export-json');

    if (generateReportBtn) generateReportBtn.addEventListener('click', generateReport);
    if (exportPdfBtn) exportPdfBtn.addEventListener('click', () => exportReport('pdf'));
    if (exportExcelBtn) exportExcelBtn.addEventListener('click', () => exportReport('excel'));
    if (exportJsonBtn) exportJsonBtn.addEventListener('click', () => exportReport('json'));
}

function generateReport() {
    if (!reportGenerator || !evaluationEngine) {
        showError('Report generator not initialized');
        return;
    }

    const reportType = document.getElementById('report-type')?.value || 'technical';

    try {
        const results = evaluationEngine.getResults();
        const report = reportGenerator.generateReport(results, reportType);

        const reportPreview = document.getElementById('report-preview');
        if (reportPreview) {
            reportPreview.innerHTML = report;
        }

        showSuccess('Report generated successfully');
    } catch (error) {
        console.error('Error generating report:', error);
        showError('Failed to generate report');
    }
}

function exportReport(format) {
    if (!reportGenerator || !evaluationEngine) {
        showError('Report generator not initialized');
        return;
    }

    try {
        const results = evaluationEngine.getResults();
        const reportType = document.getElementById('report-type')?.value || 'technical';

        reportGenerator.exportReport(results, reportType, format);

        showSuccess(`Report exported as ${format.toUpperCase()}`);
    } catch (error) {
        console.error('Error exporting report:', error);
        showError('Failed to export report');
    }
}

function updateReportPreview() {
    // Auto-generate report preview when switching to report tab
    if (evaluationEngine && reportGenerator) {
        const results = evaluationEngine.getResults();
        if (results && results.length > 0) {
            generateReport();
        }
    }
}

/**
 * Reference Tab
 */
function setupReferenceTab() {
    const searchInput = document.getElementById('reference-search');
    const searchBtn = document.querySelector('#reference-tab button');

    if (searchInput) {
        searchInput.addEventListener('keyup', searchReference);
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', searchReference);
    }
}

function searchReference() {
    const searchTerm = document.getElementById('reference-search')?.value.toLowerCase();

    if (!searchTerm) {
        // Show all tests
        displayAllTests();
        return;
    }

    // Search through test database
    const results = [];

    testCategories.forEach(category => {
        category.tests.forEach(test => {
            const searchableText = `
                ${test.id}
                ${test.title}
                ${test.description}
                ${test.wcagCriteria.join(' ')}
                ${test.instructions.join(' ')}
            `.toLowerCase();

            if (searchableText.includes(searchTerm)) {
                results.push({
                    category: category.name,
                    test: test
                });
            }
        });
    });

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const referenceList = document.getElementById('reference-list');

    if (!referenceList) return;

    if (results.length === 0) {
        referenceList.innerHTML = '<p>No results found</p>';
        return;
    }

    let html = '<div class="search-results">';

    results.forEach(result => {
        html += `
            <div class="reference-item">
                <h4>${result.test.id}: ${result.test.title}</h4>
                <p><strong>Category:</strong> ${result.category}</p>
                <p><strong>WCAG:</strong> ${result.test.wcagCriteria.join(', ')}</p>
                <p>${result.test.description}</p>
            </div>
        `;
    });

    html += '</div>';

    referenceList.innerHTML = html;
}

function displayAllTests() {
    const referenceList = document.getElementById('reference-list');

    if (!referenceList) return;

    let html = '<div class="all-tests">';

    testCategories.forEach(category => {
        html += `<h3>${category.name}</h3>`;

        category.tests.forEach(test => {
            html += `
                <div class="reference-item">
                    <h4>${test.id}: ${test.title}</h4>
                    <p><strong>WCAG:</strong> ${test.wcagCriteria.join(', ')}</p>
                    <p>${test.description}</p>
                </div>
            `;
        });
    });

    html += '</div>';

    referenceList.innerHTML = html;
}

/**
 * Utility Functions
 */
function enableTestControls() {
    const buttons = [
        'mark-pass',
        'mark-fail',
        'mark-dna',
        'mark-not-tested'
    ];

    buttons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.disabled = false;
    });
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showInfo(message) {
    showNotification(message, 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function loadInitialState() {
    // Load any saved state from localStorage
    const savedState = localStorage.getItem('trustedTesterState');

    if (savedState) {
        try {
            const state = JSON.parse(savedState);

            // Restore current page
            if (state.currentPage) {
                const urlInput = document.getElementById('testUrl');
                if (urlInput) {
                    urlInput.value = state.currentPage;
                }
                currentPage = state.currentPage;
            }

            // Restore test results
            if (state.testResults && testProcessor) {
                testProcessor.testResults = new Map(state.testResults);
                testProcessor.updateProgress();
            }

            console.log('State restored from localStorage');
        } catch (error) {
            console.error('Error loading saved state:', error);
        }
    }

    // Auto-save state periodically
    setInterval(saveCurrentState, 30000); // Save every 30 seconds
}

function saveCurrentState() {
    const state = {
        currentPage: currentPage,
        testResults: testProcessor ? Array.from(testProcessor.testResults.entries()) : [],
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('trustedTesterState', JSON.stringify(state));
}

// Export functions for global access
window.TrustedTester = {
    testProcessor,
    evaluationEngine,
    reportGenerator,
    automationEngine,
    loadPage,
    markTest,
    saveIssue,
    generateReport,
    exportReport,
    switchTab,
    runAutomatedScan
};

// Make functions globally accessible for HTML onclick attributes
window.loadPage = loadPage;
window.markTest = markTest;
window.saveIssue = saveIssue;
window.generateReport = generateReport;
window.exportReport = exportReport;
window.switchTab = switchTab;
window.searchReference = searchReference;
window.runAutomatedScan = runAutomatedScan;
