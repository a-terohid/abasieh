[Role]
Act as a Senior UI/UX Designer and Frontend Engineer with strong experience in modern web design, design systems, responsive interfaces, and Persian (Jalali) calendar implementations.

[Task]
Perform another comprehensive UI/UX review of the entire website and improve its visual quality, consistency, and usability. The current design still has several visual weaknesses and inconsistencies that need to be addressed.

This task has two main priorities:

1. Comprehensive UI/UX Review & Visual Refinement

Go through the entire website again, including all pages, sections, cards, dropdowns, forms, navigation elements, and reusable components.

Do not assume the previous styling work is complete. The current UI still needs significant refinement.

Pay particular attention to the following:

A. Dropdowns & Form Elements

* Review all dropdowns and select components.
* Fix incorrect positioning and spacing.
* Dropdown arrows must have proper spacing from borders and surrounding elements.
* Ensure icons, labels, selected values, and arrows are properly aligned.
* Improve the overall appearance of inputs, selects, date pickers, and other form controls.
* Ensure consistent styling across all pages.

B. Cards & Content Components

Review all types of cards across the website.

Some cards are currently too basic, visually weak, or inconsistent.

Examples that require special attention:

* Zekr (ذکر) cards.
* Ziyaratnameh (زیارت‌نامه) cards.
* Heyat (هیئت) cards.
* Heyat Mana cards.
* Other religious content and informational cards.

Important design reference:
The Pirgholam (پیرغلام) cards currently have a relatively good visual presentation. Use them as a reference for understanding the desired level of visual quality, hierarchy, spacing, and overall presentation.

However, do not simply copy their design everywhere. Each content type should have its own appropriate visual identity while following a consistent overall design system.

C. Overall Visual Quality

Improve:

* Visual hierarchy.
* Typography and font sizing.
* Spacing and padding.
* Border radius consistency.
* Card backgrounds and borders.
* Shadows and depth.
* Icon placement and sizing.
* Color balance and contrast.
* Hover and interaction states.
* Responsive layouts.

The website should feel polished, modern, cohesive, and professionally designed.

Avoid:

* Overly simplistic cards.
* Excessive decorative elements.
* Inconsistent spacing.
* Unnecessary gradients and shadows.
* Generic-looking components.
* Random styling decisions across different pages.

The goal is not to make everything more decorative. The goal is to create a better-designed, more intentional, and visually balanced interface.

2. Persian (Jalali) Calendar & Year-Based Filtering

This is a very important requirement.

Currently, some date-related filters and year selections use the Gregorian calendar.

Update the relevant functionality to use the Persian (Jalali) calendar.

Requirements:

* All year-based filters must display Persian calendar years instead of Gregorian years.
* Date-related UI elements should use the Jalali calendar wherever appropriate.
* Ensure year selection, date filtering, and displayed dates are consistent.
* Make sure date comparisons and filtering logic work correctly.
* Do not simply convert the displayed year while keeping incorrect Gregorian-based filtering logic.
* Correctly handle conversion between Jalali and Gregorian dates wherever the backend or database requires Gregorian dates.

Important:
Do not unnecessarily change the database date storage format or existing backend architecture. Maintain compatibility with existing data and APIs while implementing correct Jalali date handling at the presentation and filtering layers.

Also verify that:

* Year boundaries are handled correctly.
* Filtering by a Persian year returns the correct records.
* Date ranges work correctly across Persian New Year.
* No off-by-one-day errors occur because of timezone or calendar conversion issues.

[Constraints]

1. Preserve all existing functionality.
2. Do not remove existing features or components.
3. Do not unnecessarily rewrite business logic or backend functionality.
4. Reuse existing components and design patterns wherever appropriate.
5. Maintain consistency across the entire website.
6. Ensure all changes are responsive and work on mobile, tablet, and desktop.
7. Do not introduce new dependencies unless genuinely necessary.
8. Avoid temporary CSS fixes that create problems elsewhere.
9. Fix the root cause of UI bugs rather than hiding their symptoms.
10. Do not limit the review to the examples mentioned above. Inspect the entire website.

[Workflow]

Step 1 — Audit:
Inspect the entire website and identify UI inconsistencies, weak components, layout problems, and date-related issues.

Step 2 — Refine:
Implement the UI improvements systematically. Pay particular attention to dropdowns, cards, and content-heavy pages.

Step 3 — Jalali Calendar:
Implement and verify Persian calendar support for year-based filtering and relevant date-related components.

Step 4 — Validation:

* Check all modified pages.
* Verify dropdown alignment.
* Review all card variations.
* Test responsive layouts.
* Test Jalali year filtering.
* Check for regressions.
* Run the available lint, type-check, and build commands.

Step 5 — Final Review:
Review the website one more time after implementation. Do not consider the task complete just because the code compiles. The actual visual quality and usability must also be evaluated.

[Final Notes]

The current website still does not look as polished as it should.

I want you to approach this task with a critical design perspective. Do not defend the existing UI or make superficial adjustments just to finish quickly.

Look at the website as a professional UI/UX designer would. Identify what looks wrong, understand why it looks wrong, and improve it.

For now, focus exclusively on:

1. Improving the overall UI/UX and visual consistency.
2. Fixing dropdowns and card designs.
3. Implementing correct Jalali calendar support for year-based filters.

Do not start unrelated feature development or introduce new functionality outside this scope.

At the end, provide a concise report of:

* Pages and components reviewed.
* UI problems identified and fixed.
* Card components improved.
* Jalali calendar changes.
* Tests performed.
* Any remaining issues.[Role]
Act as a Senior UI/UX Designer and Frontend Engineer with strong experience in modern web design, design systems, responsive interfaces, and Persian (Jalali) calendar implementations.

[Task]
Perform another comprehensive UI/UX review of the entire website and improve its visual quality, consistency, and usability. The current design still has several visual weaknesses and inconsistencies that need to be addressed.

This task has two main priorities:

1. Comprehensive UI/UX Review & Visual Refinement

Go through the entire website again, including all pages, sections, cards, dropdowns, forms, navigation elements, and reusable components.

Do not assume the previous styling work is complete. The current UI still needs significant refinement.

Pay particular attention to the following:

A. Dropdowns & Form Elements

* Review all dropdowns and select components.
* Fix incorrect positioning and spacing.
* Dropdown arrows must have proper spacing from borders and surrounding elements.
* Ensure icons, labels, selected values, and arrows are properly aligned.
* Improve the overall appearance of inputs, selects, date pickers, and other form controls.
* Ensure consistent styling across all pages.

B. Cards & Content Components

Review all types of cards across the website.

Some cards are currently too basic, visually weak, or inconsistent.

Examples that require special attention:

* Zekr (ذکر) cards.
* Ziyaratnameh (زیارت‌نامه) cards.
* Heyat (هیئت) cards.
* Heyat Mana cards.
* Other religious content and informational cards.

Important design reference:
The Pirgholam (پیرغلام) cards currently have a relatively good visual presentation. Use them as a reference for understanding the desired level of visual quality, hierarchy, spacing, and overall presentation.

However, do not simply copy their design everywhere. Each content type should have its own appropriate visual identity while following a consistent overall design system.

C. Overall Visual Quality

Improve:

* Visual hierarchy.
* Typography and font sizing.
* Spacing and padding.
* Border radius consistency.
* Card backgrounds and borders.
* Shadows and depth.
* Icon placement and sizing.
* Color balance and contrast.
* Hover and interaction states.
* Responsive layouts.

The website should feel polished, modern, cohesive, and professionally designed.

Avoid:

* Overly simplistic cards.
* Excessive decorative elements.
* Inconsistent spacing.
* Unnecessary gradients and shadows.
* Generic-looking components.
* Random styling decisions across different pages.

The goal is not to make everything more decorative. The goal is to create a better-designed, more intentional, and visually balanced interface.

2. Persian (Jalali) Calendar & Year-Based Filtering

This is a very important requirement.

Currently, some date-related filters and year selections use the Gregorian calendar.

Update the relevant functionality to use the Persian (Jalali) calendar.

Requirements:

* All year-based filters must display Persian calendar years instead of Gregorian years.
* Date-related UI elements should use the Jalali calendar wherever appropriate.
* Ensure year selection, date filtering, and displayed dates are consistent.
* Make sure date comparisons and filtering logic work correctly.
* Do not simply convert the displayed year while keeping incorrect Gregorian-based filtering logic.
* Correctly handle conversion between Jalali and Gregorian dates wherever the backend or database requires Gregorian dates.

Important:
Do not unnecessarily change the database date storage format or existing backend architecture. Maintain compatibility with existing data and APIs while implementing correct Jalali date handling at the presentation and filtering layers.

Also verify that:

* Year boundaries are handled correctly.
* Filtering by a Persian year returns the correct records.
* Date ranges work correctly across Persian New Year.
* No off-by-one-day errors occur because of timezone or calendar conversion issues.

[Constraints]

1. Preserve all existing functionality.
2. Do not remove existing features or components.
3. Do not unnecessarily rewrite business logic or backend functionality.
4. Reuse existing components and design patterns wherever appropriate.
5. Maintain consistency across the entire website.
6. Ensure all changes are responsive and work on mobile, tablet, and desktop.
7. Do not introduce new dependencies unless genuinely necessary.
8. Avoid temporary CSS fixes that create problems elsewhere.
9. Fix the root cause of UI bugs rather than hiding their symptoms.
10. Do not limit the review to the examples mentioned above. Inspect the entire website.

[Workflow]

Step 1 — Audit:
Inspect the entire website and identify UI inconsistencies, weak components, layout problems, and date-related issues.

Step 2 — Refine:
Implement the UI improvements systematically. Pay particular attention to dropdowns, cards, and content-heavy pages.

Step 3 — Jalali Calendar:
Implement and verify Persian calendar support for year-based filtering and relevant date-related components.

Step 4 — Validation:

* Check all modified pages.
* Verify dropdown alignment.
* Review all card variations.
* Test responsive layouts.
* Test Jalali year filtering.
* Check for regressions.
* Run the available lint, type-check, and build commands.

Step 5 — Final Review:
Review the website one more time after implementation. Do not consider the task complete just because the code compiles. The actual visual quality and usability must also be evaluated.

[Final Notes]

The current website still does not look as polished as it should.

I want you to approach this task with a critical design perspective. Do not defend the existing UI or make superficial adjustments just to finish quickly.

Look at the website as a professional UI/UX designer would. Identify what looks wrong, understand why it looks wrong, and improve it.

For now, focus exclusively on:

1. Improving the overall UI/UX and visual consistency.
2. Fixing dropdowns and card designs.
3. Implementing correct Jalali calendar support for year-based filters.

Do not start unrelated feature development or introduce new functionality outside this scope.

At the end, provide a concise report of:

* Pages and components reviewed.
* UI problems identified and fixed.
* Card components improved.
* Jalali calendar changes.
* Tests performed.
* Any remaining issues.