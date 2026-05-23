# Changelog

## v0.6 - UX Polish And Public Readiness

- Improved layout stability so shared dashboard elements feel less jumpy when switching between Inbox, Themes, and Roadmap.
- Made the top analytics area sticky so key theme signals remain visible while reviewing longer feedback lists.
- Changed the sidebar guidance from PM Lens to PM Focus and made it contextual by view:
  - Inbox reinforces reviewing raw signals before drawing conclusions.
  - Themes reinforces pattern recognition across feedback.
  - Roadmap reinforces using priority as a discussion aid.
- Cleaned up the metric cards so theme names and supporting values are easier to scan.
- Updated README run instructions for a public audience.

## v0.5 - Portfolio Readiness

- Expanded the README to explain what the prototype demonstrates, what is real vs mocked, how scoring works, and what should be validated next.
- Explicitly identified AI theme classification, AI summarization, source integrations, backend, authentication, and effort-estimation workflow as mocked.
- Added validation questions around whether PMs trust, edit, and act on AI-generated themes.
- Personalized the mock company name to Jesseco Analytics to make the prototype feel more owned.

## v0.4 - Decision Framing

- Added a Decision Brief to translate theme analysis into a recommended next investigation.
- Framed the brief around why now, evidence, open questions, and the cross-functional partner needed.
- Kept the recommendation at the investigation level so the dashboard supports PM judgment instead of pretending to automatically commit roadmap work.
- Added tooltip explanations for the scoring model and Decision Brief so secondary context is available without cluttering the main workflow.

## v0.3 - Theme Metrics

- Replaced the vague "top theme" metric with clearer theme-level signals:
  - Highest priority theme.
  - Most urgent theme.
  - Highest count theme.
- Separated frequency, urgency, and priority because each supports a different product conversation.
- Added an additional Reporting feedback item so the sample data creates a clearer theme winner and a more intentional Decision Brief.

## v0.2 - Working Views

- Wired sidebar navigation into working Inbox, Themes, and Roadmap views so the prototype no longer had dead controls.
- Added theme summary cards to show how raw feedback can be synthesized into patterns.
- Added roadmap opportunity cards to connect themes to candidate product bets.
- Added empty states for no matching feedback, themes, or opportunities so the prototype handles common edge cases gracefully.

## v0.1 - Static Prototype

- Created a static HTML, CSS, and JavaScript prototype.
- Added mock customer feedback data.
- Added feedback filters, detail panel, priority calculation, and AI-style summary copy to demonstrate the core triage workflow.
- Added initial README and sandbox policy.
