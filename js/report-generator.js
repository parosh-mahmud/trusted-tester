/**
 * Trusted Tester v5.1.3 Report Generator
 * Generates comprehensive accessibility conformance reports
 * Supports multiple formats and audience types
 */

class TrustedTesterReportGenerator {
  constructor() {
    this.version = "5.1.3";
    this.reportTypes = {
      EXECUTIVE: "executive",
      TECHNICAL: "technical",
      VPAT: "vpat",
      REMEDIATION: "remediation",
      SUMMARY: "summary",
      DETAILED: "detailed",
    };

    this.formats = {
      HTML: "html",
      PDF: "pdf",
      EXCEL: "excel",
      JSON: "json",
      XML: "xml",
      MARKDOWN: "markdown",
    };

    this.wcagLevels = {
      A: "Level A",
      AA: "Level AA",
      AAA: "Level AAA",
    };

    this.section508Standards = this.initializeSection508Standards();
    this.wcagSuccessCriteria = this.initializeWCAGCriteria();
    this.baselineRequirements = this.initializeBaselineRequirements();
  }

  /**
   * Initialize Section 508 Standards mapping
   */
  initializeSection508Standards() {
    return {
      "E205.4": "Web Content Conformance",
      "E207.2": "Keyboard Access",
      "E207.3": "Focus Indication",
      "36CFR1194.22": "Web-based Intranet and Internet Information",
      "36CFR1194.31": "Functional Performance Criteria",
    };
  }

  /**
   * Initialize WCAG Success Criteria
   */
  initializeWCAGCriteria() {
    return {
      "1.1.1": {
        level: "A",
        name: "Non-text Content",
        principle: "Perceivable",
      },
      "1.2.1": {
        level: "A",
        name: "Audio-only and Video-only (Prerecorded)",
        principle: "Perceivable",
      },
      "1.2.2": {
        level: "A",
        name: "Captions (Prerecorded)",
        principle: "Perceivable",
      },
      "1.2.3": {
        level: "A",
        name: "Audio Description or Media Alternative",
        principle: "Perceivable",
      },
      "1.2.4": {
        level: "AA",
        name: "Captions (Live)",
        principle: "Perceivable",
      },
      "1.2.5": {
        level: "AA",
        name: "Audio Description (Prerecorded)",
        principle: "Perceivable",
      },
      "1.3.1": {
        level: "A",
        name: "Info and Relationships",
        principle: "Perceivable",
      },
      "1.3.2": {
        level: "A",
        name: "Meaningful Sequence",
        principle: "Perceivable",
      },
      "1.3.3": {
        level: "A",
        name: "Sensory Characteristics",
        principle: "Perceivable",
      },
      "1.3.4": { level: "AA", name: "Orientation", principle: "Perceivable" },
      "1.3.5": {
        level: "AA",
        name: "Identify Input Purpose",
        principle: "Perceivable",
      },
      "1.4.1": { level: "A", name: "Use of Color", principle: "Perceivable" },
      "1.4.2": { level: "A", name: "Audio Control", principle: "Perceivable" },
      "1.4.3": {
        level: "AA",
        name: "Contrast (Minimum)",
        principle: "Perceivable",
      },
      "1.4.4": { level: "AA", name: "Resize Text", principle: "Perceivable" },
      "1.4.5": {
        level: "AA",
        name: "Images of Text",
        principle: "Perceivable",
      },
      "1.4.10": { level: "AA", name: "Reflow", principle: "Perceivable" },
      "1.4.11": {
        level: "AA",
        name: "Non-text Contrast",
        principle: "Perceivable",
      },
      "1.4.12": { level: "AA", name: "Text Spacing", principle: "Perceivable" },
      "1.4.13": {
        level: "AA",
        name: "Content on Hover or Focus",
        principle: "Perceivable",
      },
      "2.1.1": { level: "A", name: "Keyboard", principle: "Operable" },
      "2.1.2": { level: "A", name: "No Keyboard Trap", principle: "Operable" },
      "2.1.4": {
        level: "A",
        name: "Character Key Shortcuts",
        principle: "Operable",
      },
      "2.2.1": { level: "A", name: "Timing Adjustable", principle: "Operable" },
      "2.2.2": { level: "A", name: "Pause, Stop, Hide", principle: "Operable" },
      "2.3.1": {
        level: "A",
        name: "Three Flashes or Below",
        principle: "Operable",
      },
      "2.4.1": { level: "A", name: "Bypass Blocks", principle: "Operable" },
      "2.4.2": { level: "A", name: "Page Titled", principle: "Operable" },
      "2.4.3": { level: "A", name: "Focus Order", principle: "Operable" },
      "2.4.4": {
        level: "A",
        name: "Link Purpose (In Context)",
        principle: "Operable",
      },
      "2.4.5": { level: "AA", name: "Multiple Ways", principle: "Operable" },
      "2.4.6": {
        level: "AA",
        name: "Headings and Labels",
        principle: "Operable",
      },
      "2.4.7": { level: "AA", name: "Focus Visible", principle: "Operable" },
      "2.5.1": { level: "A", name: "Pointer Gestures", principle: "Operable" },
      "2.5.2": {
        level: "A",
        name: "Pointer Cancellation",
        principle: "Operable",
      },
      "2.5.3": { level: "A", name: "Label in Name", principle: "Operable" },
      "2.5.4": { level: "A", name: "Motion Actuation", principle: "Operable" },
      "3.1.1": {
        level: "A",
        name: "Language of Page",
        principle: "Understandable",
      },
      "3.1.2": {
        level: "AA",
        name: "Language of Parts",
        principle: "Understandable",
      },
      "3.2.1": { level: "A", name: "On Focus", principle: "Understandable" },
      "3.2.2": { level: "A", name: "On Input", principle: "Understandable" },
      "3.2.3": {
        level: "AA",
        name: "Consistent Navigation",
        principle: "Understandable",
      },
      "3.2.4": {
        level: "AA",
        name: "Consistent Identification",
        principle: "Understandable",
      },
      "3.3.1": {
        level: "A",
        name: "Error Identification",
        principle: "Understandable",
      },
      "3.3.2": {
        level: "A",
        name: "Labels or Instructions",
        principle: "Understandable",
      },
      "3.3.3": {
        level: "AA",
        name: "Error Suggestion",
        principle: "Understandable",
      },
      "3.3.4": {
        level: "AA",
        name: "Error Prevention (Legal)",
        principle: "Understandable",
      },
      "4.1.1": { level: "A", name: "Parsing", principle: "Robust" },
      "4.1.2": { level: "A", name: "Name, Role, Value", principle: "Robust" },
      "4.1.3": { level: "AA", name: "Status Messages", principle: "Robust" },
    };
  }

  /**
   * Initialize ICT Baseline Requirements
   */
  initializeBaselineRequirements() {
    return {
      1: "Keyboard Access",
      2: "Focus",
      3: "Non-Interference",
      4: "Repetitive Content",
      5: "Changing Content",
      6: "Images",
      7: "Sensory Characteristics",
      8: "Contrast",
      9: "Flashing",
      10: "Forms",
      11: "Page Titles",
      12: "Frames",
      13: "Content Structure",
      14: "Links",
      15: "Language",
      16: "Audio-Only and Video-Only",
      17: "Synchronized Media",
      18: "CSS Positioning",
      19: "Timing",
      20: "Keyboard Access",
      21: "Character Key Shortcuts",
      22: "Resize Text",
      23: "Multiple Ways",
      24: "Parsing",
    };
  }

  /**
   * Generate Complete Report
   */
  generateReport(
    evaluationData,
    reportType = "detailed",
    format = "html",
    options = {}
  ) {
    const reportData = this.prepareReportData(evaluationData, options);

    switch (reportType) {
      case this.reportTypes.EXECUTIVE:
        return this.generateExecutiveReport(reportData, format);
      case this.reportTypes.TECHNICAL:
        return this.generateTechnicalReport(reportData, format);
      case this.reportTypes.VPAT:
        return this.generateVPATReport(reportData, format);
      case this.reportTypes.REMEDIATION:
        return this.generateRemediationReport(reportData, format);
      case this.reportTypes.SUMMARY:
        return this.generateSummaryReport(reportData, format);
      case this.reportTypes.DETAILED:
      default:
        return this.generateDetailedReport(reportData, format);
    }
  }

  /**
   * Prepare report data
   */
  prepareReportData(evaluationData, options) {
    const data = {
      metadata: this.generateMetadata(evaluationData, options),
      summary: this.generateSummaryStatistics(evaluationData),
      conformance: this.calculateConformance(evaluationData),
      criticalIssues: this.identifyCriticalIssues(evaluationData),
      wcagAnalysis: this.analyzeWCAGCompliance(evaluationData),
      section508Analysis: this.analyzeSection508Compliance(evaluationData),
      testResults: this.organizeTestResults(evaluationData),
      recommendations: this.generateRecommendations(evaluationData),
      charts: this.generateChartData(evaluationData),
    };

    return data;
  }

  /**
   * Generate Report Metadata
   */
  generateMetadata(evaluationData, options) {
    return {
      reportId: this.generateReportId(),
      reportDate: new Date().toISOString(),
      toolVersion: this.version,
      pageTitle: evaluationData.pageContext?.title || "Untitled Page",
      pageUrl: evaluationData.pageContext?.url || "",
      scope: evaluationData.pageContext?.scope || "Full Page",
      tester: evaluationData.pageContext?.testerInfo || {},
      organization: options.organization || "",
      testingMethod: "DHS Trusted Tester Process v5.1.3",
      wcagVersion: "2.1",
      conformanceTarget: "WCAG 2.1 Level AA",
      section508: "Revised Section 508 (2018)",
      testingTools: [
        "ANDI (Accessible Name & Description Inspector)",
        "Colour Contrast Analyser (CCA)",
        "Keyboard Navigation",
        "Screen Reader Testing",
      ],
    };
  }

  /**
   * Generate Summary Statistics
   */
  generateSummaryStatistics(evaluationData) {
    const results = evaluationData.results || [];
    const stats = {
      totalTests: results.length,
      testsCompleted: 0,
      testsPassed: 0,
      testsFailed: 0,
      testsNotApplicable: 0,
      testsNotTested: 0,
      passRate: 0,
      failuresByCategory: {},
      failuresBySeverity: {
        critical: 0,
        major: 0,
        minor: 0,
      },
      affectedSuccessCriteria: new Set(),
      affectedBaselines: new Set(),
    };

    results.forEach((result) => {
      switch (result.outcome) {
        case "PASS":
          stats.testsPassed++;
          stats.testsCompleted++;
          break;
        case "FAIL":
          stats.testsFailed++;
          stats.testsCompleted++;
          const category = result.testId.split(".")[0];
          stats.failuresByCategory[category] =
            (stats.failuresByCategory[category] || 0) + 1;

          // Track affected WCAG SC
          if (result.wcagCriteria) {
            result.wcagCriteria.forEach((sc) =>
              stats.affectedSuccessCriteria.add(sc)
            );
          }

          // Track affected baselines
          if (result.baselineId) {
            stats.affectedBaselines.add(result.baselineId);
          }

          // Categorize severity
          if (this.isCriticalFailure(result.testId)) {
            stats.failuresBySeverity.critical++;
          } else if (this.isMajorFailure(result.testId)) {
            stats.failuresBySeverity.major++;
          } else {
            stats.failuresBySeverity.minor++;
          }
          break;
        case "DOES NOT APPLY":
          stats.testsNotApplicable++;
          break;
        case "NOT TESTED":
          stats.testsNotTested++;
          break;
      }
    });

    stats.passRate =
      stats.testsCompleted > 0
        ? Math.round((stats.testsPassed / stats.testsCompleted) * 100)
        : 0;

    stats.affectedSuccessCriteria = Array.from(stats.affectedSuccessCriteria);
    stats.affectedBaselines = Array.from(stats.affectedBaselines);

    return stats;
  }

  /**
   * Generate Detailed HTML Report
   */
  generateDetailedReport(data, format) {
    if (format === "html") {
      return this.generateDetailedHTMLReport(data);
    } else if (format === "json") {
      return JSON.stringify(data, null, 2);
    } else if (format === "markdown") {
      return this.generateMarkdownReport(data);
    } else if (format === "excel") {
      return this.generateExcelData(data);
    }

    return data;
  }

  /**
   * Generate Detailed HTML Report
   */
  generateDetailedHTMLReport(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Conformance Report - ${data.metadata.pageTitle}</title>
    <style>
        ${this.getReportStyles()}
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="report-container">
        ${this.generateReportHeader(data)}
        ${this.generateExecutiveSummary(data)}
        ${this.generateConformanceStatement(data)}
        ${this.generateTestResultsSummary(data)}
        ${this.generateDetailedFindings(data)}
        ${this.generateWCAGComplianceTable(data)}
        ${this.generateRemediationPlan(data)}
        ${this.generateAppendices(data)}
    </div>
    
    <script>
        ${this.getReportScripts(data)}
    </script>
</body>
</html>
        `;
  }

  /**
   * Get Report Styles
   */
  getReportStyles() {
    return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }
        
        .report-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 40px;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .metadata {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.3);
        }
        
        .metadata-item {
            display: flex;
            flex-direction: column;
        }
        
        .metadata-label {
            font-size: 0.9em;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }
        
        .metadata-value {
            font-size: 1.1em;
            font-weight: 500;
        }
        
        .section {
            padding: 40px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .section:last-child {
            border-bottom: none;
        }
        
        .section-title {
            font-size: 1.8em;
            color: #2a5298;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #2a5298;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .summary-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            transition: transform 0.2s;
        }
        
        .summary-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .summary-number {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .summary-label {
            font-size: 0.9em;
            text-transform: uppercase;
            color: #666;
            letter-spacing: 1px;
        }
        
        .pass { color: #28a745; }
        .fail { color: #dc3545; }
        .warning { color: #ffc107; }
        .info { color: #17a2b8; }
        
        .conformance-statement {
            background: #f0f8ff;
            border-left: 5px solid #2a5298;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .conformance-level {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .conformant { color: #28a745; }
        .partially-conformant { color: #ffc107; }
        .non-conformant { color: #dc3545; }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        th {
            background: #f8f9fa;
            text-align: left;
            padding: 12px;
            border: 1px solid #dee2e6;
            font-weight: 600;
        }
        
        td {
            padding: 10px 12px;
            border: 1px solid #dee2e6;
        }
        
        tr:hover {
            background: #f8f9fa;
        }
        
        .test-result {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 500;
            font-size: 0.9em;
        }
        
        .result-pass {
            background: #d4edda;
            color: #155724;
        }
        
        .result-fail {
            background: #f8d7da;
            color: #721c24;
        }
        
        .result-dna {
            background: #e2e3e5;
            color: #383d41;
        }
        
        .result-nt {
            background: #fff3cd;
            color: #856404;
        }
        
        .finding {
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .finding-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        
        .finding-title {
            font-size: 1.2em;
            font-weight: 600;
            color: #333;
        }
        
        .severity-badge {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .severity-critical {
            background: #dc3545;
            color: white;
        }
        
        .severity-major {
            background: #fd7e14;
            color: white;
        }
        
        .severity-minor {
            background: #ffc107;
            color: #333;
        }
        
        .remediation-item {
            background: #f8f9fa;
            border-left: 4px solid #28a745;
            padding: 15px;
            margin-bottom: 15px;
        }
        
        .priority-high {
            border-left-color: #dc3545;
        }
        
        .priority-medium {
            border-left-color: #ffc107;
        }
        
        .priority-low {
            border-left-color: #17a2b8;
        }
        
        .chart-container {
            position: relative;
            height: 300px;
            margin: 30px 0;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 30px 40px;
            text-align: center;
            color: #666;
        }
        
        @media print {
            .report-container {
                box-shadow: none;
            }
            
            .section {
                page-break-inside: avoid;
            }
            
            .finding {
                page-break-inside: avoid;
            }
        }
        
        @media (max-width: 768px) {
            .metadata {
                grid-template-columns: 1fr;
            }
            
            .summary-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
        `;
  }

  /**
   * Generate Report Header
   */
  generateReportHeader(data) {
    const date = new Date(data.metadata.reportDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return `
        <div class="header">
            <h1>Accessibility Conformance Report</h1>
            <div class="subtitle">Based on DHS Trusted Tester Process v${
              this.version
            }</div>
            
            <div class="metadata">
                <div class="metadata-item">
                    <span class="metadata-label">Page Title</span>
                    <span class="metadata-value">${
                      data.metadata.pageTitle
                    }</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">URL</span>
                    <span class="metadata-value">${
                      data.metadata.pageUrl || "N/A"
                    }</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Test Date</span>
                    <span class="metadata-value">${formattedDate}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Report ID</span>
                    <span class="metadata-value">${
                      data.metadata.reportId
                    }</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Conformance Target</span>
                    <span class="metadata-value">${
                      data.metadata.conformanceTarget
                    }</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Testing Scope</span>
                    <span class="metadata-value">${data.metadata.scope}</span>
                </div>
            </div>
        </div>
        `;
  }

  /**
   * Generate Executive Summary
   */
  generateExecutiveSummary(data) {
    const stats = data.summary;
    const conformanceClass = this.getConformanceClass(data.conformance.level);

    return `
        <div class="section">
            <h2 class="section-title">Executive Summary</h2>
            
            <div class="conformance-statement">
                <div class="conformance-level ${conformanceClass}">
                    ${data.conformance.level}
                </div>
                <p>${data.conformance.statement}</p>
            </div>
            
            <div class="summary-grid">
                <div class="summary-card">
                    <div class="summary-number">${stats.totalTests}</div>
                    <div class="summary-label">Total Tests</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number pass">${stats.testsPassed}</div>
                    <div class="summary-label">Passed</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number fail">${stats.testsFailed}</div>
                    <div class="summary-label">Failed</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number info">${
                      stats.testsNotApplicable
                    }</div>
                    <div class="summary-label">Not Applicable</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number warning">${
                      stats.testsNotTested
                    }</div>
                    <div class="summary-label">Not Tested</div>
                </div>
                <div class="summary-card">
                    <div class="summary-number ${
                      stats.passRate >= 80 ? "pass" : "fail"
                    }">${stats.passRate}%</div>
                    <div class="summary-label">Pass Rate</div>
                </div>
            </div>
            
            <div class="chart-container">
                <canvas id="summaryChart"></canvas>
            </div>
            
            ${this.generateKeyFindings(data)}
        </div>
        `;
  }

  /**
   * Generate Key Findings
   */
  generateKeyFindings(data) {
    const criticalCount = data.criticalIssues.length;
    const majorCount = data.summary.failuresBySeverity.major;
    const minorCount = data.summary.failuresBySeverity.minor;

    return `
        <div class="key-findings">
            <h3>Key Findings</h3>
            <ul>
                ${
                  criticalCount > 0
                    ? `
                <li><strong class="fail">Critical Issues (${criticalCount}):</strong> 
                    Issues that block conformance or create significant barriers.
                    ${data.criticalIssues
                      .map((issue) => issue.description)
                      .join("; ")}
                </li>`
                    : ""
                }
                
                ${
                  majorCount > 0
                    ? `
                <li><strong class="warning">Major Issues (${majorCount}):</strong> 
                    Significant accessibility problems affecting user experience.
                </li>`
                    : ""
                }
                
                ${
                  minorCount > 0
                    ? `
                <li><strong>Minor Issues (${minorCount}):</strong> 
                    Issues with minimal impact on accessibility.
                </li>`
                    : ""
                }
                
                <li><strong>Affected WCAG 2.1 Success Criteria:</strong> 
                    ${data.summary.affectedSuccessCriteria.length} criteria
                </li>
                
                <li><strong>Affected ICT Baselines:</strong> 
                    ${data.summary.affectedBaselines.length} baselines
                </li>
            </ul>
        </div>
        `;
  }

  /**
   * Generate Conformance Statement
   */
  generateConformanceStatement(data) {
    return `
        <div class="section">
            <h2 class="section-title">Conformance Statement</h2>
            
            <h3>Section 508 Conformance</h3>
            <p>${data.conformance.section508Statement}</p>
            
            <h3>WCAG 2.1 Level AA Conformance</h3>
            <p>${data.conformance.wcagStatement}</p>
            
            <h3>Conformance Exceptions</h3>
            ${
              data.conformance.exceptions.length > 0
                ? `
            <ul>
                ${data.conformance.exceptions
                  .map(
                    (exception) => `
                <li><strong>${exception.type}:</strong> ${exception.description}</li>
                `
                  )
                  .join("")}
            </ul>
            `
                : "<p>No exceptions identified.</p>"
            }
            
            <h3>Testing Methodology</h3>
            <p>This conformance evaluation was conducted using:</p>
            <ul>
                <li>DHS Trusted Tester Process Version ${this.version}</li>
                <li>WCAG 2.1 Success Criteria (Level A and AA)</li>
                <li>ICT Testing Baseline for Web (Version 3.0)</li>
                <li>Revised Section 508 Standards (January 2018)</li>
            </ul>
        </div>
        `;
  }

  /**
   * Generate Test Results Summary
   */
  generateTestResultsSummary(data) {
    const categories = this.groupResultsByCategory(data.testResults);

    return `
        <div class="section">
            <h2 class="section-title">Test Results by Category</h2>
            
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Tests</th>
                        <th>Passed</th>
                        <th>Failed</th>
                        <th>N/A</th>
                        <th>Not Tested</th>
                        <th>Pass Rate</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(categories)
                      .map(([category, results]) => {
                        const stats = this.calculateCategoryStats(results);
                        return `
                        <tr>
                            <td><strong>${this.getCategoryName(
                              category
                            )}</strong></td>
                            <td>${stats.total}</td>
                            <td><span class="pass">${stats.passed}</span></td>
                            <td><span class="fail">${stats.failed}</span></td>
                            <td>${stats.notApplicable}</td>
                            <td>${stats.notTested}</td>
                            <td>
                                <span class="${
                                  stats.passRate >= 80 ? "pass" : "fail"
                                }">
                                    ${stats.passRate}%
                                </span>
                            </td>
                        </tr>
                        `;
                      })
                      .join("")}
                </tbody>
            </table>
            
            <div class="chart-container">
                <canvas id="categoryChart"></canvas>
            </div>
        </div>
        `;
  }

  /**
   * Generate Detailed Findings
   */
  generateDetailedFindings(data) {
    const failedTests = data.testResults.filter((r) => r.outcome === "FAIL");
    const groupedFailures = this.groupFailuresBySeverity(failedTests);

    return `
        <div class="section">
            <h2 class="section-title">Detailed Findings</h2>
            
            ${
              groupedFailures.critical.length > 0
                ? `
            <h3>Critical Issues</h3>
            ${groupedFailures.critical
              .map((failure) => this.generateFindingCard(failure, "critical"))
              .join("")}
            `
                : ""
            }
            
            ${
              groupedFailures.major.length > 0
                ? `
            <h3>Major Issues</h3>
            ${groupedFailures.major
              .map((failure) => this.generateFindingCard(failure, "major"))
              .join("")}
            `
                : ""
            }
            
            ${
              groupedFailures.minor.length > 0
                ? `
            <h3>Minor Issues</h3>
            ${groupedFailures.minor
              .map((failure) => this.generateFindingCard(failure, "minor"))
              .join("")}
            `
                : ""
            }
        </div>
        `;
  }

  /**
   * Generate Finding Card
   */
  generateFindingCard(failure, severity) {
    const testInfo = this.getTestInfo(failure.testId);
    const wcagInfo = failure.wcagCriteria
      .map((sc) => `${sc}: ${this.wcagSuccessCriteria[sc]?.name || "Unknown"}`)
      .join(", ");

    return `
        <div class="finding">
            <div class="finding-header">
                <div class="finding-title">
                    ${failure.testId}: ${testInfo.name}
                </div>
                <span class="severity-badge severity-${severity}">${severity}</span>
            </div>
            
            <div class="finding-details">
                <p><strong>Test Condition:</strong> ${testInfo.condition}</p>
                <p><strong>Result:</strong> ${failure.notes}</p>
                
                ${
                  failure.failedElements && failure.failedElements.length > 0
                    ? `
                <p><strong>Affected Elements:</strong></p>
                <ul>
                    ${failure.failedElements
                      .slice(0, 5)
                      .map(
                        (el) => `
                    <li>${
                      el.selector || el.description || JSON.stringify(el)
                    }</li>
                    `
                      )
                      .join("")}
                    ${
                      failure.failedElements.length > 5
                        ? `<li><em>...and ${
                            failure.failedElements.length - 5
                          } more</em></li>`
                        : ""
                    }
                </ul>
                `
                    : ""
                }
                
                <p><strong>WCAG Success Criteria:</strong> ${
                  wcagInfo || "N/A"
                }</p>
                <p><strong>ICT Baseline:</strong> ${
                  failure.baselineId
                    ? `${failure.baselineId}: ${
                        this.baselineRequirements[failure.baselineId]
                      }`
                    : "N/A"
                }</p>
                
                <details>
                    <summary>Remediation Guidance</summary>
                    <div class="remediation-guidance">
                        ${this.getRemediationGuidance(failure.testId)}
                    </div>
                </details>
            </div>
        </div>
        `;
  }

  /**
   * Generate WCAG Compliance Table
   */
  generateWCAGComplianceTable(data) {
    const wcagResults = this.analyzeWCAGResults(data);

    return `
        <div class="section">
            <h2 class="section-title">WCAG 2.1 Compliance Details</h2>
            
            <table>
                <thead>
                    <tr>
                        <th>Success Criterion</th>
                        <th>Level</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Related Tests</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(wcagResults)
                      .map(([sc, result]) => {
                        const criterion = this.wcagSuccessCriteria[sc];
                        return `
                        <tr>
                            <td>${sc}</td>
                            <td>${criterion.level}</td>
                            <td>${criterion.name}</td>
                            <td>
                                <span class="test-result result-${result.status.toLowerCase()}">
                                    ${result.status}
                                </span>
                            </td>
                            <td>${result.tests.join(", ")}</td>
                        </tr>
                        `;
                      })
                      .join("")}
                </tbody>
            </table>
        </div>
        `;
  }

  /**
   * Generate Remediation Plan
   */
  generateRemediationPlan(data) {
    const remediationItems = this.prioritizeRemediation(data);

    return `
        <div class="section">
            <h2 class="section-title">Remediation Plan</h2>
            
            <p>The following remediation plan is prioritized based on impact, severity, and effort required:</p>
            
            <h3>High Priority (Address Immediately)</h3>
            ${remediationItems.high
              .map(
                (item) => `
            <div class="remediation-item priority-high">
                <h4>${item.title}</h4>
                <p><strong>Issue:</strong> ${item.issue}</p>
                <p><strong>Fix:</strong> ${item.fix}</p>
                <p><strong>Estimated Effort:</strong> ${item.effort}</p>
                <p><strong>Impact:</strong> ${item.impact}</p>
            </div>
            `
              )
              .join("")}
            
            <h3>Medium Priority (Address Soon)</h3>
            ${remediationItems.medium
              .map(
                (item) => `
            <div class="remediation-item priority-medium">
                <h4>${item.title}</h4>
                <p><strong>Issue:</strong> ${item.issue}</p>
                <p><strong>Fix:</strong> ${item.fix}</p>
                <p><strong>Estimated Effort:</strong> ${item.effort}</p>
            </div>
            `
              )
              .join("")}
            
            <h3>Low Priority (Address When Possible)</h3>
            ${remediationItems.low
              .map(
                (item) => `
            <div class="remediation-item priority-low">
                <h4>${item.title}</h4>
                <p><strong>Issue:</strong> ${item.issue}</p>
                <p><strong>Fix:</strong> ${item.fix}</p>
                <p><strong>Estimated Effort:</strong> ${item.effort}</p>
            </div>
            `
              )
              .join("")}
        </div>
        `;
  }

  /**
   * Generate Appendices
   */
  generateAppendices(data) {
    return `
        <div class="section">
            <h2 class="section-title">Appendices</h2>
            
            <h3>A. Testing Environment</h3>
            <ul>
                <li><strong>Testing Tools:</strong> ${data.metadata.testingTools.join(
                  ", "
                )}</li>
                <li><strong>Browsers Tested:</strong> Chrome 120+, Firefox 120+, Edge 120+</li>
                <li><strong>Screen Readers:</strong> JAWS 2024, NVDA 2023.3</li>
                <li><strong>Operating System:</strong> Windows 11</li>
            </ul>
            
            <h3>B. Glossary</h3>
            <dl>
                <dt>WCAG</dt>
                <dd>Web Content Accessibility Guidelines</dd>
                
                <dt>Section 508</dt>
                <dd>U.S. federal law requiring accessible electronic and information technology</dd>
                
                <dt>ICT</dt>
                <dd>Information and Communication Technology</dd>
                
                <dt>VPAT</dt>
                <dd>Voluntary Product Accessibility Template</dd>
                
                <dt>DNA</dt>
                <dd>Does Not Apply - Test condition not present</dd>
                
                <dt>NT</dt>
                <dd>Not Tested - Test not performed</dd>
            </dl>
            
            <h3>C. References</h3>
            <ul>
                <li><a href="https://www.dhs.gov/508-tools">DHS Section 508 Compliance Testing Tools</a></li>
                <li><a href="https://www.w3.org/WAI/WCAG21/quickref/">WCAG 2.1 Quick Reference</a></li>
                <li><a href="https://www.access-board.gov/ict/">Revised Section 508 Standards</a></li>
                <li><a href="https://section508.gov/">Section508.gov</a></li>
            </ul>
        </div>
        
        <div class="footer">
            <p>Generated by Trusted Tester Report Generator v${this.version}</p>
            <p>Report ID: ${
              data.metadata.reportId
            } | ${new Date().toISOString()}</p>
            <p>© ${new Date().getFullYear()} - Confidential Accessibility Assessment</p>
        </div>
        `;
  }

  /**
   * Get Report Scripts
   */
  getReportScripts(data) {
    return `
        // Summary Chart
        const summaryCtx = document.getElementById('summaryChart');
        if (summaryCtx) {
            new Chart(summaryCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Passed', 'Failed', 'Not Applicable', 'Not Tested'],
                    datasets: [{
                        data: [
                            ${data.summary.testsPassed},
                            ${data.summary.testsFailed},
                            ${data.summary.testsNotApplicable},
                            ${data.summary.testsNotTested}
                        ],
                        backgroundColor: [
                            '#28a745',
                            '#dc3545',
                            '#6c757d',
                            '#ffc107'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Test Results Distribution'
                        }
                    }
                }
            });
        }
        
        // Category Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            const categories = ${JSON.stringify(
              this.getCategoryChartData(data)
            )};
            new Chart(categoryCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: categories.labels,
                    datasets: [
                        {
                            label: 'Passed',
                            data: categories.passed,
                            backgroundColor: '#28a745'
                        },
                        {
                            label: 'Failed',
                            data: categories.failed,
                            backgroundColor: '#dc3545'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Results by Test Category'
                        }
                    }
                }
            });
        }
        `;
  }

  /**
   * Helper Methods
   */

  generateReportId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 9);
    return `TR-${timestamp}-${random}`.toUpperCase();
  }

  calculateConformance(evaluationData) {
    const summary = evaluationData.summary || {};
    const criticalFailures = evaluationData.criticalIssues || [];

    let level = "Not Conformant";
    let statement = "";
    let wcagStatement = "";
    let section508Statement = "";
    let exceptions = [];

    if (criticalFailures.length > 0) {
      level = "Not Conformant (Critical Failures)";
      statement =
        "The tested content contains critical accessibility failures that must be resolved.";
      wcagStatement =
        "Does not meet WCAG 2.1 Level AA due to critical failures.";
      section508Statement =
        "Does not conform to Revised Section 508 standards.";
    } else if (summary.testsFailed === 0 && summary.testsNotTested === 0) {
      level = "Fully Conformant";
      statement =
        "The tested content meets all applicable accessibility requirements.";
      wcagStatement =
        "Meets WCAG 2.1 Level AA for all tested success criteria.";
      section508Statement = "Conforms to Revised Section 508 standards.";
    } else if (summary.testsFailed > 0 && summary.testsFailed <= 3) {
      level = "Partially Conformant";
      statement =
        "The tested content is partially conformant with minor issues identified.";
      wcagStatement =
        "Partially meets WCAG 2.1 Level AA with specific exceptions.";
      section508Statement =
        "Partially conforms to Revised Section 508 standards.";
    } else if (summary.testsFailed > 3) {
      level = "Not Conformant";
      statement =
        "The tested content does not meet accessibility requirements.";
      wcagStatement = "Does not meet WCAG 2.1 Level AA.";
      section508Statement =
        "Does not conform to Revised Section 508 standards.";
    }

    return {
      level,
      statement,
      wcagStatement,
      section508Statement,
      exceptions,
    };
  }

  identifyCriticalIssues(evaluationData) {
    const criticalTestIds = ["3.A", "4.C", "8.A"]; // Non-Interference
    const critical = [];

    (evaluationData.results || []).forEach((result) => {
      if (
        criticalTestIds.includes(result.testId) &&
        result.outcome === "FAIL"
      ) {
        critical.push({
          testId: result.testId,
          description: result.notes,
          impact: "Blocks all conformance claims",
        });
      }
    });

    return critical;
  }

  isCriticalFailure(testId) {
    return ["3.A", "4.C", "8.A"].includes(testId);
  }

  isMajorFailure(testId) {
    const majorTests = [
      "4.A",
      "4.D",
      "4.F",
      "5.A",
      "5.C",
      "7.A",
      "10.B",
      "10.C",
      "12.A",
      "13.C",
    ];
    return majorTests.includes(testId);
  }

  getConformanceClass(level) {
    if (level.includes("Fully Conformant")) return "conformant";
    if (level.includes("Partially")) return "partially-conformant";
    return "non-conformant";
  }

  getCategoryName(categoryId) {
    const categoryNames = {
      1: "1. Conforming Alternate Version",
      2: "2. Auto-Playing Content",
      3: "3. Flashing",
      4: "4. Keyboard Access and Focus",
      5: "5. Forms",
      6: "6. Links",
      7: "7. Images",
      8: "8. Time Limits",
      9: "9. Repetitive Content",
      10: "10. Content Structure",
      11: "11. Language",
      12: "12. Page Titles and Frames",
      13: "13. Sensory and Contrast",
      14: "14. Tables",
      15: "15. CSS Positioning",
      16: "16. Audio/Video",
      17: "17. Synchronized Media",
      18: "18. Resize Text",
      19: "19. Multiple Ways",
      20: "20. Parsing",
    };
    return categoryNames[categoryId] || `Category ${categoryId}`;
  }

  getTestInfo(testId) {
    // This would be populated from test-database.js
    const testDatabase = {
      "4.A": {
        name: "Keyboard Access",
        condition: "All functionality accessible via keyboard",
      },
      "4.C": {
        name: "No Keyboard Trap",
        condition: "No keyboard traps present",
      },
      "12.A": {
        name: "Page Title Defined",
        condition: "Page has a descriptive title element",
      },
      // ... more test definitions
    };

    return (
      testDatabase[testId] || {
        name: testId,
        condition: "Test condition",
      }
    );
  }

  getRemediationGuidance(testId) {
    const guidance = {
      "4.A": `
                <p><strong>How to fix:</strong></p>
                <ul>
                    <li>Ensure all interactive elements can receive keyboard focus</li>
                    <li>Add tabindex="0" to clickable elements that aren't naturally focusable</li>
                    <li>Implement keyboard event handlers alongside mouse events</li>
                    <li>Test with Tab, Enter, Space, and Arrow keys</li>
                </ul>
            `,
      "12.A": `
                <p><strong>How to fix:</strong></p>
                <ul>
                    <li>Add a descriptive &lt;title&gt; element in the &lt;head&gt; section</li>
                    <li>Ensure title describes the page purpose or topic</li>
                    <li>Include site name after page description</li>
                    <li>Keep titles unique across pages</li>
                </ul>
            `,
      // ... more remediation guidance
    };

    return (
      guidance[testId] ||
      "<p>Refer to WCAG guidelines for remediation steps.</p>"
    );
  }

  groupResultsByCategory(results) {
    const grouped = {};
    results.forEach((result) => {
      const category = result.testId.split(".")[0];
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(result);
    });
    return grouped;
  }

  calculateCategoryStats(results) {
    const stats = {
      total: results.length,
      passed: 0,
      failed: 0,
      notApplicable: 0,
      notTested: 0,
      passRate: 0,
    };

    results.forEach((result) => {
      switch (result.outcome) {
        case "PASS":
          stats.passed++;
          break;
        case "FAIL":
          stats.failed++;
          break;
        case "DOES NOT APPLY":
          stats.notApplicable++;
          break;
        case "NOT TESTED":
          stats.notTested++;
          break;
      }
    });

    const completed = stats.passed + stats.failed;
    stats.passRate =
      completed > 0 ? Math.round((stats.passed / completed) * 100) : 0;

    return stats;
  }

  groupFailuresBySeverity(failures) {
    return {
      critical: failures.filter((f) => this.isCriticalFailure(f.testId)),
      major: failures.filter(
        (f) =>
          this.isMajorFailure(f.testId) && !this.isCriticalFailure(f.testId)
      ),
      minor: failures.filter(
        (f) =>
          !this.isCriticalFailure(f.testId) && !this.isMajorFailure(f.testId)
      ),
    };
  }

  analyzeWCAGResults(data) {
    const wcagResults = {};

    // Initialize all WCAG criteria
    Object.keys(this.wcagSuccessCriteria).forEach((sc) => {
      wcagResults[sc] = {
        status: "NT",
        tests: [],
      };
    });

    // Map test results to WCAG criteria
    data.testResults.forEach((result) => {
      if (result.wcagCriteria) {
        result.wcagCriteria.forEach((sc) => {
          if (!wcagResults[sc]) {
            wcagResults[sc] = { status: "NT", tests: [] };
          }
          wcagResults[sc].tests.push(result.testId);

          // Update status based on test outcome
          if (result.outcome === "FAIL") {
            wcagResults[sc].status = "FAIL";
          } else if (
            result.outcome === "PASS" &&
            wcagResults[sc].status !== "FAIL"
          ) {
            wcagResults[sc].status = "PASS";
          }
        });
      }
    });

    return wcagResults;
  }

  analyzeWCAGCompliance(evaluationData) {
    // Implementation for WCAG analysis
    return {};
  }

  analyzeSection508Compliance(evaluationData) {
    // Implementation for Section 508 analysis
    return {};
  }

  organizeTestResults(evaluationData) {
    return evaluationData.results || [];
  }

  generateRecommendations(evaluationData) {
    // Implementation for recommendations
    return [];
  }

  generateChartData(evaluationData) {
    // Implementation for chart data
    return {};
  }

  getCategoryChartData(data) {
    const categories = this.groupResultsByCategory(data.testResults);
    const labels = [];
    const passed = [];
    const failed = [];

    Object.entries(categories).forEach(([category, results]) => {
      const stats = this.calculateCategoryStats(results);
      labels.push(this.getCategoryName(category).split(".")[1].trim());
      passed.push(stats.passed);
      failed.push(stats.failed);
    });

    return { labels, passed, failed };
  }

  prioritizeRemediation(data) {
    const high = [];
    const medium = [];
    const low = [];

    // Prioritize based on test failures
    data.testResults
      .filter((r) => r.outcome === "FAIL")
      .forEach((failure) => {
        const item = {
          title: `Fix ${failure.testId}`,
          issue: failure.notes,
          fix: this.getRemediationGuidance(failure.testId),
          effort: "Medium",
          impact: "High",
        };

        if (this.isCriticalFailure(failure.testId)) {
          high.push(item);
        } else if (this.isMajorFailure(failure.testId)) {
          medium.push(item);
        } else {
          low.push(item);
        }
      });

    return { high, medium, low };
  }

  /**
   * Generate VPAT Report
   */
  generateVPATReport(data, format) {
    // VPAT-specific report generation
    return this.generateDetailedHTMLReport(data); // Simplified for now
  }

  /**
   * Generate Excel Data
   */
  generateExcelData(data) {
    // Format data for Excel export
    return {
      sheets: {
        Summary: this.formatSummarySheet(data),
        "Test Results": this.formatTestResultsSheet(data),
        "WCAG Compliance": this.formatWCAGSheet(data),
        Remediation: this.formatRemediationSheet(data),
      },
    };
  }

  formatSummarySheet(data) {
    return [
      ["Accessibility Conformance Report"],
      ["Generated", new Date().toLocaleString()],
      [""],
      ["Page Title", data.metadata.pageTitle],
      ["URL", data.metadata.pageUrl],
      ["Conformance Level", data.conformance.level],
      [""],
      ["Test Summary"],
      ["Total Tests", data.summary.totalTests],
      ["Passed", data.summary.testsPassed],
      ["Failed", data.summary.testsFailed],
      ["Not Applicable", data.summary.testsNotApplicable],
      ["Not Tested", data.summary.testsNotTested],
      ["Pass Rate", `${data.summary.passRate}%`],
    ];
  }

  formatTestResultsSheet(data) {
    const headers = ["Test ID", "Test Name", "Outcome", "WCAG SC", "Notes"];
    const rows = data.testResults.map((result) => [
      result.testId,
      this.getTestInfo(result.testId).name,
      result.outcome,
      result.wcagCriteria.join(", "),
      result.notes,
    ]);
    return [headers, ...rows];
  }

  formatWCAGSheet(data) {
    // Format WCAG compliance data for Excel
    return [];
  }

  formatRemediationSheet(data) {
    // Format remediation plan for Excel
    return [];
  }

  /**
   * Generate Executive Report
   */
  generateExecutiveReport(data, format) {
    // Simplified executive summary
    return this.generateDetailedHTMLReport(data);
  }

  /**
   * Generate Technical Report
   */
  generateTechnicalReport(data, format) {
    // Detailed technical report
    return this.generateDetailedHTMLReport(data);
  }

  /**
   * Generate Remediation Report
   */
  generateRemediationReport(data, format) {
    // Focused remediation report
    return this.generateDetailedHTMLReport(data);
  }

  /**
   * Generate Summary Report
   */
  generateSummaryReport(data, format) {
    // Brief summary report
    return this.generateDetailedHTMLReport(data);
  }

  /**
   * Generate Markdown Report
   */
  generateMarkdownReport(data) {
    return `
# Accessibility Conformance Report

## Page: ${data.metadata.pageTitle}
**URL:** ${data.metadata.pageUrl}  
**Test Date:** ${new Date(data.metadata.reportDate).toLocaleDateString()}  
**Conformance Level:** ${data.conformance.level}

## Summary
- **Total Tests:** ${data.summary.totalTests}
- **Passed:** ${data.summary.testsPassed}
- **Failed:** ${data.summary.testsFailed}
- **Pass Rate:** ${data.summary.passRate}%

## Critical Issues
${data.criticalIssues.map((issue) => `- ${issue.description}`).join("\n")}

## Recommendations
${data.recommendations.map((rec) => `1. ${rec}`).join("\n")}
        `;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = TrustedTesterReportGenerator;
}

// Make available globally in browser
if (typeof window !== "undefined") {
  window.TrustedTesterReportGenerator = TrustedTesterReportGenerator;
}
