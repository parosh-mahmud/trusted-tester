// Trusted Tester v5.1.3 Complete Test Database
const TestDatabase = {
  categories: [
    {
      id: 1,
      name: "Conforming Alternate Version",
      tests: ["1.A", "1.B", "1.C", "1.D"],
    },
    {
      id: 2,
      name: "Auto-Playing and Auto-Updating Content",
      tests: ["2.A", "2.B"],
    },
    {
      id: 3,
      name: "Flashing",
      tests: ["3.A"],
    },
    {
      id: 4,
      name: "Keyboard Access and Focus",
      tests: ["4.A", "4.B", "4.C", "4.D", "4.E", "4.F", "4.G"],
    },
    {
      id: 5,
      name: "Forms",
      tests: ["5.A", "5.B", "5.C", "5.D", "5.E", "5.F", "5.G", "5.H", "5.I"],
    },
    {
      id: 6,
      name: "Links and Buttons",
      tests: ["6.A", "6.B"],
    },
    {
      id: 7,
      name: "Images",
      tests: ["7.A", "7.B", "7.C", "7.D"],
    },
    {
      id: 8,
      name: "Adjustable Time Limits",
      tests: ["8.A"],
    },
    {
      id: 9,
      name: "Repetitive Content",
      tests: ["9.A", "9.B", "9.C"],
    },
    {
      id: 10,
      name: "Content Structure",
      tests: ["10.A", "10.B", "10.C", "10.D"],
    },
    {
      id: 11,
      name: "Language",
      tests: ["11.A", "11.B"],
    },
    {
      id: 12,
      name: "Page Titles, Frames, and iFrames",
      tests: ["12.A", "12.B", "12.C", "12.D"],
    },
    {
      id: 13,
      name: "Sensory Characteristics and Contrast",
      tests: ["13.A", "13.B", "13.C"],
    },
    {
      id: 14,
      name: "Tables",
      tests: ["14.A", "14.B", "14.C"],
    },
    {
      id: 15,
      name: "CSS Content and Positioning",
      tests: ["15.A", "15.B"],
    },
    {
      id: 16,
      name: "Pre-Recorded Audio-Only and Video-Only",
      tests: ["16.A", "16.B"],
    },
    {
      id: 17,
      name: "Synchronized Media",
      tests: ["17.A", "17.B", "17.C", "17.D"],
    },
    {
      id: 18,
      name: "Resize Text",
      tests: ["18.A"],
    },
    {
      id: 19,
      name: "Multiple Ways",
      tests: ["19.A"],
    },
    {
      id: 20,
      name: "Parsing",
      tests: ["20.A"],
    },
  ],

  tests: {
    // Category 1: Conforming Alternate Version
    "1.A": {
      id: "1.A",
      name: "alt-version-conformant",
      title: "Conforming Alternate Version Conformant",
      wcag: "WCAG Conformance Requirement 1",
      description:
        "The alternate version is at least as accessible as the non-conforming version.",
      instructions: [
        "Identify if the page has a conforming alternate version",
        "Test the alternate version for all applicable Section 508 standards",
        "Compare accessibility of both versions",
        "Verify the alternate provides same information and functionality",
      ],
      howToTest:
        "Navigate to the alternate version and perform all applicable tests. Compare results with the primary version.",
      passCondition:
        "The alternate version passes all applicable Section 508 tests and provides equivalent functionality.",
      failCondition:
        "The alternate version has accessibility issues or lacks equivalent functionality.",
      notApplicable: "No alternate version is provided or claimed.",
    },

    // Category 4: Keyboard Access and Focus
    "4.A": {
      id: "4.A",
      name: "2.1.1-keyboard-access",
      title: "Keyboard Access",
      wcag: "SC 2.1.1 Keyboard",
      description: "All functionality is available from a keyboard.",
      instructions: [
        "Identify all interactive elements on the page",
        "Test each element using only keyboard navigation",
        "Use Tab, Shift+Tab, Enter, Space, and arrow keys",
        "Verify all functions can be accessed and activated",
        "Check for any mouse-only interactions",
      ],
      howToTest:
        "Put away the mouse. Use only keyboard to navigate and activate all page functions.",
      passCondition:
        "All interactive elements can be accessed and operated using only the keyboard.",
      failCondition:
        "Any functionality requires use of a mouse or cannot be accessed via keyboard.",
      tools: ["Keyboard", "ANDI"],
      keyboardCommands: {
        Tab: "Move to next focusable element",
        "Shift+Tab": "Move to previous focusable element",
        Enter: "Activate links and buttons",
        Space: "Activate buttons, checkboxes",
        "Arrow Keys": "Navigate within components",
      },
    },

    "4.B": {
      id: "4.B",
      name: "2.1.1-no-keystroke-timing",
      title: "No Keystroke Timing",
      wcag: "SC 2.1.1 Keyboard",
      description: "Individual keystrokes do not require specific timing.",
      instructions: [
        "Test all keyboard interactions",
        "Check if any require specific timing between keystrokes",
        "Verify no time limits on individual keystrokes",
      ],
      howToTest:
        "Use keyboard navigation at varying speeds. Check if timing affects functionality.",
      passCondition:
        "No keyboard interaction requires specific timing between keystrokes.",
      failCondition:
        "User must perform keystrokes within specific time limits.",
    },

    "4.C": {
      id: "4.C",
      name: "2.1.2-no-keyboard-trap",
      title: "No Keyboard Trap",
      wcag: "SC 2.1.2 No Keyboard Trap",
      description: "Keyboard focus can be moved away from any component.",
      instructions: [
        "Tab through all focusable elements",
        "Check each component for keyboard traps",
        "Test modal dialogs and embedded content",
        "Verify escape methods are available and documented",
      ],
      howToTest:
        "Navigate to each interactive element and ensure you can navigate away using standard keys.",
      passCondition:
        "Focus can be moved away from all elements using standard navigation or documented method.",
      failCondition:
        "Focus becomes trapped with no way to escape using keyboard.",
      criticalFail: true,
      note: "This is a Non-Interference Failure - blocks conformance claim",
    },

    "4.D": {
      id: "4.D",
      name: "2.4.7-focus-visible",
      title: "Focus Visible",
      wcag: "SC 2.4.7 Focus Visible",
      description: "Keyboard focus indicator is visible.",
      instructions: [
        "Tab through all focusable elements",
        "Verify each shows a visible focus indicator",
        "Check contrast of focus indicator",
        "Note any custom focus styles",
      ],
      howToTest:
        "Use Tab key to move through page. Observe if current focus location is clearly visible.",
      passCondition:
        "All interactive elements show visible focus indicator when focused.",
      failCondition: "Focus indicator is missing or not clearly visible.",
    },

    "4.E": {
      id: "4.E",
      name: "3.2.1-on-focus",
      title: "On Focus",
      wcag: "SC 3.2.1 On Focus",
      description: "Components do not initiate change of context on focus.",
      instructions: [
        "Tab to each focusable element",
        "Observe if receiving focus causes unexpected changes",
        "Check for automatic form submissions",
        "Check for unexpected navigation",
      ],
      howToTest:
        "Tab through all elements. Note if focus alone triggers context changes.",
      passCondition:
        "No component initiates context change when receiving focus.",
      failCondition:
        "Receiving focus causes form submission, navigation, or major content change.",
    },

    "4.F": {
      id: "4.F",
      name: "2.4.3-focus-order-meaning",
      title: "Focus Order",
      wcag: "SC 2.4.3 Focus Order",
      description: "Focus order preserves meaning and operability.",
      instructions: [
        "Tab through entire page",
        "Verify focus order matches visual layout",
        "Check if order preserves relationships",
        "Ensure order is logical and intuitive",
      ],
      howToTest:
        "Tab through page and verify focus moves in logical order that preserves meaning.",
      passCondition:
        "Focus order is logical and preserves meaning and relationships.",
      failCondition: "Focus jumps randomly or illogically through page.",
    },

    "4.G": {
      id: "4.G",
      name: "2.4.3-focus-order-reveal",
      title: "Focus Order Reveals Content",
      wcag: "SC 2.4.3 Focus Order",
      description: "Focus order reveals content at appropriate time.",
      instructions: [
        "Check expandable/collapsible content",
        "Verify focus moves appropriately when content is revealed",
        "Test modal dialogs and overlays",
      ],
      howToTest: "Interact with dynamic content and verify focus behavior.",
      passCondition:
        "Focus moves appropriately when content is revealed or hidden.",
      failCondition:
        "Focus order doesn't account for dynamically revealed content.",
    },

    // Category 5: Forms
    "5.A": {
      id: "5.A",
      name: "2.4.6-label-descriptive",
      title: "Labels Descriptive",
      wcag: "SC 2.4.6 Headings and Labels",
      description: "Form labels are descriptive.",
      instructions: [
        "Review all form field labels",
        "Verify labels clearly describe purpose",
        "Check for ambiguous labels",
        "Ensure labels include format requirements",
      ],
      howToTest:
        "Read each label and verify it clearly describes what information to enter.",
      passCondition:
        "All labels clearly describe the form field purpose and requirements.",
      failCondition:
        "Labels are missing, ambiguous, or don't describe the field purpose.",
    },

    "5.B": {
      id: "5.B",
      name: "1.3.1-label-provided",
      title: "Labels Provided",
      wcag: "SC 1.3.1 Info and Relationships",
      description: "Labels or instructions are provided for user input.",
      instructions: [
        "Check all form inputs have visible labels",
        "Verify instructions are provided where needed",
        "Check for placeholder text used as labels",
      ],
      howToTest:
        "Visually inspect form to ensure all fields have visible labels or instructions.",
      passCondition: "All form inputs have visible labels or instructions.",
      failCondition:
        "Form inputs lack visible labels or necessary instructions.",
    },

    "5.C": {
      id: "5.C",
      name: "1.3.1-programmatic-label",
      title: "Programmatic Labels",
      wcag: "SC 1.3.1 Info and Relationships",
      description: "Labels are programmatically associated with form fields.",
      instructions: [
        "Launch ANDI: focusable elements",
        "Check each form field's ANDI Output",
        "Verify all labels and instructions are included",
        "Check for proper use of label, aria-label, aria-labelledby",
      ],
      howToTest:
        "Use ANDI to verify each field has programmatically associated label with all instructions.",
      passCondition:
        "All form fields have properly associated labels including all relevant instructions.",
      failCondition:
        "Labels not programmatically associated or missing important information.",
      tools: ["ANDI: focusable elements"],
    },

    "5.D": {
      id: "5.D",
      name: "3.3.2-label-provided",
      title: "Labels or Instructions",
      wcag: "SC 3.3.2 Labels or Instructions",
      description:
        "Labels or instructions are provided when content requires user input.",
      instructions: [
        "Identify all user input fields",
        "Verify each has label or instruction",
        "Check for format requirements",
        "Verify required fields are indicated",
      ],
      howToTest:
        "Review all inputs to ensure adequate labels or instructions are present.",
      passCondition: "All user inputs have sufficient labels or instructions.",
      failCondition: "User inputs lack necessary labels or instructions.",
    },

    "5.E": {
      id: "5.E",
      name: "1.4.1-color-in-label",
      title: "Color Not Sole Indicator",
      wcag: "SC 1.4.1 Use of Color",
      description: "Color is not the only means of indicating required fields.",
      instructions: [
        "Check how required fields are indicated",
        "Verify not using color alone",
        "Look for text indicators or symbols",
      ],
      howToTest:
        "Review form to ensure required fields are not indicated by color alone.",
      passCondition:
        "Required fields use text, symbols, or other non-color indicators.",
      failCondition:
        "Required fields indicated only by color (e.g., red labels).",
    },

    "5.F": {
      id: "5.F",
      name: "3.3.1-error-identification",
      title: "Error Identification",
      wcag: "SC 3.3.1 Error Identification",
      description: "Input errors are identified and described in text.",
      instructions: [
        "Submit form with errors",
        "Check if errors are identified",
        "Verify error messages describe the problem",
        "Check programmatic association of errors",
      ],
      howToTest:
        "Submit form with intentional errors and verify error identification and description.",
      passCondition:
        "All errors are identified and described in text to the user.",
      failCondition:
        "Errors not identified or only indicated through color/visual cues.",
    },

    "5.G": {
      id: "5.G",
      name: "3.3.3-error-suggestion",
      title: "Error Suggestion",
      wcag: "SC 3.3.3 Error Suggestion",
      description: "Suggestions for correction are provided for input errors.",
      instructions: [
        "Trigger form validation errors",
        "Check if suggestions are provided",
        "Verify suggestions are helpful and specific",
      ],
      howToTest:
        "Submit form with errors and check if helpful correction suggestions are provided.",
      passCondition:
        "Error messages include suggestions for correction when possible.",
      failCondition:
        "Errors identified but no guidance on how to correct them.",
    },

    "5.H": {
      id: "5.H",
      name: "3.3.4-error-prevention",
      title: "Error Prevention",
      wcag: "SC 3.3.4 Error Prevention (Legal, Financial, Data)",
      description:
        "Submissions are reversible, checked, or confirmed for important transactions.",
      instructions: [
        "Identify legal, financial, or data transactions",
        "Check for confirmation step",
        "Verify ability to review and correct",
        "Check if submissions are reversible",
      ],
      howToTest: "Test submission process for important transactions.",
      passCondition:
        "Important submissions can be reversed, checked, or confirmed.",
      failCondition: "No safeguards for important transactions.",
      notApplicable: "No legal, financial, or data modification transactions.",
    },

    "5.I": {
      id: "5.I",
      name: "3.2.2-on-input",
      title: "On Input",
      wcag: "SC 3.2.2 On Input",
      description:
        "Changing form field values doesn't cause unexpected context changes.",
      instructions: [
        "Change values in form fields",
        "Observe for unexpected changes",
        "Check for automatic form submission",
        "Note any navigation changes",
      ],
      howToTest:
        "Change form field values and observe for unexpected context changes.",
      passCondition:
        "Changing field values doesn't cause unexpected context changes.",
      failCondition:
        "Changing input causes form submission or navigation without warning.",
    },

    // Category 7: Images
    "7.A": {
      id: "7.A",
      name: "1.1.1-meaningful-image",
      title: "Meaningful Images",
      wcag: "SC 1.1.1 Non-text Content",
      description: "Meaningful images have appropriate alternative text.",
      instructions: [
        "Launch ANDI: graphics/images",
        "Review each meaningful image",
        "Check if alt text conveys equivalent information",
        "Verify images of text have exact text in alt",
      ],
      howToTest:
        "Use ANDI to check all meaningful images have equivalent alternative text.",
      passCondition:
        "All meaningful images have alt text that conveys equivalent information.",
      failCondition:
        "Meaningful images lack alt text or alt text doesn't convey equivalent meaning.",
      tools: ["ANDI: graphics/images"],
    },

    "7.B": {
      id: "7.B",
      name: "1.1.1-decorative-image",
      title: "Decorative Images",
      wcag: "SC 1.1.1 Non-text Content",
      description: "Decorative images are properly marked.",
      instructions: [
        "Launch ANDI: graphics/images",
        "Identify decorative images",
        'Verify they have empty alt text (alt="")',
        "Check they're not in tab order",
      ],
      howToTest:
        "Use ANDI to verify decorative images have empty alt text and aren't focusable.",
      passCondition:
        "Decorative images have empty alt text and aren't keyboard focusable.",
      failCondition: "Decorative images have alt text or are in tab order.",
      tools: ["ANDI: graphics/images"],
    },

    "7.C": {
      id: "7.C",
      name: "1.1.1-captcha",
      title: "CAPTCHA",
      wcag: "SC 1.1.1 Non-text Content",
      description: "CAPTCHA has appropriate alternative.",
      instructions: [
        "Locate any CAPTCHA",
        "Check for alt text describing purpose",
        "Verify alternative CAPTCHA options exist",
      ],
      howToTest: "Check CAPTCHA for description and alternative formats.",
      passCondition:
        "CAPTCHA has alt text describing purpose and alternative format available.",
      failCondition: "CAPTCHA lacks description or alternative format.",
      notApplicable: "No CAPTCHA present.",
    },

    "7.D": {
      id: "7.D",
      name: "1.4.5-image-of-text",
      title: "Images of Text",
      wcag: "SC 1.4.5 Images of Text",
      description: "Text is used rather than images of text.",
      instructions: [
        "Identify images containing text",
        "Determine if real text could be used",
        "Check for exceptions (logos, essential presentation)",
      ],
      howToTest:
        "Review images of text and determine if real text could achieve same visual.",
      passCondition:
        "Images of text only used for pure decoration or essential presentation.",
      failCondition: "Images of text used when real text would work.",
      exceptions: ["Logos", "Brand names", "Essential visual presentation"],
    },

    // Category 10: Content Structure
    "10.A": {
      id: "10.A",
      name: "2.4.6-heading-purpose",
      title: "Heading Purpose",
      wcag: "SC 2.4.6 Headings and Labels",
      description: "Headings describe topic or purpose.",
      instructions: [
        "Review all headings on page",
        "Verify each describes its section",
        "Check headings are not empty or generic",
      ],
      howToTest:
        "Read each heading and verify it describes the content that follows.",
      passCondition:
        "All headings clearly describe their section's topic or purpose.",
      failCondition: "Headings are vague, empty, or don't describe content.",
    },

    "10.B": {
      id: "10.B",
      name: "1.3.1-heading-determinable",
      title: "Visual Headings Programmatic",
      wcag: "SC 1.3.1 Info and Relationships",
      description: "Visual headings are programmatically determinable.",
      instructions: [
        "Launch ANDI: structures",
        "Identify all visual headings",
        "Verify each is marked up as heading",
        "Check no non-headings marked as headings",
      ],
      howToTest:
        "Use ANDI structures to verify all visual headings use heading markup.",
      passCondition:
        "All visual headings use proper heading markup (h1-h6 or ARIA).",
      failCondition:
        "Visual headings not using heading markup or non-headings marked as headings.",
      tools: ["ANDI: structures"],
    },

    "10.C": {
      id: "10.C",
      name: "1.3.1-heading-level",
      title: "Heading Levels",
      wcag: "SC 1.3.1 Info and Relationships",
      description: "Heading levels match visual hierarchy.",
      instructions: [
        "Launch ANDI: structures",
        "Review heading outline",
        "Compare to visual hierarchy",
        "Check levels reflect importance",
      ],
      howToTest:
        "Use ANDI to view heading structure and verify it matches visual hierarchy.",
      passCondition:
        "Heading levels logically match the visual heading hierarchy.",
      failCondition:
        "Heading levels don't match visual importance or skip illogically.",
      tools: ["ANDI: structures"],
    },

    "10.D": {
      id: "10.D",
      name: "1.3.1-list-type",
      title: "List Structure",
      wcag: "SC 1.3.1 Info and Relationships",
      description: "Lists use proper markup.",
      instructions: [
        "Identify all visual lists",
        "Check for proper ul, ol, dl markup",
        "Verify list items use li, dt/dd",
      ],
      howToTest:
        "Inspect page source to verify lists use proper semantic markup.",
      passCondition: "All visual lists use appropriate list markup.",
      failCondition: "Visual lists created without proper list elements.",
    },

    // Category 12: Page Titles, Frames, and iFrames
    "12.A": {
      id: "12.A",
      name: "2.4.2-page-title",
      title: "Page Title",
      wcag: "SC 2.4.2 Page Titled",
      description: "Web page has descriptive title.",
      instructions: [
        "Check page source for <title> element",
        "Verify title describes page",
        "Check title is unique within site",
      ],
      howToTest: "View page source and check for descriptive <title> element.",
      passCondition: "Page has descriptive and unique title element.",
      failCondition: "Page lacks title or title is not descriptive.",
    },

    "12.B": {
      id: "12.B",
      name: "2.4.1-frame-title",
      title: "Frame Title",
      wcag: "SC 2.4.1 Bypass Blocks, SC 4.1.2 Name, Role, Value",
      description: "Frames and iframes have titles.",
      instructions: [
        "Identify all frames and iframes",
        "Check each has title attribute",
        "Verify title describes frame content",
      ],
      howToTest: "Inspect all frames/iframes for descriptive title attributes.",
      passCondition: "All frames and iframes have descriptive titles.",
      failCondition: "Frames/iframes missing titles or titles not descriptive.",
      notApplicable: "No frames or iframes on page.",
    },

    // Category 13: Sensory Characteristics and Contrast
    "13.A": {
      id: "13.A",
      name: "1.3.3-sensory-info",
      title: "Sensory Characteristics",
      wcag: "SC 1.3.3 Sensory Characteristics",
      description: "Instructions don't rely solely on sensory characteristics.",
      instructions: [
        "Review all instructions on page",
        "Check for references to shape, size, location, sound",
        "Verify additional cues provided",
      ],
      howToTest:
        "Review instructions to ensure they don't rely only on sensory characteristics.",
      passCondition:
        "Instructions include non-sensory references (e.g., labels, headings).",
      failCondition: "Instructions rely only on sensory characteristics.",
    },

    "13.B": {
      id: "13.B",
      name: "1.4.1-color-meaning",
      title: "Use of Color",
      wcag: "SC 1.4.1 Use of Color",
      description: "Color is not sole means of conveying information.",
      instructions: [
        "Identify information conveyed by color",
        "Check for additional indicators",
        "Test with grayscale view",
      ],
      howToTest:
        "Review page to ensure color isn't the only way information is conveyed.",
      passCondition:
        "Information conveyed by color also uses text, symbols, or patterns.",
      failCondition: "Information conveyed only through color differences.",
    },

    "13.C": {
      id: "13.C",
      name: "1.4.3-contrast",
      title: "Color Contrast",
      wcag: "SC 1.4.3 Contrast (Minimum)",
      description: "Text has sufficient contrast.",
      instructions: [
        "Launch ANDI: color contrast",
        "Review all text on page",
        "Check minimum ratios: 4.5:1 normal, 3:1 large text",
        "Use CCA for manual testing if needed",
      ],
      howToTest:
        "Use ANDI and CCA to verify all text meets minimum contrast ratios.",
      passCondition:
        "All text meets minimum contrast ratios (4.5:1 normal, 3:1 large).",
      failCondition: "Text fails to meet minimum contrast requirements.",
      tools: ["ANDI: color contrast", "Colour Contrast Analyser"],
      ratios: {
        "Normal text": "4.5:1",
        "Large text": "3:1",
        "Large text definition": "18pt+ or 14pt+ bold",
      },
    },

    // Missing test placeholders (for automated testing)
    "1.B": { id: "1.B", title: "Conforming Alternate Version - Accessible", wcag: "Conformance Req 1" },
    "1.C": { id: "1.C", title: "Conforming Alternate Version - Equivalent", wcag: "Conformance Req 1" },
    "1.D": { id: "1.D", title: "Conforming Alternate Version - Updated", wcag: "Conformance Req 1" },
    "2.A": { id: "2.A", title: "Auto-Playing Audio", wcag: "SC 1.4.2" },
    "2.B": { id: "2.B", title: "Auto-Updating Content", wcag: "SC 2.2.2" },
    "3.A": { id: "3.A", title: "Flashing Content", wcag: "SC 2.3.1" },
    "6.A": { id: "6.A", title: "Link Purpose", wcag: "SC 2.4.4" },
    "6.B": { id: "6.B", title: "Button Purpose", wcag: "SC 2.4.4" },
    "8.A": { id: "8.A", title: "Timing Adjustable", wcag: "SC 2.2.1" },
    "9.A": { id: "9.A", title: "Bypass Blocks", wcag: "SC 2.4.1" },
    "9.B": { id: "9.B", title: "Bypass Repetitive Content", wcag: "SC 2.4.1" },
    "9.C": { id: "9.C", title: "Skip Navigation", wcag: "SC 2.4.1" },
    "11.A": { id: "11.A", title: "Page Language", wcag: "SC 3.1.1" },
    "11.B": { id: "11.B", title: "Parts Language", wcag: "SC 3.1.2" },
    "12.C": { id: "12.C", title: "iFrame Title", wcag: "SC 4.1.2" },
    "12.D": { id: "12.D", title: "Frame Title", wcag: "SC 4.1.2" },
    "14.A": { id: "14.A", title: "Table Data Cells", wcag: "SC 1.3.1" },
    "14.B": { id: "14.B", title: "Table Headers", wcag: "SC 1.3.1" },
    "14.C": { id: "14.C", title: "Table Caption", wcag: "SC 1.3.1" },
    "15.A": { id: "15.A", title: "CSS Positioning", wcag: "SC 1.3.2" },
    "15.B": { id: "15.B", title: "CSS Content", wcag: "SC 1.3.1" },
    "16.A": { id: "16.A", title: "Audio-Only Alternative", wcag: "SC 1.2.1" },
    "16.B": { id: "16.B", title: "Video-Only Alternative", wcag: "SC 1.2.1" },
    "17.A": { id: "17.A", title: "Captions (Prerecorded)", wcag: "SC 1.2.2" },
    "17.B": { id: "17.B", title: "Audio Description", wcag: "SC 1.2.3" },
    "17.C": { id: "17.C", title: "Captions (Live)", wcag: "SC 1.2.4" },
    "17.D": { id: "17.D", title: "Audio Description (Prerecorded)", wcag: "SC 1.2.5" },
    "18.A": { id: "18.A", title: "Resize Text", wcag: "SC 1.4.4" },
    "19.A": { id: "19.A", title: "Multiple Ways", wcag: "SC 2.4.5" },
    "20.A": { id: "20.A", title: "Parsing", wcag: "SC 4.1.1" },
  },
};
