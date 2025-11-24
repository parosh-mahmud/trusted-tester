// Test Process Management
class TestProcessor {
  constructor() {
    this.currentTest = null;
    this.testResults = new Map();
    this.currentCategory = null;
    this.pageUrl = "";
  }

  // Initialize test categories
  initializeCategories() {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = "";

    TestDatabase.categories.forEach((category) => {
      const categoryElement = this.createCategoryElement(category);
      categoryList.appendChild(categoryElement);
    });
  }

  // Create category UI element
  createCategoryElement(category) {
    const div = document.createElement("div");
    div.className = "category-item";
    div.dataset.categoryId = category.id;

    const completedTests = this.getCompletedTestsForCategory(category.id);
    const totalTests = category.tests.length;

    div.innerHTML = `
            <div class="category-header" onclick="testProcessor.selectCategory(${
              category.id
            })">
                <span class="category-number">${category.id}</span>
                <span class="category-name">${category.name}</span>
                <span class="category-progress">${completedTests}/${totalTests}</span>
            </div>
            <div class="category-tests" id="category-tests-${
              category.id
            }" style="display: none;">
                ${category.tests
                  .map((testId) => this.createTestItem(testId))
                  .join("")}
            </div>
        `;

    return div;
  }

  // Create individual test item
  createTestItem(testId) {
    const test = TestDatabase.tests[testId];

    // Skip if test definition doesn't exist
    if (!test) {
      console.warn(`Test ${testId} not found in database`);
      return '';
    }

    const result = this.testResults.get(testId);
    const statusClass = result ? `test-${result.status}` : "";
    const statusIcon = this.getStatusIcon(result?.status);

    return `
            <div class="test-item ${statusClass}" onclick="testProcessor.loadTest('${testId}')">
                <span class="test-id">${testId}</span>
                <span class="test-name">${test.title}</span>
                <span class="test-status">${statusIcon}</span>
            </div>
        `;
  }

  // Get status icon
  getStatusIcon(status) {
    const icons = {
      pass: "✅",
      fail: "❌",
      dna: "➖",
      "not-tested": "⏭️",
    };
    return icons[status] || "";
  }

  // Select category
  selectCategory(categoryId) {
    // Toggle category expansion
    const allCategories = document.querySelectorAll(".category-tests");
    allCategories.forEach((cat) => (cat.style.display = "none"));

    const selectedCategory = document.getElementById(
      `category-tests-${categoryId}`
    );
    if (selectedCategory) {
      selectedCategory.style.display =
        selectedCategory.style.display === "none" ? "block" : "none";
    }

    this.currentCategory = categoryId;
  }

  // Load specific test
  loadTest(testId) {
    const test = TestDatabase.tests[testId];
    if (!test) return;

    this.currentTest = test;
    this.displayTest(test);
  }

  // Display test details
  displayTest(test) {
    // Update test title
    document.getElementById(
      "currentTestTitle"
    ).textContent = `Test ${test.id}: ${test.title}`;

    // Update test meta
    document.getElementById("testMeta").innerHTML = `
            <span class="badge">${test.wcag}</span>
            <span class="badge">${test.name}</span>
        `;

    // Update test content
    const testContent = document.getElementById("testContent");
    testContent.innerHTML = `
            <div class="test-details">
                <div class="test-section">
                    <h3>Test Condition</h3>
                    <p>${test.description}</p>
                </div>
                
                <div class="test-section">
                    <h3>How to Test</h3>
                    <p>${test.howToTest}</p>
                    
                    ${
                      test.instructions
                        ? `
                    <h4>Step-by-Step Instructions:</h4>
                    <ol>
                        ${test.instructions
                          .map((step) => `<li>${step}</li>`)
                          .join("")}
                    </ol>
                    `
                        : ""
                    }
                </div>
                
                <div class="test-section">
                    <h3>Pass Condition</h3>
                    <div class="condition-box pass">
                        ${test.passCondition}
                    </div>
                </div>
                
                <div class="test-section">
                    <h3>Fail Condition</h3>
                    <div class="condition-box fail">
                        ${test.failCondition}
                    </div>
                </div>
                
                ${
                  test.notApplicable
                    ? `
                <div class="test-section">
                    <h3>Not Applicable When</h3>
                    <div class="condition-box dna">
                        ${test.notApplicable}
                    </div>
                </div>
                `
                    : ""
                }
                
                ${
                  test.tools
                    ? `
                <div class="test-section">
                    <h3>Required Tools</h3>
                    <ul class="tool-list">
                        ${test.tools.map((tool) => `<li>${tool}</li>`).join("")}
                    </ul>
                </div>
                `
                    : ""
                }
                
                ${
                  test.keyboardCommands
                    ? `
                <div class="test-section">
                    <h3>Keyboard Commands</h3>
                    <table class="keyboard-table">
                        ${Object.entries(test.keyboardCommands)
                          .map(
                            ([key, desc]) => `
                        <tr>
                            <td><kbd>${key}</kbd></td>
                            <td>${desc}</td>
                        </tr>
                        `
                          )
                          .join("")}
                    </table>
                </div>
                `
                    : ""
                }
                
                ${
                  test.exceptions
                    ? `
                <div class="test-section">
                    <h3>Exceptions</h3>
                    <ul>
                        ${test.exceptions
                          .map((ex) => `<li>${ex}</li>`)
                          .join("")}
                    </ul>
                </div>
                `
                    : ""
                }
                
                ${
                  test.note || test.criticalFail
                    ? `
                <div class="test-section">
                    <h3>Important Notes</h3>
                    <div class="warning-box">
                        ${
                          test.criticalFail
                            ? "<p><strong>⚠️ Critical Failure:</strong> This is a Non-Interference failure that blocks conformance.</p>"
                            : ""
                        }
                        ${test.note ? `<p>${test.note}</p>` : ""}
                    </div>
                </div>
                `
                    : ""
                }
            </div>
        `;

    // Show test controls
    document.getElementById("testControls").style.display = "flex";
  }

  // Record test result
  recordResult(testId, status, notes = "") {
    this.testResults.set(testId, {
      testId,
      status,
      notes,
      timestamp: new Date().toISOString(),
      url: this.pageUrl,
    });

    this.updateProgress();
    this.refreshCategoryDisplay();

    // Auto-advance to next test
    if (this.currentCategory) {
      this.advanceToNextTest();
    }
  }

  // Advance to next test in category
  advanceToNextTest() {
    const category = TestDatabase.categories.find(
      (c) => c.id === this.currentCategory
    );
    if (!category) return;

    const currentIndex = category.tests.indexOf(this.currentTest.id);
    if (currentIndex < category.tests.length - 1) {
      const nextTestId = category.tests[currentIndex + 1];
      this.loadTest(nextTestId);
    } else {
      // Move to next category if available
      const nextCategory = TestDatabase.categories.find(
        (c) => c.id === this.currentCategory + 1
      );
      if (nextCategory) {
        this.selectCategory(nextCategory.id);
        this.loadTest(nextCategory.tests[0]);
      }
    }
  }

  // Update overall progress
  updateProgress() {
    const totalTests = Object.keys(TestDatabase.tests).length;
    const completedTests = this.testResults.size;

    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    const percentage = (completedTests / totalTests) * 100;
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${completedTests}/${totalTests} Tests Complete`;
  }

  // Refresh category display
  refreshCategoryDisplay() {
    this.initializeCategories();
    if (this.currentCategory) {
      document.getElementById(
        `category-tests-${this.currentCategory}`
      ).style.display = "block";
    }
  }

  // Get completed tests for category
  getCompletedTestsForCategory(categoryId) {
    const category = TestDatabase.categories.find((c) => c.id === categoryId);
    if (!category) return 0;

    return category.tests.filter((testId) => this.testResults.has(testId))
      .length;
  }

  // Export results
  exportResults() {
    const results = Array.from(this.testResults.values());
    return {
      url: this.pageUrl,
      timestamp: new Date().toISOString(),
      totalTests: Object.keys(TestDatabase.tests).length,
      completedTests: results.length,
      results: results,
      summary: this.generateSummary(results),
    };
  }

  // Generate summary
  generateSummary(results) {
    // If no results passed, use internal testResults
    if (!results) {
      results = Array.from(this.testResults.values());
    }

    const summary = {
      totalTests: Object.keys(TestDatabase.tests).length,
      passed: 0,
      failed: 0,
      dna: 0,
      notTested: 0,
      completion: 0,
      results: []
    };

    results.forEach((result) => {
      const test = TestDatabase.tests[result.testId];

      // Add to results array for display
      summary.results.push({
        testId: result.testId,
        testName: test ? test.title : result.testId,
        status: result.status,
        notes: result.notes,
        timestamp: result.timestamp
      });

      // Count by status
      switch (result.status) {
        case "pass":
          summary.passed++;
          break;
        case "fail":
          summary.failed++;
          break;
        case "dna":
          summary.dna++;
          break;
        case "not-tested":
          summary.notTested++;
          break;
      }
    });

    // Calculate completion percentage
    summary.completion = summary.totalTests > 0
      ? Math.round((results.length / summary.totalTests) * 100)
      : 0;

    return summary;
  }
}

// Test processor will be initialized by main.js
// Do not initialize here to avoid conflicts
